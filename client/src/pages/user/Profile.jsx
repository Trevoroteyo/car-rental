import React, { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

const Profile = () => {
  const { auth, logOut } = useContext(AuthContext);

  if (!auth?.authenticated) {
    return (
      <div className="p-8">
        <h2 className="text-2xl font-semibold">Profile</h2>
        <p className="text-gray-600 mt-4">You are not signed in.</p>
      </div>
    );
  }

  const { user } = auth;

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Profile</h2>

      <div className="bg-white p-6 rounded shadow-sm">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 bg-gray-100 rounded-full flex items-center justify-center text-xl font-bold">
            {user?.name?.charAt(0)?.toUpperCase()}
          </div>
          <div>
            <p className="font-semibold">{user?.name}</p>
            <p className="text-gray-500">{user?.email}</p>
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <Button
            className="bg-red-600 text-white"
            variant="destructive"
            onClick={logOut}
          >
            Logout <LogOut/>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
