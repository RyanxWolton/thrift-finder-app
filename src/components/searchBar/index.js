import React, { Component } from 'react';
import { 
  StyleSheet, 
  TouchableOpacity,
  View
} from 'react-native';
import RNGooglePlaces from 'react-native-google-places';
import FontAwesome, { Icons } from 'react-native-fontawesome';

import theme from 'styles/theme';

import AppStore from 'store';

export default class SearchBar extends Component {
  render() {
    return (
      <TouchableOpacity onPress={this.openSearchModal} style={styles.input} activeOpacity={0.5}>
        <View style={styles.edgeColor}>
          <FontAwesome style={styles.icon}>{Icons.search}</FontAwesome>
        </View>
      </TouchableOpacity>
    )
  }

  openSearchModal() {

    const { region } = AppStore;

    RNGooglePlaces.openAutocompleteModal({ country: 'UK' })
    .then((place) => {
      region.update({ latitude: place.latitude, longitude: place.longitude });
    })
    .catch(error => console.log(error.message));  // error is a Javascript Error object
  }
}

const styles = StyleSheet.create({
  input: {
    width: "95%",
    borderRadius: 10,
    backgroundColor: theme.secondaryColor,
    top: "1%",
    elevation: 2,
    opacity: 0.8,
  },
  edgeColor: {
    backgroundColor: theme.primaryColor,
    padding: 10,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    width: 40
  },
  icon: {
    fontSize: 20,
    color: theme.secondaryColor
  }
});