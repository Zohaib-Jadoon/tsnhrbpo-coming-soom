"use client"

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { authApi, UserResponse, ApiError } from "@/lib/api";

type UserRole = "HR" | "SEEKER" | "ADMIN" | "SUPERADMIN" | null;

interface AuthContextType {
    user: UserResponse | null;
    userRole: UserRole;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<void>;
    loginWithRole: (role: UserRole) => void; // keep for dev/demo mode
    logout: () => void;
    error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<UserResponse | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    // Rehydrate from localStorage on mount
    useEffect(() => {
        try {
            const storedUser = localStorage.getItem("tsn_user");
            const storedToken = localStorage.getItem("tsn_token");
            if (storedUser && storedToken) {
                setUser(JSON.parse(storedUser));
            }
        } catch {
            localStorage.removeItem("tsn_user");
            localStorage.removeItem("tsn_token");
        } finally {
            setIsLoading(false);
        }
    }, []);

    const login = useCallback(async (email: string, password: string) => {
        setIsLoading(true);
        setError(null);
        try {
            const { token, user: userData } = await authApi.login(email, password);
            localStorage.setItem("tsn_token", token);
            localStorage.setItem("tsn_user", JSON.stringify(userData));
            setUser(userData);

            // Redirect based on role
            if (userData.role === "SEEKER") router.push("/seeker");
            else router.push("/dashboard");
        } catch (err) {
            const msg = err instanceof ApiError ? err.message : "Login failed";
            setError(msg);
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, [router]);

    // Dev/Demo mode — bypass API for quick testing with role selection
    const loginWithRole = useCallback((role: UserRole) => {
        const demoUser: UserResponse = {
            id: "demo-user",
            email: "demo@tsnhrbpo.com",
            role: role || "SEEKER",
            profile: { firstName: "Demo", lastName: "User" }
        };
        localStorage.setItem("tsn_user", JSON.stringify(demoUser));
        localStorage.setItem("tsn_token", "demo-token");
        setUser(demoUser);
        if (role === "SEEKER") router.push("/seeker");
        else router.push("/dashboard");
    }, [router]);

    const logout = useCallback(() => {
        localStorage.removeItem("tsn_token");
        localStorage.removeItem("tsn_user");
        localStorage.removeItem("tsn_auth_role"); // legacy cleanup
        setUser(null);
        setError(null);
        router.push("/");
    }, [router]);

    const value: AuthContextType = {
        user,
        userRole: (user?.role as UserRole) ?? null,
        isAuthenticated: !!user,
        isLoading,
        login,
        loginWithRole,
        logout,
        error,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
