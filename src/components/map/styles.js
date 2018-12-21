import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  map: {
    flex: 1,
    zIndex: -1, 
    ...StyleSheet.absoluteFillObject,
    height: "104%"
  }
});

export default styles;