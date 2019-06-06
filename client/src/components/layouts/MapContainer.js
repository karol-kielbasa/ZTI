import React, { useEffect, useState } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress';
import { Map, GoogleApiWrapper, Marker, InfoWindow, Polyline } from 'google-maps-react';

const LoadingContainer = (props) => (
  <div><CircularProgress /></div>
)

function getCurent() {
  const geolocation = navigator.geolocation;
  const location = new Promise((resolve, reject) => {
    if (!geolocation) {
      reject(new Error('Not Supported'));
    }

    geolocation.getCurrentPosition((position) => {
      resolve(position);
    }, () => {
      reject(new Error('Permission denied'));
    });
  });

  return location
}

function MapContainer(props) {
  const { items, lineToDraw } = props;
  const [location, setLocation] = useState({ lat: 0, lng: 0 });
  const [activeMarker, setActiveMarker] = useState(null);
  const [selectedPlace, setSelectedPlase] = useState(null);
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [isShowingInfoWindow, setShowingInfoWindow] = useState(false);

  useEffect(() => {
    async function location() {
      const val = await getCurent();
      setLocation({ lat: val.coords.latitude, lng: val.coords.longitude });
    }
    location();

  }, []);

  const onMarkerClick = (props, marker) => {
    setActiveMarker(marker);
    setShowingInfoWindow(true);
    setSelectedPlase(props.name);
    }

  const onInfoWindowClose = () => {
    setActiveMarker(null);
    setShowingInfoWindow(false);
  }

  const { lat, lng } = location;
  return (
    <div>
      <Map
        google={props.google}
        zoom={11}
        style={props.styles}
        initialCenter={{ lat: 50.069683, lng: 19.944544 }}
      >
        {items.map((vehicle, index) => (
          <Marker key={index} id={index} position={{
            lat: vehicle.lat,
            lng: vehicle.long
          }}
            name={`Name: ${vehicle.name} Type: ${vehicle.type} | Avarage rate: ${vehicle.rate} (${vehicle.rateCounter})`}
            onClick={onMarkerClick}
            title={`Name: ${vehicle.name} Type: ${vehicle.type} | Avarage rate: ${vehicle.rate} (${vehicle.rateCounter})`} />))}
        <Marker
          name={'Your location'}
          title={'Your location'}
          position={{
            lat: lat,
            lng: lng
          }} />
        <InfoWindow
          marker={activeMarker}
          onClose={onInfoWindowClose}
          visible={isShowingInfoWindow}>
          <small>
            {selectedPlace}
          </small>
        </InfoWindow>
        <InfoWindow
          position={{ lat: lat, lng: lng }} visible>
          <small>
            Your location
          </small>
        </InfoWindow>
        {lineToDraw ? <Polyline
          path={[{ lat: lineToDraw.locationLat, lng: lineToDraw.locationLng },
          { lat: lineToDraw.vehicleLat, lng: lineToDraw.vehicleLng }]}
          strokeColor="#0000FF"
          strokeOpacity={0.8}
          strokeWeight={2} /> : null}
      </Map>
    </div>
  );

}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBJleCqHOy3XmbfZKjm8KQBBB4jtge3cak',
  LoadingContainer: LoadingContainer
})(MapContainer);
