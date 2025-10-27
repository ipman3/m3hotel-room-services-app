// import { Plus, Minus, X, SquarePen } from "lucide-react";
// import { useServiceStore } from "@/store/ServiceStore";

// interface ConfirmAppointmentProps {
//     onClose: () => void;
//     onConfirm: () => void;
// }

// export default function ConfirmAppointment({
//     onClose,
//     onConfirm,
// }: ConfirmAppointmentProps) {
//     const { cart, removeFromCart, updateQuantity } = useServiceStore();

//     return (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
//             <div className="bg-white rounded-2xl w-[90%] max-w-sm p-4 shadow-xl relative">
//                 {/* Header */}
//                 <h2 className="text-[20px] text-[#181C2E] font-bold text-center mb-1">Confirm Booking</h2>
//                 <p className="text-[12px] text-center text-[#6E6E6E] mb-3">
//                     Please check the items you ordered before continuing your booking!
//                 </p>
//                 <div className="border-t-2 mb-4"></div>

//                 {/* Cart Items */}
//                 <div className="space-y-3 max-h-64 overflow-y-auto relative">
//                     {cart.map((item) => (
//                         <div
//                             key={item.name}
//                             className="flex gap-3 items-center bg-[#FCFEFF] rounded-[20px] p-2 shadow-sm relative"
//                         >
//                             {/* Image */}
//                             <img
//                                 src={item.imageUrl[0]}
//                                 alt={item.name}
//                                 className="w-22 h-22 object-cover rounded-lg"
//                             />

//                             {/* Content */}
//                             <div className="flex-1">
//                                 <div className="flex justify-between items-start">
//                                     <div>
//                                         <div className="font-semibold text-[#3D3D3D] text-[14px]">
//                                             {item.name}
//                                         </div>
//                                         <div className="text-[12px] text-[#847777] line-clamp-1">
//                                             {item.description || "Vegetables soup / fish cake.."}
//                                         </div>
//                                     </div>
//                                     <button
//                                         onClick={() => removeFromCart(item.name)}
//                                         className="text-[16px] font-extrabold"
//                                     >
//                                         <X className="w-4 h-4 text-[#FF5252] font-extrabold" />
//                                     </button>
//                                 </div>

//                                 <div className="text-[#3D3D3D] text-[14px] font-bold">
//                                     ${item.price?.toFixed(2)}
//                                 </div>
//                             </div>

//                             {/* Quantity Controls - now aligned to the right */}
//                             <div className="flex items-center gap-2 absolute right-3 bottom-1 -translate-y-1/2">
//                                 <button
//                                     onClick={() => updateQuantity(item.name, item.quantity - 1)}
//                                     className="w-5 h-5 border rounded flex items-center justify-center"
//                                 >
//                                     <Minus size={14} />
//                                 </button>
//                                 <span>{item.quantity}</span>
//                                 <button
//                                     onClick={() => updateQuantity(item.name, item.quantity + 1)}
//                                     className="w-5 h-5 bg-[#6F5D29] text-white rounded flex items-center justify-center"
//                                 >
//                                     <Plus size={14} />
//                                 </button>
//                             </div>
//                         </div>
//                     ))}
//                 </div>

//                 {/* Special Request */}
//                 <div className="bg-white rounded-[7.28px] border border-gray-200 shadow-sm p-2 flex items-center mb-15 mt-3">
//                     <SquarePen className="text-[#6F5D29] mr-3" size={20} />
//                     <input
//                         type="text"
//                         placeholder="Special Request"
//                         className="flex-grow text-gray-800 placeholder-[#A89A81] focus:outline-none"
//                     />
//                 </div>

//                 {/* Confirm Button */}
//                 <button
//                     onClick={onConfirm}
//                     className="w-full mt-5 py-2 rounded-[7.28px] bg-[#6F5D29] text-white font-semibold text-base"
//                 >
//                     Confirm Booking
//                 </button>

//                 {/* Close Button */}
//                 <button
//                     onClick={onClose}
//                     className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
//                 >
//                     <X size={18} />
//                 </button>
//             </div>
//         </div>
//     );
// }
