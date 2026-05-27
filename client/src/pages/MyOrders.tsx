import { useMemo, useState } from "react"
import type { Order } from "../types"
import { Link } from "react-router-dom"
import {
  CalendarIcon,
  ChevronRightIcon,
  PackageIcon,
} from "lucide-react"

const dummyDashboardOrdersData: Order[] = [
  {
    shippingAddress: {
      label: "Home",
      address: "New Market Road",
      city: "New York",
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
        image:
          "https://raw.githubusercontent.com/avinashdm/gs-images/main/greencart/zvoeqbvrbrt7atqj0dbu.png",
        price: 45,
        quantity: 2,
        unit: "100g",
        _id: "69d366617ed7e54198d67dad",
      },

      {
        product: "69c22613ae75a98c7cd13b36",
        name: "Barley 1kg",
        image:
          "https://raw.githubusercontent.com/avinashdm/gs-images/main/greencart/spb5sgy8g24rned9nwog.png",
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
      email: "rahul@example.com",
      phone: "987654321",
    },

    deliveryOtp: "",
    isPaid: false,

    createdAt: "2026-04-06T07:53:05.774Z",
    updatedAt: "2026-04-06T08:47:28.984Z",

    __v: 4,
  },

  {
    shippingAddress: {
      label: "Home",
      address: "New Market Road",
      city: "New York",
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

    _id: "69d366617ed7e54198d67dad",

    user: {
      _id: "69bb6caf448f2d818db59122",
      name: "Admin",
      email: "admin@example.com",
    },

    items: [
      {
        product: "69c22613ae75a98c7cd13b3b",
        name: "Butter Croissant 100g",
        image:
          "https://raw.githubusercontent.com/avinashdm/gs-images/main/greencart/zvoeqbvrbrt7atqj0dbu.png",
        price: 45,
        quantity: 2,
        unit: "100g",
        _id: "69d366617ed7e54198d67dad",
      },

      {
        product: "69c22613ae75a98c7cd13b36",
        name: "Barley 1kg",
        image:
          "https://raw.githubusercontent.com/avinashdm/gs-images/main/greencart/spb5sgy8g24rned9nwog.png",
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

    status: "Out for Delivery",

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
    ],

    deliveryPartner: {
      _id: "69bbfc3866db7c6cdea47ede",
      name: "Rahul",
      email: "rahul@example.com",
      phone: "987654321",
    },

    deliveryOtp: "754730",
    isPaid: false,

    createdAt: "2026-04-06T07:53:05.774Z",
    updatedAt: "2026-04-06T08:47:28.984Z",

    __v: 4,
  },
]

const MyOrders = () => {
  const orders: Order[] = dummyDashboardOrdersData

  const [activeTab, setActiveTab] = useState("all")

  const tabs = [
    "all",
    "Placed",
    "Out for Delivery",
    "Delivered",
  ]

  const filteredOrders = useMemo(() => {
    if (activeTab === "all") return orders

    return orders.filter(
      (order) => order.status === activeTab
    )
  }, [activeTab, orders])

  if (orders.length === 0) {
    return (
      <div className="p-4">
        <h2 className="mb-4 text-2xl font-semibold">
          My Orders
        </h2>

        <div className="flex items-center gap-2 text-gray-600">
          <PackageIcon size={20} />

          <p>You have no orders yet.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-4 md:p-6">
      <div className="mx-auto max-w-5xl">
        {/* heading */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold">
            My Orders
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            View and track all your orders
          </p>
        </div>

        {/* tabs */}
        <div className="mb-6 flex flex-wrap gap-3">
          {tabs.map((tab) => {
            const isActive = activeTab === tab

            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200
                  
                  ${
                    isActive
                      ? "border-black bg-black text-white"
                      : "border-gray-300 bg-white text-gray-700 hover:bg-gray-100"
                  }
                `}
              >
                {tab === "all" ? "All Orders" : tab}
              </button>
            )
          })}
        </div>

        {/* orders */}
        <div className="space-y-4">
          {filteredOrders.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-gray-300 p-10 text-center">
              <PackageIcon
                size={40}
                className="mx-auto mb-4 text-gray-400"
              />

              <p className="text-gray-600">
                No orders found for this category.
              </p>
            </div>
          ) : (
            filteredOrders.map((order) => (
              <Link
                key={order._id}
                to={`/orders/${order._id}`}
                className="block rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition-all duration-200 hover:shadow-md"
              >
                {/* top section */}
                <div className="mb-4 flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold">
                      Order #{order._id.slice(-6)}
                    </h3>

                    <div className="mt-1 flex items-center gap-2 text-sm text-gray-500">
                      <CalendarIcon size={16} />

                      <span>
                        {order.createdAt
                          ? new Date(
                              order.createdAt
                            ).toLocaleDateString()
                          : "No date"}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium
                        
                        ${
                          order.status === "Delivered"
                            ? "bg-green-100 text-green-700"
                            : order.status ===
                              "Out for Delivery"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-blue-100 text-blue-700"
                        }
                      `}
                    >
                      {order.status}
                    </span>

                    <ChevronRightIcon
                      size={18}
                      className="text-gray-400"
                    />
                  </div>
                </div>

                {/* product images */}
                <div className="mb-4 flex items-center gap-2 overflow-hidden">
                  {order.items
                    .slice(0, 4)
                    .map((item) => (
                      <img
                        key={item._id}
                        src={item.image}
                        alt={item.name}
                        className="h-16 w-16 rounded-xl border object-cover"
                      />
                    ))}

                  {order.items.length > 4 && (
                    <div className="flex h-16 w-16 items-center justify-center rounded-xl border bg-gray-100 text-sm font-medium text-gray-600">
                      +{order.items.length - 4}
                    </div>
                  )}
                </div>

                {/* bottom section */}
                <div className="flex items-center justify-between border-t pt-4">
                  <span className="text-sm text-gray-600">
                    {order.items.length} items
                  </span>

                  <span className="text-lg font-bold">
                    $
                    {(order.total ?? 0).toFixed(2)}
                  </span>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default MyOrders