import { useMapEvents } from 'react-leaflet';
import type { LatLng } from './model/model';

export interface CenterTrackerProps {
    onCenterChange: (center: LatLng) => void;
}

function CenterTracker({ onCenterChange }: CenterTrackerProps) {
    useMapEvents({
        moveend: (event) => {
            const map = event.target;
            const center = map.getCenter();
            onCenterChange({ lat: center.lat, lng: center.lng }); // callback to parent
        },
    });

    return null;
}

export default CenterTracker;