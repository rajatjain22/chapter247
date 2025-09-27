
import Profile from "@/components/admin/Profile";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "TO DO USER PROFILE PAGE",
  description: "This is to-do User Profile Page",
};

export default function page() {
  return <Profile />;
}