import { useMapEvents } from 'react-leaflet';
import type { LatLng } from './model/model';

export interface AddMarkerProps {
    onAdd: (coords: LatLng) => void;
}

function AddMarker({ onAdd }: AddMarkerProps) {
    useMapEvents({
        click: (event) => {
            if (!(event.originalEvent.target as HTMLElement)?.classList.contains('p-inputtext')) {
                const { lat, lng } = event.latlng;
                onAdd({ lat, lng });
            }
        },
    });
    return null;
}

export default AddMarker;