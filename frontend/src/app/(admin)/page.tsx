
import TodoMain from "@/components/admin/TodoMain";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "TO DO PAGE",
  description: "This is to-do Page",
};

export default function page() {
  return <TodoMain />;
}