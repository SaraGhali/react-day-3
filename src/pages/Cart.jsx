import { ShoppingBag, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Cart() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6 animate-in fade-in duration-1000">
      <div className="bg-primary/10 p-8 rounded-full">
        <ShoppingBag className="h-16 w-16 text-primary" />
      </div>
      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Your Cart is Empty</h2>
        <p className="text-muted-foreground text-lg max-w-md mx-auto">
          Look like you haven't added anything to your cart yet. Start exploring our amazing collection.
        </p>
      </div>
      <Link to="/">
        <Button size="lg" className="group">
          Shop Now
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </Link>
    </div>
  );
}
