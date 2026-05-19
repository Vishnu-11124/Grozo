import { Link } from "react-router-dom";

const HomeCategories = () => {
    const categoriesData = [
  {
    slug: "fruits-vegetables",
    name: "Fruits & Vegetables",
    image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf",
  },
  {
    slug: "personal-care",
    name: "Personal Care",
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9",
  },
  {
    slug: "pantry-staples",
    name: "Pantry Staples",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c",
  },
  {
    slug: "bakery",
    name: "Bakery",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff",
  },
  {
    slug: "beverages",
    name: "Beverages",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085",
  },
  {
    slug: "meat-seafood",
    name: "Meat & Seafood",
    image: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f",
  },
  {
    slug: "snacks",
    name: "Snacks",
    image: "https://images.unsplash.com/photo-1599490659213-e2b9527bd087",
  },
  {
    slug: "frozen-foods",
    name: "Frozen Foods",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e",
  },
  {
    slug: "baby-care",
    name: "Baby Care",
    image: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4",
  },
  {
    slug: "dairy-eggs",
    name: "Dairy & Eggs",
    image: "https://images.unsplash.com/photo-1563636619-e9143da7973b",
  },
];

  return (
    <section className="bg-white py-5 border-b border-[#e4ede8]">
      <div className="mx-auto max-w-7xl px-4 md:px-6">

        <h2 className="mb-4 text-sm font-semibold uppercase tracking-widest text-[#9abfaa]">Shop by Category</h2>

        {/* Horizontal scroll strip */}
        <div className="flex gap-5 overflow-x-auto pb-2 lg:justify-center lg:overflow-x-visible" style={{ scrollbarWidth: "none" }}>
          {categoriesData.map((category) => (
            <Link
              onClick={() => scrollTo({ top: 0, behavior: 'smooth' })}
              key={category.slug}
              to={`/products?category=${category.slug}`}
              className="group flex shrink-0 flex-col items-center gap-2"
            >
              {/* Circle image */}
              <div className="h-16 w-16 overflow-hidden rounded-full border-2 border-[#e4ede8] transition duration-200 group-hover:border-[#2d6a4a] group-hover:scale-105">
                <img
                  src={`${category.image}?w=120&q=75`}
                  alt={category.name}
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Label */}
              <span className="w-16 text-center text-[11px] font-medium leading-tight text-[#3a5a46] group-hover:text-[#1e3a2f]">
                {category.name}
              </span>
            </Link>
          ))}
        </div>

      </div>
    </section>
  )
}

export default HomeCategories