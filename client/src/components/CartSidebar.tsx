import { ShoppingBasketIcon, XIcon } from "lucide-react"
import { useSelector } from "react-redux"

const CartSidebar = () => {
    const isModelOpen = useSelector((state: any) => state.cart.isCartOpen)
    
  return isModelOpen && (
    <>
      <div>
        <div>
            <h2><ShoppingBasketIcon /> Cart</h2>
            <button><XIcon /></button>
        </div>

      </div>
    </>
  )
}

export default CartSidebar
