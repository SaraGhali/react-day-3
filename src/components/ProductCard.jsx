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

export default function ProductCard({ id, title, price, description, category, image }) {
  return (
    <Card className="flex flex-col h-full overflow-hidden transition-all hover:shadow-lg">
      <CardHeader className="p-0">
        <div className="aspect-video bg-muted relative overflow-hidden group">
          {image ? (
            <img 
              src={image} 
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
        </div>
      </CardHeader>
      <CardContent className="flex-1 p-4">
        <div className="flex justify-between items-start mb-2">
          <CardTitle className="text-lg line-clamp-1">{title}</CardTitle>
          <span className="font-bold text-primary">${price}</span>
        </div>
        <CardDescription className="line-clamp-2">
          {description || "High-quality product designed for maximum efficiency and durability. Perfect for daily use."}
        </CardDescription>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Link to={`/product/${id}`} className="w-full">
          <Button variant="outline" className="w-full">
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
