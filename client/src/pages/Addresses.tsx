import { useState } from "react"
import type { Address } from "../types"
import { MapPinIcon, PlusIcon } from "lucide-react"
import AddressCard from "../components/AddressCard"
import AddressForm from "../components/AddressForm"

const dummyAddressData: Address[] = [
  { label: "Home", address: "123 Main St", city: "New York", state: "NY", zip: "10001", isDefault: true, lat: 40.7128, lng: -74.006, _id: "69d3652df9a340288f1a0f8c" },
  { label: "Work", address: "456 Market St", city: "New York", state: "NY", zip: "10002", isDefault: false, lat: 40.7128, lng: -74.006, _id: "69d3652df9a340288f1a0f8d" },
]

export type AddressFormData = {
  label: string
  address: string
  city: string
  state: string
  zip: string
  isDefault: boolean
}

const initialFormData: AddressFormData = {
  label: "", address: "", city: "", state: "", zip: "", isDefault: false,
}

const Addresses = () => {
  const [addresses, setAddresses] = useState<Address[]>(dummyAddressData)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState<AddressFormData>(initialFormData)

  const resetForm = () => {
    setFormData(initialFormData)
    setShowForm(false)
    setEditingId(null)
  }

  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Backend logic later
  }

  const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }))
  }

  const handleEditAddress = (address: Address) => {
    setFormData({ label: address.label, address: address.address, city: address.city, state: address.state, zip: address.zip, isDefault: address.isDefault })
    setEditingId(address._id)
    setShowForm(true)
  }

  return (
    <div className="min-h-screen bg-[#f7f5f0]">
      <div className="mx-auto max-w-2xl px-4 py-10 md:px-6">

        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-[#1a2e22]">My Addresses</h2>
          <button
            onClick={() => { resetForm(); setShowForm(true) }}
            className="flex items-center gap-1.5 rounded-xl bg-[#1e3a2f] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#2d6a4a] active:scale-[0.98]"
          >
            <PlusIcon size={15} /> Add New Address
          </button>
        </div>

        {/* Form modal */}
        {showForm && (
          <AddressForm
            resetForm={resetForm}
            handleSubmit={handleSubmitForm}
            formData={formData}
            setFormData={inputChange}
            editingId={editingId}
          />
        )}

        {/* Address list */}
        {addresses.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-[#e4ede8] bg-white py-16 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#eaf5ef]">
              <MapPinIcon size={24} className="text-[#9abfaa]" />
            </div>
            <p className="text-sm font-medium text-[#3a5a46]">No addresses found.</p>
            <p className="text-xs text-[#9abfaa]">Add a delivery address to get started</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {addresses.map((address) => (
              <AddressCard
                key={address._id}
                address={address}
                onEditHandler={handleEditAddress}
                setAddresses={setAddresses}
              />
            ))}
          </div>
        )}

      </div>
    </div>
  )
}

export default Addresses