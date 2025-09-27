import SignInForm from "@/components/auth/SignInForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "TO DO SIGN IN",
  description: "This is to-do Signin Page",
};

export default function SignIn() {
  return <SignInForm />;
}
