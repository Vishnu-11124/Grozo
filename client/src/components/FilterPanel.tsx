const FilterPanel = ({
  categories,
  category,
  minPrice,
  maxPrice,
  updateFilter,
  clearFilters,
  hashFilters,
}: any) => {
  const categoriesAll = [{ slug: "", name: "All Categories" }, ...categories];

  return (
    <div className="space-y-6">
      {/* Categories */}
      <div>
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#9abfaa]">
          Categories
        </h3>
        <div className="flex flex-col gap-1">
          {categoriesAll.map((c: any) => (
            <button
              key={c.slug}
              onClick={() => updateFilter("category", c.slug)}
              className={`w-full rounded-xl px-3 py-2 text-left text-sm transition ${
                category === c.slug
                  ? "bg-[#1e3a2f] font-semibold text-white"
                  : "text-[#3a5a46] hover:bg-[#f7f5f0]"
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#9abfaa]">
          Price Range
        </h3>
        <div className="flex items-center gap-2">
          <input
            type="number"
            placeholder="Min"
            value={minPrice}
            onChange={(e) => updateFilter("minPrice", e.target.value)}
            className="w-full rounded-xl border border-[#d8e8de] bg-[#f7f5f0] px-3 py-2 text-sm text-[#1a2e22] outline-none focus:border-[#2d6a4a] focus:ring-2 focus:ring-[#2d6a4a]/10"
          />
          <span className="shrink-0 text-sm text-[#9abfaa]">–</span>
          <input
            type="number"
            placeholder="Max"
            value={maxPrice}
            onChange={(e) => updateFilter("maxPrice", e.target.value)}
            className="w-full rounded-xl border border-[#d8e8de] bg-[#f7f5f0] px-3 py-2 text-sm text-[#1a2e22] outline-none focus:border-[#2d6a4a] focus:ring-2 focus:ring-[#2d6a4a]/10"
          />
        </div>
      </div>

      {/* Clear filters */}
      {hashFilters && (
        <button
          onClick={clearFilters}
          className="w-full rounded-xl border border-[#d8e8de] py-2 text-sm font-medium text-[#3a5a46] transition hover:bg-[#f7f5f0]"
        >
          Clear Filters
        </button>
      )}
    </div>
  );
};

export default FilterPanel;
