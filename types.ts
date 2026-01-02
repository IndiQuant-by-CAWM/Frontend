"""
Phase 3: Frontend Dashboard

React-based web dashboard for the IndiQuant tournament scoring system.
This file provides TypeScript/TSX interfaces and component structure.

Main Components:
- Tournament Management Dashboard
- Real-time Leaderboard
- Submission Tracker
- System Health Monitor
- Audit & Compliance Dashboard
- Alert Management
"""

// Main App Configuration
export interface AppConfig {
  apiUrl: string;
  wsUrl: string;
  refreshInterval: number;
  theme: 'light' | 'dark';
}

// ============================================================================
// Data Models
// ============================================================================

export interface Tournament {
  tournament_id: string;
  name: string;
  description?: string;
  status: 'created' | 'active' | 'completed' | 'cancelled';
  start_date: string;
  end_date: string;
  max_submissions: number;
  total_submissions: number;
  scoring_type: string;
  created_at: string;
  updated_at: string;
}

export interface Submission {
  submission_id: string;
  tournament_id: string;
  user_id: string;
  status: 'pending' | 'processing' | 'scored' | 'rejected';
  score?: number;
  percentile?: number;
  timestamp: string;
  error_message?: string;
}

export interface LeaderboardEntry {
  rank: number;
  user_id: string;
  submission_id: string;
  score: number;
  percentile: number;
  submissions_count: number;
  best_score: number;
  performance_trend: 'up' | 'down' | 'stable';
}

export interface SystemHealth {
  timestamp: string;
  overall_health: 'operational' | 'degraded' | 'failed';
  system_availability: number;
  components: Record<string, ComponentStatus>;
  active_alerts: number;
  critical_alerts: number;
}

export interface ComponentStatus {
  status: string;
  availability: number;
  error_rate: number;
  response_time_ms: number;
  throughput_ops_sec: number;
  active_alerts: number;
}

export interface Alert {
  alert_id: string;
  timestamp: string;
  severity: 'info' | 'warning' | 'critical';
  message: string;
  metric_name?: string;
  resolved: boolean;
}

export interface ComplianceReport {
  report_id: string;
  timestamp: string;
  total_submissions: number;
  compliant_submissions: number;
  non_compliant_submissions: number;
  overall_level: string;
  risk_score: number;
  recommendations: string[];
}

export interface AuditEvent {
  event_id: string;
  timestamp: string;
  operation_type: string;
  user_id?: string;
  action: string;
  status: string;
  severity: string;
  resource_id?: string;
  message: string;
}

// ============================================================================
// Component Props
// ============================================================================

export interface TournamentDashboardProps {
  selectedTournament: Tournament | null;
  tournaments: Tournament[];
  loading: boolean;
  onTournamentSelect: (tournament: Tournament) => void;
  onCreateTournament: (tournament: Omit<Tournament, 'tournament_id'>) => void;
}

export interface LeaderboardProps {
  tournament_id: string;
  entries: LeaderboardEntry[];
  loading: boolean;
  limit: number;
  onLimitChange: (limit: number) => void;
}

export interface SubmissionTrackerProps {
  tournament_id: string;
  submissions: Submission[];
  loading: boolean;
  onRefresh: () => void;
  filters: SubmissionFilters;
  onFilterChange: (filters: SubmissionFilters) => void;
}

export interface SubmissionFilters {
  status?: string;
  user_id?: string;
  score_range?: [number, number];
}

export interface SystemHealthProps {
  health: SystemHealth | null;
  loading: boolean;
  onRefresh: () => void;
}

export interface AlertsProps {
  alerts: Alert[];
  loading: boolean;
  onAcknowledge: (alert_id: string) => void;
  onResolve: (alert_id: string) => void;
}

export interface AuditLogProps {
  events: AuditEvent[];
  loading: boolean;
  pagination: {
    current_page: number;
    total_pages: number;
    limit: number;
  };
  onPageChange: (page: number) => void;
}

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor?: string;
    tension?: number;
  }[];
}

// ============================================================================
// React Component Interfaces
// ============================================================================

export interface DashboardState {
  tournaments: Tournament[];
  selectedTournament: Tournament | null;
  leaderboard: LeaderboardEntry[];
  submissions: Submission[];
  systemHealth: SystemHealth | null;
  alerts: Alert[];
  auditEvents: AuditEvent[];
  complianceReport: ComplianceReport | null;
  loading: boolean;
  error: string | null;
  user: UserInfo | null;
}

export interface UserInfo {
  user_id: string;
  email: string;
  role: 'admin' | 'participant' | 'analyst';
  created_at: string;
  last_active: string;
}

// ============================================================================
// API Service Interfaces
// ============================================================================

export interface APIClient {
  getTournaments(): Promise<Tournament[]>;
  getTournament(id: string): Promise<Tournament>;
  createTournament(tournament: Partial<Tournament>): Promise<Tournament>;
  updateTournamentStatus(id: string, status: string): Promise<Tournament>;
  
