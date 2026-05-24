import ProductCard from '../components/ProductCard';
import type { Product } from '../types'
import { Zap } from 'lucide-react';

const dummyProducts = [
  { _id: "69c22613ae75a98c7cd13b3b", name: "Butter Croissant 100g", description: "Flaky and buttery", price: 45, originalPrice: 50, image: "https://raw.githubusercontent.com/avinashdm/gs-images/main/greencart/zvoeqbvrbrt7atqj0dbu.png", category: "bakery", unit: "100g", stock: 100, isOrganic: false, rating: 4.5, reviewCount: 12, __v: 0, createdAt: "2026-03-24T05:50:11.118Z", updatedAt: "2026-03-24T05:50:11.118Z", discount: 10, id: "69c22613ae75a98c7cd13b3b" },
  { _id: "69c22613ae75a98c7cd13b37", name: "Organic Quinoa 500g", description: "High protein, Gluten-free", price: 420, originalPrice: 450, image: "https://raw.githubusercontent.com/avinashdm/gs-images/main/greencart/cxrrgnf12xuhkr4dyhi2.png", category: "pantry-staples", unit: "500g", stock: 100, isOrganic: true, rating: 4.5, reviewCount: 12, __v: 0, createdAt: "2026-03-24T05:50:11.118Z", updatedAt: "2026-03-24T05:50:11.118Z", discount: 7, id: "69c22613ae75a98c7cd13b37" },
  { _id: "69c22613ae75a98c7cd13b3a", name: "Brown Bread 400g", description: "Soft and healthy, Ideal for breakfast", price: 35, originalPrice: 40, image: "https://raw.githubusercontent.com/avinashdm/gs-images/main/greencart/vy1xa7zovcu22smzapzv.png", category: "bakery", unit: "400g", stock: 100, isOrganic: false, rating: 4.5, reviewCount: 12, __v: 0, createdAt: "2026-03-24T05:50:11.118Z", updatedAt: "2026-03-24T05:50:11.118Z", discount: 13, id: "69c22613ae75a98c7cd13b3a" },
  { _id: "69c22613ae75a98c7cd13b36", name: "Barley 1kg", description: "Rich in fiber, Helps digestion", price: 140, originalPrice: 150, image: "https://raw.githubusercontent.com/avinashdm/gs-images/main/greencart/spb5sgy8g24rned9nwog.png", category: "pantry-staples", unit: "1kg", stock: 100, isOrganic: false, rating: 4.5, reviewCount: 12, __v: 0, createdAt: "2026-03-24T05:50:11.118Z", updatedAt: "2026-03-24T05:50:11.118Z", discount: 7, id: "69c22613ae75a98c7cd13b36" },
  { _id: "69c22613ae75a98c7cd13b39", name: "Knorr Cup Soup 70g", description: "Convenient and tasty", price: 30, originalPrice: 35, image: "https://raw.githubusercontent.com/avinashdm/gs-images/main/greencart/vnzb2qbwtpab5gnqvx0f.png", category: "pantry-staples", unit: "70g", stock: 100, isOrganic: false, rating: 4.5, reviewCount: 12, __v: 0, createdAt: "2026-03-24T05:50:11.118Z", updatedAt: "2026-03-24T05:50:11.118Z", discount: 14, id: "69c22613ae75a98c7cd13b39" },
  { _id: "69c22613ae75a98c7cd13b38", name: "Maggi Noodles 280g", description: "Instant and easy to cook", price: 50, originalPrice: 55, image: "https://raw.githubusercontent.com/avinashdm/gs-images/main/greencart/dsep7owmwvfrukzbslqo.png", category: "pantry-staples", unit: "280g", stock: 100, isOrganic: false, rating: 4.5, reviewCount: 12, __v: 0, createdAt: "2026-03-24T05:50:11.118Z", updatedAt: "2026-03-24T05:50:11.118Z", discount: 9, id: "69c22613ae75a98c7cd13b38" },
  { _id: "69c22613ae75a98c7cd13b30", name: "Sprite 1.5L", description: "Chilled and refreshing", price: 60, originalPrice: 75, image: "https://raw.githubusercontent.com/avinashdm/gs-images/main/greencart/daiglpvgna1dlhjplbve.png", category: "beverages", unit: "1.5L", stock: 100, isOrganic: false, rating: 4.5, reviewCount: 12, __v: 0, createdAt: "2026-03-24T05:50:11.117Z", updatedAt: "2026-03-24T05:50:11.117Z", discount: 20, id: "69c22613ae75a98c7cd13b30" },
  { _id: "69c22613ae75a98c7cd13b23", name: "Carrot 500g", description: "Sweet and crunchy", price: 44, originalPrice: 50, image: "https://raw.githubusercontent.com/avinashdm/gs-images/main/greencart/ceqgisupuizyste9aifg.png", category: "fruits-vegetables", unit: "500g", stock: 100, isOrganic: true, rating: 4.5, reviewCount: 12, __v: 0, createdAt: "2026-03-24T05:50:11.117Z", updatedAt: "2026-03-24T05:50:11.117Z", discount: 12, id: "69c22613ae75a98c7cd13b23" },
  { _id: "69c22613ae75a98c7cd13b2f", name: "Coca-Cola 1.5L", description: "Perfect for parties", price: 75, originalPrice: 80, image: "https://raw.githubusercontent.com/avinashdm/gs-images/main/greencart/eljxcdud6fduwfim5rdx.png", category: "beverages", unit: "1.5L", stock: 100, isOrganic: false, rating: 4.5, reviewCount: 12, __v: 0, createdAt: "2026-03-24T05:50:11.117Z", updatedAt: "2026-03-24T05:50:11.117Z", discount: 6, id: "69c22613ae75a98c7cd13b2f" },
  { _id: "69c22613ae75a98c7cd13b35", name: "Brown Rice 1kg", description: "Whole grain and nutritious", price: 110, originalPrice: 120, image: "https://raw.githubusercontent.com/avinashdm/gs-images/main/greencart/dboutcrkdjhoxcvbbqne.png", category: "pantry-staples", unit: "1kg", stock: 100, isOrganic: false, rating: 4.5, reviewCount: 12, __v: 0, createdAt: "2026-03-24T05:50:11.117Z", updatedAt: "2026-03-24T05:50:11.117Z", discount: 8, id: "69c22613ae75a98c7cd13b35" },
  { _id: "69c22613ae75a98c7cd13b2d", name: "Eggs 12 pcs", description: "Farm fresh, Rich in protein", price: 85, originalPrice: 90, image: "https://raw.githubusercontent.com/avinashdm/gs-images/main/greencart/cnjrpbcnqesqxy1wr30g.png", category: "dairy-eggs", unit: "12pcs", stock: 100, isOrganic: false, rating: 4.5, reviewCount: 12, __v: 0, createdAt: "2026-03-24T05:50:11.117Z", updatedAt: "2026-03-24T05:50:11.117Z", discount: 6, id: "69c22613ae75a98c7cd13b2d" },
  { _id: "69c22613ae75a98c7cd13b28", name: "Banana 1 kg", description: "Sweet and ripe", price: 45, originalPrice: 50, image: "https://raw.githubusercontent.com/avinashdm/gs-images/main/greencart/dsnmko6gqtyw31okby80.png", category: "fruits-vegetables", unit: "1kg", stock: 100, isOrganic: false, rating: 4.5, reviewCount: 12, __v: 0, createdAt: "2026-03-24T05:50:11.117Z", updatedAt: "2026-03-24T05:50:11.117Z", discount: 10, id: "69c22613ae75a98c7cd13b28" },
  { _id: "69c22613ae75a98c7cd13b33", name: "Basmati Rice 5kg", description: "Long grain and aromatic", price: 520, originalPrice: 550, image: "https://raw.githubusercontent.com/avinashdm/gs-images/main/greencart/evuovl2nlwdjukosfz23.png", category: "pantry-staples", unit: "5kg", stock: 100, isOrganic: false, rating: 4.5, reviewCount: 12, __v: 0, createdAt: "2026-03-24T05:50:11.117Z", updatedAt: "2026-03-24T05:50:11.117Z", discount: 5, id: "69c22613ae75a98c7cd13b33" },
  { _id: "69c22613ae75a98c7cd13b25", name: "Onion 500g", description: "Fresh and pungent", price: 45, originalPrice: 50, image: "https://raw.githubusercontent.com/avinashdm/gs-images/main/greencart/wnvtwlm2tphqburhsmyc.png", category: "fruits-vegetables", unit: "500g", stock: 100, isOrganic: false, rating: 4.5, reviewCount: 12, __v: 0, createdAt: "2026-03-24T05:50:11.117Z", updatedAt: "2026-03-24T05:50:11.117Z", discount: 10, id: "69c22613ae75a98c7cd13b25" },
  { _id: "69c22613ae75a98c7cd13b26", name: "Apple 1 kg", description: "Boosts immunity, Rich in fiber", price: 90, originalPrice: 100, image: "https://raw.githubusercontent.com/avinashdm/gs-images/main/greencart/pjt1y6xdo46tluemhf0o.png", category: "fruits-vegetables", unit: "1kg", stock: 100, isOrganic: false, rating: 4.5, reviewCount: 12, __v: 0, createdAt: "2026-03-24T05:50:11.117Z", updatedAt: "2026-03-24T05:50:11.117Z", discount: 10, id: "69c22613ae75a98c7cd13b26" },
];

const FlashDeals = () => {
  const products: Product[] = dummyProducts.filter((p: any) => p.stock > 0) || []

  return (
    <div className="min-h-screen bg-[#f7f5f0]">

      {/* Banner */}
      <div className="bg-[#1e3a2f] py-12">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="flex items-center justify-center gap-3 mb-3">
            <Zap size={22} className="fill-[#f59e0b] text-[#f59e0b]" />
            <h1 className="text-3xl font-bold text-white md:text-4xl">Flash Deals</h1>
            <Zap size={22} className="fill-[#f59e0b] text-[#f59e0b]" />
          </div>
          <p className="text-center text-sm text-white/50">
            Limited-time offers and discounts. Shop now! 🎁
          </p>
        </div>
      </div>

      {/* Products */}
      <div className="mx-auto max-w-7xl px-4 py-10 md:px-6">
        {products.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-[#e4ede8] bg-white py-20 text-center">
            <Zap size={32} className="text-[#9abfaa]" />
            <p className="text-sm font-medium text-[#3a5a46]">No flash deals available at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 md:gap-4">
            {products.map((product) => product.stock > 0 && (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>

    </div>
  )
}

export default FlashDeals