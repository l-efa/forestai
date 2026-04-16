import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import ComponentTestPage from "./pages/ComponentTestPage";
import Register from "./pages/Register";

// DASHBOARD
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";

import { ProtectedRoute } from "./components/ProtectedRoute";

export default function Router() {
  return (
    <div className="min-h-screen bg-surface-black text-content-primary">
      <Routes>
        <Route index element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          <Route path="settings" element={<Settings />} />
          <Route path="components" element={<ComponentTestPage />}></Route>
        </Route>

        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </div>
  );
}
