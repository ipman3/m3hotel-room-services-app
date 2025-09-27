import HeaderComponent from "@/components/layout/HeaderComponent";
import ViewAllPage from "@/components/Pages/ViewAll/ViewAllPage";
import useNavbarStore from "@/store/Navbar";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/view-all/$viewId")({
  component: RouteComponent,
  loader: async ({ params }) => {
    return {
      viewId: params.viewId,
    };
  },
});

function RouteComponent() {
  const { viewId } = Route.useLoaderData();

  const { hide, show } = useNavbarStore((state) => state);

  useEffect(() => {
    hide();
    return () => {
      show();
    };
  }, [hide, show]);

  return (
      <div>
        <HeaderComponent title="View All" />
        <main className="mt-12">
          <ViewAllPage id={viewId} />
        </main>
      </div>
    );
}
