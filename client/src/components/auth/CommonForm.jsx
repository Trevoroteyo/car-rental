import React, { useContext } from "react";
import { Label } from "../ui/label";
import { DialogHeader, DialogContent, DialogTitle } from "../ui/dialog";
import { AuthContext } from "@/context/AuthContext";
import { ThreeDots } from "react-loader-spinner";

const CommonForm = ({
  formControls,
  btnText,
  handleFormSubmit,
  headerContent,
  mode,
  loading,
}) => {
  const { setShowSignIn, setShowSignUp, errorMsg } = useContext(AuthContext);

  function renderComponent(controlItem) {
    switch (controlItem.componentName) {
      case "input":
        return (
          <input
            type={controlItem.componentType}
            name={controlItem.name}
            placeholder={controlItem.placeholder}
            className="border border-gray-300 px-2 py-1 rounded-sm"
          />
        );
      case "select":
        return (
          <select name={controlItem.name} className="select">
            {controlItem.options.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
      case "textarea":
        return (
          <textarea
            name={controlItem.name}
            placeholder={controlItem.placeholder}
            className="textarea"
          />
        );
      default:
        return (
          <input
            type={controlItem.componentType}
            name={controlItem.name}
            placeholder={controlItem.placeholder}
            className="input"
          />
        );
    }
  }

  const handleFooterClick = () => {
    if (mode === "signup") {
      setShowSignUp(false);
      setShowSignIn(true);
    } else {
      setShowSignIn(false);
      setShowSignUp(true);
    }
  };

  return (
    <DialogContent className="bg-white items-start z-[55] border-gray-800">
      <form onSubmit={handleFormSubmit} className="flex flex-col gap-3">
        <DialogHeader>
          <DialogTitle>
            <span className="text-blue-600 text-center">User </span>
            {headerContent}
          </DialogTitle>
        </DialogHeader>

        {formControls.map((controlItem, index) => (
          <div key={index} className="flex flex-col gap-1.5">
            <Label>{controlItem.label}</Label>
            {renderComponent(controlItem)}
          </div>
        ))}

        <p className={`${errorMsg !== "" ? "py-2" : ""} text-red-500 `}>
          {errorMsg}
        </p>
        <button
          type="submit"
          className="bg-blue-600 text-white cursor-pointer py-1 rounded-md outline-none mt-2 flex justify-center items-center"
        >
          {loading ? <ThreeDots ariaLabel="three-dots-loading" color="#ffffff" height="30" width="60" /> : btnText}
        </button>

        {/* Footer */}
        <p className="text-sm">
          {mode === "signup"
            ? "Already have an account? "
            : "Don't have an account? "}
          <span
            onClick={handleFooterClick}
            className="text-blue-600 hover:underline cursor-pointer"
          >
            {mode === "signup" ? "Login" : "Sign Up"}
          </span>
        </p>
      </form>
    </DialogContent>
  );
};

export default CommonForm;
