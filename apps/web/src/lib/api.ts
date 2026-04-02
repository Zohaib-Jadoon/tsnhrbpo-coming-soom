/**
 * TSNHRBPO API Client
 * Centralized HTTP client for frontend → backend communication
 */

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1';

interface ApiOptions extends RequestInit {
    token?: string;
}

class ApiError extends Error {
    constructor(public status: number, message: string) {
        super(message);
        this.name = 'ApiError';
    }
}

async function request<T>(endpoint: string, options: ApiOptions = {}): Promise<T> {
    const { token, ...fetchOptions } = options;

    // Attach JWT if present (from localStorage/mem)
    const storedToken = token || (typeof window !== 'undefined' ? localStorage.getItem('tsn_token') : null);

    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        ...(storedToken && { Authorization: `Bearer ${storedToken}` }),
        ...(options.headers as Record<string, string>),
    };

    const response = await fetch(`${BASE_URL}${endpoint}`, {
        ...fetchOptions,
        headers,
    });

    if (!response.ok) {
        const error = await response.json().catch(() => ({ error: 'Unknown error' }));
        throw new ApiError(response.status, error.error || `HTTP ${response.status}`);
    }

    return response.json();
}

// ─── Auth ────────────────────────────────────────────────────────────────────
export const authApi = {
    login: (email: string, password: string) =>
        request<{ token: string; user: UserResponse }>('/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
        }),

    register: (data: RegisterPayload) =>
        request<{ token: string; user: UserResponse }>('/auth/register', {
            method: 'POST',
            body: JSON.stringify(data),
        }),

    logout: () =>
        request<{ message: string }>('/auth/logout', { method: 'POST' }),
};

// ─── Recruitment ─────────────────────────────────────────────────────────────
export const recruitmentApi = {
    getJobs: () => request<Job[]>('/recruitment/jobs'),
    getJob: (id: string) => request<Job>(`/recruitment/jobs/${id}`),
    createJob: (data: Partial<Job>) =>
        request<Job>('/recruitment/jobs', { method: 'POST', body: JSON.stringify(data) }),
    getApplications: () => request<Application[]>('/recruitment/applications'),
    apply: (jobId: string, data: { coverLetter?: string; resumeUrl?: string }) =>
        request<Application>('/recruitment/apply', { method: 'POST', body: JSON.stringify({ jobId, ...data }) }),
    updateApplicationStatus: (id: string, status: string) =>
        request<Application>(`/recruitment/applications/${id}/status`, {
            method: 'PATCH',
            body: JSON.stringify({ status }),
        }),
};

// ─── Employees ───────────────────────────────────────────────────────────────
export const employeesApi = {
    getAll: () => request<Employee[]>('/employees'),
    getById: (id: string) => request<Employee>(`/employees/${id}`),
    create: (data: Partial<Employee>) =>
        request<Employee>('/employees', { method: 'POST', body: JSON.stringify(data) }),
    update: (id: string, data: Partial<Employee>) =>
        request<Employee>(`/employees/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
};

// ─── Payroll ─────────────────────────────────────────────────────────────────
export const payrollApi = {
    getAll: (month?: number, year?: number) => {
        const params = new URLSearchParams();
        if (month) params.append('month', month.toString());
        if (year) params.append('year', year.toString());
        return request<PayrollRecord[]>(`/payroll?${params}`);
    },
    processPayroll: (month: number, year: number) =>
        request<{ processed: number }>('/payroll/process', {
            method: 'POST',
            body: JSON.stringify({ month, year }),
        }),
    getEmployeeHistory: (employeeId: string) =>
        request<PayrollRecord[]>(`/payroll/employee/${employeeId}`),
};

// ─── Attendance ──────────────────────────────────────────────────────────────
export const attendanceApi = {
    getLogs: (params?: { date?: string; employeeId?: string }) => {
        const query = new URLSearchParams(params as Record<string, string>);
        return request<AttendanceLog[]>(`/attendance?${query}`);
    },
    checkIn: (employeeId: string) =>
        request('/attendance/check-in', { method: 'POST', body: JSON.stringify({ employeeId }) }),
    checkOut: (employeeId: string) =>
        request('/attendance/check-out', { method: 'POST', body: JSON.stringify({ employeeId }) }),
    getLeaves: () => request<LeaveRequest[]>('/attendance/leaves'),
    requestLeave: (data: Partial<LeaveRequest>) =>
        request<LeaveRequest>('/attendance/leaves', { method: 'POST', body: JSON.stringify(data) }),
    updateLeaveStatus: (id: string, status: string) =>
        request<LeaveRequest>(`/attendance/leaves/${id}`, {
            method: 'PATCH',
            body: JSON.stringify({ status }),
        }),
};

// ─── Types ───────────────────────────────────────────────────────────────────
export interface UserResponse {
    id: string;
    email: string;
    role: 'HR' | 'SEEKER' | 'ADMIN' | 'SUPERADMIN';
    profile?: {
        firstName: string;
        lastName: string;
        avatarUrl?: string;
        department?: string;
        position?: string;
    };
}

export interface RegisterPayload {
    email: string;
    password: string;
    role?: string;
    firstName?: string;
    lastName?: string;
}

export interface Job {
    id: string;
    title: string;
    description: string;
    requirements: string;
    location: string;
    type: string;
    salary?: string;
    status: string;
    department?: string;
    createdAt: string;
}

export interface Application {
    id: string;
    jobId: string;
    userId: string;
    status: string;
    score?: number;
    createdAt: string;
    job?: Job;
    resumeUrl?: string;
    applicant?: {
        id: string;
        email: string;
        profile?: {
            firstName: string;
            lastName: string;
            phone?: string;
            avatarUrl?: string;
        };
    };
}

export interface Employee {
    id: string;
    employeeId: string;
    firstName: string;
    lastName: string;
    email: string;
    department: string;
    position: string;
    status: string;
    salary?: number;
    joinDate: string;
}

export interface PayrollRecord {
    id: string;
    employeeId: string;
    month: number;
    year: number;
    basicSalary: number;
    bonuses: number;
    deductions: number;
    netPay: number;
    processed: boolean;
    processedAt?: string;
}

export interface AttendanceLog {
    id: string;
    employeeId: string;
    date: string;
    checkIn?: string;
    checkOut?: string;
    hoursWorked?: number;
    status: string;
}

export interface LeaveRequest {
    id: string;
    employeeId: string;
    type: string;
    startDate: string;
    endDate: string;
    reason?: string;
    status: string;
}

export { ApiError };
