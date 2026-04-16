import { FileQuestion, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center space-y-8 animate-in slide-in-from-top-10 duration-700">
      <div className="relative">
        <h1 className="text-9xl font-black text-primary/10">404</h1>
        <div className="absolute inset-0 flex items-center justify-center">
          <FileQuestion className="h-20 w-20 text-primary animate-bounce" />
        </div>
      </div>
      
      <div className="space-y-3">
        <h2 className="text-4xl font-bold tracking-tight">Oops! Page Not Found</h2>
        <p className="text-muted-foreground text-xl max-w-lg mx-auto">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
      </div>

      <div className="flex gap-4">
        <Link to="/">
          <Button size="lg" className="px-8 shadow-lg shadow-primary/20">
            <Home className="mr-2 h-5 w-5" />
            Go back home
          </Button>
        </Link>
      </div>
    </div>
  );
}
