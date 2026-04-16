import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useDispatch } from "react-redux";
import { addToCart } from "@/store/cartSlice";
import { toast } from "sonner";
import {
  MoveLeft,
  Star,
  ShoppingCart,
  ShieldCheck,
  Truck,
  RotateCcw,
  AlertCircle
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`https://dummyjson.com/products/${id}`);
        setProduct(response.data);
      } catch (err) {
        setError("Could not find the product details. It might not exist.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto py-12 space-y-8 animate-in fade-in duration-500">
        <Skeleton className="h-10 w-32" />
        <div className="grid md:grid-cols-2 gap-12">
          <Skeleton className="aspect-square rounded-2xl" />
          <div className="space-y-6">
            <Skeleton className="h-12 w-3/4" />
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="max-w-2xl mx-auto py-20 text-center space-y-6">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Product Not Found</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
        <Button onClick={() => navigate("/")}>Go Back to Store</Button>
      </div>
    );
  }

  const isOutOfStock = product.stock === 0;

  return (
    <div className="max-w-6xl mx-auto py-12 space-y-8 animate-in slide-in-from-bottom-4 duration-700">
      <Button
        variant="ghost"
        onClick={() => navigate("/")}
        className="group"
      >
        <MoveLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
        Back to Products
      </Button>

      <div className="grid md:grid-cols-2 gap-12 items-start">
        {/* Image Gallery (Simplifed to main image) */}
        <div className="space-y-4">
          <div className="aspect-square bg-muted rounded-2xl overflow-hidden border">
            <img
              src={product.thumbnail}
              alt={product.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {product.images?.slice(0, 4).map((img, i) => (
              <div key={i} className="aspect-square bg-muted rounded-lg overflow-hidden border cursor-pointer hover:opacity-80 transition-opacity">
                <img src={img} alt={`${product.title} ${i}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div className="space-y-2">
            <Badge variant="outline" className="uppercase tracking-widest text-xs">
              {product.category}
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight">{product.title}</h1>
            <div className="flex items-center gap-4">
              <div className="flex items-center text-yellow-500">
                <Star className="h-5 w-5 fill-current" />
                <span className="ml-1 font-bold text-foreground">{product.rating}</span>
              </div>
              <span className="text-muted-foreground">•</span>
              <Badge
                variant={isOutOfStock ? "destructive" : "secondary"}
                className={!isOutOfStock ? "bg-green-100 text-green-700 hover:bg-green-100" : ""}
              >
                {isOutOfStock ? "Out of Stock" : `In Stock (${product.stock} available)`}
              </Badge>
            </div>
          </div>

          <div className="space-y-1">
            <p className="text-3xl font-bold text-primary">${product.price}</p>
            {product.discountPercentage > 0 && (
              <p className="text-sm text-green-600 font-medium">
                Save {product.discountPercentage}% today
              </p>
            )}
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Description</h3>
            <p className="text-muted-foreground leading-relaxed">
              {product.description}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button
              size="lg"
              className="flex-1 gap-2"
              disabled={isOutOfStock}
              onClick={() => {
                dispatch(addToCart(product));
                toast.success(`${product.title} added to cart!`);
              }}
            >
              <ShoppingCart className="h-5 w-5" />
              {isOutOfStock ? "Sold Out" : "Add to Cart"}
            </Button>

          </div>
        </div>
      </div>


    </div>
  );
}
