import { useNavigate, useParams } from "react-router-dom"
import type { Order } from "../types"
import { useState } from "react"
import { ArrowLeftIcon, MapPinIcon, PhoneIcon } from "lucide-react"
import OrderOTP from "../components/OrderTracking/OrderOTP"
import LiveMap from "../components/OrderTracking/LiveMap"
import OrderTimeLine from "../components/OrderTracking/OrderTimeLine"

const dummyDashboardOrdersData: Order[] = [
  {
    shippingAddress: { label: "Home", address: "New Market Road", city: "New York", state: "NY", zip: "876543", lat: 40.7128, lng: -74.006 },
    liveLocation: { lat: 40.7128, lng: -74.006, updatedAt: "2026-04-06T08:41:27.211Z" },
    _id: "69d366617ed7e54198d67dac",
    user: { _id: "69bb6caf448f2d818db59122", name: "Admin", email: "admin@example.com" },
    items: [
      { product: "69c22613ae75a98c7cd13b3b", name: "Butter Croissant 100g", image: "https://raw.githubusercontent.com/avinashdm/gs-images/main/greencart/zvoeqbvrbrt7atqj0dbu.png", price: 45, quantity: 2, unit: "100g", _id: "69d366617ed7e54198d67dad" },
      { product: "69c22613ae75a98c7cd13b36", name: "Barley 1kg", image: "https://raw.githubusercontent.com/avinashdm/gs-images/main/greencart/spb5sgy8g24rned9nwog.png", price: 140, quantity: 1, unit: "1kg", _id: "69d366617ed7e54198d67dae" },
    ],
    paymentMethod: "cash", subtotal: 230, deliveryFee: 0, tax: 18.4, total: 248.4,
    status: "Delivered",
    statusHistory: [
      { status: "Placed", note: "Order placed successfully", _id: "69d366617ed7e54198d67daf", timestamp: "2026-04-06T07:53:05.769Z" },
      { status: "Assigned", note: "Assigned to Rahul", _id: "69d366ab7ed7e54198d67dbe", timestamp: "2026-04-06T07:54:19.796Z" },
      { status: "Packed", note: "Status updated to Packed", _id: "69d366b37ed7e54198d67ddc", timestamp: "2026-04-06T07:54:27.171Z" },
      { status: "Out for Delivery", note: "Status updated to Out for Delivery", _id: "69d366b57ed7e54198d67e00", timestamp: "2026-04-06T07:54:29.226Z" },
      { status: "Delivered", note: "Delivered by partner", _id: "69d373207ed7e54198d681b1", timestamp: "2026-04-06T08:47:28.983Z" },
    ],
    deliveryPartner: { _id: "69bbfc3866db7c6cdea47ede", name: "Rahul", email: "rahul@example.com", phone: "987654321" },
    deliveryOtp: "", isPaid: false, createdAt: "2026-04-06T07:53:05.774Z", updatedAt: "2026-04-06T08:47:28.984Z", __v: 4,
  },
  {
    shippingAddress: { label: "Home", address: "New Market Road", city: "New York", state: "NY", zip: "876543", lat: 40.7128, lng: -74.006 },
    liveLocation: { lat: 40.7128, lng: -74.006, updatedAt: "2026-04-06T08:41:27.211Z" },
    _id: "69d366617ed7e54198d67dad",
    user: { _id: "69bb6caf448f2d818db59122", name: "Admin", email: "admin@example.com" },
    items: [
      { product: "69c22613ae75a98c7cd13b3b", name: "Butter Croissant 100g", image: "https://raw.githubusercontent.com/avinashdm/gs-images/main/greencart/zvoeqbvrbrt7atqj0dbu.png", price: 45, quantity: 2, unit: "100g", _id: "69d366617ed7e54198d67dad" },
      { product: "69c22613ae75a98c7cd13b36", name: "Barley 1kg", image: "https://raw.githubusercontent.com/avinashdm/gs-images/main/greencart/spb5sgy8g24rned9nwog.png", price: 140, quantity: 1, unit: "1kg", _id: "69d366617ed7e54198d67dae" },
    ],
    paymentMethod: "cash", subtotal: 230, deliveryFee: 0, tax: 18.4, total: 248.4,
    status: "Out for Delivery",
    statusHistory: [
      { status: "Placed", note: "Order placed successfully", _id: "69d366617ed7e54198d67daf", timestamp: "2026-04-06T07:53:05.769Z" },
      { status: "Assigned", note: "Assigned to Rahul", _id: "69d366ab7ed7e54198d67dbe", timestamp: "2026-04-06T07:54:19.796Z" },
      { status: "Packed", note: "Status updated to Packed", _id: "69d366b37ed7e54198d67ddc", timestamp: "2026-04-06T07:54:27.171Z" },
      { status: "Out for Delivery", note: "Status updated to Out for Delivery", _id: "69d366b57ed7e54198d67e00", timestamp: "2026-04-06T07:54:29.226Z" },
    ],
    deliveryPartner: { _id: "69bbfc3866db7c6cdea47ede", name: "Rahul", email: "rahul@example.com", phone: "987654321" },
    deliveryOtp: "754730", isPaid: false, createdAt: "2026-04-06T07:53:05.774Z", updatedAt: "2026-04-06T08:47:28.984Z", __v: 4,
  },
]

