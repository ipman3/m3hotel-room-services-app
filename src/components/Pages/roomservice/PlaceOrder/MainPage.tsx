// src/pages/PlaceOrderPage.tsx
import React, { useState } from "react";
import { Plus, Minus, X, SquarePen } from "lucide-react";
import { useServiceStore } from "@/store/ServiceStore";
import { useNavigate } from "@tanstack/react-router";
import ConfirmAppointment from "./ConfirmAppointment";


export default function PlaceOrderPage() {
    const navigate = useNavigate();
    const { cart, removeFromCart, updateQuantity, getTotal } = useServiceStore();

    const [showConfirm, setShowConfirm] = useState(false);

    const discount = 2;
    const serviceChargePercent = 7;
    const subTotal = getTotal();
    const serviceCharge = subTotal * (serviceChargePercent / 100);
    const total = subTotal - discount + serviceCharge;

    if (cart.length === 0) {
        return (
            <div className="p-8 text-center">
                <p>No items in your order.</p>
                <button
                    onClick={() => navigate({ to: "/room-service" })}
                    className="text-[#6F5D29] underline"
                >
                    Go back to services
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen pb-28">
            <div className="max-w-md mx-auto px-4 pt-6 space-y-4">
                {/* Customer Info */}
                <div>
                    <h3 className="text-[16px] text-[#3D3D3D] font-medium">Customer Info</h3>
                    <div className="mt-3">
                        <div className="text-[14px] text-[#808080]">Customer Name</div>
                        <div className="bg-[#F0F5FA] rounded-[10px] px-3 py-2 mt-1">Mikey Mikey</div>
                        <div className="text-[14px] text-[#808080] mt-3">Room Number</div>
                        <div className="bg-[#F0F5FA] rounded-[10px] px-3 py-2 mt-1">Villa 7</div>
                    </div>
                </div>

                {/* Order Details */}
                <div className="space-y-3 relative">
                    <h3 className="text-[16px] text-[#3D3D3D] font-medium">Order Details</h3>

                    {cart.map((item) => (
                        <div
                            key={item.name}
                            className="flex gap-3 items-center bg-[#FCFEFF] rounded-[20px] p-2 shadow-sm relative"
                        >
                            {/* Image */}
                            <img
                                src={item.imageUrl[0]}
                                alt={item.name}
                                className="w-22 h-22 object-cover rounded-lg"
                            />

                            {/* Content */}
                            <div className="flex-1">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <div className="font-semibold text-[#3D3D3D] text-[14px]">
                                            {item.name}
                                        </div>
                                        <div className="text-[12px] text-[#847777] line-clamp-1">
                                            {item.description || "Vegetables soup / fish cake.."}
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => removeFromCart(item.name)}
                                        className="text-[16px] font-extrabold"
                                    >
                                        <X className="w-4 h-4 text-[#FF5252] font-extrabold" />
                                    </button>
                                </div>

                                <div className="text-[#3D3D3D] text-[14px] font-bold">
                                    ${item.price.toFixed(2)}
                                </div>
                            </div>

                            {/* Quantity Controls - now aligned to the right */}
                            <div className="flex items-center gap-2 absolute right-3 bottom-1 -translate-y-1/2">
                                <button
                                    onClick={() => updateQuantity(item.name, item.quantity - 1)}
                                    className="w-5 h-5 border rounded flex items-center justify-center"
                                >
                                    <Minus size={14} />
                                </button>
                                <span>{item.quantity}</span>
                                <button
                                    onClick={() => updateQuantity(item.name, item.quantity + 1)}
                                    className="w-5 h-5 bg-[#6F5D29] text-white rounded flex items-center justify-center"
                                >
                                    <Plus size={14} />
                                </button>
                            </div>
                        </div>
                    ))}

                    {/* Special Request */}
                    <div className="bg-white rounded-[7.28px] border border-gray-200 shadow-sm p-2 flex items-center mb-15">
                        <SquarePen className="text-[#6F5D29] mr-3" size={20} />
                        <input
                            type="text"
                            placeholder="Special Request"
                            className="flex-grow text-gray-800 placeholder-[#A89A81] focus:outline-none"
                        />
                    </div>
                </div>

            </div>

            {/* Summary */}
            <div className="max-w-md mx-auto fixed left-0 right-0 bottom-[5px] px-4 pt-6 space-y-4">
                <div>
                    <div className="bg-[#6F5D29] rounded-xl  space-y-1 text-sm text-[#FEFEFF]">
                        <div className="p-3 text-[13.56px]">
                            <div className="flex justify-between">
                                <span>Sub-Total</span>
                                <span>${subTotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Room Number</span>
                                <span>341</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Discount</span>
                                <span>${discount.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Service charge</span>
                                <span>{serviceChargePercent}%</span>
                            </div>
                        </div>
                        <div className="font-semibold text-lg pt-2 border-t">
                            <div className="p-3">
                                <div className="flex justify-between items-center">
                                    <span>Total</span>
                                    <span>${total.toFixed(2)}</span>
                                </div>
                                <button
                                    onClick={() => setShowConfirm(true)}
                                    className="w-full mt-4 py-2 rounded-[7px] bg-[#FEFEFF] text-[#004422] font-semibold text-[16.64px] tracking-[1px]"
                                >
                                    Place My Order
                                </button>
                            </div>
                        </div>
                    </div>


                </div>
            </div>

            {showConfirm && (
                <ConfirmAppointment
                    onClose={() => setShowConfirm(false)}
                    onConfirm={() => {
                        setShowConfirm(false);
                        navigate({ to: "/success" });
                    }}
                />
            )}
        </div>
    );
}
