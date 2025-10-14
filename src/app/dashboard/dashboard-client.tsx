import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Session } from "@/lib/auth";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface DashboardClientProps {
  user: Session["user"];
}

export default function DashboardClient({ user }: DashboardClientProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <h2 className="text-2xl">
            Welcome to your{" "}
            {user.type === "Candidate" ? "Candidate" : "Recruiter"} Dashboard
          </h2>
        </CardTitle>
        <CardDescription>
          {user.type === "Candidate"
            ? "Browse jobs and apply to positions that match your skills."
            : "Post jobs and find qualified healthcare technology professionals."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {user.type === "Candidate" ? (
          <div className="grid gap-4 md:grid-cols-2">
            <Link
              href="/jobs"
              className={cn(
                buttonVariants({
                  variant: "outline",
                  size: "default",
                  className: "flex-col h-full gap-0 items-start",
                })
              )}
            >
              <h3 className="font-semibold text-lg">Browse Jobs</h3>
              <p className="text-sm text-muted-foreground">
                Find your next opportunity
              </p>
            </Link>
            <Link
              href="/applications"
              className={cn(
                buttonVariants({
                  variant: "outline",
                  size: "default",
                  className: "flex-col h-full gap-0 items-start",
                })
              )}
            >
              <h3 className="font-semibold text-lg">My Applications</h3>
              <p className="text-sm text-muted-foreground">
                Track your job applications
              </p>
            </Link>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            <Link
              href="/jobs/new"
              className={cn(
                buttonVariants({
                  variant: "outline",
                  size: "default",
                  className: "flex-col h-full gap-0 items-start",
                })
              )}
            >
              <h3 className="font-semibold text-lg">Post a Job</h3>
              <p className="text-sm text-muted-foreground">
                Create a new job listing
              </p>
            </Link>
            <Link
              href="/my-jobs"
              className={cn(
                buttonVariants({
                  variant: "outline",
                  size: "default",
                  className: "flex-col h-full gap-0 items-start",
                })
              )}
            >
              <h3 className="font-semibold text-lg">My Job Postings</h3>
              <p className="text-sm text-muted-foreground">
                Manage your job listings
              </p>
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export function DashboardClientLoading() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>
          <h2 className="text-2xl">
            <Skeleton className="h-8 w-full" />
          </h2>
        </CardTitle>
        <CardDescription>
          <Skeleton className="h-4 w-full" />
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2">
          <div
            className={cn(
              buttonVariants({
                variant: "outline",
                size: "default",
                className: "flex-col h-24 gap-0 items-start",
              })
            )}
          >
            <Skeleton className="h-6 w-[150px] mb-2" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
          <div
            className={cn(
              buttonVariants({
                variant: "outline",
                size: "default",
                className: "flex-col h-24 gap-0 items-start",
              })
            )}
          >
            <Skeleton className="h-6 w-[150px] mb-2" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
