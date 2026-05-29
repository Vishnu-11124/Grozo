import { useEffect, useState } from "react";
import { PackageIcon, NavigationIcon } from "lucide-react";
import OtpModal from "../../components/Delivery/OtpModal";
import CancelModal from "../../components/Delivery/CancelModal";
import DeliveryOrderCard from "../../components/Delivery/DeliveryOrderCard";
import type { Order } from "../../types";

const dummyDashboardOrdersData = [
    {
        shippingAddress: {
            label: "Home",
            address: "New Market Road ",
            city: "New York ",
            state: "NY",
            zip: "876543",
            lat: 40.7128,
            lng: -74.006,
        },
        liveLocation: {
            lat: 40.7128,
            lng: -74.006,
            updatedAt: "2026-04-06T08:41:27.211Z",
        },
        _id: "69d366617ed7e54198d67dac",
        user: {
            _id: "69bb6caf448f2d818db59122",
            name: "Admin",
            email: "admin@example.com",
        },
        items: [
            {
                product: "69c22613ae75a98c7cd13b3b",
                name: "Butter Croissant 100g",
                image: "https://raw.githubusercontent.com/avinashdm/gs-images/main/greencart/zvoeqbvrbrt7atqj0dbu.png",
                price: 45,
                quantity: 2,
                unit: "100g",
                _id: "69d366617ed7e54198d67dad",
            },
            {
                product: "69c22613ae75a98c7cd13b36",
                name: "Barley 1kg",
                image: "https://raw.githubusercontent.com/avinashdm/gs-images/main/greencart/spb5sgy8g24rned9nwog.png",
                price: 140,
                quantity: 1,
                unit: "1kg",
                _id: "69d366617ed7e54198d67dae",
            },
        ],
        paymentMethod: "cash",
        subtotal: 230,
        deliveryFee: 0,
        tax: 18.4,
        total: 248.4,
        status: "Delivered",
        statusHistory: [
            { status: "Placed", note: "Order placed successfully", _id: "69d366617ed7e54198d67daf", timestamp: "2026-04-06T07:53:05.769Z" },
            { status: "Assigned", note: "Assigned to Rahul", _id: "69d366ab7ed7e54198d67dbe", timestamp: "2026-04-06T07:54:19.796Z" },
            { status: "Packed", note: "Status updated to Packed", _id: "69d366b37ed7e54198d67ddc", timestamp: "2026-04-06T07:54:27.171Z" },
            { status: "Out for Delivery", note: "Status updated to Out for Delivery", _id: "69d366b57ed7e54198d67e00", timestamp: "2026-04-06T07:54:29.226Z" },
            { status: "Delivered", note: "Delivered by partner", _id: "69d373207ed7e54198d681b1", timestamp: "2026-04-06T08:47:28.983Z" },
        ],
        deliveryPartner: { _id: "69bbfc3866db7c6cdea47ede", name: "Rahul", email: "rahul@example.com", phone: "987654321" },
        deliveryOtp: "",
        isPaid: false,
        createdAt: "2026-04-06T07:53:05.774Z",
        updatedAt: "2026-04-06T08:47:28.984Z",
        __v: 4,
    },
    {
        shippingAddress: { label: "Home", address: "New Market Road ", city: "New York ", state: "NY", zip: "876543", lat: 40.7128, lng: -74.006 },
        liveLocation: { lat: 40.7128, lng: -74.006, updatedAt: "2026-04-06T08:41:27.211Z" },
        _id: "69d366617ed7e54198d67dad",
        user: { _id: "69bb6caf448f2d818db59122", name: "Admin", email: "admin@example.com" },
        items: [
            { product: "69c22613ae75a98c7cd13b3b", name: "Butter Croissant 100g", image: "https://raw.githubusercontent.com/avinashdm/gs-images/main/greencart/zvoeqbvrbrt7atqj0dbu.png", price: 45, quantity: 2, unit: "100g", _id: "69d366617ed7e54198d67dad" },
            { product: "69c22613ae75a98c7cd13b36", name: "Barley 1kg", image: "https://raw.githubusercontent.com/avinashdm/gs-images/main/greencart/spb5sgy8g24rned9nwog.png", price: 140, quantity: 1, unit: "1kg", _id: "69d366617ed7e54198d67dae" },
        ],
        paymentMethod: "cash",
        subtotal: 230,
        deliveryFee: 0,
        tax: 18.4,
        total: 248.4,
        status: "Out for Delivery",
        statusHistory: [
            { status: "Placed", note: "Order placed successfully", _id: "69d366617ed7e54198d67daf", timestamp: "2026-04-06T07:53:05.769Z" },
            { status: "Assigned", note: "Assigned to Rahul", _id: "69d366ab7ed7e54198d67dbe", timestamp: "2026-04-06T07:54:19.796Z" },
            { status: "Packed", note: "Status updated to Packed", _id: "69d366b37ed7e54198d67ddc", timestamp: "2026-04-06T07:54:27.171Z" },
            { status: "Out for Delivery", note: "Status updated to Out for Delivery", _id: "69d366b57ed7e54198d67e00", timestamp: "2026-04-06T07:54:29.226Z" },
        ],
        deliveryPartner: { _id: "69bbfc3866db7c6cdea47ede", name: "Rahul", email: "rahul@example.com", phone: "987654321" },
        deliveryOtp: "754730",
        isPaid: false,
        createdAt: "2026-04-06T07:53:05.774Z",
        updatedAt: "2026-04-06T08:47:28.984Z",
        __v: 4,
    },
];
export default function DeliveryDashboard() {

    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [tab, setTab] = useState<"active" | "completed">("active");
    const [tracking, setTracking] = useState(false);

    // OTP modal
    const [otpModal, setOtpModal] = useState<string | null>(null);
    const [otp, setOtp] = useState("");
    const [submitting, setSubmitting] = useState(false);

    // Cancel modal
    const [cancelModal, setCancelModal] = useState<string | null>(null);
    const [cancelReason, setCancelReason] = useState("");

    const fetchOrders = async () => {
        setLoading(true);
        setOrders(dummyDashboardOrdersData as any);
        setLoading(false);
    };

    useEffect(() => {
        fetchOrders();
    }, [tab]);

    const handleUpdateStatus = async (orderId: string, status: string) => {
        console.log(orderId, status);
    };

    const handleComplete = async () => {
        if (!otpModal || !otp) return;
        setSubmitting(true);
        setTimeout(() => {
            setSubmitting(false);
            setOtpModal(null);
            setOtp("");
        }, 1000);
    };

    const handleCancel = async () => {
        if (!cancelModal) return;
        setSubmitting(true);
        setTimeout(() => {
            setSubmitting(false);
            setCancelModal(null);
            setCancelReason("");
        }, 1000);
    }

    return (
        <div className="space-y-6">
            {/* Tabs + Tracking toggle */}
            <div className="flex items-center gap-2 flex-wrap">
                {(["active", "completed"] as const).map((t) => (
                    <button key={t} onClick={() => setTab(t)} className={`px-4 py-2 text-sm font-medium rounded-xl transition-colors ${tab === t ? "bg-app-green text-white" : "bg-white text-zinc-600 hover:bg-app-cream border border-app-border"}`}>
                        {t === "active" ? "Active" : "Completed"}
                    </button>
                ))}
                <div className="ml-auto">
                    <button onClick={() => setTracking((prev) => !prev)} className={`px-4 py-2 text-sm font-medium rounded-xl transition-colors flex items-center gap-1.5 ${tracking ? "bg-green-600 text-white" : "bg-white text-zinc-600 border border-app-border hover:bg-app-cream"}`}>
                        <NavigationIcon className={`w-3.5 h-3.5 ${tracking ? "animate-pulse" : ""}`} />
                        {tracking ? "Sharing Location" : "Share Location"}
                    </button>
                </div>
            </div>

            {/* Orders */}
            {loading ? (
                <div>
                    loading...
                </div>
            ) : orders.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-2xl border border-app-border">
                    <PackageIcon className="size-12 text-app-border mx-auto mb-3" />
                    <p className="text-lg font-semibold text-zinc-900 mb-1">No {tab} deliveries</p>
                    <p className="text-sm text-zinc-500">{tab === "active" ? "You'll see new assignments here" : "Completed deliveries will appear here"}</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {orders.map((order) => <DeliveryOrderCard key={order._id} order={order} tab={tab} handleUpdateStatus={handleUpdateStatus} setOtpModal={setOtpModal} setCancelModal={setCancelModal} />)}
                </div>
            )}

            {/* OTP Modal */}
            {otpModal && <OtpModal setOtpModal={setOtpModal} otp={otp} setOtp={setOtp} handleComplete={handleComplete} submitting={submitting} />}
            {/* Cancel Modal */}
            {cancelModal && <CancelModal setCancelModal={setCancelModal} cancelReason={cancelReason} setCancelReason={setCancelReason} handleCancel={handleCancel} submitting={submitting} />}
        </div>
    );
}
