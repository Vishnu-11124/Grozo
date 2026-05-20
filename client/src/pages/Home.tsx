import Features from "../components/Home/Features"
import Hero from "../components/Home/Hero"
import HomeCategories from "../components/Home/HomeCategories"
import NewsLetter from "../components/Home/NewsLetter"
import PopularProducts from "../components/Home/PopularProducts"

const Home = () => {
  return (
    <div className="min-h-screen bg-[#f7f5f0]">
      <Hero />
      <Features />
      <HomeCategories />
      <PopularProducts />
      <NewsLetter />
    </div>
  )
}

export default Home