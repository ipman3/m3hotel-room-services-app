import ErrorState from "@/components/ErrorState";
import SkeletonVerticalLoader from "@/components/SkeletonVerticalLoader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useRoomServiceSearchMutation } from "@/hooks/room-service/useFilterRoomService";
import { useProductsByStore } from "@/hooks/room-service/useProductsByStore";
import { normalizeSearchData } from "@/lib/normalizeSearchData";
import { useSearchStore, type SearchResult } from "@/store/useSearchStore";
import { Link } from "@tanstack/react-router";
import { ChevronRightSquare, Search, X } from "lucide-react";
import { useState } from "react";

import { useEffect } from "react";

const RECENT_SEARCH_KEY = "roomServiceRecentSearches";
const MAX_RECENT_SEARCHES = 5;

const getRecentSearches = (): string[] => {
  const stored = localStorage.getItem(RECENT_SEARCH_KEY);
  return stored ? JSON.parse(stored) : [];
};

const addRecentSearch = (term: string) => {
  if (!term) return;
  const lowerCaseTerm = term.toLowerCase();
  const searches = getRecentSearches();

  // Remove term if it already exists (to move it to the top)
  const filteredSearches = searches.filter(
    (s) => s.toLowerCase() !== lowerCaseTerm
  );

  // Add new term to the front and limit the list length
  const newSearches = [lowerCaseTerm, ...filteredSearches].slice(
    0,
    MAX_RECENT_SEARCHES
  );

  localStorage.setItem(RECENT_SEARCH_KEY, JSON.stringify(newSearches));
};

const RoomServiceServiceCard = ({ item }: { item: SearchResult }) => (
  <Link
    key={item.id}
    to="/room-service/$serviceId"
    params={{ serviceId: item.id.toString() }}
    className="block"
  >
    <Card className="py-4 mb-4 overflow-hidden border-none customShadowSm rounded-xl scroll-animate">
      <CardContent className="flex items-center gap-4 px-4">
        <img
          src={item.photo}
          alt={item.name}
          className="object-cover w-24 h-24 rounded-xl"
          loading="lazy"
        />
        <div className="flex-grow">
          <h3 className="font-bold">{item.name.replace("_", " ")}</h3>
          <p
            dangerouslySetInnerHTML={{ __html: item.description }}
            className="text-sm text-muted-foreground"
          />
          <p className="mt-1 font-bold">
            ${parseFloat(item.price)?.toFixed(2) || "N/A"}
          </p>
        </div>
      </CardContent>
    </Card>
  </Link>
);

export default function MainPage() {
  const store_id = 12;
  const [localSearch, setLocalSearch] = useState<string>("");
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  const {
    searchResults,
    loading,
    error,
    setSearchResults,
    setLoading,
    setError,
    clearSearchResults,
  } = useSearchStore();

  useEffect(() => {
    setRecentSearches(getRecentSearches());
  }, []);

  const clearRecentSearches = () => {
    localStorage.removeItem(RECENT_SEARCH_KEY);
  };

  const {
    data: allRoomServiceItems,
    isLoading: allRoomServiceItemsLoading,
    isError: allRoomServiceItemsError,
  } = useProductsByStore(store_id, searchResults.length === 0 && !loading);

  const searchMutation = useRoomServiceSearchMutation();

  const handleLocalSearch = () => {
    const searchTerm = localSearch.trim();
    if (!searchTerm || loading) return;

    setLoading(true);
    setError(null);

    searchMutation.mutate(
      { q: searchTerm },
      {
        onSuccess: (data) => {
          if (data.code === 1 && Array.isArray(data.data)) {
            setSearchResults(normalizeSearchData(data.data));

            addRecentSearch(searchTerm);
            setRecentSearches(getRecentSearches());
          } else {
            setError(data.msg || "Search failed");
          }
          setLoading(false);
        },
        onError: (err) => {
          setError((err as Error).message);
          setLoading(false);
          clearSearchResults();
        },
      }
    );
  };

  const handleClearSearch = () => {
    setLocalSearch("");
    clearSearchResults();
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTerm = e.target.value;
    setLocalSearch(newTerm);

    if (newTerm === "" && searchResults.length > 0) {
      clearSearchResults();
    }
  };

  const renderContent = () => {
    if (loading || allRoomServiceItemsLoading) {
      return Array.from({ length: 5 }).map((_, index) => (
        <SkeletonVerticalLoader key={index} />
      ));
    }

    if (error) return <ErrorState />;
    if (allRoomServiceItemsError) return <ErrorState />;

    if (searchResults.length > 0) {
      return searchResults.map((item) => (
        <RoomServiceServiceCard item={item} key={item.id} />
      ));
    }

    if (
      allRoomServiceItems?.data?.data &&
      allRoomServiceItems.data.data.length > 0
    ) {
      const normalizedItems = normalizeSearchData(
        allRoomServiceItems.data.data
      );
      return normalizedItems
        .slice(0, 12)
        .map((item) => <RoomServiceServiceCard item={item} key={item.id} />);
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
        {/* {searchResults.length === 0 && ( */}
        <div className="relative w-full mb-6">
          <Search className="absolute w-5 h-5 text-gray-300 -translate-y-1/2 left-4 top-1/2" />
          <Input
            placeholder="Search services..."
            value={localSearch}
            onChange={handleSearchChange}
            onKeyDown={(e) => e.key === "Enter" && handleLocalSearch()}
            className="w-full h-12 pl-12 pr-20 text-base rounded-full"
            autoFocus
          />
          {searchResults.length > 0 ? (
            <Button
              variant="ghost"
              size="icon"
              onClick={handleClearSearch}
              className="absolute h-10 px-4 -translate-y-1/2 rounded-full right-1 top-1/2 text-muted-foreground"
            >
              <X className="w-5 h-5" />
            </Button>
          ) : (
            <Button
              onClick={handleLocalSearch}
              className="absolute h-10 px-4 -translate-y-1/2 rounded-full right-1 top-1/2"
              disabled={!localSearch.trim() || loading}
            >
              <ChevronRightSquare />
            </Button>
          )}
        </div>
        {/* )} */}
      </div>

      {searchResults.length === 0 && recentSearches.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold mb-3 text-muted-foreground">
              Recent Searches
            </h3>
            <Button
              variant="link"
              size="sm"
              className="capitalize text-red-500 p-0 h-auto"
              onClick={() => {
                clearRecentSearches();
                setRecentSearches([]);
              }}
            >
              Clear All
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {recentSearches.map((term) => (
              <Button
                key={term}
                variant="outline"
                size="sm"
                className="capitalize"
                onClick={() => {
                  setLocalSearch(term);
                  handleLocalSearch();
                }}
              >
                {term}
              </Button>
            ))}
          </div>
        </div>
      )}

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
