import { MinusIcon, ShoppingBagIcon, XIcon } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import { closeCart } from "../redux/features/cart/cartSlice"

const CartSidebar = () => {
  const { isCartOpen, items, totalPrice }= useSelector((state: any) => state.cart)
  console.log("Items:", items)
  const dispatch = useDispatch()

  const deliveryFee =  totalPrice > 40 ? 0 : 2.15
  const grandTotal = totalPrice + deliveryFee
  // console.log(grandTotal)
    
  return isCartOpen && (
    <>
      <div>
        <div>
            <div>
              <h2><ShoppingBagIcon />Your Cart</h2>
              <span>{items.length} items</span>
            </div>
            <button onClick={() => dispatch(closeCart())}><XIcon /></button>
        </div>
        {/* items details */}
        <div>
          {
            items.length === 0 ?
            (
              <div>
                <p>Cart is empty</p>
              </div>
            ):
            (
              items.map((item: any) => (
                <div key={item?._id}>
                  <img src={item?.image} />
                  <div>
                    <h4>{item?.name}</h4>
                    <p>${item?.price.toFixed(2)} / {item?.unit}</p>
                    <div>
                      <div>
                        <button><MinusIcon /></button>
                      </div>
                      <div></div>
                    </div>
                  </div>
                </div>
              )
              )
            )
          }
        </div>

      </div>
    </>
  )
}

export default CartSidebar
