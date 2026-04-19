import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import ComponentTestPage from "./pages/ComponentTestPage";
import Register from "./pages/Register";

// DASHBOARD
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import DashboardView from "./pages/DashboardView";

import { ProtectedRoute } from "./components/ProtectedRoute";
import User from "./pages/User/User";
import OrganizationView from "./pages/OrganizationView";

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
          <Route path="/organizations" element={<OrganizationView />} />
          <Route path="/components" element={<ComponentTestPage />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/user" element={<User />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}
