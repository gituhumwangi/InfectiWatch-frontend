import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';

const DiseaseMap = ({ location, diseases }) => {
    const position = [location.lat, location.lng];

    return (
        <div className="w-full h-96">
            <MapContainer center={position} zoom={12} style={{ width: '100%', height: '100%' }}>
                <TileLayer
                    url="https://media.istockphoto.com/id/1307738023/vector/pastel-map-of-kenya.jpg?s=612x612&w=0&k=20&c=bMkpK-rWwVinbdyWkS9j6yvAx5Gw3Wh9RR6kHqyhsow="
                    attribution='&copy; <a href="https://media.istockphoto.com/id/1307738023/vector/pastel-map-of-kenya.jpg?s=612x612&w=0&k=20&c=bMkpK-rWwVinbdyWkS9j6yvAx5Gw3Wh9RR6kHqyhsow=">OpenStreetMap</a> contributors'
                />

                {diseases.map((disease) => (
                    <Marker
                        key={disease.id}
                        position={[disease.lat, disease.lng]}
                    >
                        <Popup>{disease.name}</Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
};

export default DiseaseMap;
