import { useNavigate } from "react-router-dom"
import type { Product } from "../types/index"
import { Plus, Star } from "lucide-react"
import { useDispatch } from "react-redux"
import { addToCart } from "../redux/features/cart/cartSlice"

interface ProductCardProps {
    product: Product
}

const ProductCard = ({ product }: ProductCardProps) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

  const handleAddToCart = (e: React.MouseEvent, product:Product) =>{
    e.stopPropagation()
    dispatch(addToCart(product))
  }  

  return (
    <div
      onClick={() => navigate(`/products/${product._id}`)}
      className="group cursor-pointer overflow-hidden rounded-2xl border border-[#e4ede8] bg-white transition hover:shadow-md hover:border-[#b8ddc8]"
    >
      {/* Image */}
      <div className="relative overflow-hidden bg-[#f7f5f0]">
        <img
          src={product?.image}
          alt="product image"
          className="h-44 w-full object-contain transition duration-300 group-hover:scale-105"
        />
        {/* Discount badge */}
        <div className="absolute left-2 top-2">
          {product?.discount > 0 && (
            <span className="rounded-full bg-[#1e3a2f] px-2.5 py-1 text-[11px] font-semibold text-white">
              {product?.discount}% OFF
            </span>
          )}
        </div>
      </div>

      {/* Info */}
      <div className="p-3">
        <h3 className="truncate text-sm font-semibold text-[#1a2e22]">{product?.name}</h3>

        {product?.rating > 0 && (
          <div className="mt-1 flex items-center gap-1">
            <Star size={12} className="fill-[#f59e0b] text-[#f59e0b]" />
            <span className="text-xs font-medium text-[#3a5a46]">{product?.rating}</span>
            <span className="text-xs text-[#9abfaa]">({product?.reviewCount})</span>
          </div>
        )}

        <div className="mt-2.5 flex items-center justify-between">
          <div className="flex flex-col">
            <div className="flex items-baseline gap-1">
              <span className="text-base font-bold text-[#1e3a2f]">${product?.price.toFixed(1)}</span>
              <span className="text-[11px] text-[#9abfaa]">/{product?.unit}</span>
            </div>
            {product?.originalPrice > product?.price && (
              <span className="text-[11px] text-[#b8d0c0] line-through">${product?.originalPrice.toFixed(1)}</span>
            )}
          </div>
          <button
            onClick={(e) => handleAddToCart(e,product) }
            className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#1e3a2f] text-white transition hover:bg-[#2d6a4a] active:scale-95"
          >
            <Plus size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard