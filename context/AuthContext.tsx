// app/context/AuthContext.tsx
import React, { createContext, useState, useEffect, useContext } from "react";
import * as SecureStore from "expo-secure-store";
import { useRouter } from "expo-router"; // Import useRouter for navigation

// Define types
interface AuthContextProps {
  token: string | null;
  studentId: string;
  login: (studentId: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// AuthProvider component to wrap the app
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(null);
  const [studentId, setStudentId] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter(); // Initialize the router for navigation

  // Function to log in the user
  const login = async (studentId: string, password: string) => {
    fetch("https://iras.iub.edu.bd:8079//v3/account/token", {
      headers: {
        origin: "https://irasv1.iub.edu.bd",
        referer: "https://irasv1.iub.edu.bd/",
        host: "iras.iub.edu.bd:8079",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        email: studentId,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((json_data) => {
        const data = json_data.data;
        if (!data) {
          alert("Wrong Credentials");
          return;
        }
        const auth_tok = data[0]?.access_token;
        const authToken = `Bearer ${auth_tok}`;
        setToken(authToken);
        SecureStore.setItemAsync("authToken", authToken);

        // Redirect to the home page under (tabs) after successful login
        router.replace("/(root)/(tabs)/home");
      })
      .catch((error) => console.error("Error:", error));
    setStudentId(studentId);
  };

  // Function to log out the user
  const logout = async () => {
    setStudentId("");
    setToken(null);
    await SecureStore.deleteItemAsync("authToken");
  };

  // Load the token from SecureStore when app starts
  useEffect(() => {
    const loadToken = async () => {
      const storedToken = await SecureStore.getItemAsync("authToken");
      if (storedToken) {
        setToken(storedToken);
      }
      setLoading(false);
    };
    loadToken();
  }, []);

  return (
    <AuthContext.Provider value={{ token, studentId, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
