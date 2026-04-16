import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MoveLeft } from "lucide-react";
import { ALL_PRODUCTS } from "@/data/products";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Get the product data by its id from the array by find method
  const product = ALL_PRODUCTS.find((p) => p.id === Number(id));

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-8 animate-in zoom-in-95 duration-500">
      <div className="space-y-4">
        <h2 className="text-3xl font-bold tracking-tight text-primary">
          {product ? product.title : "Product Details"}
        </h2>
        <div className="p-10 rounded-2xl bg-muted border-2 border-dashed border-primary/20 flex flex-col items-center gap-6 shadow-inner">
          {product ? (
            <>
              <img src={product.image} alt={product.title} className="w-48 h-48 object-cover rounded-xl shadow-lg border-4 border-background" />
              <p className="text-2xl font-medium tracking-tight">
                Fetching detailed data for Product ID: <span className="text-primary font-extrabold">{id}</span>
              </p>
              <p className="max-w-md text-muted-foreground">{product.description}</p>
              <p className="text-xl font-bold text-primary">${product.price}</p>
            </>
          ) : (
            <p className="text-2xl font-medium tracking-tight text-destructive">
              Product with ID {id} not found.
            </p>
          )}
        </div>
      </div>

      <Button 
        size="lg"
        onClick={() => navigate("/")}
        className="px-8 shadow-xl shadow-primary/20 hover:scale-105 transition-transform"
      >
        <MoveLeft className="mr-2 h-5 w-5" />
        Back to Home
      </Button>
    </div>
  );
}
