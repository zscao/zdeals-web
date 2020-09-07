import queryString from 'query-string'

export const dealSearchHelper = {
  getQueryFromSearchString,
  getSearchUrlFromLocation,
  getSearchFromString,
};

function getQueryFromSearchString(searchString = '') {

  const query = {};
  const search = queryString.parse(searchString);
  if(search.c) query.category = search.c;
  if(search.k) query.keywords = search.k;
  if(search.sort) query.sort = search.sort;
  if(search.store) query.store = search.store;
  if(search.brand) query.brand = search.brand;
  if(search.del) query.del = search.del; // delivery 

  return query;
}


function getSearchUrlFromLocation(pathname, search, newParams = {}) {
  if(!pathname) return;

  const searchObject = getSearchFromString(search);
  const searchString = queryString.stringify({...searchObject, ...newParams}, {arrayFormat: 'comma'})
  return `${pathname}?${searchString}`
}

function getSearchFromString(searchString = '') {
  
  const validKeys = ['c', 'k', 'sort', 'store', 'brand', 'del'];

  const parsed = queryString.parse(searchString, {arrayFormat: 'comma'});
  const search = {};

  validKeys.forEach(key => {
    if(parsed[key]) search[key] = parsed[key];
  })

  return search;
}
