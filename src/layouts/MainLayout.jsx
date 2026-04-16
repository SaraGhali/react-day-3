import { Outlet } from "react-router-dom";
import Navbar from "@/components/Navbar";
import useThemeStore from "@/store/useThemeStore";

export default function MainLayout() {
  const { theme } = useThemeStore();

  return (
    <div className={`min-h-screen flex flex-col ${theme === "dark" ? "dark" : ""}`}>
      <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-1 pt-20 pb-12">
        <div className="container mx-auto px-4">
          <Outlet />
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t py-6 text-center text-sm text-muted-foreground">
        © 2026 BeautyStore by Sara Ghali.
      </footer>
      </div>
    </div>
  );
}
