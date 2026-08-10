import { createElement, type ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: ReactNode;
}

export const useAuth = (): {
  isAuthenticated: boolean;
  token: string | null;
} => {
  const token = localStorage.getItem('token');
  return {
    isAuthenticated: Boolean(token),
    token,
  };
};

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const token = localStorage.getItem('token');
  return token
    ? children
    : createElement(Navigate, { to: '/login', replace: true });
};

export const setAuthToken = (token: string): void => {
  localStorage.setItem('token', token);
};

export const clearAuthToken = (): void => {
  localStorage.removeItem('token');
};
