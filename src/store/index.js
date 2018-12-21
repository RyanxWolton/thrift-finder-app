import makeInspectable from 'mobx-devtools-mst';
import { types, flow } from 'mobx-state-tree';

import User from './models/user';
import Region from './models/region';
import Modal from './models/modal';
import Request from './models/request';

import Movies from './models/movies'; //test

const AppStore = types.model("AppStore", {
  user: User,
  region: Region,
  modal: Modal,
  movies: Movies
}).actions(self => ({
  loadTestData: flow(function* () {
    var req = Request.create({ name: 'test' });
    let data = yield req.get('/v1/movies.json');
    self.movies = data;
    return data;
  }
)
}))

const inst = AppStore.create({
  user: User.create(),
  region: Region.create(),
  modal: Modal.create(),
  movies: {}
});

export default makeInspectable(inst)