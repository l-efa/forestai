import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import ComponentTestPage from "./pages/ComponentTestPage";
import Register from "./pages/Register";
import { ProtectedRoute } from "./components/ProtectedRoute";

export default function Router() {
  return (
    <div className="min-h-screen bg-surface-black text-content-primary">
      <Routes>
        <Route index element={<Login />}></Route>
        <Route path="components" element={<ComponentTestPage />}></Route>
        <Route path="/register" element={<Register />}></Route>

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <ComponentTestPage />
            </ProtectedRoute>
          }
        ></Route>

        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </div>
  );
}
