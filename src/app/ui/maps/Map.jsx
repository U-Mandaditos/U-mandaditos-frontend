'use client'
import { GoogleMap, useLoadScript } from "@react-google-maps/api";

const defaultContainerStyle = {
    width: "100vw",
    height: "100vh"
}

const defaultCenter = {
    lat: 14.0850336,
    lng: -87.1648681
}

export default function Map({children, containerStyle= defaultContainerStyle, center = defaultCenter, zoom=18}){

    const ApiKey = process.env.NEXT_PUBLIC_MAPS_API_KEY

    const {isLoaded} = useLoadScript({
        googleMapsApiKey: ApiKey
    });

    if (!isLoaded) return <p>Cargando mapa...</p>

    return (
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={zoom}>
            {children}
        </GoogleMap>
    )

}