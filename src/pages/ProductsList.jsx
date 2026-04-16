import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronLeft, ChevronRight, AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const CATEGORIES = [
  { label: "All", value: null },
  { label: "Beauty", value: "beauty" },
  { label: "Fragrances", value: "fragrances" },
  { label: "Furniture", value: "furniture" },
  { label: "Groceries", value: "groceries" },
];

export default function ProductsList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryFilter = searchParams.get("category");
  const pageParam = parseInt(searchParams.get("page") || "1");

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(0);

  const limit = 10;
  const skip = (pageParam - 1) * limit;

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        let url = "https://dummyjson.com/products";
        if (categoryFilter) {
          url = `https://dummyjson.com/products/category/${categoryFilter}`;
        }

        const response = await axios.get(url, {
          params: {
            limit,
            skip,
          },
        });

        setProducts(response.data.products);
        setTotal(response.data.total);
      } catch (err) {
        setError("Failed to load products. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryFilter, skip]);

  const updateFilter = (category) => {
    setSearchParams(category ? { category, page: 1 } : { page: 1 });
  };

  const updatePage = (newPage) => {
    const params = {};
    if (categoryFilter) params.category = categoryFilter;
    params.page = newPage;
    setSearchParams(params);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Header & Filters */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">

        <div className="flex flex-wrap gap-2 p-1 bg-muted rounded-lg w-fit">
          {CATEGORIES.map((cat) => (
            <Button
              key={cat.label}
              variant={categoryFilter === cat.value ? "default" : "ghost"}
              size="sm"
              onClick={() => updateFilter(cat.value)}
            >
              {cat.label}
            </Button>
          ))}
        </div>
      </div>


      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {loading ? (
          Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="aspect-square rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            </div>
          ))
        ) : (
          products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))
        )}
      </div>

      {!loading && products.length === 0 && (
        <div className="text-center py-20 border-2 border-dashed rounded-xl">
          <p className="text-muted-foreground italic">No products found for this category.</p>
        </div>
      )}

      {/* Pagination */}
      {total > limit && (
        <div className="flex items-center justify-center gap-4 pt-8">
          <Button
            variant="outline"
            size="icon"
            onClick={() => updatePage(pageParam - 1)}
            disabled={pageParam <= 1 || loading}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <div className="text-sm font-medium">
            Page {pageParam} of {totalPages}
          </div>

          <Button
            variant="outline"
            size="icon"
            onClick={() => updatePage(pageParam + 1)}
            disabled={pageParam >= totalPages || loading}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
