import { ChevronRightIcon, CreditCardIcon, BanknoteIcon } from "lucide-react";
import type { Dispatch, SetStateAction } from "react";

interface CheckoutPaymentProps {
    setStep: Dispatch<SetStateAction<string>>;
    paymentMethod: string;
    setPaymentMethod: Dispatch<SetStateAction<string>>;
}

const methodIcons: Record<string, any> = {
    card: CreditCardIcon,
    cash: BanknoteIcon,
}

export default function CheckoutPayment({ setStep, paymentMethod, setPaymentMethod }: CheckoutPaymentProps) {
    return (
        <div className="rounded-2xl border border-[#e4ede8] bg-white p-6">
            <h2 className="mb-5 flex items-center gap-2 text-base font-bold text-[#1a2e22]">
                <CreditCardIcon size={17} className="text-[#2d6a4a]" /> Payment Method
            </h2>

            <div className="space-y-3">
                {[
                    { value: "card", label: "Credit / Debit Card", desc: "Pay securely with your card" },
                    { value: "cash", label: "Cash on Delivery", desc: "Pay when you receive" },
                ].map((method) => {
                    const Icon = methodIcons[method.value]
                    const isSelected = paymentMethod === method.value
                    return (
                        <label
                            key={method.value}
                            className={`flex cursor-pointer items-center gap-4 rounded-xl border p-4 transition ${
                                isSelected
                                    ? "border-[#2d6a4a] bg-[#eaf5ef]"
                                    : "border-[#e4ede8] hover:bg-[#f7f5f0]"
                            }`}
                        >
                            <input
                                type="radio"
                                name="payment"
                                value={method.value}
                                checked={isSelected}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                                className="h-4 w-4 accent-[#2d6a4a]"
                            />
                            <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${isSelected ? "bg-[#1e3a2f]" : "bg-[#f7f5f0]"}`}>
                                <Icon size={16} className={isSelected ? "text-white" : "text-[#9abfaa]"} />
                            </div>
                            <div>
                                <p className={`text-sm font-semibold ${isSelected ? "text-[#1e3a2f]" : "text-[#1a2e22]"}`}>{method.label}</p>
                                <p className="text-xs text-[#9abfaa]">{method.desc}</p>
                            </div>
                        </label>
                    )
                })}
            </div>

            <button
                onClick={() => { setStep("review"); scrollTo(0, 0) }}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#1e3a2f] py-3 text-sm font-semibold text-white transition hover:bg-[#2d6a4a]"
            >
                Review Order <ChevronRightIcon size={15} />
            </button>
        </div>
    )
}