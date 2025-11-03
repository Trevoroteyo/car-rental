import React, { useState, useContext } from "react";
import CommonForm from "./CommonForm";
import { loginFormComtrols, initialLoginFormData } from "@/config";
import { Dialog } from "../ui/dialog";
import { signInService } from "@/services";
import { toast } from "sonner";
import { AuthContext } from "@/context/AuthContext";

const SignIn = ({ open, setOpen }) => {
  const [formData, setFormData] = useState(initialLoginFormData);
  const { fetchProfileData } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSignInFormSubmit(event) {
    event.preventDefault();

    const form = event.target;
    const data = new FormData(form);
    const newFormData = Object.fromEntries(data.entries());

    setFormData(newFormData);

    const response = await signInService(formData);
    setIsLoading(true);
    if (response?.success) {
      setIsLoading(false);
      toast.success(response.message);
      setOpen(false);
      fetchProfileData(); // refresh auth context
    } else {
      setIsLoading(false);
      toast.error(response?.message || "Invalid credentials");
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
      className="border-none w-full max-w-md"
    >
      <CommonForm
        formControls={loginFormComtrols}
        btnText="Sign In"
        handleFormSubmit={handleSignInFormSubmit}
        headerContent="Sign In"
        mode="signin"
        loading={isLoading}
      />
    </Dialog>
  );
};

export default SignIn;
