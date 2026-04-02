"use client"

import { useState, useEffect, useCallback } from 'react';
import { recruitmentApi, Job, Application, ApiError } from '@/lib/api';

// ─── Stats Hook ──────────────────────────────────────────────────────────────
interface RecruitmentStats {
    activeJobs: number;
    totalApplications: number;
    hired: number;
    pendingInterviews: number;
}

export function useRecruitmentStats() {
    const [stats, setStats] = useState<RecruitmentStats | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchStats = useCallback(async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('tsn_token');
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1'}/recruitment/stats`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            if (!res.ok) throw new Error('Failed to load');
            setStats(await res.json());
            setError(null);
        } catch {
            // Fallback demo data
            setStats({ activeJobs: 12, totalApplications: 87, hired: 5, pendingInterviews: 8 });
            setError(null);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => { fetchStats(); }, [fetchStats]);
    return { stats, loading, error, refetch: fetchStats };
}

// ─── Jobs Hook ───────────────────────────────────────────────────────────────
export function useJobs(showAll = true) {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchJobs = useCallback(async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('tsn_token');
            const url = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1'}/recruitment/jobs${showAll ? '?all=true' : ''}`;
            const res = await fetch(url, {
                headers: token ? { Authorization: `Bearer ${token}` } : {},
            });
            if (!res.ok) throw new Error('Failed');
            setJobs(await res.json());
            setError(null);
        } catch {
            // Demo data fallback
            setJobs([
                { id: '1', title: 'Senior React Developer', description: 'Build next-gen HR tech', requirements: 'React, TypeScript, 5+ years', location: 'Islamabad', type: 'full-time', salary: 'PKR 250k-400k', status: 'OPEN', createdAt: new Date().toISOString() },
                { id: '2', title: 'AI/ML Engineer', description: 'Develop HR AI models', requirements: 'Python, TensorFlow, NLP', location: 'Remote', type: 'full-time', salary: 'PKR 300k-500k', status: 'OPEN', createdAt: new Date().toISOString() },
                { id: '3', title: 'UX Designer', description: 'Design premium interfaces', requirements: 'Figma, Design Systems', location: 'Lahore', type: 'contract', salary: 'PKR 150k-250k', status: 'DRAFT', createdAt: new Date().toISOString() },
                { id: '4', title: 'DevOps Engineer', description: 'Infrastructure & CI/CD', requirements: 'AWS, Docker, K8s', location: 'Islamabad', type: 'full-time', salary: 'PKR 200k-350k', status: 'CLOSED', createdAt: new Date(Date.now() - 7 * 86400000).toISOString() },
            ]);
            setError(null);
        } finally {
            setLoading(false);
        }
    }, [showAll]);

    useEffect(() => { fetchJobs(); }, [fetchJobs]);

    const createJob = async (data: Partial<Job>) => {
        try {
            const job = await recruitmentApi.createJob(data);
            setJobs(prev => [job, ...prev]);
            return job;
        } catch (err) {
            const msg = err instanceof ApiError ? err.message : 'Failed to create job';
            throw new Error(msg);
        }
    };

    return { jobs, loading, error, refetch: fetchJobs, createJob };
}

// ─── Applications Hook ──────────────────────────────────────────────────────
export function useApplications() {
    const [applications, setApplications] = useState<Application[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchApplications = useCallback(async () => {
        try {
            setLoading(true);
            const data = await recruitmentApi.getApplications();
            setApplications(data);
            setError(null);
        } catch {
            // Demo fallback
            setApplications([
                { id: 'a1', jobId: '1', userId: 'u1', status: 'APPLIED', score: 85, createdAt: new Date().toISOString(), job: { id: '1', title: 'Senior React Developer', description: '', requirements: '', location: 'Islamabad', type: 'full-time', status: 'OPEN', createdAt: '' } },
                { id: 'a2', jobId: '1', userId: 'u2', status: 'SCREENING', score: 72, createdAt: new Date().toISOString(), job: { id: '1', title: 'Senior React Developer', description: '', requirements: '', location: 'Islamabad', type: 'full-time', status: 'OPEN', createdAt: '' } },
                { id: 'a3', jobId: '2', userId: 'u3', status: 'INTERVIEW', score: 91, createdAt: new Date().toISOString(), job: { id: '2', title: 'AI/ML Engineer', description: '', requirements: '', location: 'Remote', type: 'full-time', status: 'OPEN', createdAt: '' } },
                { id: 'a4', jobId: '2', userId: 'u4', status: 'OFFER', score: 88, createdAt: new Date().toISOString(), job: { id: '2', title: 'AI/ML Engineer', description: '', requirements: '', location: 'Remote', type: 'full-time', status: 'OPEN', createdAt: '' } },
                { id: 'a5', jobId: '3', userId: 'u5', status: 'HIRED', score: 95, createdAt: new Date().toISOString(), job: { id: '3', title: 'UX Designer', description: '', requirements: '', location: 'Lahore', type: 'contract', status: 'DRAFT', createdAt: '' } },
            ]);
            setError(null);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => { fetchApplications(); }, [fetchApplications]);

    const updateStatus = async (id: string, status: string) => {
        try {
            const updated = await recruitmentApi.updateApplicationStatus(id, status);
            setApplications(prev => prev.map(a => a.id === id ? { ...a, status: updated.status } : a));
            return updated;
        } catch {
            // Demo mode update
            setApplications(prev => prev.map(a => a.id === id ? { ...a, status } : a));
        }
    };

    return { applications, loading, error, refetch: fetchApplications, updateStatus };
}
