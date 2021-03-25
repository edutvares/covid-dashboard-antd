import {useEffect}from "react"
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import "./style.css";
import 'leaflet/dist/leaflet.css';

import { useLocation } from "react-router-dom"

import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;

export default function Map({ data }) {

  const position = [-10.9095, -37.0748]

  return (
      <MapContainer className="map-container" center={position} zoom={1.5} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/*data.dataSource.map((country, key) => {
          return (
            <Marker position={[51.505, -0.09]} key={key}>
              <Popup>
                {country.Country}
              </Popup>
            </Marker>
          )
        })*/}
        
        
      </MapContainer>
  )
}
