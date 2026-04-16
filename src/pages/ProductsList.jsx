import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ALL_PRODUCTS } from "@/data/products";

export default function ProductsList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryFilter = searchParams.get("category");

  const filteredProducts = categoryFilter 
    ? ALL_PRODUCTS.filter(p => p.category === categoryFilter)
    : ALL_PRODUCTS;

  const updateFilter = (category) => {
    if (category) {
      setSearchParams({ category });
    } else {
      setSearchParams({});
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header & Filters */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <Badge variant="outline" className="px-3 py-1 text-xs uppercase tracking-wider bg-primary/5">
            Store Catalog
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight">
            {categoryFilter 
              ? `Currently Browsing: ${categoryFilter.charAt(0).toUpperCase() + categoryFilter.slice(1)}` 
              : "All Products"}
          </h2>
          <p className="text-muted-foreground">
            Explore our curated selection of high-quality products.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 p-1 bg-muted rounded-lg w-fit">
          <Button 
            variant={categoryFilter === null ? "default" : "ghost"} 
            size="sm"
            onClick={() => updateFilter(null)}
          >
            All
          </Button>
          <Button 
            variant={categoryFilter === "electronics" ? "default" : "ghost"} 
            size="sm"
            onClick={() => updateFilter("electronics")}
          >
            Electronics
          </Button>
          <Button 
            variant={categoryFilter === "clothing" ? "default" : "ghost"} 
            size="sm"
            onClick={() => updateFilter("clothing")}
          >
            Clothing
          </Button>
        </div>
      </div>

      {/* Grid - Bonus Task 5: 1 per row mobile, 3 per row desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-20 border-2 border-dashed rounded-xl">
          <p className="text-muted-foreground italic">No products found for this category.</p>
        </div>
      )}
    </div>
  );
}
