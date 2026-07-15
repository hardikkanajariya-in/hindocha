import Link from "next/link";
import { WifiOff, Home } from "lucide-react";

export default function OfflinePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <WifiOff className="mb-6 h-16 w-16 text-muted-foreground" />
      <h1 className="text-2xl font-bold">You&apos;re Offline</h1>
      <p className="mt-3 max-w-md text-muted-foreground">
        It looks like you&apos;ve lost your internet connection. Please check your
        connection and try again.
      </p>
      <Link
        href="/"
        className="mt-6 inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/80"
      >
        <Home className="mr-2 h-4 w-4" />
        Try Again
      </Link>
    </div>
  );
}
