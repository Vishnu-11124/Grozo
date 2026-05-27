import { useNavigate, useParams } from "react-router-dom"
import type { Order } from "../types"
import { useState } from "react"
import { ArrowLeftIcon } from "lucide-react"
import OrderOTP from "../components/OrderTracking/OrderOTP"
import LiveMap from "../components/OrderTracking/LiveMap"
import OrderTimeLine from "../components/OrderTracking/OrderTimeLine"

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

const OrderTracking = () => {
  const {id} = useParams()
  const navigate = useNavigate()

  const orderData: Order | undefined = dummyDashboardOrdersData.find((o) => o._id === id)
  const [liveLocation, setLiveLocation] = useState<{lat: number, lng: number} | null>(null)
 console.log(orderData)
  if(!orderData) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>Order not found.</p>
      </div>
    )
  }  
  return (
    <div>
      <div>
        <button onClick={() => navigate("/orders")}>
          <ArrowLeftIcon /> Back to Orders
        </button>
        {/* Order Details */}
        <div>
          <div>
            <h2>Tracking Order #{orderData._id}</h2>
            <p>Placed on {new Date(orderData.createdAt).toLocaleDateString()}</p>
          </div>
          <span>
            <p>Status: {orderData.status}</p>
          </span>
        </div>

        <div>
          {/* left */}
          <div>
            {/* otp card */}
            <OrderOTP  order={orderData}/>
            <LiveMap order={orderData} liveLocation={liveLocation} />
            <OrderTimeLine order={orderData} />
          </div>
          {/* right */}
          <div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderTracking
