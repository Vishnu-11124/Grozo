import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import type { Product } from '../types'
import { useState } from 'react'
import { ArrowLeftIcon, LeafIcon, MinusIcon, PlusIcon, ShoppingCartIcon } from 'lucide-react';

const dummyProducts = [
  {
    _id: "69c22613ae75a98c7cd13b3b",
    name: "Butter Croissant 100g",
    description: "Flaky and buttery",
    price: 45,
    originalPrice: 50,
    image:
      "https://raw.githubusercontent.com/avinashdm/gs-images/main/greencart/zvoeqbvrbrt7atqj0dbu.png",
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
    image:
      "https://raw.githubusercontent.com/avinashdm/gs-images/main/greencart/cxrrgnf12xuhkr4dyhi2.png",
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
    image:
      "https://raw.githubusercontent.com/avinashdm/gs-images/main/greencart/vy1xa7zovcu22smzapzv.png",
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
    image:
      "https://raw.githubusercontent.com/avinashdm/gs-images/main/greencart/spb5sgy8g24rned9nwog.png",
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
    image:
      "https://raw.githubusercontent.com/avinashdm/gs-images/main/greencart/vnzb2qbwtpab5gnqvx0f.png",
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
    image:
      "https://raw.githubusercontent.com/avinashdm/gs-images/main/greencart/dsep7owmwvfrukzbslqo.png",
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
    image:
      "https://raw.githubusercontent.com/avinashdm/gs-images/main/greencart/daiglpvgna1dlhjplbve.png",
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
    description: "Sweet and crunchy",
    price: 44,
    originalPrice: 50,
    image:
      "https://raw.githubusercontent.com/avinashdm/gs-images/main/greencart/ceqgisupuizyste9aifg.png",
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
  {
    _id: "69c22613ae75a98c7cd13b2f",
    name: "Coca-Cola 1.5L",
    description: "Perfect for parties",
    price: 75,
    originalPrice: 80,
    image:
      "https://raw.githubusercontent.com/avinashdm/gs-images/main/greencart/eljxcdud6fduwfim5rdx.png",
    category: "beverages",
    unit: "1.5L",
    stock: 100,
    isOrganic: false,
    rating: 4.5,
    reviewCount: 12,
    __v: 0,
    createdAt: "2026-03-24T05:50:11.117Z",
    updatedAt: "2026-03-24T05:50:11.117Z",
    discount: 6,
    id: "69c22613ae75a98c7cd13b2f",
  },
  {
    _id: "69c22613ae75a98c7cd13b35",
    name: "Brown Rice 1kg",
    description: "Whole grain and nutritious",
    price: 110,
    originalPrice: 120,
    image:
      "https://raw.githubusercontent.com/avinashdm/gs-images/main/greencart/dboutcrkdjhoxcvbbqne.png",
    category: "pantry-staples",
    unit: "1kg",
    stock: 100,
    isOrganic: false,
    rating: 4.5,
    reviewCount: 12,
    __v: 0,
    createdAt: "2026-03-24T05:50:11.117Z",
    updatedAt: "2026-03-24T05:50:11.117Z",
    discount: 8,
    id: "69c22613ae75a98c7cd13b35",
  },
  {
    _id: "69c22613ae75a98c7cd13b2d",
    name: "Eggs 12 pcs",
    description: "Farm fresh, Rich in protein",
    price: 85,
    originalPrice: 90,
    image:
      "https://raw.githubusercontent.com/avinashdm/gs-images/main/greencart/cnjrpbcnqesqxy1wr30g.png",
    category: "dairy-eggs",
    unit: "12pcs",
    stock: 100,
    isOrganic: false,
    rating: 4.5,
    reviewCount: 12,
    __v: 0,
    createdAt: "2026-03-24T05:50:11.117Z",
    updatedAt: "2026-03-24T05:50:11.117Z",
    discount: 6,
    id: "69c22613ae75a98c7cd13b2d",
  },
  {
    _id: "69c22613ae75a98c7cd13b28",
    name: "Banana 1 kg",
    description: "Sweet and ripe",
    price: 45,
    originalPrice: 50,
    image:
      "https://raw.githubusercontent.com/avinashdm/gs-images/main/greencart/dsnmko6gqtyw31okby80.png",
    category: "fruits-vegetables",
    unit: "1kg",
    stock: 100,
    isOrganic: false,
    rating: 4.5,
    reviewCount: 12,
    __v: 0,
    createdAt: "2026-03-24T05:50:11.117Z",
    updatedAt: "2026-03-24T05:50:11.117Z",
    discount: 10,
    id: "69c22613ae75a98c7cd13b28",
  },
  {
    _id: "69c22613ae75a98c7cd13b33",
    name: "Basmati Rice 5kg",
    description: "Long grain and aromatic",
    price: 520,
    originalPrice: 550,
    image:
      "https://raw.githubusercontent.com/avinashdm/gs-images/main/greencart/evuovl2nlwdjukosfz23.png",
    category: "pantry-staples",
    unit: "5kg",
    stock: 100,
    isOrganic: false,
    rating: 4.5,
    reviewCount: 12,
    __v: 0,
    createdAt: "2026-03-24T05:50:11.117Z",
    updatedAt: "2026-03-24T05:50:11.117Z",
    discount: 5,
    id: "69c22613ae75a98c7cd13b33",
  },
  {
    _id: "69c22613ae75a98c7cd13b25",
    name: "Onion 500g",
    description: "Fresh and pungent",
    price: 45,
    originalPrice: 50,
    image:
      "https://raw.githubusercontent.com/avinashdm/gs-images/main/greencart/wnvtwlm2tphqburhsmyc.png",
    category: "fruits-vegetables",
    unit: "500g",
    stock: 100,
    isOrganic: false,
    rating: 4.5,
    reviewCount: 12,
    __v: 0,
    createdAt: "2026-03-24T05:50:11.117Z",
    updatedAt: "2026-03-24T05:50:11.117Z",
    discount: 10,
    id: "69c22613ae75a98c7cd13b25",
  },
  {
    _id: "69c22613ae75a98c7cd13b26",
    name: "Apple 1 kg",
    description: "Boosts immunity, Rich in fiber",
    price: 90,
    originalPrice: 100,
    image:
      "https://raw.githubusercontent.com/avinashdm/gs-images/main/greencart/pjt1y6xdo46tluemhf0o.png",
    category: "fruits-vegetables",
    unit: "1kg",
    stock: 100,
    isOrganic: false,
    rating: 4.5,
    reviewCount: 12,
    __v: 0,
    createdAt: "2026-03-24T05:50:11.117Z",
    updatedAt: "2026-03-24T05:50:11.117Z",
    discount: 10,
    id: "69c22613ae75a98c7cd13b26",
  },
];


const ProductPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const { items } = useSelector((state:any) => state.cart)

  const product: Product | undefined = dummyProducts.find((item:Product) => item._id === id)
  if (!product) {
  return <div>Product not found</div>
}
  const [localQuantity, setLocalQuantity] = useState(1)
  console.log('product', product)

  const cartItem = items.find((item: any) => item._id === product?._id)
  const inCart = !!cartItem
  const displayQuantity = inCart ? cartItem.quantity : localQuantity
  return (
    <div>
      <div>
         <button onClick={() => navigate(-1)}>
          <ArrowLeftIcon /> back
         </button>

         {/* product details */}
          <div>
            <div>
              {/* image */}
              <div>
                <img src={product?.image} alt="product image" />
                <div>
                  {product?.isOrganic && <span><LeafIcon /> Organic</span>}
                  { product?.discount > 0 && <span>{product?.discount}% off</span>}
                </div>
              </div>
              {/* data */}
              <div>
                <span>{product?.category}</span>
                <h1>{product?.name}</h1>
                {
                  product?.rating > 0 && (
                    <div>
                      <div>
                        {
                          Array.from({ length: 5 }, (_, index) => (
                            <span key={index}>
                              {index < Math.floor(product?.rating) ? '★' : '☆'}
                            </span>
                          ))
                        }
                      </div>
                      <span>{product?.rating}</span>
                      <span>({product?.reviewCount} reviews)</span>
                    </div>
                  )
                }

                <div>
                  <span>${product?.price.toFixed(2)}</span>
                  {
                    product?.originalPrice > product?.price && (
                      <span>${product?.originalPrice.toFixed(2)}</span>
                    )
                  }
                </div>
                <p>{product?.description}</p>
                <div>
                  {
                    product?.stock > 0 ? (
                      <span>In stock ({product?.stock} available)</span>
                    ):
                    (
                      <span>Out of stock</span>
                    )
                  }
                </div>
                  {/* quantity selector */}
                <div>
                  <div>
                    <button><MinusIcon /></button>
                    <span>{displayQuantity}</span>
                    <button><PlusIcon /></button>
                  </div>
                  {/* add to cart */}
                  <button>
                    <ShoppingCartIcon />
                    {
                      inCart ? "Added to Cart" : "Add to Cart"
                    }
                  </button>
                </div>
              </div>
            </div>
          </div>
         {/* review */}

         {/* related products */}
      </div>
    </div>
  )
}

export default ProductPage
