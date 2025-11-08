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
import { ChevronRightSquare, Search } from "lucide-react";
import { useState } from "react";

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
          <p dangerouslySetInnerHTML={{__html: item.description}} className="text-sm text-muted-foreground" />
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
  const {
    searchResults,
    loading,
    error,
    setSearchResults,
    setLoading,
    setError,
    clearSearchResults
  } = useSearchStore();

  const {
    data: allRoomServiceItems,
    isLoading: allRoomServiceItemsLoading,
    isError: allRoomServiceItemsError,
  } = useProductsByStore(store_id, searchResults.length === 0 && !loading);

  const searchMutation = useRoomServiceSearchMutation();

  const handleLocalSearch = () => {
    setLoading(true);
    setError(null);

    searchMutation.mutate(
      { q: localSearch },
      {
        onSuccess: (data) => {
          if (data.code === 1 && Array.isArray(data.data)) {
            setSearchResults(normalizeSearchData(data.data));
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

    if (allRoomServiceItems?.data && allRoomServiceItems.data.data.length > 0) {
      return allRoomServiceItems.data.data
        .slice(0, 12)
        .map((item) => <RoomServiceServiceCard item={normalizeSearchData([item])[0]} key={item.id} />);
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
