

import HeaderComponent from "@/components/layout/HeaderComponent";
import ViewAllRoomService from "@/components/Pages/ViewAll/ViewAllRoomService";
import useNavbarStore from "@/store/Navbar";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/view-all/$roomId")({
  component: RouteComponent,
  loader: async ({ params }) => {
    return {
      roomId: params.roomId,
    };
  },
});

function RouteComponent() {
  const { roomId } = Route.useLoaderData();

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
        <ViewAllRoomService id={roomId} />
      </main>
    </div>
  );
}
