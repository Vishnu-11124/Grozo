import { ArrowRightIcon, LeafIcon } from "lucide-react"
import { Link } from "react-router-dom"

const Hero = () => {
  return (
    <section className="relative min-h-[88vh] overflow-hidden">

      {/* Full-bleed background image */}
      <img
        src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=1600&q=85"
        alt="Fresh organic groceries"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Dark green gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0d1f16]/90 via-[#0d1f16]/70 to-[#0d1f16]/20" />

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-[88vh] max-w-7xl items-center px-6 md:px-10">
        <div className="max-w-xl py-20">

          {/* Badge */}
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#5db87a]/40 bg-[#5db87a]/10 px-4 py-1.5 text-sm font-medium text-[#5db87a]">
            <LeafIcon size={14} className="text-[#5db87a]" />
            Farm-Fresh & Organic
          </span>

          {/* Heading */}
          <h1 className="text-5xl font-bold leading-tight tracking-tight text-white md:text-6xl">
            Nourish your home with{" "}
            <span className="relative whitespace-nowrap text-[#5db87a]">
              Earth's finest
              {/* Underline squiggle */}
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 8 Q75 2 150 8 Q225 14 298 8" stroke="#5db87a" strokeWidth="3" strokeLinecap="round" fill="none"/>
              </svg>
            </span>
          </h1>

          {/* Description */}
          <p className="mt-6 text-lg leading-relaxed text-white/60">
            Handpicked seasonal vegetables, sun-ripened fruits, and pantry staples — sourced directly from local farms and delivered to your door in under 30 minutes.
          </p>

          {/* Stats */}
          <div className="mt-8 flex gap-8">
            {[
              { value: "500+", label: "Local farms" },
              { value: "2,000+", label: "Products" },
              { value: "<30 min", label: "Delivery" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-sm text-white/50">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-10">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 rounded-xl bg-[#5db87a] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[#4caa6a] active:scale-[0.98]"
            >
              Shop Now <ArrowRightIcon size={16} />
            </Link>
          </div>

        </div>
      </div>

    </section>
  )
}

export default Hero