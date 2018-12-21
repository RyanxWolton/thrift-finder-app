import MapView from 'react-native-maps';
import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { getSnapshot } from 'mobx-state-tree';
import { Text } from 'react-native';

import Marker from 'components/Marker';
 
import mapStyle from './mapStyle';
import styles from './styles';

import AppStore from 'store';

@observer
export default class Map extends Component {

  componentDidMount() {
    return getCurrentLocation().then(pos => this.updateUserLocation(pos.coords));
  }

  render() {
    const { user, region } = AppStore;

    if (!user.region) return <Text>Loading...</Text>

    return (
        <MapView
          ref={map => this.map = map}
          style={styles.map}
          region={{...region}}
          showsUserLocation
          customMapStyle={mapStyle}
          onRegionChangeComplete={reg => region.update(reg)}
          onUserLocationChange={e => this.updateUserLocation(e.nativeEvent.coordinate)}
          onMapReady={() => region.update(getSnapshot(user.region))}
          showsMyLocationButton={false}
          loadingEnabled
        >
          <Marker
            LatLng={{ latitude: region.latitude, longitude: region.longitude }}
            title="some title"
            description="some description"
          />
        </MapView>
    );
  }

  updateUserLocation(coordinate) {
    const { user } = AppStore;
    user.update({ region: { latitude: coordinate.latitude, longitude: coordinate.longitude } })
  }

  // animateToUser(reg) {
  //   const { user, region } = AppStore;
  //   this.map.animateToRegion(reg);
  // }
}

export const snapToUser = () => {
  const { user, region } = AppStore;
  region.update(getSnapshot(user.region));
}

export const getCurrentLocation = () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(position => resolve(position), e => reject(e));
  });
};
