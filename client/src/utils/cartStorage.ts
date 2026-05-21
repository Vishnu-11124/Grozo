export const loadCartFromLocalStorage = () => {
  try {
    const cartData = localStorage.getItem("cart")

    return cartData
      ? JSON.parse(cartData)
      : {
          items: [],
          totalQuantity: 0,
          totalPrice: 0,
        }
  } catch (error) {
    return {
      items: [],
      totalQuantity: 0,
      totalPrice: 0,
    }
  }
}

export const saveCartToLocalStorage = (cart: {
  items: any[]
  totalQuantity: number
  totalPrice: number
}) => {
  try {
    localStorage.setItem("cart", JSON.stringify(cart))
  } catch (error) {
    console.log(error)
  }
}