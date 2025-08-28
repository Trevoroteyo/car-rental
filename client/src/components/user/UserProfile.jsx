import React from "react";
import {
  DropdownMenuLabel,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";
import { LogOut } from "lucide-react";

const UserProfile = ({handleLogout}) => {
  return (
    <DropdownMenuContent
      className=" w-40 bg-white border-gray-300 rounded shadow-sm mr-8"
      align="start"
    >
      <DropdownMenuLabel className="bg-gray-100">My Account</DropdownMenuLabel>
      <DropdownMenuGroup>
        <DropdownMenuItem className="hover:text-gray-700">
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem className="hover:text-gray-700">
          Settings
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-gray-300 mx-2" />
        <DropdownMenuItem onClick={handleLogout}>
          Logout <LogOut />
        </DropdownMenuItem>
      </DropdownMenuGroup>
    </DropdownMenuContent>
  );
};

export default UserProfile;
