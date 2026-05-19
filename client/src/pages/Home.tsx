import Features from "../components/Home/Features"
import Hero from "../components/Home/Hero"
import HomeCategories from "../components/Home/HomeCategories"
import PopularProducts from "../components/Home/PopularProducts"

const Home = () => {
  return (
    <div className="min-h-screen bg-[#f7f5f0]">
      <Hero />
      <Features />
      <HomeCategories />
      <PopularProducts />
    </div>
  )
}

export default Home