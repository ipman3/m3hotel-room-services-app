import { Card, CardContent } from "@/components/ui/card";
import { notificationItems } from "@/config/data/notifications";
import { format } from 'date-fns';

export default function MainPage() {
  return (
    <div className="px-4 py-8 space-y-6">
      <h2 className="text-lg font-bold text-base-secondary">
        Order's Notifications
      </h2>
      <div className="space-y-4">
        {notificationItems.map((item) => (
          <Card key={item.id} className="p-4 rounded-xl customShadowSm border-none">
            <CardContent className="p-0">
              <div className="flex justify-between items-start">
                <p className="font-semibold text-gray-700">
                  {format(new Date(item.date), "dd-MMM-yyyy hh:mm a")}
                </p>
                <p className="text-sm text-gray-500 underline">#{item.invoiceId}</p>
              </div>
              <div className="flex items-center mt-2">
                <p className="text-xl font-bold text-gray-900">${item.price.toFixed(2)}</p>
                <span className="mx-2 text-gray-300">|</span>
                <p className="text-sm text-gray-500">{item.qty.toString().padStart(2, '0')} Items</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
