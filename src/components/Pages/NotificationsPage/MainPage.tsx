import { Card, CardContent } from "@/components/ui/card";
import { format } from "date-fns";

export interface NotificationData {
  id: number;
  title: string;
  content: string;
  is_read: string; // "0" or "1"
  createtime: number;
  updatetime: number;
  tg_id: string | null;
  customerId: number;
  roomId: string;
}

export default function MainPage({ notifications }: { notifications: NotificationData[] }) {
  return (
    <div className="px-4 py-8 space-y-6">
      <h2 className="text-lg font-bold text-base-secondary">Order's Notifications</h2>
      <div className="space-y-4">
        {notifications &&
          notifications.length > 0 &&
          notifications.map((item: NotificationData) => (
            <Card key={item?.id} className="p-4 rounded-xl customShadowSm border-none">
              <CardContent className="p-0">
                <div className="flex justify-between items-start">
                  <p className="font-semibold text-gray-700">{format(new Date(item.createtime * 1000), "dd-MMM-yyyy hh:mm a")}</p>
                  <p className="text-sm text-gray-500 underline">{item.title}</p>
                </div>
                <div className="flex items-center mt-2">
                  {/* <p className="text-xl font-bold text-gray-900">${item.content}</p> */}
                  {/* <span className="mx-2 text-gray-300">|</span> */}
                  <p className="text-sm text-gray-500" dangerouslySetInnerHTML={{ __html: item.content }}></p>
                </div>
              </CardContent>
            </Card>
          ))}
      </div>
    </div>
  );
}
