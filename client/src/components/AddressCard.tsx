import { CheckIcon, MapPinIcon, PencilIcon, TrashIcon } from "lucide-react"
import type { Address } from "../types"

interface AddressCardProps {
  address: Address
  onEditHandler: (address: Address) => void
  setAddresses: React.Dispatch<React.SetStateAction<Address[]>>
}

const AddressCard = ({ address, onEditHandler }: AddressCardProps) => {
  const handleDeleteAddress = async (id: string) => {
    console.log(id)
    // Backend logic later
  }

  return (
    <div className={`flex items-start justify-between gap-4 rounded-2xl border bg-white p-4 transition ${address.isDefault ? "border-[#2d6a4a]" : "border-[#e4ede8]"}`}>

      {/* Left */}
      <div className="flex items-start gap-3">
        <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${address.isDefault ? "bg-[#1e3a2f]" : "bg-[#eaf5ef]"}`}>
          <MapPinIcon size={16} className={address.isDefault ? "text-white" : "text-[#2d6a4a]"} />
        </div>

        <div>
          <div className="flex items-center gap-2">
            <p className="text-sm font-semibold text-[#1a2e22]">{address.label}</p>
            {address.isDefault && (
              <span className="flex items-center gap-1 rounded-full bg-[#eaf5ef] px-2 py-0.5 text-[10px] font-semibold text-[#2d6a4a]">
                <CheckIcon size={10} /> Default
              </span>
            )}
          </div>
          <p className="mt-0.5 text-xs leading-relaxed text-[#7a9486]">
            {address.address}, {address.city},<br />
            {address.state} {address.zip}
          </p>
        </div>
      </div>

      {/* Right */}
      <div className="flex shrink-0 items-center gap-1.5">
        <button
          onClick={() => onEditHandler(address)}
          className="flex h-8 w-8 items-center justify-center rounded-xl border border-[#d8e8de] text-[#9abfaa] transition hover:border-[#2d6a4a] hover:text-[#2d6a4a]"
        >
          <PencilIcon size={13} />
        </button>
        <button
          onClick={() => handleDeleteAddress(address._id)}
          className="flex h-8 w-8 items-center justify-center rounded-xl border border-[#d8e8de] text-[#9abfaa] transition hover:border-red-300 hover:text-red-400"
        >
          <TrashIcon size={13} />
        </button>
      </div>

    </div>
  )
}

export default AddressCard