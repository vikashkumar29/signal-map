import type { Marker } from 'leaflet';
import { useRef } from 'react';
import { Marker as ReactMarker, type MarkerProps } from 'react-leaflet';

function ExtendedMarker({ children, ...props }: MarkerProps) {
    const markerRef = useRef<Marker>(null);

    const onAdd = () => {
        if (markerRef.current) {
            markerRef.current.openPopup();
        }
    };

    return (<ReactMarker ref={markerRef} {...props} eventHandlers={{add: onAdd}}> { children }</ReactMarker >);
}

export default ExtendedMarker;
