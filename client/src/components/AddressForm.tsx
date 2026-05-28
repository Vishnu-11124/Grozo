import { XIcon } from "lucide-react"
import type { AddressFormData } from "../pages/Addresses"

interface AddressFormProps {
  resetForm: () => void
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  formData: AddressFormData
  setFormData: (e: React.ChangeEvent<HTMLInputElement>) => void
  editingId: string | null
}

const AddressForm = ({ resetForm, handleSubmit, formData, setFormData, editingId }: AddressFormProps) => {
  return (
    <div
      onClick={resetForm}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm px-4"
    >
      <form
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-2xl border border-[#e4ede8] bg-white p-6 shadow-xl"
      >
        {/* Header */}
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-base font-bold text-[#1a2e22]">
            {editingId ? "Edit Address" : "Add New Address"}
          </h2>
          <button
            type="button"
            onClick={resetForm}
            className="flex h-7 w-7 items-center justify-center rounded-lg border border-[#e4ede8] text-[#9abfaa] hover:text-[#1a2e22] transition"
          >
            <XIcon size={14} />
          </button>
        </div>

        <div className="space-y-4">

          {/* Label */}
          <div>
            <label htmlFor="label" className="mb-1.5 block text-xs font-medium text-[#3a5a46]">Label</label>
            <input
              type="text"
              name="label"
              id="label"
              value={formData.label}
              onChange={setFormData}
              placeholder="Home, Work, etc..."
              className="w-full rounded-xl border border-[#d8e8de] bg-[#f7f5f0] px-3 py-2.5 text-sm text-[#1a2e22] placeholder-[#b8d0c0] outline-none focus:border-[#2d6a4a] focus:ring-2 focus:ring-[#2d6a4a]/10 transition"
            />
          </div>

          {/* Street Address */}
          <div>
            <label htmlFor="address" className="mb-1.5 block text-xs font-medium text-[#3a5a46]">Street Address</label>
            <input
              type="text"
              name="address"
              id="address"
              value={formData.address}
              onChange={setFormData}
              placeholder="123 Main St"
              className="w-full rounded-xl border border-[#d8e8de] bg-[#f7f5f0] px-3 py-2.5 text-sm text-[#1a2e22] placeholder-[#b8d0c0] outline-none focus:border-[#2d6a4a] focus:ring-2 focus:ring-[#2d6a4a]/10 transition"
            />
          </div>

          {/* City + State */}
          <div className="flex gap-3">
            <div className="flex-1">
              <label htmlFor="city" className="mb-1.5 block text-xs font-medium text-[#3a5a46]">City</label>
              <input
                type="text"
                name="city"
                id="city"
                value={formData.city}
                onChange={setFormData}
                placeholder="New York"
                className="w-full rounded-xl border border-[#d8e8de] bg-[#f7f5f0] px-3 py-2.5 text-sm text-[#1a2e22] placeholder-[#b8d0c0] outline-none focus:border-[#2d6a4a] focus:ring-2 focus:ring-[#2d6a4a]/10 transition"
              />
            </div>
            <div className="w-24">
              <label htmlFor="state" className="mb-1.5 block text-xs font-medium text-[#3a5a46]">State</label>
              <input
                type="text"
                name="state"
                id="state"
                value={formData.state}
                onChange={setFormData}
                placeholder="NY"
                className="w-full rounded-xl border border-[#d8e8de] bg-[#f7f5f0] px-3 py-2.5 text-sm text-[#1a2e22] placeholder-[#b8d0c0] outline-none focus:border-[#2d6a4a] focus:ring-2 focus:ring-[#2d6a4a]/10 transition"
              />
            </div>
          </div>

          {/* Zip + Default */}
          <div className="flex items-end gap-3">
            <div className="flex-1">
              <label htmlFor="zip" className="mb-1.5 block text-xs font-medium text-[#3a5a46]">Zip Code</label>
              <input
                type="text"
                name="zip"
                id="zip"
                value={formData.zip}
                onChange={setFormData}
                placeholder="10001"
                className="w-full rounded-xl border border-[#d8e8de] bg-[#f7f5f0] px-3 py-2.5 text-sm text-[#1a2e22] placeholder-[#b8d0c0] outline-none focus:border-[#2d6a4a] focus:ring-2 focus:ring-[#2d6a4a]/10 transition"
              />
            </div>
            <div className="flex items-center gap-2 pb-2.5">
              <input
                type="checkbox"
                name="isDefault"
                id="isDefault"
                checked={formData.isDefault}
                onChange={setFormData}
                className="h-4 w-4 accent-[#2d6a4a] rounded"
              />
              <label htmlFor="isDefault" className="text-sm font-medium text-[#3a5a46] cursor-pointer">
                Set as Default
              </label>
            </div>
          </div>

        </div>

        {/* Submit */}
        <button
          type="submit"
          className="mt-6 w-full rounded-xl bg-[#1e3a2f] py-3 text-sm font-semibold text-white transition hover:bg-[#2d6a4a] active:scale-[0.99]"
        >
          {editingId ? "Update Address" : "Save Address"}
        </button>
      </form>
    </div>
  )
}

export default AddressForm