import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import { useEffect, useRef, useState } from 'react';
import AddMarker from './AddMarker';
import { Icon, latLngBounds } from 'leaflet';
import type { Address, FeedbackData, LatLng, MarkerData } from './model/model';
import CenterTracker from './CenterTracker';
import AddressAutoComplete from './AddressAutoComplete';
import type { Map } from 'react-leaflet';
import Feedback from './Feedback';

const weakIcon = new Icon({
    iconUrl: "https://maps.gstatic.com/mapfiles/ms2/micons/orange-dot.png",
    iconSize: [32, 32],
});

const noSignalIcon = new Icon({
    iconUrl: "https://maps.gstatic.com/mapfiles/ms2/micons/red-dot.png",
    iconSize: [32, 32],
});

function SignalMap() {
    const [markers, setMarkers] = useState<MarkerData[]>([]);
    const [newMarker, setNewMarker] = useState<LatLng | null>(null);

    const mapRef = useRef<Map>(null);

    const [mapCenter, setMapCenter] = useState({ lat: 45.734, lng: 21.317 });
    // const [mapCenter, setMapCenter] = useState({ lat: 28.4584742, lng: 77.071673 });

    useEffect(() => {
        const bounds = latLngBounds(markers.map(m => [m.lat, m.lng]));
        if (bounds.isValid() && mapRef.current) {
            mapRef.current.fitBounds(bounds, { padding: [50, 50] });
        }
    }, [markers]);

    const onAddressSelect = (address: Address) => {
        setNewMarker({ lat: address.lat, lng: address.lng });
        if (mapRef.current) {
            mapRef.current.flyTo([address.lat, address.lng], mapRef.current.getZoom());
        }
    };

    const onFeedbackSubmit = (data: FeedbackData) => {
        if (newMarker) {
            setMarkers([...markers, { ...newMarker, ...data }]);
            setNewMarker(null);
        }
    };

    return (
        <>
            <MapContainer center={[mapCenter.lat, mapCenter.lng]} zoom={13} scrollWheelZoom={true}
                ref={mapRef}
                className='flex-grow'>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {markers.map((marker, index) => (
                    <Marker
                        key={index}
                        position={[marker.lat, marker.lng]}
                        icon={marker.category === "weak" ? weakIcon : noSignalIcon}
                    >
                        <Popup>
                            <b>{marker.category === "weak" ? "Weak signal" : "No signal"}</b>
                            <br />
                            {marker.comment}
                        </Popup>
                    </Marker>
                ))}

                <AddMarker onAdd={setNewMarker} />
                <CenterTracker onCenterChange={setMapCenter} />

                {newMarker && (
                    <Marker position={[newMarker.lat, newMarker.lng]}>
                        <Popup minWidth={320}>
                            <Feedback onFeedbackSubmit={onFeedbackSubmit} />
                        </Popup>
                    </Marker>
                )}
                <AddressAutoComplete center={mapCenter} onSelect={onAddressSelect} />
            </MapContainer>
        </>
    )
}

export default SignalMap;