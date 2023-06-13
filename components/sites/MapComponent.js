import React, { useState, useRef, useCallback } from "react";
import { GoogleMap, Marker, useJsApiLoader, StandaloneSearchBox } from "@react-google-maps/api";
import { debounce } from "lodash";
import { TextField } from "@mui/material";

const libraries = ["places"];
const mapContainerStyle = {
  width: "60vw",
  height: "30vh",
  borderRadius: "10px",
  marginTop: "10px",
  boxShadow: "0 0 200px rgba(0,0,0,0.9) inset"
};

export default function MapComponent({ value, setValue, center, setCenter }) {

    const [zoom, setZoom] = useState(7)
    
    const [showMap, setShowMap] = useState(false)
  
    const { isLoaded } = useJsApiLoader({
      id: "google-map-script",
      // googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
      googleMapsApiKey: "AIzaSyD06BvNjUFJ94-GC8ItmyBXaBJhxJyMR7Q",
      
      libraries,
    });
  
    const [marker, setMarker] = useState(null);
    const [mapRef, setMapRef] = useState(null);
    const searchBoxRef = useRef(null);
  
    const onMapLoad = useCallback((map) => {
      setMapRef(map);
    }, []);
  
    const onSearchBoxLoad = useCallback((ref) => {
      searchBoxRef.current = ref;
    }, []);
  
    const onPlacesChanged = debounce(() => {
      const places = searchBoxRef.current.getPlaces();
      const place = places[0];

      setValue(place.formatted_address)
  
      if (place) {
        setMarker({
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        });

        setCenter({
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
        })
  
        setZoom(13);
  
        mapRef.panTo(place.geometry.location);
      }

      setShowMap(true)


    }, 300);
  
    return isLoaded ? (
      <div>
        <StandaloneSearchBox onLoad={onSearchBoxLoad} onPlacesChanged={onPlacesChanged}>

          {/* <input type="text" placeholder="Enter a place" /> */}
          <TextField 
            className="w-full"
            label='📌 Lokalita' 
            placeholder=""
            type='text' 
            value={value} 
            onChange={e => setValue(e.target.value)}
            required
            />

        </StandaloneSearchBox>
        
        <GoogleMap
          id="map"
          mapContainerStyle={mapContainerStyle}
          zoom={zoom}
          center={center}
          onLoad={onMapLoad}
        >
          {marker && <Marker position={marker} />}
        </GoogleMap>
        
      </div>
    ) : (
      <></>
    );
  }