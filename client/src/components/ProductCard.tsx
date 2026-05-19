import { useNavigate } from "react-router-dom"
import type { Product } from "../types/index"
import { Star } from "lucide-react"

interface ProductCardProps {
    product: Product
}

const ProductCard = ({ product }: ProductCardProps) => {
    const navigate = useNavigate()

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
          <div className="mt-1.5 flex items-center gap-1">
            <Star size={12} className="fill-[#f59e0b] text-[#f59e0b]" />
            <span className="text-xs font-medium text-[#3a5a46]">{product?.rating}</span>
            <span className="text-xs text-[#9abfaa]">({product?.reviewCount})</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductCard