import {isObjEmpty} from "../../Utils";
import {useEffect, useMemo, useRef, useState} from "react";
import toastFactory from "../../factories/toastFactory";
import {Marker, useMapEvents} from 'react-leaflet';
import L from 'leaflet';

export const MAX_ZOOM = 25;
const defaultLatitude = 30.1,
    defaultLongitude = 29.1;


const useLocationPicker = ({defaultCoordinates, onCoordinateSelect, mapRef, readonly = false}) => {
    const getValidPoint = (latitude: number) => {
        return latitude === null || latitude === undefined ? defaultLatitude : latitude;
    }
    const isReadonly = () => readonly

    const coordinatesAdapter = (position) => {
        const coordinates = {}

        if (position.latitude !== undefined) {
            coordinates.lat = position.latitude;
        }

        if (position.longitude !== undefined) {
            coordinates.lng = position.longitude;
        }

        return isObjEmpty(coordinates) ? null : coordinates;
    }

    const defaultPosition = coordinatesAdapter(defaultCoordinates);

    delete L.Icon.Default.prototype._getIconUrl;

    L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
        iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png'
    });

    const [position, setPosition] = useState(defaultPosition);

    const memoizedPosition = useMemo(() => position, [position]);

    useEffect(() => {
        if (defaultCoordinates) {
            if (defaultCoordinates.latitude !== position?.lat || defaultCoordinates.longitude !== position?.lng) {
                setPosition({lat: defaultCoordinates.latitude, lng: defaultCoordinates.longitude});
            }
        }
    }, [defaultCoordinates]);

    const syncView = (latitude, longitude, zoom = null) => {
        mapRef.current?.flyTo([getValidPoint(latitude), getValidPoint(longitude) || defaultLongitude], zoom || mapRef.current.getZoom());
    }

    const updatePosition = (latitude, longitude) => {
        setPosition({lat: latitude, lng: longitude});
        onCoordinateSelect(latitude, longitude);
    }

    const setToCurrentLocation = (zoom = null) => {
        mapRef.current.locate({
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        }).on('locationfound', (event) => {
            const {lat, lng} = event.latlng;
            updatePosition(lat, lng);
            syncView(lat, lng, zoom);
        });

    //     navigator.geolocation.getCurrentPosition(
    //         (position) => {
    //             const latitude = position.coords.latitude,
    //                 longitude = position.coords.longitude;
    //
    //             updatePosition(latitude, longitude);
    //             syncView(latitude, longitude, zoom);
    //         },
    //         () => {
    //             toastFactory.error('Please grant location privileges to get the current location');
    //             setTimeout(() => toastFactory.dismiss(), 1000);
    //             updatePosition(defaultLatitude, defaultLongitude);
    //             syncView(defaultLatitude, defaultLongitude, zoom);
    //         },
    //         {
    //             enableHighAccuracy: true,
    //             timeout: 5000,
    //             maximumAge: 0
    //         }
    // );
    }

    const handleMarkerDragEnd = (e) => {
        updatePosition(e.target.getLatLng().lat, e.target.getLatLng().lng);
    };

    const LocationMarker = () => {
        const markerRef = useRef(null);

        if (!isReadonly()) {
            useMapEvents({
                dblclick() {
                    setToCurrentLocation(MAX_ZOOM);
                },
                contextmenu(e) {
                    const {lat, lng} = e.latlng;
                    updatePosition(lat, lng);
                }
            });
        }

        return memoizedPosition === null ? null : (
            <Marker
                position={memoizedPosition}
                draggable={!isReadonly()}
                eventHandlers={{dragend: handleMarkerDragEnd}}
                ref={markerRef}
            ></Marker>
        );
    };

    useEffect(() => {
        if (memoizedPosition) {
            syncView(memoizedPosition.lat, memoizedPosition.lng);
        }
    }, [memoizedPosition]);

    return {syncView, position: memoizedPosition, LocationMarker, isReadonly};
}

export default useLocationPicker;
