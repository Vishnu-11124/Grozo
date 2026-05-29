import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { PackageIcon, UsersIcon, ShoppingBagIcon, AlertTriangleIcon } from "lucide-react";

interface Stats {
    totalOrders: number;
    totalUsers: number;
    totalProducts: number;
    outOfStock: number;
    recentOrders: any[];
}

const statusColors: Record<string, string> = {
    Placed: "bg-blue-100 text-blue-700",
    Confirmed: "bg-indigo-100 text-indigo-700",
    Packed: "bg-purple-100 text-purple-700",
    "Out for Delivery": "bg-app-orange/10 text-app-orange",
    Delivered: "bg-green-100 text-green-700",
    Cancelled: "bg-red-100 text-red-700",
};

const dummyAdminDashboardData = {
    totalOrders: 1,
    totalUsers: 3,
    totalProducts: 27,
    outOfStock: 0,
    totalPartners: 2,
    recentOrders: [
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
                {
                    status: "Placed",
                    note: "Order placed successfully",
                    _id: "69d366617ed7e54198d67daf",
                    timestamp: "2026-04-06T07:53:05.769Z",
                },
                {
                    status: "Assigned",
                    note: "Assigned to Rahul",
                    _id: "69d366ab7ed7e54198d67dbe",
                    timestamp: "2026-04-06T07:54:19.796Z",
                },
                {
                    status: "Packed",
                    note: "Status updated to Packed",
                    _id: "69d366b37ed7e54198d67ddc",
                    timestamp: "2026-04-06T07:54:27.171Z",
                },
                {
                    status: "Out for Delivery",
                    note: "Status updated to Out for Delivery",
                    _id: "69d366b57ed7e54198d67e00",
                    timestamp: "2026-04-06T07:54:29.226Z",
                },
                {
                    status: "Delivered",
                    note: "Delivered by partner",
                    _id: "69d373207ed7e54198d681b1",
                    timestamp: "2026-04-06T08:47:28.983Z",
                },
            ],
            deliveryPartner: {
                _id: "69bbfc3866db7c6cdea47ede",
                name: "Rahul",
                phone: "987654321",
            },
            deliveryOtp: "",
            isPaid: false,
            createdAt: "2026-04-06T07:53:05.774Z",
            updatedAt: "2026-04-06T08:47:28.984Z",
            __v: 4,
        },
    ],
};


export default function AdminDashboard() {

    const currency = import.meta.env.VITE_CURRENCY_SYMBOL || "$";

    const [stats, setStats] = useState<Stats | null>(null);

    useEffect(() => {
        setTimeout(() => {
            setStats(dummyAdminDashboardData);
        }, 1000);
    }, []);

    const cards = stats
        ? [
            { label: "Total Orders", value: stats.totalOrders, icon: ShoppingBagIcon },
            { label: "Total Users", value: stats.totalUsers, icon: UsersIcon },
            { label: "Total Products", value: stats.totalProducts, icon: PackageIcon },
            { label: "Out of Stock", value: stats.outOfStock, icon: AlertTriangleIcon },
        ]
        : [];


    return (
        <div className="space-y-6">
            {/* Stat Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {cards.map((card) => (
                    <div key={card.label} className="bg-white rounded-2xl p-5 border border-app-border flex justify-between gap-3">
                        <div>
                            <p className="text-2xl font-semibold text-zinc-900">{card.value}</p>
                            <p className="text-sm text-app-text-light">{card.label}</p>
                        </div>
                        <div className={`size-10 rounded-xl flex-center bg-orange-50 text-orange-600`}>
                            <card.icon className="size-5" />
                        </div>
                    </div>
                ))}
            </div>

            {/* Recent Orders */}
            <div className="bg-white rounded-2xl border border-app-border overflow-hidden">
                <div className="px-6 py-5 border-b border-app-border flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-zinc-900">Recent Orders</h2>
                    <Link to="/admin/orders" className="text-sm font-medium text-app-orange hover:text-app-orange-dark transition-colors">
                        View All →
                    </Link>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm whitespace-nowrap">
                        <thead className="bg-app-cream/50 text-zinc-500 uppercase text-xs font-semibold">
                            <tr>
                                <th className="px-6 py-3">Order ID</th>
                                <th className="px-6 py-3">Customer</th>
                                <th className="px-6 py-3">Items</th>
                                <th className="px-6 py-3">Total</th>
                                <th className="px-6 py-3">Status</th>
                                <th className="px-6 py-3">Date</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-app-border">
                            {stats?.recentOrders.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-8 text-center text-zinc-500">No orders yet.</td>
                                </tr>
                            ) : (
                                stats?.recentOrders.map((order: any) => (
                                    <tr key={order._id} className="hover:bg-zinc-50/50 transition-colors">
                                        <td className="px-6 py-4 font-mono text-xs text-zinc-500">#{order._id.slice(-6).toUpperCase()}</td>
                                        <td className="px-6 py-4">
                                            <p className="font-medium text-zinc-900">{order.user?.name || "—"}</p>
                                            <p className="text-xs text-zinc-500">{order.user?.email || ""}</p>
                                        </td>
                                        <td className="px-6 py-4 text-zinc-600">{order.items?.length || 0} items</td>
                                        <td className="px-6 py-4 font-medium">{currency}{order.total?.toFixed(2)}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${statusColors[order.status] || "bg-zinc-100 text-zinc-600"}`}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-zinc-500">{new Date(order.createdAt).toLocaleDateString()}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
