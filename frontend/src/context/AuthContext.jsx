import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check for existing auth on app load
  useEffect(() => {
    const checkAuthStatus = () => {
      try {
        const token = localStorage.getItem("token");
        const userData = localStorage.getItem("user");

        if (token && userData) {
          setUser(JSON.parse(userData));
        }
      } catch (error) {
        console.error("Error checking auth status:", error);
        // Clear invalid data
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const login = (data) => {
    try {
      localStorage.setItem("token", data.token);

      // Create user object from API response
      const userData = {
        customerId: data.customerId,
        name: data.name,
        email: data.email,
      };

      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
      console.log("Login successful - User:", userData);
    } catch (error) {
      console.error("Error during login:", error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    console.log("Logout successful");
  };

  const value = {
    user,
    login,
    logout,
    loading,
    isAuthenticated: !!user && !!localStorage.getItem("token"),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
