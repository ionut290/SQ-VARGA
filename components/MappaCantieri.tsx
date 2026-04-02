'use client';

import 'leaflet/dist/leaflet.css';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import L from 'leaflet';

type MarkerData = {
  id: string;
  nomeCantiere: string;
  nomeCommessa: string;
  indirizzo: string;
  comune: string;
  statoCantiere: string;
  latitudine: number;
  longitudine: number;
};

const colors: Record<string, string> = {
  PIANIFICATO: '#f59e0b',
  IN_CORSO: '#2563eb',
  COMPLETATO: '#16a34a',
  BLOCCATO: '#dc2626'
};

function makeIcon(stato: string) {
  return L.divIcon({
    className: 'marker-custom',
    html: `<span style="display:block;width:16px;height:16px;border-radius:50%;background:${colors[stato] ?? '#64748b'};border:2px solid white"></span>`,
    iconSize: [16, 16],
    iconAnchor: [8, 8]
  });
}

export function MappaCantieri({ cantieri }: { cantieri: MarkerData[] }) {
  const center: [number, number] = cantieri.length
    ? [cantieri[0].latitudine, cantieri[0].longitudine]
    : [41.9028, 12.4964];

  return (
    <MapContainer center={center} zoom={7} style={{ height: '500px', width: '100%', borderRadius: 12 }}>
      <TileLayer attribution='&copy; OpenStreetMap contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {cantieri.map((cantiere) => (
        <Marker
          key={cantiere.id}
          position={[cantiere.latitudine, cantiere.longitudine]}
          icon={makeIcon(cantiere.statoCantiere)}
        >
          <Popup>
            <strong>{cantiere.nomeCantiere}</strong>
            <br />
            Commessa: {cantiere.nomeCommessa}
            <br />
            {cantiere.indirizzo} - {cantiere.comune}
            <br />
            Stato: {cantiere.statoCantiere}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
