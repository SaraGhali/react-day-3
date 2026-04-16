import { Link } from "react-router-dom";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useDispatch } from "react-redux";
import { addToCart } from "@/store/cartSlice";
import { ShoppingCart } from "lucide-react";
import { toast } from "sonner";

export default function ProductCard({ id, title, price, description, category, thumbnail, stock }) {
  const dispatch = useDispatch();
  const isOutOfStock = stock === 0;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isOutOfStock) {
      const productData = { id, title, price, thumbnail, description, category, stock };
      dispatch(addToCart(productData));
      toast.success(`${title} added to cart!`);
    }
  };

  return (
    <Card className="flex flex-col h-full overflow-hidden transition-all hover:shadow-lg group">
      <Link to={`/product/${id}`} className="flex-1 flex flex-col">
        <CardHeader className="p-0">
          <div className="aspect-square bg-muted relative overflow-hidden">
            {thumbnail ? (
              <img 
                src={thumbnail} 
                alt={title} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-4xl font-bold text-muted-foreground/20 italic">
                  {title.slice(0, 2).toUpperCase()}
                </span>
              </div>
            )}
            <Badge className="absolute top-2 right-2" variant="secondary">
              {category}
            </Badge>
            
            {/* Stock Status Badge */}
            <Badge 
              className={`absolute bottom-2 left-2 ${isOutOfStock ? "bg-destructive text-destructive-foreground" : "bg-green-600 text-white"}`}
            >
              {isOutOfStock ? "Out of Stock" : "In Stock"}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="flex-1 p-4">
          <div className="flex justify-between items-start mb-2">
            <CardTitle className="text-lg line-clamp-1 group-hover:text-primary transition-colors">
              {title}
            </CardTitle>
            <span className="font-bold text-primary">${price}</span>
          </div>
          <CardDescription className="line-clamp-2">
            {description}
          </CardDescription>
        </CardContent>
      </Link>
      <CardFooter className="p-4 pt-0 gap-2">
        <Button 
          variant="outline" 
          size="icon"
          className="shrink-0"
          disabled={isOutOfStock}
          onClick={handleAddToCart}
        >
          <ShoppingCart className="h-4 w-4" />
        </Button>
        <Link to={`/product/${id}`} className="flex-1">
          <Button variant="outline" className="w-full" disabled={isOutOfStock}>
            {isOutOfStock ? "Unavailable" : "View Details"}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
