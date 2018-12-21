import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Dimensions
} from 'react-native';
import { observer } from 'mobx-react';
import { observable } from 'mobx';

@observer
export default class ActionContainer extends Component {

  @observable screenWidth = null;
  @observable screenHeight = null;

  constructor() {
    super();

    const screen = Dimensions.get('screen');
    this.screenWidth = screen.width;
    this.screenHeight = screen.height;

    // Event Listener for orientation changes
    Dimensions.addEventListener('change', (e) => {
      const { width, height } = e.screen;
      this.screenWidth = width;
      this.screenHeight = height;
  });
  }

  render() {
    const {children} = this.props;

    const styles = StyleSheet.create({
      container: {
        top: this.screenHeight / 2 - 40,
        left: this.screenWidth / 2 - 35,
        height: children.length * 53,
        flexDirection: 'column',
        justifyContent: 'space-between'
      }
    });

    return (
      <View style={styles.container}>{children}</View>
    )
  }
}