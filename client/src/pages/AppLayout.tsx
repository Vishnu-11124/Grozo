import { Outlet } from 'react-router-dom'

const AppLayout = () => {
  return (
    <>
    <p>Navbar</p>
    <main>
      <Outlet/>
    </main>
    <p>Footer</p>
    <p>CartSidebar</p>
    </>
  )
}

export default AppLayout
