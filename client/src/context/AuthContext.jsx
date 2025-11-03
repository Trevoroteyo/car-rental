import { getProfile, logoutUser } from "@/services";
import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [showBecomeOwner, setShowBecomeOwner] = useState(false);
  const [auth, setAuth] = useState({
    authenticated: false,
    user: null,
  });

  const fetchProfileData = async () => {
    try {
      const response = await getProfile();
      console.log(response, "profile res");

      if (response.success) {
        setAuth({
          authenticated: response.data?.authenticate,
          user: response.data?.user,
        });
      } else {
        setAuth({ authenticated: false, user: null });
      }
    } catch (error) {
      console.log(`Error fetching profile: ${error}`);
      setAuth({ authenticated: false, user: null });
    }
  };

  async function logOut() {
    const response = await logoutUser();
    if (response.success) {
      // Immediately update local auth state and re-validate with server
      setAuth({ authenticated: false, user: null });
      // Re-fetch profile to ensure cookie was cleared on the server
      try {
        await fetchProfileData();
      } catch {
        // ignore - fetchProfileData already handles errors
      }
    }
  }

  useEffect(() => {
    fetchProfileData(); // run once on mount
  }, []);

  return (
    <AuthContext.Provider
      value={{
        setShowSignIn,
        auth,
        setAuth,
        showSignIn,
        setShowSignUp,
        setErrorMsg,
        setShowBecomeOwner,
        showBecomeOwner,
        errorMsg,
        showSignUp,
        fetchProfileData,
        logOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
