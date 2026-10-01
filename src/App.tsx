import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

/* Route protection */
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";

/* Public pages */
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AuthCallback from "./pages/AuthCallback";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";

/* Main app pages */
import Dashboard from "./pages/Dashboard";
import MockTest from "./pages/MockTest";
import Universities from "./pages/Universities";
import UniversityMatch from "./pages/UniversityMatch";
import UpcomingExams from "./pages/UpcomingExams";
import Analytics from "./pages/Analytics";
import Leaderboard from "./pages/Leaderboard";
import Settings from "./pages/Settings";
import AIStudyCoach from "./pages/AIStudyCoach";
import Bookmarks from "./pages/Bookmarks";

/* Admin pages */
import AdminDashboard from "./pages/AdminDashboard";

/* Test pages */
import EnglishTest from "./pages/tests/EnglishTest";
import AdvancedMathTest from "./pages/tests/AdvancedMathTest";
import AnalyticalReasoningTest from "./pages/tests/AnalyticalReasoningTest";
import BasicMathematicsTest from "./pages/tests/BasicMathematicsTest";
import ComputerScienceTest from "./pages/tests/ComputerScienceTest";
import IQTest from "./pages/tests/IQTest";
import PhysicsTest from "./pages/tests/PhysicsTest";
import QuantitativeReasoningTest from "./pages/tests/QuantitativeReasoningTest";
import Contact from "./pages/Contact";
import StudyResources from "./pages/StudyResources";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* =========================
            PUBLIC ROUTES
        ========================== */}

        <Route path="/" element={<Home />} />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/signup"
          element={<Signup />}
        />

        <Route
          path="/auth-callback"
          element={<AuthCallback />}
        />

        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />

        <Route
          path="/reset-password"
          element={<ResetPassword />}
        />

        <Route
          path="/terms"
          element={<Terms />}
        />

        <Route
          path="/privacy"
          element={<Privacy />}
        />

        {/* =========================
            PROTECTED APP ROUTES
        ========================== */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/mock-test"
          element={
            <ProtectedRoute>
              <MockTest />
            </ProtectedRoute>
          }
        />

        <Route
          path="/universities"
          element={
            <ProtectedRoute>
              <Universities />
            </ProtectedRoute>
          }
        />

        <Route
          path="/university-match"
          element={
            <ProtectedRoute>
              <UniversityMatch />
            </ProtectedRoute>
          }
        />

        <Route
          path="/exam-tracker"
          element={
            <ProtectedRoute>
              <UpcomingExams />
            </ProtectedRoute>
          }
        />

        <Route
          path="/analytics"
          element={
            <ProtectedRoute>
              <Analytics />
            </ProtectedRoute>
          }
        />

        <Route
          path="/leaderboard"
          element={
            <ProtectedRoute>
              <Leaderboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />

        <Route
          path="/ai-study-coach"
          element={
            <ProtectedRoute>
              <AIStudyCoach />
            </ProtectedRoute>
          }
        />

        <Route
          path="/bookmarks"
          element={
            <ProtectedRoute>
              <Bookmarks />
            </ProtectedRoute>
          }
        />

        {/* =========================
            SUBJECT TEST ROUTES
        ========================== */}

        <Route
          path="/test/english"
          element={
            <ProtectedRoute>
              <EnglishTest />
            </ProtectedRoute>
          }
        />

        <Route
          path="/test/advanced-mathematics"
          element={
            <ProtectedRoute>
              <AdvancedMathTest />
            </ProtectedRoute>
          }
        />

        <Route
          path="/test/analytical-reasoning"
          element={
            <ProtectedRoute>
              <AnalyticalReasoningTest />
            </ProtectedRoute>
          }
        />

        <Route
          path="/test/basic-mathematics"
          element={
            <ProtectedRoute>
              <BasicMathematicsTest />
            </ProtectedRoute>
          }
        />

        <Route
          path="/test/computer-science"
          element={
            <ProtectedRoute>
              <ComputerScienceTest />
            </ProtectedRoute>
          }
        />

        <Route
          path="/test/iq"
          element={
            <ProtectedRoute>
              <IQTest />
            </ProtectedRoute>
          }
        />

        <Route
          path="/test/physics"
          element={
            <ProtectedRoute>
              <PhysicsTest />
            </ProtectedRoute>
          }
        />

        <Route
          path="/test/quantitative-reasoning"
          element={
            <ProtectedRoute>
              <QuantitativeReasoningTest />
            </ProtectedRoute>
          }
        />

        <Route
          path="/study-resources"
          element={
            <ProtectedRoute>
              <StudyResources />
            </ProtectedRoute>
          }
        />

        {/* =========================
            ADMIN ROUTES
        ========================== */}

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            </ProtectedRoute>
          }
        />


        {/* =========================
            CONTACT ROUTE
        ========================== */}

        <Route
          path="/contact"
          element={
            <ProtectedRoute>
              <Contact />
            </ProtectedRoute>
          }
        />

        {/* =========================
            UNKNOWN ROUTES
        ========================== */}

        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}
