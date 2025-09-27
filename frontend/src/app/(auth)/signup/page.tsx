import SignUpForm from "@/components/auth/SignUpForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "TO DO SIGN UP",
  description: "This is to-do Signup Page",
};

export default function SignUp() {
  return <SignUpForm />;
}
