import { ClockIcon, CheckIcon, TruckIcon, PackageIcon } from "lucide-react";

export default function OrderTimeLine({ order }: { order: any }) {

    const allStatuses = ["Placed", "Confirmed", "Assigned", "Packed", "Out for Delivery", "Delivered"];
    const currentIdx = allStatuses.indexOf(order.status);

    const statusIcons: any = {
        Placed: ClockIcon,
        Confirmed: CheckIcon,
        Assigned: TruckIcon,
        Packed: PackageIcon,
        "Out for Delivery": TruckIcon,
        Delivered: CheckIcon,
    };

    return (
        <div className="rounded-2xl border border-[#e4ede8] bg-white p-6">
            <h2 className="mb-6 text-base font-bold text-[#1a2e22]">Delivery Progress</h2>
            <div className="space-y-0">
                {allStatuses.map((status, i) => {
                    const Icon = statusIcons[status] || PackageIcon;
                    const isCompleted = i <= currentIdx;
                    const isCurrent = i === currentIdx;

                    const historyEntry = order.statusHistory.find((h: any) => h.status === status);

                    return (
                        <div key={status} className="flex gap-4">
                            {/* Icon + connector line */}
                            <div className="flex flex-col items-center">
                                <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition ${
                                    isCompleted
                                        ? "bg-[#1e3a2f] text-white"
                                        : "bg-[#f7f5f0] text-[#9abfaa]"
                                } ${isCurrent ? "ring-4 ring-[#1e3a2f]/10" : ""}`}>
                                    <Icon size={16} />
                                </div>
                                {i < allStatuses.length - 1 && (
                                    <div className={`h-12 w-0.5 ${i < currentIdx ? "bg-[#1e3a2f]" : "bg-[#e4ede8]"}`} />
                                )}
                            </div>

                            {/* Label + timestamp */}
                            <div className="pb-6">
                                <p className={`text-sm font-semibold ${isCompleted ? "text-[#1e3a2f]" : "text-[#9abfaa]"}`}>
                                    {status}
                                </p>
                                {historyEntry && (
                                    <p className="mt-0.5 text-xs text-[#9abfaa]">
                                        {new Date(historyEntry.timestamp).toLocaleString("en-US", {
                                            month: "short",
                                            day: "numeric",
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        })}
                                    </p>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}