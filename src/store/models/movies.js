import { types } from 'mobx-state-tree';

const Movie = types.model("Movie", {
  title: types.string,
  genre: types.string
})

export default Movies = types.model("Movies", {
  movies: types.maybe(types.array(Movie))
})