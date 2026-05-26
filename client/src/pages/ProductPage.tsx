import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import type { Product } from '../types'
import { useState } from 'react'
import { ArrowLeftIcon, ArrowRightIcon, LeafIcon, MinusIcon, PlusIcon, ShoppingCartIcon } from 'lucide-react';
import { addToCart, decreaseQuantity, increaseQuantity, removeFromCart } from '../redux/features/cart/cartSlice';
import ProductCard from '../components/ProductCard';

const dummyProducts = [
  { _id: "69c22613ae75a98c7cd13b3b", name: "Butter Croissant 100g", description: "Flaky and buttery", price: 45, originalPrice: 50, image: "https://raw.githubusercontent.com/avinashdm/gs-images/main/greencart/zvoeqbvrbrt7atqj0dbu.png", category: "bakery", unit: "100g", stock: 100, isOrganic: false, rating: 4.5, reviewCount: 12, __v: 0, createdAt: "2026-03-24T05:50:11.118Z", updatedAt: "2026-03-24T05:50:11.118Z", discount: 10, id: "69c22613ae75a98c7cd13b3b" },
  { _id: "69c22613ae75a98c7cd13b37", name: "Organic Quinoa 500g", description: "High protein, Gluten-free", price: 420, originalPrice: 450, image: "https://raw.githubusercontent.com/avinashdm/gs-images/main/greencart/cxrrgnf12xuhkr4dyhi2.png", category: "pantry-staples", unit: "500g", stock: 100, isOrganic: true, rating: 4.5, reviewCount: 12, __v: 0, createdAt: "2026-03-24T05:50:11.118Z", updatedAt: "2026-03-24T05:50:11.118Z", discount: 7, id: "69c22613ae75a98c7cd13b37" },
  { _id: "69c22613ae75a98c7cd13b3a", name: "Brown Bread 400g", description: "Soft and healthy, Ideal for breakfast", price: 35, originalPrice: 40, image: "https://raw.githubusercontent.com/avinashdm/gs-images/main/greencart/vy1xa7zovcu22smzapzv.png", category: "bakery", unit: "400g", stock: 100, isOrganic: false, rating: 4.5, reviewCount: 12, __v: 0, createdAt: "2026-03-24T05:50:11.118Z", updatedAt: "2026-03-24T05:50:11.118Z", discount: 13, id: "69c22613ae75a98c7cd13b3a" },
  { _id: "69c22613ae75a98c7cd13b36", name: "Barley 1kg", description: "Rich in fiber, Helps digestion", price: 140, originalPrice: 150, image: "https://raw.githubusercontent.com/avinashdm/gs-images/main/greencart/spb5sgy8g24rned9nwog.png", category: "pantry-staples", unit: "1kg", stock: 100, isOrganic: false, rating: 4.5, reviewCount: 12, __v: 0, createdAt: "2026-03-24T05:50:11.118Z", updatedAt: "2026-03-24T05:50:11.118Z", discount: 7, id: "69c22613ae75a98c7cd13b36" },
  { _id: "69c22613ae75a98c7cd13b23", name: "Carrot 500g", description: "Sweet and crunchy", price: 44, originalPrice: 50, image: "https://raw.githubusercontent.com/avinashdm/gs-images/main/greencart/ceqgisupuizyste9aifg.png", category: "fruits-vegetables", unit: "500g", stock: 100, isOrganic: true, rating: 4.5, reviewCount: 12, __v: 0, createdAt: "2026-03-24T05:50:11.117Z", updatedAt: "2026-03-24T05:50:11.117Z", discount: 12, id: "69c22613ae75a98c7cd13b23" },
  { _id: "69c22613ae75a98c7cd13b2f", name: "Coca-Cola 1.5L", description: "Perfect for parties", price: 75, originalPrice: 80, image: "https://raw.githubusercontent.com/avinashdm/gs-images/main/greencart/eljxcdud6fduwfim5rdx.png", category: "beverages", unit: "1.5L", stock: 100, isOrganic: false, rating: 4.5, reviewCount: 12, __v: 0, createdAt: "2026-03-24T05:50:11.117Z", updatedAt: "2026-03-24T05:50:11.117Z", discount: 6, id: "69c22613ae75a98c7cd13b2f" },
  { _id: "69c22613ae75a98c7cd13b28", name: "Banana 1 kg", description: "Sweet and ripe", price: 45, originalPrice: 50, image: "https://raw.githubusercontent.com/avinashdm/gs-images/main/greencart/dsnmko6gqtyw31okby80.png", category: "fruits-vegetables", unit: "1kg", stock: 100, isOrganic: false, rating: 4.5, reviewCount: 12, __v: 0, createdAt: "2026-03-24T05:50:11.117Z", updatedAt: "2026-03-24T05:50:11.117Z", discount: 10, id: "69c22613ae75a98c7cd13b28" },
  { _id: "69c22613ae75a98c7cd13b26", name: "Apple 1 kg", description: "Boosts immunity, Rich in fiber", price: 90, originalPrice: 100, image: "https://raw.githubusercontent.com/avinashdm/gs-images/main/greencart/pjt1y6xdo46tluemhf0o.png", category: "fruits-vegetables", unit: "1kg", stock: 100, isOrganic: false, rating: 4.5, reviewCount: 12, __v: 0, createdAt: "2026-03-24T05:50:11.117Z", updatedAt: "2026-03-24T05:50:11.117Z", discount: 10, id: "69c22613ae75a98c7cd13b26" },
];

const ProductPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { items } = useSelector((state: any) => state.cart)

  const product: Product | undefined = dummyProducts.find((item: Product) => item._id === id)
  if (!product) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f7f5f0]">
        <p className="text-sm text-[#9abfaa]">Product not found</p>
      </div>
    )
  }

  const relatedProducts = dummyProducts.filter((item: Product) => item.category === product.category && item._id !== product._id)
  const [localQuantity, setLocalQuantity] = useState(1)

  const cartItem = items.find((item: any) => item._id === product?._id)
  const inCart = !!cartItem
  const displayQuantity = inCart ? cartItem.quantity : localQuantity

  const handleMinusQuantity = (productId: string) => {
    if (inCart) {
      if (cartItem.quantity > 1) dispatch(decreaseQuantity(productId))
      else dispatch(removeFromCart(productId))
    } else {
      setLocalQuantity((prev) => Math.max(1, prev - 1))
    }
  }

  const handlePlusQuantity = (productId: string) => {
    if (inCart) dispatch(increaseQuantity(productId))
    else setLocalQuantity((prev) => prev + 1)
  }

  return (
    <div className="min-h-screen bg-[#f7f5f0]">
      <div className="mx-auto max-w-7xl px-4 py-8 md:px-6">

        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-1.5 text-sm font-medium text-[#3a5a46] hover:text-[#1e3a2f] transition"
        >
          <ArrowLeftIcon size={16} /> Back
        </button>

        {/* Product details */}
        <div className="rounded-2xl border border-[#e4ede8] bg-white p-6 md:p-8">
          <div className="flex flex-col gap-8 md:flex-row">

            {/* Image */}
            <div className="relative flex-shrink-0 md:w-80">
              <div className="flex h-72 items-center justify-center overflow-hidden rounded-2xl bg-[#f7f5f0] md:h-96">
                <img
                  src={product?.image}
                  alt="product image"
                  className="h-full w-full object-contain p-6"
                />
              </div>
              <div className="absolute left-3 top-3 flex flex-col gap-1.5">
                {product?.isOrganic && (
                  <span className="flex items-center gap-1 rounded-full bg-[#eaf5ef] px-2.5 py-1 text-[11px] font-semibold text-[#2d6a4a]">
                    <LeafIcon size={11} /> Organic
                  </span>
                )}
                {product?.discount > 0 && (
                  <span className="rounded-full bg-[#1e3a2f] px-2.5 py-1 text-[11px] font-semibold text-white">
                    {product?.discount}% OFF
                  </span>
                )}
              </div>
            </div>

            {/* Info */}
            <div className="flex flex-1 flex-col justify-between gap-5">
              <div className="space-y-3">

                {/* Category */}
                <span className="text-xs font-semibold uppercase tracking-widest text-[#9abfaa]">
                  {product?.category.replace(/-/g, " ")}
                </span>

                {/* Name */}
                <h1 className="text-2xl font-bold text-[#1a2e22] md:text-3xl">{product?.name}</h1>

                {/* Rating */}
                {product?.rating > 0 && (
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {Array.from({ length: 5 }, (_, index) => (
                        <span key={index} className={`text-base ${index < Math.floor(product?.rating) ? "text-[#f59e0b]" : "text-[#d8e8de]"}`}>
                          ★
                        </span>
                      ))}
                    </div>
                    <span className="text-sm font-medium text-[#3a5a46]">{product?.rating}</span>
                    <span className="text-sm text-[#9abfaa]">({product?.reviewCount} reviews)</span>
                  </div>
                )}

                {/* Price */}
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-[#1e3a2f]">${product?.price.toFixed(2)}</span>
                  {product?.originalPrice > product?.price && (
                    <span className="text-base text-[#b8d0c0] line-through">${product?.originalPrice.toFixed(2)}</span>
                  )}
                </div>

                {/* Description */}
                <p className="text-sm leading-relaxed text-[#7a9486]">{product?.description}</p>

                {/* Stock */}
                <div>
                  {product?.stock > 0 ? (
                    <span className="inline-block rounded-full bg-[#eaf5ef] px-3 py-1 text-xs font-semibold text-[#2d6a4a]">
                      In stock ({product?.stock} available)
                    </span>
                  ) : (
                    <span className="inline-block rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-400">
                      Out of stock
                    </span>
                  )}
                </div>
              </div>

              {/* Quantity + Add to cart */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2 rounded-xl border border-[#d8e8de] bg-[#f7f5f0] px-2 py-2">
                  <button
                    onClick={() => handleMinusQuantity(product._id)}
                    className="flex h-7 w-7 items-center justify-center rounded-lg text-[#3a5a46] hover:bg-[#e4ede8] transition"
                  >
                    <MinusIcon size={14} />
                  </button>
                  <span className="w-7 text-center text-sm font-semibold text-[#1a2e22]">{displayQuantity}</span>
                  <button
                    onClick={() => handlePlusQuantity(product._id)}
                    className="flex h-7 w-7 items-center justify-center rounded-lg text-[#3a5a46] hover:bg-[#e4ede8] transition"
                  >
                    <PlusIcon size={14} />
                  </button>
                </div>

                <button
                  onClick={() => {
                    if (!inCart) dispatch(addToCart({ ...(product as any), quantity: localQuantity }))
                  }}
                  disabled={product?.stock === 0}
                  className={`flex flex-1 items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold transition ${
                    inCart
                      ? "border border-[#2d6a4a] bg-[#eaf5ef] text-[#2d6a4a]"
                      : "bg-[#1e3a2f] text-white hover:bg-[#2d6a4a]"
                  } disabled:opacity-50`}
                >
                  <ShoppingCartIcon size={16} />
                  {inCart ? "Added to Cart" : "Add to Cart"}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Customer Reviews heading */}
        {product.reviewCount > 0 && (
          <h2 className="mb-4 mt-10 text-lg font-bold text-[#1a2e22]">Customer Reviews</h2>
        )}

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-10">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-lg font-bold text-[#1a2e22]">Related Products</h2>
              <Link
                onClick={() => window.scrollTo(0, 0)}
                to={`/products?category=${product.category}`}
                className="flex items-center gap-1 text-sm font-medium text-[#2d6a4a] hover:underline"
              >
                See all <ArrowRightIcon size={14} />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 md:gap-4">
              {relatedProducts.slice(0, 8).map((item: Product) => (
                <ProductCard key={item._id} product={item} />
              ))}
            </div>
          </section>
        )}

      </div>
    </div>
  )
}

export default ProductPage