  getSubmissions(tournamentId: string): Promise<Submission[]>;
  createSubmission(submission: Partial<Submission>): Promise<Submission>;
  scoreSubmission(submissionId: string): Promise<any>;
  
  getLeaderboard(tournamentId: string, limit?: number): Promise<any>;
  
  getSystemHealth(): Promise<SystemHealth>;
  getAlerts(limit?: number): Promise<Alert[]>;
  
  getAuditEvents(limit?: number): Promise<AuditEvent[]>;
  getComplianceReport(): Promise<ComplianceReport>;
  
  subscribeToLeaderboard(tournamentId: string, callback: (data: any) => void): WebSocket;
  subscribeToAlerts(callback: (data: Alert[]) => void): WebSocket;
}

// ============================================================================
// Route Definitions
// ============================================================================

export interface RouteConfig {
  path: string;
  name: string;
  component: React.ComponentType<any>;
  requiresAuth: boolean;
  requiresAdmin?: boolean;
  icon?: string;
}

export const ROUTES: RouteConfig[] = [
  {
    path: '/',
    name: 'Dashboard',
    component: null,
    requiresAuth: true,
    icon: 'dashboard'
  },
  {
    path: '/tournaments',
    name: 'Tournaments',
    component: null,
    requiresAuth: true,
    icon: 'tournament'
  },
  {
    path: '/tournaments/:id',
    name: 'Tournament Detail',
    component: null,
    requiresAuth: true
  },
  {
    path: '/leaderboard/:id',
    name: 'Leaderboard',
    component: null,
    requiresAuth: true
  },
  {
    path: '/submissions/:id',
    name: 'Submissions',
    component: null,
    requiresAuth: true
  },
  {
    path: '/health',
    name: 'System Health',
    component: null,
    requiresAuth: true,
    icon: 'health'
  },
  {
    path: '/alerts',
    name: 'Alerts',
    component: null,
    requiresAuth: true,
    icon: 'alert'
  },
  {
    path: '/audit',
    name: 'Audit Log',
    component: null,
    requiresAuth: true,
    requiresAdmin: true,
    icon: 'audit'
  },
  {
    path: '/compliance',
    name: 'Compliance',
    component: null,
    requiresAuth: true,
    requiresAdmin: true,
    icon: 'compliance'
  },
  {
    path: '/users',
    name: 'User Management',
    component: null,
    requiresAuth: true,
    requiresAdmin: true,
    icon: 'users'
  }
];

// ============================================================================
// Theme Configuration
// ============================================================================

export interface ThemeConfig {
  colors: {
    primary: string;
    secondary: string;
    success: string;
    warning: string;
    error: string;
    info: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
}

export const LIGHT_THEME: ThemeConfig = {
  colors: {
    primary: '#1976d2',
    secondary: '#dc004e',
    success: '#4caf50',
    warning: '#ff9800',
    error: '#f44336',
    info: '#2196f3',
    background: '#fafafa',
    surface: '#ffffff',
    text: '#212121',
    textSecondary: '#757575'
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px'
  }
};

export const DARK_THEME: ThemeConfig = {
  colors: {
    primary: '#90caf9',
    secondary: '#f48fb1',
    success: '#81c784',
    warning: '#ffb74d',
    error: '#ef5350',
    info: '#64b5f6',
    background: '#121212',
    surface: '#1e1e1e',
    text: '#ffffff',
    textSecondary: '#bdbdbd'
  },
  spacing: LIGHT_THEME.spacing
};

// ============================================================================
// Utility Types
// ============================================================================

export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

export interface PaginationState {
  current_page: number;
  total_pages: number;
  limit: number;
  total_items: number;
}

export interface SortConfig {
  key: string;
  direction: 'asc' | 'desc';
}

export interface FilterConfig {
  field: string;
  operator: 'equals' | 'contains' | 'greater_than' | 'less_than' | 'between';
  value: any;
}

// ============================================================================
// Export Summary
// ============================================================================

export const DASHBOARD_COMPONENTS = [
  'TournamentDashboard',
  'LeaderboardViewer',
  'SubmissionTracker',
  'SystemHealthMonitor',
  'AlertManager',
  'AuditLog',
  'ComplianceReport',
  'UserManagement',
  'RealTimeMetrics',
  'DeploymentStatus'
];

export const API_ENDPOINTS = {
  tournaments: '/tournaments',
  submissions: '/submissions',
  scoring: '/score',
  leaderboard: '/tournaments/:id/leaderboard',
  health: '/health',
  alerts: '/alerts',
  audit: '/audit/events',
  compliance: '/compliance/report',
  users: '/users',
  deployment: '/deployment/status',
  websockets: {
    leaderboard: '/ws/leaderboard/:id',
    alerts: '/ws/alerts'
  }
};
