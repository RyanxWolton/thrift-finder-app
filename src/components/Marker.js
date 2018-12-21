import React, { Component } from 'react';
import { Marker } from 'react-native-maps';
import FontAwesome, { Icons } from 'react-native-fontawesome';

export default class CustomMarker extends Component {
  render() {

    const { LatLng, title, description } = this.props;

    return (
      <Marker
        coordinate={LatLng}
        title={title}
        description={description}>
        <FontAwesome style={{fontSize: 38}} color="#fff">{Icons.mapMarker}</FontAwesome>
      </Marker>
    )
  }
}