import { Outlet, NavLink } from "react-router-dom";
import { ShoppingCart, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Fixed Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <h1 className="text-xl font-bold tracking-tight">TechStore</h1>
            <div className="hidden md:flex items-center gap-4">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors hover:text-primary ${isActive ? "text-primary" : "text-muted-foreground"}`
                }
              >
                Home
              </NavLink>

            </div>
          </div>

          <div className="flex items-center gap-2">
            <NavLink to="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                <span className="absolute top-1 right-1 h-2 w-2 bg-primary rounded-full" />
              </Button>
            </NavLink>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 pt-20 pb-12">
        <div className="container mx-auto px-4">
          <Outlet />
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t py-6 text-center text-sm text-muted-foreground">
        © 2026 TechStore by Sara Ghali.
      </footer>
    </div>
  );
}
