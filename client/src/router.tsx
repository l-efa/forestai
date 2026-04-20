import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import ComponentTestPage from "./pages/ComponentTestPage";
import Register from "./pages/Register";

// DASHBOARD
import { ProtectedRoute } from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import DashboardView from "./pages/DashboardView";

import OrganizationView from "./pages/OrganizationView";
import Organization from "./pages/OrganizationView/Organization";

import User from "./pages/User/User";
import Settings from "./pages/Settings";

export default function Router() {
  return (
    <div className="min-h-screen bg-surface-black text-content-primary">
      <Routes>
        <Route index element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<DashboardView />} />
          <Route path="/organization" element={<OrganizationView />} />
          <Route path="/organization/:id" element={<Organization />} />
          <Route path="/components" element={<ComponentTestPage />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/user" element={<User />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}
