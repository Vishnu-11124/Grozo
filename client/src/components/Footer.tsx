import { SiFacebook, SiInstagram, SiX } from "@icons-pack/react-simple-icons"
import { BikeIcon, MailIcon, MapPinIcon, PhoneIcon } from "lucide-react"
import { Link } from "react-router-dom"

const Footer = () => {
    const sections = [
        {
            title: "Quick Links",
            links: [
                { label: "All Products", to: "/products" },
                { label: "Flash Deals", to: "/deals" },
                { label: "Track Order", to: "/orders" },
                { label: "Delivery Partner", to: "/delivery" },
            ],
        },
        {
            title: "Customer Service",
            links: [
                { label: "My Account", to: "#" },
                { label: "Order History", to: "#" },
                { label: "Addresses", to: "#" },
                { label: "Help Center", href: "#" },
            ],
        },
    ]
    const contact = [
        { icon: MapPinIcon, text: "123 Green Valley Rd, Portland" },
        { icon: PhoneIcon, text: "+1 (111) 123-4567" },
        { icon: MailIcon, text: "hello@example.com" },
    ]
    const bottom = {
        copyright: "© 2026 Greatstack. All rights reserved.",
        links: [
            { label: "Privacy Policy", href: "#" },
            { label: "Terms of Service", href: "#" },
        ],
    }

  return (
    <footer className="bg-[#1a2e22] text-white">
      <div className="mx-auto max-w-7xl px-4 py-14 md:px-6">

        {/* Top grid */}
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4">

          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="mb-4 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#5db87a]">
                <BikeIcon size={16} className="text-white" />
              </div>
              <h2 className="text-xl font-bold text-white">Grozo</h2>
            </Link>
            <p className="text-sm leading-relaxed text-white/50">
              Your one-stop destination for fresh fruits, vegetables, daily essentials, and household needs.
            </p>
            <div className="mt-5 flex items-center gap-3">
              <a href="/" className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-white/60 transition hover:bg-[#5db87a] hover:text-white">
                <SiFacebook size={14} />
              </a>
              <a href="/" className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-white/60 transition hover:bg-[#5db87a] hover:text-white">
                <SiX size={14} />
              </a>
              <a href="/" className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-white/60 transition hover:bg-[#5db87a] hover:text-white">
                <SiInstagram size={14} />
              </a>
            </div>
          </div>

          {/* Link sections */}
          {sections.map((section, index) => (
            <div key={index}>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-[#5db87a]">{section.title}</h3>
              <ul className="space-y-2.5">
                {section.links.map((link, i) => {
                  if (link.to) {
                    return (
                      <li key={i}>
                        <Link to={link.to} className="text-sm text-white/50 transition hover:text-white">
                          {link.label}
                        </Link>
                      </li>
                    )
                  }
                  return (
                    <li key={i}>
                      <a href={link.href} className="text-sm text-white/50 transition hover:text-white">
                        {link.label}
                      </a>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-[#5db87a]">Contact Us</h3>
            <ul className="space-y-3">
              {contact.map((item, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <item.icon size={15} className="mt-0.5 shrink-0 text-[#5db87a]" />
                  <span className="text-sm text-white/50">{item.text}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <hr className="my-8 border-white/10" />
        <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
          <p className="text-xs text-white/30">{bottom.copyright}</p>
          <div className="flex items-center gap-4">
            {bottom.links.map((link, i) => (
              <a key={i} href={link.href} className="text-xs text-white/30 transition hover:text-white/70">
                {link.label}
              </a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  )
}

export default Footer