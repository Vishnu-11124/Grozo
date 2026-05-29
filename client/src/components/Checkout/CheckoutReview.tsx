import { CheckIcon, MapPinIcon} from "lucide-react";
import type { Address } from "../../types";

interface CheckoutReviewProps {
    address: Address;
    items: any[];
    handlePlaceOrder: () => void;
    total: number;
}

export default function CheckoutReview({ address, items, handlePlaceOrder, total }: CheckoutReviewProps) {
    console.log(items[0].name)

    const currency = import.meta.env.VITE_CURRENCY_SYMBOL || "$";

    return (
        <div className="rounded-2xl border border-[#e4ede8] bg-white p-6">
            <h2 className="mb-5 flex items-center gap-2 text-base font-bold text-[#1a2e22]">
                <CheckIcon size={17} className="text-[#2d6a4a]" /> Review Your Order
            </h2>

            {/* Delivery Info */}
            <div className="mb-5 rounded-xl bg-[#eaf5ef] p-4">
                <div className="mb-1.5 flex items-center gap-2">
                    <MapPinIcon size={14} className="text-[#2d6a4a]" />
                    <span className="text-xs font-semibold uppercase tracking-widest text-[#2d6a4a]">Delivery Address</span>
                </div>
                <p className="text-sm leading-relaxed text-[#3a5a46]">
                    <span className="font-medium">{address.label}</span> — {address.address}, {address.city}, {address.state} {address.zip}
                </p>
            </div>

            {/* Items */}
            <div className="mb-5 space-y-3">
                {items.map((item) => (
                    <div key={item?._id} className="flex items-center gap-3">
                        <div className="h-12 w-12 shrink-0 overflow-hidden rounded-xl border border-[#e4ede8] bg-[#f7f5f0] p-1">
                            <img
                                src={item?.image}
                                alt={item?.name}
                                className="h-full w-full object-contain"
                            />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="truncate text-sm font-medium text-[#1a2e22]">{item?.name}</p>
                            <p className="text-xs text-[#9abfaa]">Qty: {item?.quantity}</p>
                        </div>
                        <span className="shrink-0 text-sm font-semibold text-[#1e3a2f]">
                            {currency}{(item?.price * item.quantity).toFixed(2)}
                        </span>
                    </div>
                ))}
            </div>

            <button
                onClick={handlePlaceOrder}
                className="w-full rounded-xl bg-[#1e3a2f] py-3.5 text-sm font-semibold text-white transition hover:bg-[#2d6a4a] active:scale-[0.98] disabled:opacity-60"
            >
                Place Order — {currency}{total.toFixed(2)}
            </button>
        </div>
    )
}