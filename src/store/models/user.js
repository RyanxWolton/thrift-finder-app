import { types, applySnapshot, getSnapshot } from 'mobx-state-tree';

import Region from './region';

const User = types.model("User", {
  region: types.maybe(Region),
  followMode: false
}).actions(self => ({
  update: (snapshot) => {
    applySnapshot(self, snapshot);
  }
}))

export default User;