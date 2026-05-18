import { ArrowUpRightIcon, BikeIcon, ChevronDownIcon, LogOutIcon, MapPinIcon, PackageIcon, SearchIcon, ShieldIcon, ShoppingCartIcon, UserIcon, XIcon } from "lucide-react"
import React,{ useState } from "react"
import { useNavigate, Link } from "react-router-dom"

const Navbar = () => {
    const user: any = { name: "John Doe", email: "john@gmai.com", isAdmin: true}

    const {cartCount, setIsCartOpen} = {
        cartCount: 6,
        setIsCartOpen: (_data: any) => {}
    }
    const [searchQuery, setSearchQuery] = useState("")
    const [userMenuOpen, setUserMenuOpen] = useState(false)
    const navigate = useNavigate()

    const handleSearch = (e: React.SubmitEvent) => {
        e.preventDefault()
    if(searchQuery.trim()){
        navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
        setSearchQuery("")
    }
    }

    const handleLogout = () => {
        setUserMenuOpen(false)
        navigate("/login")
    }

  return (
    <nav className="sticky top-0 z-50 border-b border-[#e4ede8] bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 md:px-6">

        <Link to="/" className="flex shrink-0 items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#1e3a2f]">
            <BikeIcon size={16} className="text-[#5db87a]" />
          </div>
          <span className="text-xl font-bold text-[#1e3a2f]">Grozo</span>
        </Link>

        <div>
            <div className="hidden md:flex gap-6">
                <Link to="/" className="text-sm font-medium text-[#3a5a46] hover:text-[#1e3a2f] transition">Home</Link>
                <Link to="/products" className="text-sm font-medium text-[#3a5a46] hover:text-[#1e3a2f] transition">Products</Link>
                <Link to="/deals" className="text-sm font-medium text-[#3a5a46] hover:text-[#1e3a2f] transition">Deals</Link>
            </div>
        </div>

        <form onSubmit={handleSearch} className=" hidden md:flex flex-1 max-w-sm">
            <div className="flex w-full items-center gap-2 rounded-xl border border-[#d8e8de] bg-[#f7f5f0] px-3 py-2 focus-within:border-[#2d6a4a] focus-within:ring-2 focus-within:ring-[#2d6a4a]/10 transition">
                <SearchIcon size={16} className="shrink-0 text-[#9abfaa]" />
                <input
                  type="text"
                  placeholder="Search for groceries..."
                  value={searchQuery}
                  onChange={(e)=> setSearchQuery(e.target.value)}
                  className="w-full bg-transparent text-sm text-[#1a2e22] placeholder-[#b8d0c0] outline-none"
                />
            </div>
        </form>

        <div className="flex items-center gap-2">
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-[#d8e8de] bg-[#f7f5f0] text-[#3a5a46] hover:bg-[#e4ede8] transition"
            >
                <ShoppingCartIcon size={18} />
                {
                    cartCount > 0 && (
                      <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#1e3a2f] text-[10px] font-bold text-white">
                        {cartCount}
                      </span>
                    )
                }
            </button>

            <div className="relative">
                {
                    user ? (
                        <button
                          onClick={() => setUserMenuOpen(!userMenuOpen)}
                          className="flex items-center gap-1.5 rounded-xl border border-[#d8e8de] bg-[#f7f5f0] px-3 py-2 hover:bg-[#e4ede8] transition"
                        >
                            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#1e3a2f] text-[11px] font-bold text-white">
                                {user.name.charAt(0).toUpperCase()}
                            </div>
                            <ChevronDownIcon size={14} className="text-[#7a9486]" />
                        </button>
                    ):
                    (
                        <div className="flex items-center gap-2">
                            <Link to="/login" className="flex items-center gap-1.5 rounded-xl bg-[#1e3a2f] px-4 py-2 text-sm font-medium text-white hover:bg-[#2d6a4a] transition">
                              <UserIcon size={14} />Sign In
                            </Link>
                            
                        </div>
                    )
                }

                {
                    userMenuOpen && 
                    (
                        <div className="absolute right-0 top-12 w-56 rounded-2xl border border-[#e4ede8] bg-white shadow-lg shadow-[#1e3a2f]/5 overflow-hidden">
                            <div className="flex justify-end px-4 pt-3">
                                <XIcon
                                  size={16}
                                  className="cursor-pointer text-[#9abfaa] hover:text-[#3a5a46] transition"
                                  onClick={() => setUserMenuOpen(false)}
                                />
                            </div>
                            <div className="px-4 pb-3">
                                {
                                    user && (
                                        <div className="mb-3 border-b border-[#e4ede8] pb-3">
                                            <p className="text-sm font-semibold text-[#1a2e22]">{user?.name}</p>
                                            <p className="text-xs text-[#9abfaa]">{user?.email}</p>
                                        </div>
                                    )
                                }
                                <div className="flex flex-col gap-0.5" onClick={() => setUserMenuOpen(false)}>
                                    {
                                        !user && (
                                          <Link to="/login" className="flex items-center gap-2 rounded-lg px-2 py-2 text-sm text-[#3a5a46] hover:bg-[#f7f5f0] transition">
                                            <UserIcon size={15} className="text-[#9abfaa]" />Sign In
                                          </Link>
                                        )
                                    }
                                    {
                                        user && (
                                            <div className="flex flex-col gap-0.5">
                                                <Link to="/orders" className="flex items-center gap-2 rounded-lg px-2 py-2 text-sm text-[#3a5a46] hover:bg-[#f7f5f0] transition">
                                                  <PackageIcon size={15} className="text-[#9abfaa]" />My Orders
                                                </Link>
                                                <Link to="/addresses" className="flex items-center gap-2 rounded-lg px-2 py-2 text-sm text-[#3a5a46] hover:bg-[#f7f5f0] transition">
                                                  <MapPinIcon size={15} className="text-[#9abfaa]" />Addresses
                                                </Link>
                                            </div>
                                        )
                                    }
                                    <Link to="/products" className="flex items-center gap-2 rounded-lg px-2 py-2 text-sm text-[#3a5a46] hover:bg-[#f7f5f0] transition">
                                      <ArrowUpRightIcon size={15} className="text-[#9abfaa]" />Products
                                    </Link>
                                    <Link to="/deals" className="flex items-center gap-2 rounded-lg px-2 py-2 text-sm text-[#3a5a46] hover:bg-[#f7f5f0] transition">
                                      <ArrowUpRightIcon size={15} className="text-[#9abfaa]" />Deals
                                    </Link>
                                    {
                                        user?.isAdmin && (
                                            <Link to="/admin/products" className="flex items-center gap-2 rounded-lg px-2 py-2 text-sm text-[#3a5a46] hover:bg-[#f7f5f0] transition">
                                              <ShieldIcon size={15} className="text-[#9abfaa]" />Admin Panel
                                            </Link>
                                        )
                                    }
                                    {
                                        user && (
                                            <div className="mt-1 border-t border-[#e4ede8] pt-1">
                                                <button
                                                onClick={handleLogout}
                                                 className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-sm text-red-500 hover:bg-red-50 transition">
                                                    <LogOutIcon size={15} /> Logout
                                                </button>
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>

      </div>
    </nav>
  )
}

export default Navbar