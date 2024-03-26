import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const data = {
    statusCode: 200,
    message: 'Thành công!',
    content: [
        {
            id: 1,
            name: 'Khải Sneaker',
            alias: 'khai-sneaker',
            latitude: '10.771663',
            longtitude: '106.669631',
            description: '379 sư vạn hạnh quận 10',
            image: 'https://shop.cyberlearn.vn/images/store1.jpg',
            deleted: false,
        },
        {
            id: 2,
            name: 'Hiếu Sneaker',
            alias: 'hieu-sneaker',
            latitude: '10.766579',
            longtitude: '106.665268',
            description: '589 3 tháng 2 quận 10',
            image: 'https://shop.cyberlearn.vn/images/store2.jpg',
            deleted: false,
        },
        {
            id: 3,
            name: 'Nguyên Sneaker',
            alias: 'nguyen-sneaker',
            latitude: '10.768494',
            longtitude: '106.666778',
            description: '46 thành thái quận 10',
            image: 'https://shop.cyberlearn.vn/images/store3.jpg',
            deleted: false,
        },
    ],
    dateTime: '2024-03-26T05:15:29.6294921+07:00',
};

const Store = () => {
    const mapRef = useRef(null);

    useEffect(() => {
        if (!mapRef.current) {
            mapRef.current = L.map('map').setView([10.771663, 106.669631], 13);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
            }).addTo(mapRef.current);

            const icon = L.icon({
                iconUrl: 'https://www.freeiconspng.com/thumbs/retail-store-icon/retail-store-icon-18.png',
                iconSize: [20, 20],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowSize: [41, 41],
            });

            const markers = data.content.map(item => {
                return L.marker([item.latitude, item.longtitude], {
                    icon,
                })
                    .addTo(mapRef.current)
                    .bindPopup(`<b>${item.name}</b><br>${item.description}`)
                    .openPopup();
            });

            const group = new L.featureGroup(markers);
            mapRef.current.fitBounds(group.getBounds());
        }
    }, [mapRef]);

    return (
        <div style={{ display: 'flex', width: '100%', height: '600px', margin: 'auto', maxWidth: '1200px' }}>
            <div id='map' style={{ flex: '1', minWidth: '800px' }}></div>
            <div style={{ flex: '1', overflowY: 'auto' }}>
                <ul>
                    {data.content.map((item, index) => (
                        <li key={index}>
                            <h2>{item.name}</h2>
                            <p>{item.description}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Store;
