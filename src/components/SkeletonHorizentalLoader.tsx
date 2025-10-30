import { Card, CardContent } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

const SkeletonHorizontalLoader = () => {
  return (
    <Card className="flex-shrink-0 w-40 p-0 border-none customShadowSm rounded-xl">
      <CardContent className="p-0">
        <Skeleton className="w-full h-24 rounded-t-xl" />
        <div className="px-2 py-4">
          <Skeleton className="w-3/4 h-4 mb-2" />
          <Skeleton className="w-1/2 h-4" />
        </div>
      </CardContent>
    </Card>
  );
};

export default SkeletonHorizontalLoader;
