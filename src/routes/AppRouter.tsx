import { lazy, Suspense } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { RequireAuth } from './RequireAuth'
import { AppShell } from '../components/layout/AppShell'

// Lazy load pages for better performance
const LoginPage = lazy(() => import('../pages/auth/LoginPage').then(m => ({ default: m.LoginPage })))
const SignupPage = lazy(() => import('../pages/auth/SignupPage').then(m => ({ default: m.SignupPage })))
const DashboardPage = lazy(() => import('../pages/DashboardPage').then(m => ({ default: m.DashboardPage })))
const CalendarPage = lazy(() => import('../pages/CalendarPage').then(m => ({ default: m.CalendarPage })))
const ProfilePage = lazy(() => import('../pages/ProfilePage').then(m => ({ default: m.ProfilePage })))
const LandingPage = lazy(() => import('../pages/LandingPage').then(m => ({ default: m.LandingPage })))
const NotFoundPage = lazy(() => import('../pages/NotFoundPage').then(m => ({ default: m.NotFoundPage })))

function Loading() {
  return (
    <div className="fixed inset-0 grid place-items-center bg-base-50 dark:bg-base-950">
      <div className="w-12 h-12 border-4 border-mint-500 border-t-transparent rounded-full animate-spin" />
    </div>
  )
}

export function AppRouter() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          <Route element={<RequireAuth />}>
            <Route element={<AppShell />}>
              <Route path="/landing" element={<LandingPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/calendar" element={<CalendarPage />} />
              <Route path="/profile" element={<ProfilePage />} />
            </Route>
          </Route>

          <Route path="*" element={<Suspense fallback={null}><NotFoundPage /></Suspense>} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
