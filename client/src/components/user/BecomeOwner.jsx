import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Car } from "lucide-react";
import { becomeOwner } from "@/services";
import { toast } from "sonner";
import { Navigate } from "react-router-dom";

const BecomeOwner = ({ open, setOpen, userId }) => {
  const [isLoading, setIsLoading] = useState(false);

  async function handleBecomeOwnerRole() {
    const response = await becomeOwner(userId);
    setIsLoading(true);

    if (response.success) {
      setIsLoading(false);
      toast.success("You have successfully become an owner");
      setOpen(false);
      <Navigate to={"/owner"} replace />;
      console.log("role changed");
    } else {
      setIsLoading(false);
      toast.error("Failed to create Owner Account!");
    }
  }
  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
      className="border-none w-full max-w-md"
    >
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>Become an Owner - Rent your Car.</DialogTitle>
          <DialogDescription>
            <span className="text-blue-600 text-base">
              You are one step away from putting up your vehicle for rent.
            </span>
          </DialogDescription>
        </DialogHeader>
        <div>
          <p>
            Click Continue to create your Owner profile and start
            <br />
            <strong>RENTING OUT CARS</strong>.
          </p>
        </div>

        <DialogFooter>
          <Button
            onClick={handleBecomeOwnerRole}
            className="text-md text-white bg-blue-600 mt-3 items-center hover:bg-blue-500 cursor-pointer w-full"
          >
            {isLoading ? "Loading..." : "Continue"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BecomeOwner;
