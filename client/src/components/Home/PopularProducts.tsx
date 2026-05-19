import type {Product} from '../../types/index'
import { Link } from 'react-router-dom'
import { ArrowRightIcon } from 'lucide-react'
import ProductCard from '../ProductCard'

const PopularProducts = () => {
    
const dummyProducts = [
    {
        _id: "69c22613ae75a98c7cd13b3b",
        name: "Butter Croissant 100g",
        description: "Flaky and buttery",
        price: 45,
        originalPrice: 50,
        image: "https://raw.githubusercontent.com/avinashdm/gs-images/main/greencart/zvoeqbvrbrt7atqj0dbu.png",
        category: "bakery",
        unit: "100g",
        stock: 100,
        isOrganic: false,
        rating: 4.5,
        reviewCount: 12,
        __v: 0,
        createdAt: "2026-03-24T05:50:11.118Z",
        updatedAt: "2026-03-24T05:50:11.118Z",
        discount: 10,
        id: "69c22613ae75a98c7cd13b3b",
    },
    {
        _id: "69c22613ae75a98c7cd13b37",
        name: "Organic Quinoa 500g",
        description: "High protein, Gluten-free",
        price: 420,
        originalPrice: 450,
        image: "https://raw.githubusercontent.com/avinashdm/gs-images/main/greencart/cxrrgnf12xuhkr4dyhi2.png",
        category: "pantry-staples",
        unit: "500g",
        stock: 100,
        isOrganic: true,
        rating: 4.5,
        reviewCount: 12,
        __v: 0,
        createdAt: "2026-03-24T05:50:11.118Z",
        updatedAt: "2026-03-24T05:50:11.118Z",
        discount: 7,
        id: "69c22613ae75a98c7cd13b37",
    },
    {
        _id: "69c22613ae75a98c7cd13b3a",
        name: "Brown Bread 400g",
        description: "Soft and healthy, Ideal for breakfast",
        price: 35,
        originalPrice: 40,
        image: "https://raw.githubusercontent.com/avinashdm/gs-images/main/greencart/vy1xa7zovcu22smzapzv.png",
        category: "bakery",
        unit: "400g",
        stock: 100,
        isOrganic: false,
        rating: 4.5,
        reviewCount: 12,
        __v: 0,
        createdAt: "2026-03-24T05:50:11.118Z",
        updatedAt: "2026-03-24T05:50:11.118Z",
        discount: 13,
        id: "69c22613ae75a98c7cd13b3a",
    },
    {
        _id: "69c22613ae75a98c7cd13b36",
        name: "Barley 1kg",
        description: "Rich in fiber, Helps digestion",
        price: 140,
        originalPrice: 150,
        image: "https://raw.githubusercontent.com/avinashdm/gs-images/main/greencart/spb5sgy8g24rned9nwog.png",
        category: "pantry-staples",
        unit: "1kg",
        stock: 100,
        isOrganic: false,
        rating: 4.5,
        reviewCount: 12,
        __v: 0,
        createdAt: "2026-03-24T05:50:11.118Z",
        updatedAt: "2026-03-24T05:50:11.118Z",
        discount: 7,
        id: "69c22613ae75a98c7cd13b36",
    },
    {
        _id: "69c22613ae75a98c7cd13b39",
        name: "Knorr Cup Soup 70g",
        description: "Convenient and tasty",
        price: 30,
        originalPrice: 35,
        image: "https://raw.githubusercontent.com/avinashdm/gs-images/main/greencart/vnzb2qbwtpab5gnqvx0f.png",
        category: "pantry-staples",
        unit: "70g",
        stock: 100,
        isOrganic: false,
        rating: 4.5,
        reviewCount: 12,
        __v: 0,
        createdAt: "2026-03-24T05:50:11.118Z",
        updatedAt: "2026-03-24T05:50:11.118Z",
        discount: 14,
        id: "69c22613ae75a98c7cd13b39",
    },
    {
        _id: "69c22613ae75a98c7cd13b38",
        name: "Maggi Noodles 280g",
        description: "Instant and easy to cook",
        price: 50,
        originalPrice: 55,
        image: "https://raw.githubusercontent.com/avinashdm/gs-images/main/greencart/dsep7owmwvfrukzbslqo.png",
        category: "pantry-staples",
        unit: "280g",
        stock: 100,
        isOrganic: false,
        rating: 4.5,
        reviewCount: 12,
        __v: 0,
        createdAt: "2026-03-24T05:50:11.118Z",
        updatedAt: "2026-03-24T05:50:11.118Z",
        discount: 9,
        id: "69c22613ae75a98c7cd13b38",
    },
    {
        _id: "69c22613ae75a98c7cd13b30",
        name: "Sprite 1.5L",
        description: "Chilled and refreshing, Perfect for celebrations",
        price: 60,
        originalPrice: 75,
        image: "https://raw.githubusercontent.com/avinashdm/gs-images/main/greencart/daiglpvgna1dlhjplbve.png",
        category: "beverages",
        unit: "1.5L",
        stock: 100,
        isOrganic: false,
        rating: 4.5,
        reviewCount: 12,
        __v: 0,
        createdAt: "2026-03-24T05:50:11.117Z",
        updatedAt: "2026-03-24T05:50:11.117Z",
        discount: 20,
        id: "69c22613ae75a98c7cd13b30",
    },
    {
        _id: "69c22613ae75a98c7cd13b23",
        name: "Carrot 500g",
        description: "Sweet and crunchy, Good for eyesight, Ideal for juices and salads",
        price: 44,
        originalPrice: 50,
        image: "https://raw.githubusercontent.com/avinashdm/gs-images/main/greencart/ceqgisupuizyste9aifg.png",
        category: "fruits-vegetables",
        unit: "500g",
        stock: 100,
        isOrganic: true,
        rating: 4.5,
        reviewCount: 12,
        __v: 0,
        createdAt: "2026-03-24T05:50:11.117Z",
        updatedAt: "2026-03-24T05:50:11.117Z",
        discount: 12,
        id: "69c22613ae75a98c7cd13b23",
    },
];

    const popularProducts: Product[] = dummyProducts ? [...dummyProducts].sort(() => Math.random() - 0.5).slice(0, 8) : []

  return (
    <section className="bg-[#f7f5f0] py-12">
        <div className="mx-auto max-w-7xl px-4 md:px-6">

            {/* Header */}
            <div className="mb-6 flex items-end justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-[#1a2e22] md:text-3xl">Popular Products</h2>
                    <p className="mt-1 text-sm text-[#9abfaa]">Top-rated products this season</p>
                </div>
                <Link
                  to="/products"
                  className="flex items-center gap-1 rounded-xl border border-[#d8e8de] bg-white px-4 py-2 text-sm font-medium text-[#2d6a4a] transition hover:bg-[#eaf5ef]"
                >
                  View All <ArrowRightIcon size={14} />
                </Link>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 md:gap-4">
                {popularProducts.map((product) => (
                    <ProductCard key={product?._id} product={product} />
                ))}
            </div>

        </div>
    </section>
  )
}

export default PopularProducts