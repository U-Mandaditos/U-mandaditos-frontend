'use client'
import Map from "@/app/ui/maps/Map";
import { Marker } from "@react-google-maps/api";

export default function Page(){

    const data = {
        locations: [
            {name: "B1", lat: 14.085702545109877, lng: -87.16405980974288},
            {name: "D1", lat: 14.086233263224592, lng: -87.16176920340882}
        ]
    }

    return (<Map>
        {data.locations.map(({ name, lat, lng }, index) => <Marker key={index} position={{ lat, lng }} label={name}></Marker>)}
    </Map>)
}