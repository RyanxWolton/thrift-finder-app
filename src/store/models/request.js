import {types, flow} from "mobx-state-tree";

import {request} from 'helpers/request';

const Request = types.model("RequestModel", {
  name: types.maybe(types.string),
  state: types.optional(types.enumeration("State", ["initial", "pending", "done", "error"]), "initial"),
  error: types.optional(types.frozen, null)
}).actions(self => ({
  afterCreate: () => {
    if(global.AbortController) {
      self.abortion = new AbortController();
    }

    if(self.name) {
      let old = Request.cached.get(self.name);
      if(old)
        old.cancel();
      old = Request.create();
      Request.cached.set(self.name, old)
    }
  },

  beforeDestroy: () => {
    self.cancel();
  },

  cancel: () => {
    if(self.abortion && self.state === "pending") {
      self.abortion.abort();
    }
  },

  send: flow(function* (url, params = {}, options = {}) {

    self.error = null;
    self.state = "pending";

    url = `http://192.168.0.18:3000${url}`;

    try {
      options = {signal: self.abortion && self.abortion.signal, ...(self.loadOptions || {}), ...options};

      let result = yield request(url, params, options);
      self.state = "done";
      return result;
    } catch(e) {
      self.state = "error";
      console.log(e)
      self.error = e.toString();
      throw e;
    }
  }),

  get: function(url, params = {}, options = {}) {
    return self.send(url, params, options)
  },

  post: function(url, params = {}, options = {}) {
    return self.send(url, params, {...options, method: 'POST'})
  },

  patch: function(url, params = {}, options = {}) {
    return self.send(url, params, {...options, method: 'PATCH'})
  },

  put: function(url, params = {}, options = {}) {
    return self.send(url, params, {...options, method: 'PUT'})
  },
})).views(self => ({
  get isLoading() {
    return self.state == 'pending'
  }
}));

Request.cached = new Map();

export default Request;