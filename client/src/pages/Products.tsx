import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import type { Product } from "../types"
import { ChevronDown, SlidersHorizontal, X } from "lucide-react";
import ProductCard from "../components/ProductCard";

const categoriesData = [
  { slug: "fruits-vegetables", name: "Fruits & Vegetables", image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf" },
  { slug: "personal-care", name: "Personal Care", image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9" },
  { slug: "pantry-staples", name: "Pantry Staples", image: "https://images.unsplash.com/photo-1586201375761-83865001e31c" },
  { slug: "bakery", name: "Bakery", image: "https://images.unsplash.com/photo-1509440159596-0249088772ff" },
  { slug: "beverages", name: "Beverages", image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085" },
  { slug: "meat-seafood", name: "Meat & Seafood", image: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f" },
  { slug: "snacks", name: "Snacks", image: "https://images.unsplash.com/photo-1599490659213-e2b9527bd087" },
  { slug: "frozen-foods", name: "Frozen Foods", image: "https://images.unsplash.com/photo-1542838132-92c53300491e" },
  { slug: "baby-care", name: "Baby Care", image: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4" },
  { slug: "dairy-eggs", name: "Dairy & Eggs", image: "https://images.unsplash.com/photo-1563636619-e9143da7973b" },
];

const dummyProducts = [
    { _id: "69c22613ae75a98c7cd13b3b", name: "Butter Croissant 100g", description: "Flaky and buttery", price: 45, originalPrice: 50, image: "https://raw.githubusercontent.com/avinashdm/gs-images/main/greencart/zvoeqbvrbrt7atqj0dbu.png", category: "bakery", unit: "100g", stock: 100, isOrganic: false, rating: 4.5, reviewCount: 12, __v: 0, createdAt: "2026-03-24T05:50:11.118Z", updatedAt: "2026-03-24T05:50:11.118Z", discount: 10, id: "69c22613ae75a98c7cd13b3b" },
    { _id: "69c22613ae75a98c7cd13b37", name: "Organic Quinoa 500g", description: "High protein, Gluten-free", price: 420, originalPrice: 450, image: "https://raw.githubusercontent.com/avinashdm/gs-images/main/greencart/cxrrgnf12xuhkr4dyhi2.png", category: "pantry-staples", unit: "500g", stock: 100, isOrganic: true, rating: 4.5, reviewCount: 12, __v: 0, createdAt: "2026-03-24T05:50:11.118Z", updatedAt: "2026-03-24T05:50:11.118Z", discount: 7, id: "69c22613ae75a98c7cd13b37" },
    { _id: "69c22613ae75a98c7cd13b3a", name: "Brown Bread 400g", description: "Soft and healthy, Ideal for breakfast", price: 35, originalPrice: 40, image: "https://raw.githubusercontent.com/avinashdm/gs-images/main/greencart/vy1xa7zovcu22smzapzv.png", category: "bakery", unit: "400g", stock: 100, isOrganic: false, rating: 4.5, reviewCount: 12, __v: 0, createdAt: "2026-03-24T05:50:11.118Z", updatedAt: "2026-03-24T05:50:11.118Z", discount: 13, id: "69c22613ae75a98c7cd13b3a" },
    { _id: "69c22613ae75a98c7cd13b36", name: "Barley 1kg", description: "Rich in fiber, Helps digestion", price: 140, originalPrice: 150, image: "https://raw.githubusercontent.com/avinashdm/gs-images/main/greencart/spb5sgy8g24rned9nwog.png", category: "pantry-staples", unit: "1kg", stock: 100, isOrganic: false, rating: 4.5, reviewCount: 12, __v: 0, createdAt: "2026-03-24T05:50:11.118Z", updatedAt: "2026-03-24T05:50:11.118Z", discount: 7, id: "69c22613ae75a98c7cd13b36" },
    { _id: "69c22613ae75a98c7cd13b39", name: "Knorr Cup Soup 70g", description: "Convenient and tasty", price: 30, originalPrice: 35, image: "https://raw.githubusercontent.com/avinashdm/gs-images/main/greencart/vnzb2qbwtpab5gnqvx0f.png", category: "pantry-staples", unit: "70g", stock: 100, isOrganic: false, rating: 4.5, reviewCount: 12, __v: 0, createdAt: "2026-03-24T05:50:11.118Z", updatedAt: "2026-03-24T05:50:11.118Z", discount: 14, id: "69c22613ae75a98c7cd13b39" },
    { _id: "69c22613ae75a98c7cd13b38", name: "Maggi Noodles 280g", description: "Instant and easy to cook", price: 50, originalPrice: 55, image: "https://raw.githubusercontent.com/avinashdm/gs-images/main/greencart/dsep7owmwvfrukzbslqo.png", category: "pantry-staples", unit: "280g", stock: 100, isOrganic: false, rating: 4.5, reviewCount: 12, __v: 0, createdAt: "2026-03-24T05:50:11.118Z", updatedAt: "2026-03-24T05:50:11.118Z", discount: 9, id: "69c22613ae75a98c7cd13b38" },
    { _id: "69c22613ae75a98c7cd13b30", name: "Sprite 1.5L", description: "Chilled and refreshing, Perfect for celebrations", price: 60, originalPrice: 75, image: "https://raw.githubusercontent.com/avinashdm/gs-images/main/greencart/daiglpvgna1dlhjplbve.png", category: "beverages", unit: "1.5L", stock: 100, isOrganic: false, rating: 4.5, reviewCount: 12, __v: 0, createdAt: "2026-03-24T05:50:11.117Z", updatedAt: "2026-03-24T05:50:11.117Z", discount: 20, id: "69c22613ae75a98c7cd13b30" },
    { _id: "69c22613ae75a98c7cd13b23", name: "Carrot 500g", description: "Sweet and crunchy", price: 44, originalPrice: 50, image: "https://raw.githubusercontent.com/avinashdm/gs-images/main/greencart/ceqgisupuizyste9aifg.png", category: "fruits-vegetables", unit: "500g", stock: 100, isOrganic: true, rating: 4.5, reviewCount: 12, __v: 0, createdAt: "2026-03-24T05:50:11.117Z", updatedAt: "2026-03-24T05:50:11.117Z", discount: 12, id: "69c22613ae75a98c7cd13b23" },
    { _id: "69c22613ae75a98c7cd13b2f", name: "Coca-Cola 1.5L", description: "Perfect for parties", price: 75, originalPrice: 80, image: "https://raw.githubusercontent.com/avinashdm/gs-images/main/greencart/eljxcdud6fduwfim5rdx.png", category: "beverages", unit: "1.5L", stock: 100, isOrganic: false, rating: 4.5, reviewCount: 12, __v: 0, createdAt: "2026-03-24T05:50:11.117Z", updatedAt: "2026-03-24T05:50:11.117Z", discount: 6, id: "69c22613ae75a98c7cd13b2f" },
    { _id: "69c22613ae75a98c7cd13b35", name: "Brown Rice 1kg", description: "Whole grain and nutritious", price: 110, originalPrice: 120, image: "https://raw.githubusercontent.com/avinashdm/gs-images/main/greencart/dboutcrkdjhoxcvbbqne.png", category: "pantry-staples", unit: "1kg", stock: 100, isOrganic: false, rating: 4.5, reviewCount: 12, __v: 0, createdAt: "2026-03-24T05:50:11.117Z", updatedAt: "2026-03-24T05:50:11.117Z", discount: 8, id: "69c22613ae75a98c7cd13b35" },
    { _id: "69c22613ae75a98c7cd13b2d", name: "Eggs 12 pcs", description: "Farm fresh, Rich in protein", price: 85, originalPrice: 90, image: "https://raw.githubusercontent.com/avinashdm/gs-images/main/greencart/cnjrpbcnqesqxy1wr30g.png", category: "dairy-eggs", unit: "12pcs", stock: 100, isOrganic: false, rating: 4.5, reviewCount: 12, __v: 0, createdAt: "2026-03-24T05:50:11.117Z", updatedAt: "2026-03-24T05:50:11.117Z", discount: 6, id: "69c22613ae75a98c7cd13b2d" },
    { _id: "69c22613ae75a98c7cd13b28", name: "Banana 1 kg", description: "Sweet and ripe", price: 45, originalPrice: 50, image: "https://raw.githubusercontent.com/avinashdm/gs-images/main/greencart/dsnmko6gqtyw31okby80.png", category: "fruits-vegetables", unit: "1kg", stock: 100, isOrganic: false, rating: 4.5, reviewCount: 12, __v: 0, createdAt: "2026-03-24T05:50:11.117Z", updatedAt: "2026-03-24T05:50:11.117Z", discount: 10, id: "69c22613ae75a98c7cd13b28" },
    { _id: "69c22613ae75a98c7cd13b33", name: "Basmati Rice 5kg", description: "Long grain and aromatic", price: 520, originalPrice: 550, image: "https://raw.githubusercontent.com/avinashdm/gs-images/main/greencart/evuovl2nlwdjukosfz23.png", category: "pantry-staples", unit: "5kg", stock: 100, isOrganic: false, rating: 4.5, reviewCount: 12, __v: 0, createdAt: "2026-03-24T05:50:11.117Z", updatedAt: "2026-03-24T05:50:11.117Z", discount: 5, id: "69c22613ae75a98c7cd13b33" },
    { _id: "69c22613ae75a98c7cd13b25", name: "Onion 500g", description: "Fresh and pungent", price: 45, originalPrice: 50, image: "https://raw.githubusercontent.com/avinashdm/gs-images/main/greencart/wnvtwlm2tphqburhsmyc.png", category: "fruits-vegetables", unit: "500g", stock: 100, isOrganic: false, rating: 4.5, reviewCount: 12, __v: 0, createdAt: "2026-03-24T05:50:11.117Z", updatedAt: "2026-03-24T05:50:11.117Z", discount: 10, id: "69c22613ae75a98c7cd13b25" },
    { _id: "69c22613ae75a98c7cd13b26", name: "Apple 1 kg", description: "Boosts immunity, Rich in fiber", price: 90, originalPrice: 100, image: "https://raw.githubusercontent.com/avinashdm/gs-images/main/greencart/pjt1y6xdo46tluemhf0o.png", category: "fruits-vegetables", unit: "1kg", stock: 100, isOrganic: false, rating: 4.5, reviewCount: 12, __v: 0, createdAt: "2026-03-24T05:50:11.117Z", updatedAt: "2026-03-24T05:50:11.117Z", discount: 10, id: "69c22613ae75a98c7cd13b26" },
];

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [products, setProducts] = useState<Product[]>([])
  const [totalPages, setTotalPages] = useState(1)
  const [mobileFilterOption, setMobileFilterOption] = useState(false)

  const category = searchParams.get("category") || ""
  const organic = searchParams.get("organic") || ""
  const sort = searchParams.get("sort") || ""
  const minPrice = searchParams.get("minPrice") || ""
  const maxPrice = searchParams.get("maxPrice") || ""
  const page = Number(searchParams.get("page")) || 1

  const fetchProducts = async () => {
    setProducts(dummyProducts.filter((p) => p.category === category || category === ""))
  }

  const updateFilter = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams)
    newParams.set(key, value)
    setSearchParams(newParams)
  }

  const clearFilter = () => {
    setSearchParams({})
  }

  const activeCategory = categoriesData.find((c) => c.slug === category)
  const hashFilters = category || organic || sort || minPrice || maxPrice

  useEffect(() => {
    fetchProducts()
  }, [category, organic, sort, minPrice, maxPrice, page])

  // Sidebar content (shared between desktop and mobile)
  const SidebarContent = () => (
    <div className="space-y-6">

      {/* Categories */}
      <div>
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#9abfaa]">Categories</p>
        <div className="space-y-1">
          <button
            onClick={() => updateFilter("category", "")}
            className={`w-full rounded-xl px-3 py-2 text-left text-sm transition ${
              !category ? "bg-[#1e3a2f] font-semibold text-white" : "text-[#3a5a46] hover:bg-[#f7f5f0]"
            }`}
          >
            All Products
          </button>
          {categoriesData.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => updateFilter("category", cat.slug)}
              className={`w-full rounded-xl px-3 py-2 text-left text-sm transition ${
                category === cat.slug ? "bg-[#1e3a2f] font-semibold text-white" : "text-[#3a5a46] hover:bg-[#f7f5f0]"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Organic */}
      <div>
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#9abfaa]">Type</p>
        <label className="flex cursor-pointer items-center gap-2">
          <input
            type="checkbox"
            checked={organic === "true"}
            onChange={(e) => updateFilter("organic", e.target.checked ? "true" : "")}
            className="h-4 w-4 accent-[#2d6a4a] rounded"
          />
          <span className="text-sm text-[#3a5a46]">Organic only</span>
        </label>
      </div>

      {/* Price Range */}
      <div>
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#9abfaa]">Price Range</p>
        <div className="flex items-center gap-2">
          <input
            type="number"
            placeholder="Min"
            value={minPrice}
            onChange={(e) => updateFilter("minPrice", e.target.value)}
            className="w-full rounded-xl border border-[#d8e8de] bg-[#f7f5f0] px-3 py-2 text-sm text-[#1a2e22] outline-none focus:border-[#2d6a4a]"
          />
          <span className="text-[#9abfaa]">–</span>
          <input
            type="number"
            placeholder="Max"
            value={maxPrice}
            onChange={(e) => updateFilter("maxPrice", e.target.value)}
            className="w-full rounded-xl border border-[#d8e8de] bg-[#f7f5f0] px-3 py-2 text-sm text-[#1a2e22] outline-none focus:border-[#2d6a4a]"
          />
        </div>
      </div>

      {/* Clear filters */}
      {hashFilters && (
        <button
          onClick={clearFilter}
          className="w-full rounded-xl border border-[#d8e8de] py-2 text-sm font-medium text-[#3a5a46] transition hover:bg-[#f7f5f0]"
        >
          Clear Filters
        </button>
      )}
    </div>
  )

  return (
    <div className="min-h-screen bg-[#f7f5f0]">
      <div className="mx-auto max-w-7xl px-4 py-8 md:px-6">
        <div className="flex gap-6">

          {/* Desktop sidebar */}
          <aside className="hidden lg:block w-56 shrink-0">
            <div className="sticky top-20 rounded-2xl border border-[#e4ede8] bg-white p-5">
              <p className="mb-5 text-sm font-bold text-[#1a2e22]">Filters</p>
              <SidebarContent />
            </div>
          </aside>

          {/* Main content */}
          <main className="flex-1 min-w-0">

            {/* Toolbar */}
            <div className="mb-5 flex items-center justify-between gap-3">
              <div>
                <h1 className="text-xl font-bold text-[#1a2e22]">
                  {activeCategory ? activeCategory.name : "All Products"}
                </h1>
                <p className="text-xs text-[#9abfaa]">{products.length} products found</p>
              </div>

              <div className="flex items-center gap-2">
                {/* Mobile filter button */}
                <button
                  onClick={() => setMobileFilterOption(true)}
                  className="lg:hidden flex items-center gap-1.5 rounded-xl border border-[#d8e8de] bg-white px-3 py-2 text-sm font-medium text-[#3a5a46] transition hover:bg-[#eaf5ef]"
                >
                  <SlidersHorizontal size={14} /> Filters
                </button>

                {/* Sort dropdown */}
                <div className="relative flex items-center rounded-xl border border-[#d8e8de] bg-white px-3 py-2 focus-within:border-[#2d6a4a]">
                  <select
                    value={sort}
                    onChange={(e) => updateFilter("sort", e.target.value)}
                    className="appearance-none bg-transparent pr-6 text-sm text-[#3a5a46] outline-none"
                  >
                    <option value="">Newest</option>
                    <option value="price_asc">Price: Low to High</option>
                    <option value="price_desc">Price: High to Low</option>
                    <option value="rating">Top Rated</option>
                    <option value="name">A to Z</option>
                  </select>
                  <ChevronDown size={14} className="pointer-events-none absolute right-3 text-[#9abfaa]" />
                </div>
              </div>
            </div>

            {/* Products grid */}
            {products.length === 0 ? (
              <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-[#e4ede8] bg-white py-20 text-center">
                <p className="text-base font-semibold text-[#3a5a46]">No products found</p>
                <button
                  onClick={clearFilter}
                  className="rounded-xl bg-[#1e3a2f] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#2d6a4a] transition"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
                {products.map((product) => product.stock > 0 && (
                  <ProductCard key={product?._id} product={product} />
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8 flex items-center justify-center gap-2">
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    onClick={() => { updateFilter("page", String(i + 1)); window.scrollTo(0, 0) }}
                    key={i}
                    className={`h-9 w-9 rounded-xl text-sm font-medium transition ${
                      page === i + 1
                        ? "bg-[#1e3a2f] text-white"
                        : "border border-[#d8e8de] bg-white text-[#3a5a46] hover:bg-[#eaf5ef]"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile filter drawer */}
      {mobileFilterOption && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
            onClick={() => setMobileFilterOption(false)}
          />
          <div className="fixed bottom-0 left-0 right-0 z-50 max-h-[80vh] overflow-y-auto rounded-t-2xl bg-white p-5 shadow-2xl">
            <div className="mb-5 flex items-center justify-between">
              <p className="text-sm font-bold text-[#1a2e22]">Filters</p>
              <button
                onClick={() => setMobileFilterOption(false)}
                className="flex h-7 w-7 items-center justify-center rounded-lg border border-[#e4ede8] text-[#9abfaa] hover:text-[#1a2e22]"
              >
                <X size={14} />
              </button>
            </div>
            <SidebarContent />
          </div>
        </>
      )}
    </div>
  )
}

export default Products