import { NavLink } from "react-router-dom";
import { ShoppingCart, Sun, Moon, Languages } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { useLanguage } from "@/context/LanguageContext";
import useThemeStore from "@/store/useThemeStore";

export default function Navbar() {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const itemCount = cartItems.length;
  const { language, toggleLanguage } = useLanguage();
  const { theme, toggleTheme } = useThemeStore();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <h1 className="text-xl font-bold tracking-tight text-primary">BeautyStore</h1>
          <div className="hidden md:flex items-center gap-4">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `text-sm font-medium transition-colors hover:text-primary ${isActive ? "text-primary" : "text-muted-foreground"}`
              }
            >
              {language === "en" ? "Home" : "الرئيسية"}
            </NavLink>
          </div>
          <span className="text-sm font-medium ml-4">
            {language === "en" ? "Welcome" : "مرحباً"}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Language Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleLanguage}
            className="flex items-center gap-1 transition-transform active:scale-95"
          >
            <Languages className="h-4 w-4" />
            <span className="text-xs uppercase font-bold">{language}</span>
          </Button>

          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="transition-transform active:scale-95"
            aria-label="Toggle theme"
          >
            {theme === "light" ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
          </Button>

          {/* Cart Badge */}
          <NavLink to="/cart">
            <Button variant="ghost" size="icon" className="relative transition-transform active:scale-95">
              <ShoppingCart className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 bg-primary text-[10px] font-bold text-primary-foreground rounded-full flex items-center justify-center animate-in zoom-in-50 duration-300">
                  {itemCount}
                </span>
              )}
            </Button>
          </NavLink>
        </div>
      </div>
    </nav>
  );
}
