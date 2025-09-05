import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import { useEffect, useRef, useState } from 'react';
import AddMarker from './AddMarker';
import { Icon, latLngBounds, Map } from 'leaflet';
import type { Address, FeedbackData, LatLng, MarkerData } from './model/model';
import CenterTracker from './CenterTracker';
import AddressAutoComplete from './AddressAutoComplete';
import Feedback from './Feedback';
import { addDoc, collection, onSnapshot } from 'firebase/firestore';
import { firestore } from './api/firebaseApi';
import Summary from './model/Summary';
import ExtendedMarker from './api/ExtendedMarker';

const weakIcon = new Icon({
    iconUrl: "https://maps.gstatic.com/mapfiles/ms2/micons/orange-dot.png",
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
});

const noSignalIcon = new Icon({
    iconUrl: "https://maps.gstatic.com/mapfiles/ms2/micons/red-dot.png",
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
});

const defaultIcon = new Icon({
    iconUrl: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAApCAYAAADAk4LOAAAFgUlEQVR4Aa1XA5BjWRTN2oW17d3YaZtr2962HUzbDNpjszW24mRt28p47v7zq/bXZtrp/lWnXr337j3nPCe85NcypgSFdugCpW5YoDAMRaIMqRi6aKq5E3YqDQO3qAwjVWrD8Ncq/RBpykd8oZUb/kaJutow8r1aP9II0WmLKLIsJyv1w/kqw9Ch2MYdB++12Onxee/QMwvf4/Dk/Lfp/i4nxTXtOoQ4pW5Aj7wpici1A9erdAN2OH64x8OSP9j3Ft3b7aWkTg/Fm91siTra0f9on5sQr9INejH6CUUUpavjFNq1B+Oadhxmnfa8RfEmN8VNAsQhPqF55xHkMzz3jSmChWU6f7/XZKNH+9+hBLOHYozuKQPxyMPUKkrX/K0uWnfFaJGS1QPRtZsOPtr3NsW0uyh6NNCOkU3Yz+bXbT3I8G3xE5EXLXtCXbbqwCO9zPQYPRTZ5vIDXD7U+w7rFDEoUUf7ibHIR4y6bLVPXrz8JVZEql13trxwue/uDivd3fkWRbS6/IA2bID4uk0UpF1N8qLlbBlXs4Ee7HLTfV1j54APvODnSfOWBqtKVvjgLKzF5YdEk5ewRkGlK0i33Eofffc7HT56jD7/6U+qH3Cx7SBLNntH5YIPvODnyfIXZYRVDPqgHtLs5ABHD3YzLuespb7t79FY34DjMwrVrcTuwlT55YMPvOBnRrJ4VXTdNnYug5ucHLBjEpt30701A3Ts+HEa73u6dT3FNWwflY86eMHPk+Yu+i6pzUpRrW7SNDg5JHR4KapmM5Wv2E8Tfcb1HoqqHMHU+uWDD7zg54mz5/2BSnizi9T1Dg4QQXLToGNCkb6tb1NU+QAlGr1++eADrzhn/u8Q2YZhQVlZ5+CAOtqfbhmaUCS1ezNFVm2imDbPmPng5wmz+gwh+oHDce0eUtQ6OGDIyR0uUhUsoO3vfDmmgOezH0mZN59x7MBi++WDL1g/eEiU3avlidO671bkLfwbw5XV2P8Pzo0ydy4t2/0eu33xYSOMOD8hTf4CrBtGMSoXfPLchX+J0ruSePw3LZeK0juPJbYzrhkH0io7B3k164hiGvawhOKMLkrQLyVpZg8rHFW7E2uHOL888IBPlNZ1FPzstSJM694fWr6RwpvcJK60+0HCILTBzZLFNdtAzJaohze60T8qBzyh5ZuOg5e7uwQppofEmf2++DYvmySqGBuKaicF1blQjhuHdvCIMvp8whTTfZzI7RldpwtSzL+F1+wkdZ2TBOW2gIF88PBTzD/gpeREAMEbxnJcaJHNHrpzji0gQCS6hdkEeYt9DF/2qPcEC8RM28Hwmr3sdNyht00byAut2k3gufWNtgtOEOFGUwcXWNDbdNbpgBGxEvKkOQsxivJx33iow0Vw5S6SVTrpVq11ysA2Rp7gTfPfktc6zhtXBBC+adRLshf6sG2RfHPZ5EAc4sVZ83yCN00Fk/4kggu40ZTvIEm5g24qtU4KjBrx/BTTH8ifVASAG7gKrnWxJDcU7x8X6Ecczhm3o6YicvsLXWfh3Ch1W0k8x0nXF+0fFxgt4phz8QvypiwCCFKMqXCnqXExjq10beH+UUA7+nG6mdG/Pu0f3LgFcGrl2s0kNNjpmoJ9o4B29CMO8dMT4Q5ox8uitF6fqsrJOr8qnwNbRzv6hSnG5wP+64C7h9lp30hKNtKdWjtdkbuPA19nJ7Tz3zR/ibgARbhb4AlhavcBebmTHcFl2fvYEnW0ox9xMxKBS8btJ+KiEbq9zA4RthQXDhPa0T9TEe69gWupwc6uBUphquXgf+/FrIjweHQS4/pduMe5ERUMHUd9xv8ZR98CxkS4F2n3EUrUZ10EYNw7BWm9x1GiPssi3GgiGRDKWRYZfXlON+dfNbM+GgIwYdwAAAAASUVORK5CYII=",
    iconAnchor: [12, 41],
    popupAnchor: [0, -41],
});

