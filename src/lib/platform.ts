/**
 * The participant platform, which is a separate application on its own
 * subdomain.
 *
 * One constant, because the onboarding link appears on several surfaces and a
 * hardcoded URL in each is how three of them end up pointing somewhere slightly
 * different.
 *
 * This marketing site has its own /sign-up and /sign-in pages, and in production
 * they do not work: the Pages workflow sets no VITE_AUTH_BASE, so the bundle
 * ships with the localhost fallback baked in and every visitor's browser calls
 * its own machine. Rather than wire this site up to the API as a second
 * front door, onboarding is sent to the platform, which is the application that
 * actually owns accounts, datasets and submissions.
 */
export const PLATFORM_URL = "https://platform.indiquantresearch.in";

/** Where a visitor goes to create an account and start competing. */
export const PLATFORM_SIGNUP_URL = `${PLATFORM_URL}/register`;

/** Where an existing contributor signs in. */
export const PLATFORM_SIGNIN_URL = `${PLATFORM_URL}/login`;
