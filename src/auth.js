// Frontend/src/auth.js

// Lightweight JWT helper for browser-based frontend (React)
// - store tokens in localStorage (consider httpOnly cookies in production)
// - attach Authorization header to fetch calls
// - refresh tokens before expiration and handle 401 responses by redirecting to login

const ACCESS_TOKEN_KEY = 'access_token';
const REFRESH_TOKEN_KEY = 'refresh_token';
const REFRESH_ENDPOINT = '/auth/refresh'; // Adjust backend route
const LOGIN_PATH = '/login';

export function saveTokens({ accessToken, refreshToken }) {
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
}

export function clearTokens() {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
}

export function getAccessToken() {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

export function getRefreshToken() {
  return localStorage.getItem(REFRESH_TOKEN_KEY);
}

function parseJwt(token) {
  if (!token) return null;
  try {
    const payload = token.split('.')[1];
    const jsonStr = decodeURIComponent(atob(payload).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonStr);
  } catch (e) {
    return null;
  }
}

export function getTokenExpiry(token) {
  const p = parseJwt(token);
  if (!p || !p.exp) return null;
  return p.exp * 1000; // ms
}

// Attempt refresh synchronously. Returns true if refreshed.
export async function refreshTokenIfNeeded() {
  const access = getAccessToken();
  const refresh = getRefreshToken();
  if (!refresh) return false;
  const exp = getTokenExpiry(access);
  const now = Date.now();
  // if no access or expiring in next 60s, try refresh
  if (!exp || exp - now < 60000) {
    try {
      const form = new FormData();
      form.append('refresh_token', refresh);
      const res = await fetch(REFRESH_ENDPOINT, { method: 'POST', body: form });
      if (res.status === 200) {
        const data = await res.json();
        saveTokens({ accessToken: data.access_token, refreshToken: data.refresh_token });
        scheduleRefresh();
        return true;
      }
    } catch (e) {
      console.error('Refresh failed', e);
      return false;
    }
  }
  return true;
}

// Schedule a refresh a bit before expiry
let refreshTimer = null;
export function scheduleRefresh() {
  if (refreshTimer) clearTimeout(refreshTimer);
  const access = getAccessToken();
  const exp = getTokenExpiry(access);
  if (!exp) return;
  const now = Date.now();
  const msUntil = exp - now - 60000; // refresh 60s before expiry
  const wait = Math.max(30000, msUntil); // at least 30s
  refreshTimer = setTimeout(async () => {
    const ok = await refreshTokenIfNeeded();
    if (!ok) {
      // redirect to login
      clearTokens();
      window.location.href = LOGIN_PATH;
    }
  }, wait);
}

// Wrapper around fetch to add Authorization header and automatic refresh/401 handling
export async function fetchWithAuth(input, init = {}) {
  await refreshTokenIfNeeded();
  const token = getAccessToken();
  init.headers = init.headers || {};
  if (token) {
    init.headers['Authorization'] = 'Bearer ' + token;
  }
  let res = await fetch(input, init);
  if (res.status === 401) {
    // try refresh then retry once
    const ok = await refreshTokenIfNeeded();
    if (ok) {
      const token2 = getAccessToken();
      if (token2) init.headers['Authorization'] = 'Bearer ' + token2;
      res = await fetch(input, init);
    }
    if (res.status === 401) {
      clearTokens();
      window.location.href = LOGIN_PATH;
    }
  }
  return res;
}

// On app start, schedule refresh if tokens exist
export function initAuth() {
  scheduleRefresh();
}
