"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/store";

export default function Profile() {
  const user = useSelector((state: RootState) => state.auth.user);

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Loading user data...</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white dark:bg-gray-800 rounded shadow">
      <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
        User Profile
      </h1>

      <div className="space-y-4 text-gray-800 dark:text-gray-200">
        <p>
          <span className="font-semibold">name:</span> {`${user?.firstName} ${user?.lastName}` || "-"}
        </p>
        <p>
          <span className="font-semibold">Username:</span> {user.username || "-"}
        </p>
        <p>
          <span className="font-semibold">Email:</span> {user.email || "-"}
        </p>
        <p>
          <span className="font-semibold">DOB:</span>{" "}
          {user.birthDate ? new Date(user.birthDate).toLocaleDateString() : "-"}
        </p>
      </div>
    </div>
  );
}
