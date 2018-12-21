const qs = require('qs');

export function request(url, params = {}, options = {}) {
  options.method = (options.method || 'GET').toUpperCase();

  if(options.method === 'GET') {
    options.query = params;
    params = undefined;
  }
  if(options.query) {
    const q = options.query;
    const esc = qs.stringify(q, {encode: false});
    if(esc)
      url += `?${esc}`
  }

  options = {
    method: 'GET',
    body: params ? JSON.stringify(params): null,
    ...options,
    credentials: 'include',
    headers: {
      'content-type': 'application/json',
      'accept': 'application/json',
      ...(options.headers || {})
    }
  };

  return fetch(url, options).then(r => {
    return r.json().catch(() => Promise.reject(r.statusText)).then(json => {
      if(!url.ok && json.error)
        return Promise.reject(json.error);
      return json;
    });
  });
}