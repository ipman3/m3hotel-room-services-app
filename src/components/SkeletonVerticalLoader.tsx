import { Card, CardContent } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

const SkeletonVerticalLoader = () => (
    <Card className="py-2 mb-4 overflow-hidden border-none customShadowSm rounded-xl">
      <CardContent className="relative flex items-center gap-4 px-2">
        <Skeleton className="w-24 h-24 rounded-xl" />
        <div className="flex-grow space-y-2">
          <Skeleton className="w-3/4 h-5" />
          <Skeleton className="w-full h-4" />
          <Skeleton className="w-1/2 h-4" />
        </div>
      </CardContent>
    </Card>
  );


export default SkeletonVerticalLoader;