const statusColors: Record<string, string> = {
  Placed: "bg-blue-50 text-blue-600",
  Confirmed: "bg-[#eaf5ef] text-[#2d6a4a]",
  Assigned: "bg-amber-50 text-amber-600",
  Packed: "bg-amber-50 text-amber-600",
  "Out for Delivery": "bg-amber-50 text-amber-600",
  Delivered: "bg-[#eaf5ef] text-[#2d6a4a]",
  Cancelled: "bg-red-50 text-red-500",
}

const OrderTracking = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const orderData: Order | undefined = dummyDashboardOrdersData.find((o) => o._id === id)
  const [liveLocation, setLiveLocation] = useState<{ lat: number, lng: number } | null>(null)

  if (!orderData) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#f7f5f0]">
        <p className="text-sm text-[#9abfaa]">Order not found.</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f7f5f0]">
      <div className="mx-auto max-w-7xl px-4 py-8 md:px-6">

        {/* Back button */}
        <button
          onClick={() => navigate("/orders")}
          className="mb-6 flex items-center gap-1.5 text-sm font-medium text-[#3a5a46] hover:text-[#1e3a2f] transition"
        >
          <ArrowLeftIcon size={16} /> Back to Orders
        </button>

        {/* Order header */}
        <div className="mb-6 flex flex-wrap items-start justify-between gap-3 rounded-2xl border border-[#e4ede8] bg-white px-5 py-4">
          <div>
            <h2 className="text-base font-bold text-[#1a2e22]">
              Order <span className="text-[#9abfaa]">#{orderData._id.slice(-8).toUpperCase()}</span>
            </h2>
            <p className="mt-0.5 text-xs text-[#9abfaa]">
              Placed on {new Date(orderData.createdAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
            </p>
          </div>
          <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusColors[orderData.status] ?? "bg-[#f7f5f0] text-[#3a5a46]"}`}>
            {orderData.status}
          </span>
        </div>

        {/* Two-column layout */}
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start">

          {/* Left column */}
          <div className="flex flex-col gap-5 lg:w-[420px] lg:shrink-0">

            <OrderOTP order={orderData} />
            <LiveMap order={orderData} liveLocation={liveLocation} />
            <OrderTimeLine order={orderData} />

            {/* Delivery partner */}
            {orderData.deliveryPartner && orderData.status !== "Delivered" && orderData.status !== "Cancelled" && (
              <div className="flex items-center justify-between rounded-2xl border border-[#e4ede8] bg-white px-4 py-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1e3a2f] text-sm font-bold text-white">
                    {orderData.deliveryPartner.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#1a2e22]">{orderData.deliveryPartner.name}</p>
                    <p className="text-xs text-[#9abfaa]">{(orderData.deliveryPartner as any).vehicleType ?? "Bike"} Delivery Partner</p>
                  </div>
                </div>
                <a
                  href={`tel:${orderData.deliveryPartner.phone}`}
                  className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#eaf5ef] text-[#2d6a4a] transition hover:bg-[#1e3a2f] hover:text-white"
                >
                  <PhoneIcon size={16} />
                </a>
              </div>
            )}
          </div>

          {/* Right column */}
          <div className="flex flex-1 flex-col gap-5">

            {/* Delivery address */}
            <div className="rounded-2xl border border-[#e4ede8] bg-white p-5">
              <h3 className="mb-3 flex items-center gap-2 text-sm font-bold text-[#1a2e22]">
                <MapPinIcon size={15} className="text-[#2d6a4a]" /> Delivery Address
              </h3>
              <p className="text-sm leading-relaxed text-[#7a9486]">
                <span className="font-medium text-[#3a5a46]">{orderData.shippingAddress.label}</span><br />
                {orderData.shippingAddress.address}<br />
                {orderData.shippingAddress.city}, {orderData.shippingAddress.state} {orderData.shippingAddress.zip}
              </p>
            </div>

            {/* Items + summary */}
            <div className="rounded-2xl border border-[#e4ede8] bg-white p-5">
              <h3 className="mb-4 text-sm font-bold text-[#1a2e22]">Items ({orderData.items.length})</h3>

              <div className="space-y-3">
                {orderData.items.map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="h-14 w-14 shrink-0 overflow-hidden rounded-xl border border-[#e4ede8] bg-[#f7f5f0] p-1">
                      <img src={item.image} alt={item.name} className="h-full w-full object-contain" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="truncate text-sm font-medium text-[#1a2e22]">{item.name}</p>
                      <p className="text-xs text-[#9abfaa]">x{item.quantity} · {item.unit}</p>
                    </div>
                    <span className="shrink-0 text-sm font-semibold text-[#1e3a2f]">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Price summary */}
              <div className="mt-5 space-y-2 border-t border-[#e4ede8] pt-4">
                <div className="flex justify-between text-sm text-[#7a9486]">
                  <span>Subtotal</span>
                  <span>${orderData.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-[#7a9486]">
                  <span>Delivery Fee</span>
                  <span className={orderData.deliveryFee === 0 ? "font-medium text-[#2d6a4a]" : ""}>
                    {orderData.deliveryFee === 0 ? "Free" : `$${orderData.deliveryFee.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm text-[#7a9486]">
                  <span>Tax</span>
                  <span>${orderData.tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between border-t border-[#e4ede8] pt-2 text-sm font-bold text-[#1a2e22]">
                  <span>Total Amount</span>
                  <span className="text-base text-[#1e3a2f]">${orderData.total.toFixed(2)}</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderTracking