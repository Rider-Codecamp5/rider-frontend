import React, { useState, useRef, useCallback } from 'react';
import {
  GoogleMap,
  DirectionsRenderer,
  DirectionsService,
} from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '40vh',
};

const center = {
  lat: 13.7563,
  lng: 100.5018,
};

const options = {
  // styles: mapStyle,
  disableDefaultUI: true,
};

function DriverMap(props) {
  const mapRef = useRef();
  const onMapLoad = useCallback(map => {
    mapRef.current = map;
  }, []);

  const { origin, destination } = props;
  const [response, setResponse] = useState(null);

  const directionsCallback = googleResponse => {
    if (googleResponse) {
      if (response) {
        if (
          googleResponse.status === 'OK' &&
          googleResponse.routes.overview_polyline !==
            response.routes.overview_polyline
        ) {
          setResponse(() => googleResponse);
        } else {
          console.log(
            googleResponse.routes.overview_polyline ===
              response.routes.overview_polyline
          );
          console.log('response: ', googleResponse);
        }
      } else {
        if (googleResponse.status === 'OK') {
          setResponse(() => googleResponse);
        } else {
          console.log('response: ', googleResponse);
        }
      }
    }
  };

  return (
    <div className='route__map'>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={8}
        options={options}
        onLoad={onMapLoad}
      >
        {/* Child components, such as markers, info windows, etc. */}
        <>
          {destination !== '' && origin !== '' && (
            <DirectionsService
              options={{
                origin,
                destination,
                travelMode: 'DRIVING',
              }}
              callback={directionsCallback}
            />
          )}

          {response !== null && (
            <DirectionsRenderer
              options={{
                directions: response,
              }}
            />
          )}
        </>
      </GoogleMap>
    </div>
  );
}

export default React.memo(DriverMap);
