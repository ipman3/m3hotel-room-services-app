import ErrorState from "@/components/ErrorState";
import SkeletonVerticalLoader from "@/components/SkeletonVerticalLoader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useSpaSearchMutation } from "@/hooks/wellness-spa/useFilterSpa";
import { useGetAllSpas } from "@/hooks/wellness-spa/useGetAllSpa";
import { useSearchStore, type SearchResult } from "@/store/useSearchStore";
import { Link } from "@tanstack/react-router";
import { ChevronRightSquare, Search } from "lucide-react";
import { useState } from "react";

const SpaServiceCard = ({ item }: { item: SearchResult }) => (
  <Link
    key={item.id}
    to="/wellness-spa/$serviceId"
    params={{ serviceId: item.id.toString() }}
    className="block"
  >
    <Card className="py-4 mb-4 overflow-hidden border-none customShadowSm rounded-xl scroll-animate">
      <CardContent className="flex items-center gap-4 px-4">
        <img
          src={item.image}
          alt={item.name}
          className="object-cover w-24 h-24 rounded-xl"
          loading="lazy"
        />
        <div className="flex-grow">
          <h3 className="font-bold">{item.name.replace("_", " ")}</h3>
          <p className="text-sm text-muted-foreground">
            {/* Using short_desc is better for a list view */}
            {item.short_desc?.slice(0, 30)}...
          </p>
          <p className="mt-1 font-bold">
            ${parseFloat(item.price)?.toFixed(2) || "N/A"}
          </p>
        </div>
      </CardContent>
    </Card>
  </Link>
);

export default function MainPage() {
  const [localSearch, setLocalSearch] = useState<string>("");
  const {
    searchResults,
    loading,
    error,
    setSearchResults,
    setLoading,
    setError,
  } = useSearchStore();

  const {
    data: allSpaItems,
    isLoading: allSpaItemsLoading,
    isError: allSpaItemsError,
  } = useGetAllSpas(searchResults.length === 0 && !loading);

  const searchMutation = useSpaSearchMutation();

  const handleLocalSearch = () => {
    setLoading(true);
    setError(null);

    searchMutation.mutate(
      { q: localSearch },
      {
        onSuccess: (data) => {
          if (data.code === 1) {
            setSearchResults(data.data as SearchResult[]);
          } else {
            setError(data.msg || "Search failed");
          }
          setLoading(false);
        },
        onError: (err) => {
          setError((err as Error).message);
          setLoading(false);
        },
      }
    );
  };

  const renderContent = () => {
    if (loading || allSpaItemsLoading) {
      return Array.from({ length: 5 }).map((_, index) => (
        <SkeletonVerticalLoader key={index} />
      ));
    }

    if (error) return <ErrorState />;
    if (allSpaItemsError) return <ErrorState />;

    if (searchResults.length > 0) {
      return searchResults.map((item) => (
        <SpaServiceCard item={item} key={item.id} />
      ));
    }

    if (allSpaItems?.data && allSpaItems.data.length > 0) {
      return allSpaItems.data
        .slice(0, 5)
        .map((item) => <SpaServiceCard item={item} key={item.id} />);
    }

    return (
      <p className="text-muted-foreground">
        No results found. Please try adjusting your search criteria.
      </p>
    );
  };

  return (
    <div className="p-4">
      <div className="relative w-full mb-6">
        {searchResults.length === 0 && (
          <div className="relative w-full mb-6">
            <Search className="absolute w-5 h-5 text-gray-300 -translate-y-1/2 left-4 top-1/2" />
            <Input
              placeholder="Search services..."
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLocalSearch()}
              className="w-full h-12 pl-12 pr-20 text-base rounded-full"
              autoFocus
            />
            <Button
              onClick={handleLocalSearch}
              className="absolute h-10 px-4 -translate-y-1/2 rounded-full right-1 top-1/2"
              disabled={!localSearch.trim() || loading}
            >
              <ChevronRightSquare />
            </Button>
          </div>
        )}
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-lg">
            {searchResults.length > 0 ? "Search Results" : "You may also like"}
          </h2>
        </div>
        <div className="space-y-4">{renderContent()}</div>
      </div>
    </div>
  );
}
