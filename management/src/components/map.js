import React from "react";
import { GoogleMap, Marker, Circle, useJsApiLoader } from "@react-google-maps/api";

const MapContainer = ({ markerPosition, setMarkerPosition, setValue, circleRadius }) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API,
  });

  const mapOptions = {
    center: markerPosition,//{ lat: 51.74583, lng: 5.63194 },
    zoom: 14,
    mapTypeControlOptions: { mapTypeIds: [] },
    streetViewControl: false,
  };
  const circleOptions = {
    strokeColor: "blue",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "blue",
    fillOpacity: 0.2,
  };

  const handleMapClick = (event) => {
    const { lat, lng } = event.latLng;
    const latValue = lat();
    const lngValue = lng();

    setMarkerPosition({ lat: latValue, lng: lngValue });
    setValue("latitude", latValue.toString());
    setValue("longitude", lngValue.toString());
  };

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={{ height: "300px", width: "100%" }}
      options={mapOptions}
      onClick={handleMapClick}
    >
      <Marker position={markerPosition} />
      <Circle
        center={markerPosition}
        radius={circleRadius}
        options={circleOptions}
      />
    </GoogleMap>
  ) : null;
};

export default MapContainer;
