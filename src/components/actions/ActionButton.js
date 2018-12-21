import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import FontAwesome, { Icons } from 'react-native-fontawesome';

import theme from 'styles/theme';

export default class ActionButton extends Component {
  render() {
    const { action, icon } = this.props;

    return (
      <TouchableOpacity onPress={action} style={styles.button} activeOpacity={0.5}>
        <FontAwesome style={styles.icon}>{Icons[icon]}</FontAwesome>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  button: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: theme.primaryColor,
    elevation: 2,
    opacity: 0.8,
    alignItems: 'center',
    padding: 10
  },
  icon: {
    fontSize: theme.iconSize,
    color: theme.secondaryColor
  }
});