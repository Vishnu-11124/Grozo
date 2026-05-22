import { ArrowRightIcon, MinusIcon, PlusIcon, ShoppingBagIcon, Trash2Icon, XIcon } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import { clearCart, closeCart, decreaseQuantity, increaseQuantity, removeFromCart } from "../redux/features/cart/cartSlice"
import { useNavigate } from "react-router-dom"

const CartSidebar = () => {
  const { isCartOpen, items, totalPrice } = useSelector((state: any) => state.cart)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const deliveryFee = totalPrice > 40 ? 0 : 2.15
  const grandTotal = totalPrice + deliveryFee

  return isCartOpen && (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
        onClick={() => dispatch(closeCart())}
      />

      {/* Sidebar */}
      <div className="fixed right-0 top-0 z-50 flex h-full w-full max-w-sm flex-col bg-white shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#e4ede8] px-5 py-4">
          <div className="flex items-center gap-2">
            <h2 className="flex items-center gap-2 text-base font-bold text-[#1a2e22]">
              <ShoppingBagIcon size={18} className="text-[#2d6a4a]" />
              Your Cart
            </h2>
            <span className="rounded-full bg-[#eaf5ef] px-2 py-0.5 text-xs font-semibold text-[#2d6a4a]">
              {items.length} items
            </span>
          </div>
          <button
            onClick={() => dispatch(closeCart())}
            className="flex h-8 w-8 items-center justify-center rounded-xl border border-[#e4ede8] text-[#9abfaa] transition hover:bg-[#f7f5f0] hover:text-[#1a2e22]"
          >
            <XIcon size={16} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#eaf5ef]">
                <ShoppingBagIcon size={28} className="text-[#9abfaa]" />
              </div>
              <p className="text-sm font-medium text-[#3a5a46]">Your cart is empty</p>
              <p className="text-xs text-[#9abfaa]">Add some fresh groceries to get started</p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item: any) => (
                <div key={item?._id} className="flex gap-3 rounded-2xl border border-[#e4ede8] bg-[#f7f5f0] p-3">
                  <img
                    src={item?.image}
                    className="h-16 w-16 shrink-0 rounded-xl object-contain bg-white p-1"
                  />
                  <div className="flex flex-1 flex-col justify-between min-w-0">
                    <h4 className="truncate text-sm font-semibold text-[#1a2e22]">{item?.name}</h4>
                    <p className="text-xs text-[#9abfaa]">${item?.price.toFixed(2)} / {item?.unit}</p>
                    <div className="mt-1.5 flex items-center justify-between">
                      {/* Qty controls */}
                      <div className="flex items-center gap-1 rounded-lg border border-[#d8e8de] bg-white px-1.5 py-1">
                        <button
                          onClick={() => dispatch(decreaseQuantity(item?._id))}
                          className="flex h-5 w-5 items-center justify-center rounded text-[#3a5a46] transition hover:bg-[#eaf5ef]"
                        >
                          <MinusIcon size={12} />
                        </button>
                        <span className="w-5 text-center text-xs font-semibold text-[#1a2e22]">{item?.quantity}</span>
                        <button
                          onClick={() => dispatch(increaseQuantity(item?._id))}
                          className="flex h-5 w-5 items-center justify-center rounded text-[#3a5a46] transition hover:bg-[#eaf5ef]"
                        >
                          <PlusIcon size={12} />
                        </button>
                      </div>
                      {/* Price + delete */}
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-[#1e3a2f]">
                          ${(item?.price * item?.quantity).toFixed(2)}
                        </span>
                        <button
                          onClick={() => dispatch(removeFromCart(item?._id))}
                          className="flex h-6 w-6 items-center justify-center rounded-lg text-[#b8d0c0] transition hover:bg-red-50 hover:text-red-400"
                        >
                          <Trash2Icon size={13} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-[#e4ede8] bg-white px-5 py-4 space-y-3">
            <div className="flex items-center justify-between text-sm text-[#3a5a46]">
              <span>Subtotal</span>
              <span className="font-medium">${totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between text-sm text-[#3a5a46]">
              <span>Delivery Fee</span>
              <span className={`font-medium ${deliveryFee === 0 ? "text-[#2d6a4a]" : ""}`}>
                {deliveryFee === 0 ? "Free" : `$${deliveryFee.toFixed(2)}`}
              </span>
            </div>

            {deliveryFee > 0 && (
              <p className="rounded-lg bg-[#eaf5ef] px-3 py-2 text-xs text-[#2d6a4a]">
                🚴 Add ${(40 - totalPrice).toFixed(2)} more for free delivery!
              </p>
            )}

            <div className="flex items-center justify-between border-t border-[#e4ede8] pt-3 text-sm font-bold text-[#1a2e22]">
              <span>Grand Total</span>
              <span className="text-base text-[#1e3a2f]">${grandTotal.toFixed(2)}</span>
            </div>

            <div className="flex gap-2 pt-1">
              <button
                onClick={() => dispatch(clearCart())}
                className="flex-1 rounded-xl border border-[#d8e8de] py-2.5 text-sm font-medium text-[#3a5a46] transition hover:bg-[#f7f5f0]"
              >
                Clear Cart
              </button>
              <button
                onClick={() => { dispatch(closeCart()); navigate('/checkout'); window.scrollTo(0, 0) }}
                className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-[#1e3a2f] py-2.5 text-sm font-semibold text-white transition hover:bg-[#2d6a4a]"
              >
                Checkout <ArrowRightIcon size={14} />
              </button>
            </div>
          </div>
        )}

      </div>
    </>
  )
}

export default CartSidebar