import React, { Component } from 'react';
import {
  StyleSheet,
  View
} from 'react-native';

import Map, { snapToUser } from 'components/map';
import SearchBar from 'components/searchBar';
import ActionContainer from 'components/ActionContainer';
import ActionButton from 'components/actions/ActionButton';
import GenModal from 'components/modal';

import AppStore from 'store';

export default class App extends Component {
  componentDidMount() {
    const { movies } = AppStore;
    AppStore.loadTestData().then(function() {console.log('FUCK')});
  }
  render() {
    return (
      <View style={styles.container}>
        <SearchBar/>
        <ActionContainer>
          <ActionButton icon='user' action={snapToUser}/>
          <ActionButton icon='thumbTack' action={this.showNewFormModal}/>
          <ActionButton icon='thumbTack' action={AppStore.loadTestData}/>
        </ActionContainer>
        <Map/>
        <GenModal/>
      </View>
    );
  }
  showNewFormModal() {
    const { modal } = AppStore;

    modal.showModal('', 'Test' );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});
