import React, { useState, useEffect } from 'react';
import { GoogleMap, useLoadScript } from '@react-google-maps/api';
import PlaceSearch from './PlaceSearch';

const libraries = ['places']
const containerStyle = {
  width: '40vw',
  height: '40vh'
};

function DriverMap(props) {

  const [response, setResponse] = useState(null);
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  if(loadError) return 'Error loading maps';
  if(!isLoaded) return 'Loading Maps';

  const center = {
    lat: 13.7563,
    lng: 100.5018
  };
  
  const options = {
    // styles: mapStyle,
    disableDefaultUI: true
  }

  const getOrigin = (ref) => {
    setOrigin(ref)
  }
  
  const getDestination = (ref) => {
    setDestination(ref)
  }

  return (
    <div>
        <PlaceSearch 
          origin={props.origin} 
          destination={props.destination} 
          setOrigin={props.setOrigin}
          setDestination={props.setDestination}
        />
        <br/>

        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
          options={options}
        >
          { /* Child components, such as markers, info windows, etc. */ }
          <></>
        </GoogleMap>
    </div>
  )
}


export default DriverMap;