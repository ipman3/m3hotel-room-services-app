import type { OrderItems } from "@/types/orderItem";

interface OrderDetailsPageProps {
  orderData: OrderItems;
}

export default function OrderDetailsPage({ orderData }: OrderDetailsPageProps) {
  const subTotal = orderData.items.reduce((acc: number, item: any) => {
    const price = Number(item?.price ?? 0);
    const quantity = Number(item?.quantity ?? item?.qt ?? 1);
    return acc + price * quantity;
  }, 0);
  const discount = 0;

  const serviceChargePercent = 0;
  const serviceCharge = (subTotal * serviceChargePercent) / 100;
  const total = orderData.totalAmount || subTotal - discount + serviceCharge;

  return (
    <div className="relative z-10 px-4 py-8 mt-12 rounded-t-4xl">
      <div className="p-4 bg-card rounded-2xl customShadowSm mb-4">
        <h3 className="mb-2 text-lg font-bold">Order Info</h3>
        <p className="flex items-center justify-between">
          <span className="font-semibold">Order Date: </span> {orderData.orderDate}
        </p>
        <p className="flex items-center justify-between">
          <span className="font-semibold">Order Id: </span> #{orderData.orderId}
        </p>
      </div>

      <div className="p-4 bg-card rounded-2xl customShadowSm mb-4">
        <h3 className="mb-2 text-lg font-bold">Customer Info</h3>
        <p className="flex items-center justify-between">
          <span className="font-semibold">Customer: </span> {orderData.name}
        </p>
        <p className="flex items-center justify-between">
          <span className="font-semibold">Room: </span> {orderData.roomNumber}
        </p>
      </div>

      <div className="p-4 bg-card rounded-2xl customShadowSm">
        <h3 className="mb-4 text-lg font-bold">Order Items</h3>

        <div className="space-y-4">
          {orderData.items.map((item: any, index: number) => (
            <div key={index} id={item?.id} className="flex items-center gap-4 bg-muted-background rounded-2xl">
              <img src={item?.imageUrl} alt={item?.name} className="flex-shrink-0 object-cover w-18 h-18 rounded-lg" loading="lazy" />
              <div className="flex-grow space-y-0.5 text-sm text-base-secondary">
                <h3 className="font-bold text-sm break-words">{item?.name}</h3>
                <div className="flex items-center justify-between space-y-0.5">
                  <div className="flex flex-col justify-start">
                    <h3 className="font-semibold text-xs">Type: </h3>
                    <h3 className="font-semibold text-xs">Package: </h3>
                    <h3 className="font-semibold text-xs">Qty: </h3>
                    <h3 className="font-semibold text-xs">Price: </h3>
                  </div>

                  <div className="flex flex-col justify-start">
                    <p className="text-start text-xs">{item.serviceType}</p>
                    <p className="text-start text-xs">{item.packageName || "-"}</p>
                    <p className="text-start text-xs">{item.quantity || item.qt || 1}</p>
                    <p className="text-start text-xs">${parseFloat(item.price).toFixed(2)}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* order summary */}
      <div>
        <h3 className="mt-6 mb-2 text-lg font-bold">Order Summary</h3>
        <div className="p-4 bg-base-primary rounded-2xl text-card">
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold">Sub Total:</span>
            <span className="font-semibold">${subTotal?.toFixed(2)}</span>
          </div>
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold">Discount:</span>
            <span className="font-semibold">${discount?.toFixed(2)}</span>
          </div>
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold">Service Charge ({serviceChargePercent}%):</span>
            <span className="font-semibold">${serviceCharge?.toFixed(2)}</span>
          </div>
          <div className="border-t-2 border-white/50 w-full my-4" />
          <div className="flex items-center justify-between">
            <span className="font-bold text-lg">Total Amount:</span>
            <span className="font-bold text-lg">${total?.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
