import React, { useState, useContext } from "react";
import CommonForm from "./CommonForm";
import { initialSignUpFormData, signUpFormControls } from "@/config";
import { Dialog } from "../ui/dialog";
import { signUpService } from "@/services";
import { toast } from "sonner";
import { AuthContext } from "@/context/AuthContext";

const SignUp = ({ open, setOpen }) => {
  const [formData, setFormData] = useState(initialSignUpFormData);
  const { setErrorMsg, fetchProfileData } = useContext(AuthContext);

  async function handleSignUpFormSubmit(event) {
    event.preventDefault();

    const form = event.target;
    const data = new FormData(form);
    const newFormData = Object.fromEntries(data.entries());

    setFormData(newFormData);

    const response = await signUpService(formData);

    if (response?.success) {
      toast.success(response.message);
      setOpen(false);
      fetchProfileData(); // auto login after signup
    } else {
      setErrorMsg(response?.message || "Something went wrong");
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
      className="border-none w-full max-w-md"
    >
      <CommonForm
        formControls={signUpFormControls}
        btnText="Sign Up"
        handleFormSubmit={handleSignUpFormSubmit}
        headerContent="Sign Up"
        mode="signup"
      />
    </Dialog>
  );
};

export default SignUp;
