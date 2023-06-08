import React, { useState, useEffect, Component } from "react";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import SitesToolbar from "../../components/sites/SitesToolbar";

import { GoogleMap, withScriptjs, withGoogleMap, Marker } from 'react-google-maps';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';

export default function Dashboard() {

	return (
		<DashboardLayout scope={"planning"}>

            <SitesToolbar/>

            {/* <div className="w-[80vw]">
                Ahojte
            </div> */}

            <MapComponent/>
            
        </DashboardLayout>
	);
}

function MapComponent() {
    const [mapPosition, setMapPosition] = useState({ lat: 0, lng: 0 });
  
    const handleSelect = async ({ value }) => {
      const results = await geocodeByPlaceId(value.place_id);
      const { lat, lng } = results[0].geometry.location;
      setMapPosition({ lat, lng });
    };
  
    return (
      <div style={{ width: "100vw", height: "100vh" }}>
        <GooglePlacesAutocomplete
          onSelect={handleSelect}
          placeholder='Search for a place'
        />
        <MapWrapped
          key={`${mapPosition.lat}-${mapPosition.lng}`}
          googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyD06BvNjUFJ94-GC8ItmyBXaBJhxJyMR7Q`}
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `50%` }} />}
          mapElement={<div style={{ height: `100%` }} />}
          center={mapPosition}
        />
      </div>
    );
  }

const Map = ({ center }) => {
    return (
      <GoogleMap
        defaultZoom={8}
        center={center}
      >
        {center.lat !== 0 && <Marker position={center} />}
      </GoogleMap>
    );
  }

const MapWrapped = withScriptjs(withGoogleMap(Map));
