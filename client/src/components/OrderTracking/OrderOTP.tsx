import { KeyRoundIcon } from 'lucide-react'

export default function OrderOTP({ order }: { order: any }) {
    const showOtp = order.deliveryOtp && ["Assigned", "Packed", "Out for Delivery"].includes(order.status);

    if (!showOtp) return null;

    return (
        <div className="rounded-2xl bg-[#1e3a2f] p-6">
            <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
                    <KeyRoundIcon size={18} className="text-[#5db87a]" />
                </div>
                <div>
                    <h3 className="text-sm font-semibold text-white">Delivery OTP</h3>
                    <p className="text-xs text-white/50">Share this with your delivery partner</p>
                </div>
            </div>

            <div className="flex gap-2">
                {order.deliveryOtp.split("").map((digit: string, i: number) => (
                    <div
                        key={i}
                        className="flex h-13 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/10 text-2xl font-mono font-bold tracking-wider text-white"
                    >
                        {digit}
                    </div>
                ))}
            </div>
        </div>
    )
}