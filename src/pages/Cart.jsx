import { ShoppingBag, ArrowRight, Trash2, Plus, Minus, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateQuantity, clearCart } from "@/store/cartSlice";

export default function Cart() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cartItems);

  const subtotal = cart.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0);

  if (cart.length === 0) {
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

  return (
    <div className="max-w-6xl mx-auto py-12 space-y-8 animate-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold tracking-tight">Shopping Cart</h1>
        <Button variant="ghost" className="text-muted-foreground hover:text-destructive" onClick={() => dispatch(clearCart())}>
          Clear Cart
        </Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-12 items-start">
        {/* Cart Items List */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item) => (
            <Card key={item.id} className="overflow-hidden">
              <CardContent className="p-4 flex gap-6 items-center">
                <div className="h-24 w-24 rounded-lg bg-muted overflow-hidden shrink-0 border">
                  <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover" />
                </div>

                <div className="flex-1 space-y-1">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-lg leading-none">{item.title}</h3>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground hover:text-destructive"
                      onClick={() => dispatch(removeFromCart(item.id))}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-1">{item.description}</p>
                  <p className="font-bold text-primary">${item.price}</p>
                </div>

                <div className="flex items-center gap-3 bg-muted rounded-full p-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-full bg-background"
                    onClick={() => dispatch(updateQuantity({ id: item.id, amount: -1 }))}
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="font-bold w-4 text-center">{item.quantity}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-full bg-background"
                    onClick={() => dispatch(updateQuantity({ id: item.id, amount: 1 }))}
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Order Summary */}
        <Card className="shadow-xl border-2">
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between text-muted-foreground text-sm">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-muted-foreground text-sm">
              <span>Shipping</span>
              <span className="text-green-600 font-medium">Free</span>
            </div>
            <div className="flex justify-between text-muted-foreground text-sm">
              <span>Tax</span>
              <span>$0.00</span>
            </div>
            <Separator />
            <div className="flex justify-between text-xl font-bold">
              <span>Total</span>
              <span className="text-primary">${subtotal.toFixed(2)}</span>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button className="w-full h-12 gap-2 text-lg">
              <CreditCard className="h-5 w-5" />
              Checkout
            </Button>
            <p className="text-xs text-center text-muted-foreground">
              By proceeding, you agree to our Terms of Service.
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
