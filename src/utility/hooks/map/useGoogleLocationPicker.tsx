import { useEffect, useMemo, useState } from "react";
// import { Marker } from "@react-google-maps/api";

export const MAX_ZOOM = 18;  // Adjust as needed

const defaultLatitude = 30.1,
    defaultLongitude = 29.1;

const useLocationPicker = ({ defaultCoordinates, onCoordinateSelect, mapRef, readonly = false }) => {
    const getValidPoint = (latitude) => {
        return latitude === null || latitude === undefined ? defaultLatitude : latitude;
    };

    const isReadonly = () => readonly;

    const coordinatesAdapter = (position) => {
        const coordinates = {};
        if (position.latitude !== undefined) coordinates.lat = position.latitude;
        if (position.longitude !== undefined) coordinates.lng = position.longitude;
        return coordinates;
    };

    const defaultPosition = coordinatesAdapter(defaultCoordinates);
    const [position, setPosition] = useState(defaultPosition);
    const memoizedPosition = useMemo(() => position, [position]);

    useEffect(() => {
        if (defaultCoordinates && (defaultCoordinates.latitude !== position?.lat || defaultCoordinates.longitude !== position?.lng)) {
            setPosition({ lat: defaultCoordinates.latitude, lng: defaultCoordinates.longitude });
        }
    }, [defaultCoordinates]);

    const syncView = (latitude, longitude, zoom = null) => {
        mapRef.current?.panTo({ lat: getValidPoint(latitude), lng: getValidPoint(longitude) || defaultLongitude });
        mapRef.current?.setZoom(zoom || MAX_ZOOM);
    };

    const updatePosition = (latitude, longitude) => {
        setPosition({ lat: latitude, lng: longitude });
        onCoordinateSelect(latitude, longitude);
    };

    const LocationMarker = () => {
        return memoizedPosition === null ? null : (
            <Marker
                position={memoizedPosition}
                draggable={!isReadonly()}
                onDragEnd={(e) => updatePosition(e.latLng.lat(), e.latLng.lng())}
            />
        );
    };

    return { syncView, position: memoizedPosition, LocationMarker, isReadonly };
};

export default useLocationPicker;
