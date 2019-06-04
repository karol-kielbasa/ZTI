import React, { useEffect, useState } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import { connect } from 'react-redux';

const mapStyles = {
  width: '100%',
  height: '100%',
};

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
  const { items, } = props;
  const [location, setLocation] = useState({ lat: 0, lng: 0 });
  const [activeMarker, setActiveMarker] = useState(null);
  const [selectedPlace, setSelectedPlase] = useState(null);
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
    setSelectedPlase(props.name)
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
        style={mapStyles}
        initialCenter={{ lat: 50.069683, lng: 19.944544 }}
      >
        {items.map((vehicle, index) => (
          <Marker key={index} id={index} position={{
            lat: vehicle.lat,
            lng: vehicle.long
          }}
            name={`Name: ${vehicle.name} Type: ${vehicle.type}`}
            onClick={onMarkerClick}
            title={`Name: ${vehicle.name} Type: ${vehicle.type}`} />))}
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
      </Map>
    </div>
  );

}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBJleCqHOy3XmbfZKjm8KQBBB4jtge3cak',
  LoadingContainer: LoadingContainer
})(MapContainer);
