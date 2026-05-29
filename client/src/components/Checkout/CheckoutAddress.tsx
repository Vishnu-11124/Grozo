import { ChevronRightIcon, MapPinIcon, PlusIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

const CheckoutAddress = ({ user, address, setAddress, setStep }: any) => {
    return (
        <div className="rounded-2xl border border-[#e4ede8] bg-white p-6">
            <h2 className="mb-5 flex items-center gap-2 text-base font-bold text-[#1a2e22]">
                <MapPinIcon size={17} className="text-[#2d6a4a]" /> Delivery Address
            </h2>

            {user?.addresses && user.addresses.length > 0 && (
                <div className="mb-6">
                    <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#9abfaa]">Saved Addresses</h3>
                    <div className="grid gap-3 sm:grid-cols-2">
                        {user.addresses.map((addr: any) => {
                            const isSelected = address.label === addr.label && address.address === addr.address
                            return (
                                <div
                                    key={addr._id || addr.label}
                                    onClick={() => setAddress({ label: addr.label, address: addr.address, city: addr.city, state: addr.state, zip: addr.zip, lat: addr.lat, lng: addr.lng })}
                                    className={`cursor-pointer rounded-xl border p-4 transition ${
                                        isSelected
                                            ? "border-[#2d6a4a] bg-[#eaf5ef]"
                                            : "border-[#e4ede8] hover:bg-[#f7f5f0]"
                                    }`}
                                >
                                    <div className="mb-1 flex items-center gap-2">
                                        <MapPinIcon size={14} className={isSelected ? "text-[#2d6a4a]" : "text-[#9abfaa]"} />
                                        <span className="text-sm font-semibold text-[#1a2e22]">{addr.label}</span>
                                        {addr.isDefault && (
                                            <span className="rounded-full bg-[#eaf5ef] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#2d6a4a]">
                                                Default
                                            </span>
                                        )}
                                    </div>
                                    <p className="truncate text-sm text-[#3a5a46]">{addr.address}</p>
                                    <p className="text-xs text-[#9abfaa]">{addr.city}, {addr.state} {addr.zip}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            )}

            <Link
                to="/addresses"
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#d8e8de] py-3 text-sm font-medium text-[#3a5a46] transition hover:bg-[#f7f5f0]"
            >
                Add New Address <PlusIcon size={14} />
            </Link>

            <button
                onClick={() => { setStep("payment"); scrollTo(0, 0) }}
                disabled={!address.address || !address.city}
                className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-[#1e3a2f] py-3 text-sm font-semibold text-white transition hover:bg-[#2d6a4a] disabled:opacity-50"
            >
                Continue to Payment <ChevronRightIcon size={15} />
            </button>
        </div>
    )
}

export default CheckoutAddress