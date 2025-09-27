
import CreateTodo from "@/components/admin/CreateTodo";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "CREATE TO DO PAGE",
    description: "This is create to-do page",
};

export default function page() {
    return <CreateTodo />;
}