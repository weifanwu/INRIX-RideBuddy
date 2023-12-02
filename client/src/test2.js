import React, { useState } from 'react';
import { APIProvider, Map, AdvancedMarker, Pin, InfoWindow } from "@vis.gl/react-google-maps";
// import {useDirectionsService} from '@vis.gl/react-google-maps-hooks';


function App() {
  // the center Marker at the beginning
  const center = { lat: 47.625168, lng: -122.337751 };
  const API_KEY = process.env.REACT_APP_MAPS_API_KEY;
  const MAP_ID = process.env.REACT_APP_MAP_ID;
  const [open, setOpen] = useState(false);

  return (
    <APIProvider apiKey={API_KEY}>
      <div style={{height: "100vh", width: "100%"}}>
      <Map zoom={9} center={center} mapId={MAP_ID}>
        <AdvancedMarker position={center} onClick={() => setOpen(true)}>
          <Pin background={"pink"} borderColor={"pink"} glyphColor={"purple"} />
        </AdvancedMarker>
        {open && (
          <InfoWindow position={center} onCloseClick={() => setOpen(false)}>
            <p>It's a start position!</p>
          </InfoWindow>
        )}
      </Map>
      </div>
  </APIProvider>
  )

}

export default App
