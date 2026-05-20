import { MailIcon } from "lucide-react"

const NewsLetter = () => {
  return (
    <section className="bg-[#1e3a2f] py-16">
      <div className="mx-auto max-w-2xl px-4 text-center md:px-6">

        <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#5db87a]/20">
          <MailIcon size={26} className="text-[#5db87a]" />
        </div>

        <h2 className="text-2xl font-bold text-white md:text-3xl">Subscribe to our newsletter</h2>

        <p className="mt-3 text-sm leading-relaxed text-white/50">
          Stay updated with fresh groceries, seasonal offers, and exclusive savings made just for you.
        </p>

        <form onSubmit={(e) => e.preventDefault()} className="mt-8">
          <div className="flex overflow-hidden rounded-xl border border-white/10 bg-white/10 p-1.5 backdrop-blur-sm">
            <input
              type="email"
              placeholder="Enter your email address"
              required
              className="flex-1 bg-transparent px-3 text-sm text-white placeholder-white/30 outline-none"
            />
            <button
              type="submit"
              className="shrink-0 rounded-lg bg-[#5db87a] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#4caa6a] active:scale-[0.98]"
            >
              Subscribe
            </button>
          </div>
        </form>

      </div>
    </section>
  )
}

export default NewsLetter