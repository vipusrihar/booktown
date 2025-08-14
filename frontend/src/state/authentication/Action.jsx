import {
  loginStart, loginFailure, loginSuccess,
  registerStart, registerSuccess, registerFailure,
  logout
} from "./authSlice";
import { securedApi, publicApi } from "../../config/API";
import { clearBookState } from "../book/bookSlice";
import { clearCartState } from "../cart/cartSlice";
import { clearOrderState } from "../order/orderSlice";
import { clearUserState } from "../user/userSlice";

// Security constants
const TOKEN_KEY = "token";
const AUTH_DATA_KEY = "auth";
const TOKEN_EXPIRY_CHECK_INTERVAL = 15 * 60 * 1000; // 15 minutes

// Email validation
const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

// Password validation
const isStrongPassword = (password) => {
  return password.length >= 8;
};

export const loginUser = (email, password, navigate) => async (dispatch) => {
  dispatch(loginStart());

  try {
    // Validate inputs
    if (!isValidEmail(email)) {
      throw new Error("Please enter a valid email address");
    }
    if (!isStrongPassword(password)) {
      throw new Error("Password must be at least 8 characters");
    }

    console.log("Attempting login with:", { email, password });

    const response = await publicApi.post("/auth/login", { email, password });

    //Backend returns { success, message, response }
    if (!response.data?.response) {
      throw new Error("Invalid server response");
    }

    console.log("Login response:", response.data);

    // Store auth data
    localStorage.setItem(TOKEN_KEY, response.data.response); // <-- JWT token

    // startSessionMonitoring(dispatch);

    dispatch(loginSuccess(response.data));

    const res = await securedApi.get("/auth/me");
    console.log("User data:", res.data.response);
    const user = res.data;

    if (user.role === "ROLE_ADMIN") {
      navigate("/adminDashboard", { replace: true });
    } else {
      navigate("/home", { replace: true });
    }

  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || "Login failed. Please try again.";
    console.error("Login error:", errorMessage, error);
    dispatch(loginFailure(errorMessage));
    alert(errorMessage);
  }
};


export const registerUser = (userData, navigate) => async (dispatch) => {
  dispatch(registerStart());

  try {
    // Validate inputs
    if (!isValidEmail(userData.email)) {
      throw new Error("Invalid email format");
    }
    if (!isStrongPassword(userData.password)) {
      throw new Error("Password must be at least 8 characters");
    }
    if (userData.password !== userData.confirmPassword) {
      console.log("Password Not match", userData.password, userData.confirmPassword);
      throw new Error("Passwords do not match");
    }

    userData = {
      userName: userData.name,
      email: userData.email,
      password: userData.password,
      role: userData.role || "ROLE_USER",
    };

    const response = await publicApi.post("/auth/signup", userData);

    console.log("Registration response:", response.data);

    if (!response.data?.success) {
      throw new Error("Registration incomplete");
    }

    dispatch(registerSuccess(response.data));
    alert("Registration successful! Please login.");
    navigate("/login", { replace: true });

  } catch (error) {
    let errorMessage = error.response?.data?.message || error.message || "Registration failed";

    if (errorMessage.includes("duplicate")) {
      errorMessage = "Email already registered";
    } else if (error.response?.status === 400) {
      errorMessage = "Invalid registration data";
    }

    console.error("Registration error:", errorMessage, error);
    dispatch(registerFailure(errorMessage));
    alert(errorMessage);
  }
};

export const logoutUser = (navigate) => async (dispatch) => {
  try {
    // Attempt server logout if token exists
    if (localStorage.getItem(TOKEN_KEY)) {
      await securedApi.post("/auth/logout");
    }
  } catch (error) {
    console.error("Logout error:", error);
  } finally {
    // Clear client-side data
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(AUTH_DATA_KEY);

    // Reset application state
    dispatch(logout());
    dispatch(clearBookState());
    dispatch(clearCartState());
    dispatch(clearOrderState());
    dispatch(clearUserState());

    // Redirect to home
    navigate("/", { replace: true });
  }
};

// Session monitoring
// const startSessionMonitoring = (dispatch) => {
//   const checkSession = () => {
//     const authData = JSON.parse(localStorage.getItem(AUTH_DATA_KEY) || {});
//     if (authData.expiresAt && Date.now() > authData.expiresAt) {
//       dispatch(logoutUser());
//     }
//   };

//   checkSession(); // Initial check
//   return setInterval(checkSession, TOKEN_EXPIRY_CHECK_INTERVAL);
// };

// Initialize auth state (call this when app loads)
// export const initializeAuth = (dispatch) => {
//   if (localStorage.getItem(TOKEN_KEY)) {
//     startSessionMonitoring(dispatch);
//   }
// };