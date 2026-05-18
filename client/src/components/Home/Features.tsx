import { TruckIcon, LeafIcon, ClockIcon, ShieldCheckIcon } from "lucide-react"

const Features = () => {
    const hero_features = [
        { icon: TruckIcon, title: "Free Delivery", desc: "Orders over $20" },
        { icon: LeafIcon, title: "100% Organic", desc: "Certified products" },
        { icon: ClockIcon, title: "Same Day", desc: "Express delivery" },
        { icon: ShieldCheckIcon, title: "Secure Pay", desc: "Safe checkout" },
    ]

  return (
    <section className="bg-[#f7f5f0] py-6">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
            {
                hero_features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-3 rounded-2xl border border-[#e4ede8] bg-white px-4 py-4 shadow-sm">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#eaf5ef]">
                            <feature.icon size={18} className="text-[#2d6a4a]" />
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-[#1a2e22]">{feature.title}</p>
                            <p className="text-xs text-[#9abfaa]">{feature.desc}</p>
                        </div>
                    </div>
                ))
            }
        </div>
      </div>
    </section>
  )
}

export default Features