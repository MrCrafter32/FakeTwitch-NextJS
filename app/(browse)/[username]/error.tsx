"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";

const ErrorPage = () => {
  return ( 
    <div className="h-full flex flex-col space-y-4 items-center justify-center text-muted-foreground">
      <p>
        Please Log-In or Sign-Up to access this steam
      </p>
      <Button variant="secondary" asChild>
        <Link href="/sign-in">
          Log-In
        </Link>
      </Button>
    </div>
  );
};
 
export default ErrorPage;