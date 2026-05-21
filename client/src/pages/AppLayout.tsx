import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import CartSidebar from '../components/CartSidebar'

const AppLayout = () => {
  return (
    <>
    <Navbar />
    <main>
      <Outlet/>
    </main>
    <Footer />
    <CartSidebar />
    </>
  )
}

export default AppLayout
