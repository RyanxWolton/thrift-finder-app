import { types, applySnapshot } from 'mobx-state-tree';


const Region = types.model("Region", {
  latitude: 0,
  longitude: 0,
  latitudeDelta: 0.06,
  longitudeDelta: 0.06
}).actions(self => ({
  update(snapshot) {
    applySnapshot(self, snapshot);
  }
}))

export default Region;