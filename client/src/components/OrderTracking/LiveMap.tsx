import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { MapPinIcon, TruckIcon } from "lucide-react";
import ReactDOMServer from 'react-dom/server';

import L from "leaflet";
import { useEffect } from "react";
import "leaflet/dist/leaflet.css";

export default function LiveMap({ order, liveLocation }: { order: any, liveLocation: any }) {

    const truckSvg = ReactDOMServer.renderToStaticMarkup(
        <TruckIcon size={36} color="#111827" />
    );
    const truckIcon = L.divIcon({
        html: truckSvg,
        className: '',
        iconSize: [36, 36],
        iconAnchor: [18, 36],
        popupAnchor: [0, -36],
    });

    const mapPinSvg = ReactDOMServer.renderToStaticMarkup(
        <MapPinIcon size={32} color="#059669" />
    );
    const destinationIcon = L.divIcon({
        html: mapPinSvg,
        className: '',
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32],
    });

    function MapUpdater({ center }: { center: [number, number] }) {
        const map = useMap();
        useEffect(() => {
            map.setView(center, map.getZoom());
        }, [center, map]);
        return null;
    }

    return (
        <>
            {order.status !== "Delivered" && order.status !== "Cancelled" && (
                <div className="overflow-hidden rounded-2xl border border-[#e4ede8]" style={{ height: 280 }}>
                    {liveLocation && liveLocation.lat !== 0 ? (
                        <MapContainer center={[liveLocation.lat, liveLocation.lng]} zoom={15} style={{ height: "100%", width: "100%" }} zoomControl={false}>
                            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                            <Marker position={[liveLocation.lat, liveLocation.lng]} icon={truckIcon}>
                                <Popup>Delivery Partner</Popup>
                            </Marker>
                            {order.shippingAddress.lat && order.shippingAddress.lng && (
                                <Marker position={[order.shippingAddress.lat, order.shippingAddress.lng]} icon={destinationIcon}>
                                    <Popup>Delivery Address</Popup>
                                </Marker>
                            )}
                            <MapUpdater center={[liveLocation.lat, liveLocation.lng]} />
                        </MapContainer>
                    ) : order.shippingAddress.lat && order.shippingAddress.lng ? (
                        <MapContainer center={[order.shippingAddress.lat, order.shippingAddress.lng]} zoom={15} style={{ height: "100%", width: "100%" }} zoomControl={false}>
                            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                            <Marker position={[order.shippingAddress.lat, order.shippingAddress.lng]} icon={destinationIcon}>
                                <Popup>Delivery Address</Popup>
                            </Marker>
                        </MapContainer>
                    ) : (
                        <div className="flex h-full flex-col items-center justify-center gap-2 bg-[#eaf5ef]">
                            <MapPinIcon size={32} className="text-[#9abfaa]" />
                            <p className="text-sm font-medium text-[#9abfaa]">Waiting for delivery partner location...</p>
                        </div>
                    )}
                </div>
            )}
        </>
    )
}