import { Route, Routes, useLocation } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import HomePage from "./pages/HomePage";
import NavBar from "./components/NavBar";
import AdminPage from "./pages/AdminPage";
import BookDetails from "./components/BookDetails";
import CartPage from "./userComponents/CartPage";
import ProfilePage from "./userComponents/ProfilePage";
import DashboardPage from "./userComponents/DashboardPage";
import Footer from "./components/Footer";
import PrivacyPolicy from "./pages/PrivacyPolicy";


function AppContent() {
  const location = useLocation();
  const hideNav = location.pathname.startsWith("/adminDashboard");

  return (
    <>
      {!hideNav && <NavBar />}
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/book/:hashid" element={<BookDetails />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/dashboard" element={<DashboardPage />} />

        {/* Nested Admin Routes */}
        <Route path="/adminDashboard/*" element={<AdminPage />}>
        </Route>
      </Routes>
      {!hideNav && <Footer />}

    </>
  );
}

export default AppContent;