function SignalMap() {
    const [markers, setMarkers] = useState<MarkerData[]>([]);
    const [newMarker, setNewMarker] = useState<LatLng | null>(null);

    const mapRef = useRef<Map>(null);
    const extent = useRef(false);

    const [mapCenter, setMapCenter] = useState({ lat: 45.734, lng: 21.317 });

    useEffect(() => {
        const unsub = onSnapshot(collection(firestore, "reports"), (snapshot) => {
            const data = snapshot.docs.map((doc) => doc.data() as MarkerData);
            if (data.length > 0 && mapRef.current && !extent.current) {
                const bounds = latLngBounds(data.map(m => [m.lat, m.lng]));
                extent.current = true;
                if (bounds.isValid() && mapRef.current) {
                    mapRef.current.fitBounds(bounds, { padding: [50, 50] });
                }
            }
            setMarkers(data);
        });
        return () => unsub();
    }, []);

    const onAddressSelect = (address: Address) => {
        setNewMarker({ lat: address.lat, lng: address.lng });
        if (mapRef.current) {
            mapRef.current.flyTo([address.lat, address.lng], mapRef.current.getZoom());
        }
    };

    const onFeedbackSubmit = async (data: FeedbackData) => {
        if (newMarker) {
            try {
                await addDoc(collection(firestore, "reports"), { ...newMarker, ...data });
                setMarkers([...markers, { ...newMarker, ...data }]);
                setNewMarker(null);
            } catch (error) {
                console.error("Error adding document: ", error);
            }
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
                        <Popup minWidth={320}>
                            <Summary markerData={marker} />
                        </Popup>
                    </Marker>
                ))}

                <AddMarker onAdd={setNewMarker} />
                <CenterTracker onCenterChange={setMapCenter} />

                {newMarker && (
                    <ExtendedMarker key={`${newMarker.lat}_${newMarker.lng}`} position={[newMarker.lat, newMarker.lng]} icon={defaultIcon}>
                        <Popup minWidth={320}>
                            <Feedback onFeedbackSubmit={onFeedbackSubmit} />
                        </Popup>
                    </ExtendedMarker>
                )}
                <AddressAutoComplete center={mapCenter} onSelect={onAddressSelect} />
            </MapContainer>
        </>
    )
}

export default SignalMap;