import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import { loadCartFromLocalStorage } from "../../../utils/cartStorage"

interface CartItem {
  _id: string
  name: string
  price: number
  image: string
  quantity: number
}

interface CartState {
  items: CartItem[]
  totalQuantity: number
  totalPrice: number
  isCartOpen: boolean
}

const savedCart = loadCartFromLocalStorage()

const initialState: CartState = {
  items: savedCart.items,
  totalQuantity: savedCart.totalQuantity,
  totalPrice: savedCart.totalPrice,
  isCartOpen: false,
}

const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {
    addToCart: (
      state,
      action: PayloadAction<Omit<CartItem, "quantity">>
    ) => {
      const existingItem = state.items.find(
        (item) => item._id === action.payload._id
      )

      state.totalQuantity += 1

      state.totalPrice = Number(
        (state.totalPrice + action.payload.price).toFixed(2)
      )

      if (existingItem) {
        existingItem.quantity += 1
      } else {
        state.items.push({
          ...action.payload,
          quantity: 1,
        })
      }
    },

    removeFromCart: (
      state,
      action: PayloadAction<string>
    ) => {
      const item = state.items.find(
        (item) => item._id === action.payload
      )

      if (!item) return

      state.totalQuantity -= item.quantity

      state.totalPrice = Number(
        (state.totalPrice - item.price * item.quantity).toFixed(2)
      )

      state.items = state.items.filter(
        (item) => item._id !== action.payload
      )
    },

    increaseQuantity: (
      state,
      action: PayloadAction<string>
    ) => {
      const item = state.items.find(
        (item) => item._id === action.payload
      )

      if (!item) return

      item.quantity += 1
      state.totalQuantity += 1

      state.totalPrice = Number(
        (state.totalPrice + item.price).toFixed(2)
      )
    },

    decreaseQuantity: (
      state,
      action: PayloadAction<string>
    ) => {
      const item = state.items.find(
        (item) => item._id === action.payload
      )

      if (!item) return

      if (item.quantity === 1) {
        state.items = state.items.filter(
          (item) => item._id !== action.payload
        )
      } else {
        item.quantity -= 1
      }

      state.totalQuantity -= 1

      state.totalPrice = Number(
        (state.totalPrice - item.price).toFixed(2)
      )
    },

    clearCart: (state) => {
      state.items = []
      state.totalQuantity = 0
      state.totalPrice = 0
    },

    openCart: (state) => {
      state.isCartOpen = true
    },

    closeCart: (state) => {
      state.isCartOpen = false
    },

    toggleCart: (state) => {
      state.isCartOpen = !state.isCartOpen
    },
  },
})

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
  openCart,
  closeCart,
  toggleCart,
} = cartSlice.actions

export default cartSlice.reducer