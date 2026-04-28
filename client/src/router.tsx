import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ComponentTestPage from "./pages/ComponentTestPage";
import NotFound from "./pages/NotFound";
import { ProtectedRoute } from "./components/ProtectedRoute";

// DASHBOARD
import DashboardView from "./pages/DashboardView";
import OrganizationView from "./pages/OrganizationView";
import Calendar from "./pages/Calendar";

// ORGANIZATION
import Organization from "./pages/OrganizationView/Organization";
import Projects from "./pages/OrganizationView/Projects";
import Members from "./pages/OrganizationView/Members";

// USER
import Settings from "./pages/Settings";
import User from "./pages/User/User";
import Notifications from "./pages/User/Notifications";

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
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/components" element={<ComponentTestPage />} />

          <Route path="/organization/:orgId" element={<Organization />} />
          <Route path="/organization/:orgId/projects" element={<Projects />} />
          <Route path="/organization/:orgId/members" element={<Members />} />

          <Route path="/settings" element={<Settings />} />
          <Route path="/user" element={<User />} />
          <Route path="/notifications" element={<Notifications />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}
