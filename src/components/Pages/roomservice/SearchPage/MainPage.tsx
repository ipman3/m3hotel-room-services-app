import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";
import { serviceItems } from "@/config/data/room-service";


export default function MainPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const recentSearches = serviceItems.slice(0, 2);

  return (
    <div className="p-4">
      <div className="relative w-full mb-6">
        <Search className="absolute w-5 h-5 text-gray-300 -translate-y-1/2 left-4 top-1/2" />
        <Input
          placeholder="Search services..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full h-12 pl-12 pr-12 text-base bg-white border border-gray-200 rounded-full focus-visible:ring-base-primary ring-offset-0 focus-visible:ring-1 focus-visible:ring-offset-0"
          autoFocus
        />
        {searchTerm && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSearchTerm("")}
            className="absolute text-gray-500 -translate-y-1/2 rounded-full right-2 top-1/2 hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </Button>
        )}
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-lg">Recent searched</h2>
          <Button variant="link" className="text-red-500 p-0">
            Clear All
          </Button>
        </div>
        <div className="space-y-4">
          {recentSearches.map((item) => (
            <Card
              key={item.id}
              className="py-4 mb-4 overflow-hidden border-none customShadowSm rounded-xl scroll-animate"
            >
              <CardContent className="flex items-center gap-4 px-4">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="object-cover w-24 h-24 rounded-xl"
                  loading="lazy"
                />
                <div className="flex-grow">
                  <h3 className="font-bold">{item.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {item.description.slice(0, 30)}...
                  </p>
                  <p className="mt-1 font-bold">${item.price.toFixed(2)}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
