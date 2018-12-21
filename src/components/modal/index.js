import React, { Component } from 'react';
import { 
  Modal, 
  View, 
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import { observer } from 'mobx-react';
import FontAwesome, { Icons } from 'react-native-fontawesome';

import theme from 'styles/theme';

import AppStore from 'store';

@observer
export default class GenModal extends Component {
  render() {

    const { modal, movies } = AppStore;

    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={modal.show}
        onRequestClose={() => {
          console.log('modal closing');
        }}
      >
        <View style={styles.titleBar}>
          <TouchableOpacity  onPress={modal.closeModal} activeOpacity={0.5}>
            <FontAwesome style={styles.icon}>{Icons.arrowLeft}</FontAwesome>
          </TouchableOpacity>
          <Text style={styles.titleText}>Filter</Text>
        </View>
        <Text>{JSON.stringify(movies)}</Text>
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  titleBar: {
    flexDirection: "row",
    elevation: 3,
    backgroundColor: theme.primaryColor
  },
  titleText: {
    padding: 10,
    fontSize: 20,
    color: '#fff'
  },
  icon: {
    color: '#fff',
    fontSize: theme.iconSize,
    padding: 6
  }
})