"use client";

import { useRouter } from "next/navigation";
import { signOut } from "@/lib/auth-client";
import { User, UserType } from "@/types";

interface DashboardClientProps {
  user: User;
  session: {
    user: {
      id: string;
      email: string;
      name: string;
    };
  };
}

export default function DashboardClient({
  user,
  session,
}: DashboardClientProps) {
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Healthcare Jobs</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">{session.user.email}</span>
            <button
              onClick={handleSignOut}
              className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="rounded-lg bg-white p-6 shadow">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Welcome to your{" "}
            {user.type === UserType.Candidate ? "Candidate" : "Employer"}{" "}
            Dashboard
          </h2>

          <div className="space-y-4">
            <div className="border-l-4 border-blue-500 bg-blue-50 p-4">
              <p className="text-sm text-blue-700">
                {user.type === UserType.Candidate
                  ? "Browse jobs and apply to positions that match your skills."
                  : "Post jobs and find qualified healthcare technology professionals."}
              </p>
            </div>

            {user.type === UserType.Candidate ? (
              <div className="grid gap-4 md:grid-cols-2">
                <button
                  onClick={() => router.push("/jobs")}
                  className="rounded-lg border-2 border-blue-600 bg-blue-600 px-6 py-4 text-white hover:bg-blue-700 transition"
                >
                  <h3 className="font-semibold text-lg">Browse Jobs</h3>
                  <p className="text-sm mt-1 text-blue-100">
                    Find your next opportunity
                  </p>
                </button>
                <button
                  onClick={() => router.push("/applications")}
                  className="rounded-lg border-2 border-gray-300 px-6 py-4 hover:border-blue-600 hover:bg-gray-50 transition"
                >
                  <h3 className="font-semibold text-lg">My Applications</h3>
                  <p className="text-sm mt-1 text-gray-600">
                    Track your job applications
                  </p>
                </button>
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                <button
                  onClick={() => router.push("/jobs/new")}
                  className="rounded-lg border-2 border-blue-600 bg-blue-600 px-6 py-4 text-white hover:bg-blue-700 transition"
                >
                  <h3 className="font-semibold text-lg">Post a Job</h3>
                  <p className="text-sm mt-1 text-blue-100">
                    Create a new job listing
                  </p>
                </button>
                <button
                  onClick={() => router.push("/my-jobs")}
                  className="rounded-lg border-2 border-gray-300 px-6 py-4 hover:border-blue-600 hover:bg-gray-50 transition"
                >
                  <h3 className="font-semibold text-lg">My Job Postings</h3>
                  <p className="text-sm mt-1 text-gray-600">
                    Manage your job listings
                  </p>
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
