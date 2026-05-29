import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import type { Address } from "../types"
import { ArrowLeftIcon, CheckIcon, CreditCardIcon, MapPinIcon, ShoppingBagIcon } from "lucide-react"
import CheckoutAddress from "../components/Checkout/CheckoutAddress"
import CheckoutPayment from "../components/Checkout/CheckoutPayment"
import CheckoutReview from "../components/Checkout/CheckoutReview"

const dummyAddressData: Address[] = [
  { _id: "69d3652df9a340288f1a0f8c", label: "Home", address: "123 Main St", city: "New York", state: "NY", zip: "10001", isDefault: true, lat: 40.7128, lng: -74.006 },
  { _id: "69d3652df9a340288f1a0f8d", label: "Work", address: "456 Market St", city: "New York", state: "NY", zip: "10002", isDefault: false, lat: 40.7128, lng: -74.006 },
]

const CheckOut = () => {
  const navigate = useNavigate()

  const { items, totalPrice } = useSelector((state: any) => state.cart)

  const { user } = { user: { addresses: dummyAddressData } }

  const [selectedAddress, setSelectedAddress] = useState<Address>({
    _id: "", label: "", address: "", city: "", state: "", zip: "", lat: 0, lng: 0, isDefault: false,
  })

  const [paymentMethod, setPaymentMethod] = useState("card")
  const [step, setStep] = useState("address")

  const deliveryFee = totalPrice > 40 ? 0 : 2.5
  const tax = totalPrice * 0.08
  const finalTotal = totalPrice + deliveryFee + tax

  const steps: { key: string; label: string; icon: any }[] = [
    { key: "address", label: "Address", icon: MapPinIcon },
    { key: "payment", label: "Payment", icon: CreditCardIcon },
    { key: "review", label: "Review", icon: CheckIcon },
  ]

  const currentStepIdx = steps.findIndex((s) => s.key === step)

  const handlePlaceOrder = async () => {
    navigate("/orders")
  }

  useEffect(() => {
    if (user?.addresses.length > 0) {
      const defaultAddress = user.addresses.find((addr: Address) => addr.isDefault) || user.addresses[0]
      setSelectedAddress({
        _id: defaultAddress._id, label: defaultAddress.label, address: defaultAddress.address,
        city: defaultAddress.city, state: defaultAddress.state, zip: defaultAddress.zip,
        lat: defaultAddress.lat, lng: defaultAddress.lng, isDefault: defaultAddress.isDefault,
      })
    }
  }, [])

  if (items.length === 0) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#f7f5f0]">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#eaf5ef]">
          <ShoppingBagIcon size={28} className="text-[#9abfaa]" />
        </div>
        <h2 className="text-lg font-bold text-[#1a2e22]">Your cart is empty</h2>
        <button
          onClick={() => navigate("/products")}
          className="rounded-xl bg-[#1e3a2f] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#2d6a4a]"
        >
          Browse Products
        </button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f7f5f0]">
      <div className="mx-auto max-w-6xl px-4 py-8 md:px-6">

        {/* Header */}
        <div className="mb-6 flex items-center gap-4">
          <button
            onClick={() => navigate("/products")}
            className="flex items-center gap-1.5 text-sm font-medium text-[#3a5a46] hover:text-[#1e3a2f] transition"
          >
            <ArrowLeftIcon size={16} /> Back
          </button>
          <h1 className="text-xl font-bold text-[#1a2e22]">Checkout</h1>
        </div>

        {/* Step indicator */}
        <div className="mb-6 flex items-center rounded-2xl border border-[#e4ede8] bg-white px-5 py-4">
          {steps.map((s, i) => {
            const isCompleted = i < currentStepIdx
            const isCurrent = i === currentStepIdx
            return (
              <div key={s.key} className="flex flex-1 items-center">
                <button
                  onClick={() => setStep(s.key)}
                  className="flex items-center gap-2 group"
                >
                  <div className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold transition ${
                    isCompleted ? "bg-[#5db87a] text-white"
                    : isCurrent ? "bg-[#1e3a2f] text-white"
                    : "bg-[#f7f5f0] text-[#9abfaa]"
                  }`}>
                    {isCompleted ? <CheckIcon size={14} /> : <s.icon size={14} />}
                  </div>
                  <span className={`hidden text-sm font-medium sm:block ${isCurrent ? "text-[#1a2e22]" : isCompleted ? "text-[#2d6a4a]" : "text-[#9abfaa]"}`}>
                    {s.label}
                  </span>
                </button>
                {i < steps.length - 1 && (
                  <div className={`mx-3 h-0.5 flex-1 ${i < currentStepIdx ? "bg-[#5db87a]" : "bg-[#e4ede8]"}`} />
                )}
              </div>
            )
          })}
        </div>

        {/* Body */}
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start">

          {/* Main step content */}
          <div className="flex-1">
            {step === "address" && (
              <CheckoutAddress address={selectedAddress} setAddress={setSelectedAddress} setStep={setStep} user={user} />
            )}
            {step === "payment" && (
              <CheckoutPayment paymentMethod={paymentMethod} setPaymentMethod={setPaymentMethod} setStep={setStep} />
            )}
            {step === "review" && (
              <CheckoutReview address={selectedAddress} items={items} handlePlaceOrder={handlePlaceOrder} total={finalTotal} />
            )}
          </div>

          {/* Order summary */}
          <div className="lg:w-72 lg:shrink-0">
            <div className="rounded-2xl border border-[#e4ede8] bg-white p-5">
              <h3 className="mb-4 text-sm font-bold text-[#1a2e22]">Order Summary</h3>

              <div className="space-y-2.5">
                <div className="flex justify-between text-sm text-[#7a9486]">
                  <span>Subtotal ({items.length} items)</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-sm text-[#7a9486]">
                  <span>Delivery</span>
                  {deliveryFee === 0
                    ? <span className="font-medium text-[#2d6a4a]">Free</span>
                    : <span>${deliveryFee.toFixed(2)}</span>
                  }
                </div>

                <div className="flex justify-between text-sm text-[#7a9486]">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>

                <div className="flex justify-between border-t border-[#e4ede8] pt-3 text-sm font-bold text-[#1a2e22]">
                  <span>Total</span>
                  <span className="text-base text-[#1e3a2f]">${finalTotal.toFixed(2)}</span>
                </div>
              </div>

              {deliveryFee > 0 && (
                <p className="mt-3 rounded-lg bg-[#eaf5ef] px-3 py-2 text-xs text-[#2d6a4a]">
                  🚴 Add ${(40 - totalPrice).toFixed(2)} more for free delivery!
                </p>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default CheckOut