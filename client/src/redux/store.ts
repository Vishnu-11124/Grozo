import { configureStore } from "@reduxjs/toolkit"
import cartReducer from "./features/cart/cartSice"

import { saveCartToLocalStorage } from "../utils/cartStorage"

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
})

store.subscribe(() => {
  const cart = store.getState().cart

  saveCartToLocalStorage({
    items: cart.items,
    totalQuantity: cart.totalQuantity,
    totalPrice: cart.totalPrice,
  })
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch