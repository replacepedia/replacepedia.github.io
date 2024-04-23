const FILTERS_LOCAL_STORAGE_ID = 'replacepedia-filters';

export function loadFilters() {
  return JSON.parse(localStorage.getItem(FILTERS_LOCAL_STORAGE_ID));
}

export function saveFilters(filters) {
  localStorage.setItem(FILTERS_LOCAL_STORAGE_ID, JSON.stringify(filters));
}
