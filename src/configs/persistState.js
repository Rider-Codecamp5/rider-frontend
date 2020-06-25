import * as storageItem from './localStorageItems';

const saveState = (state) => {
  const serializedState = JSON.stringify(state);
  localStorage.setItem(storageItem.role, serializedState);
}

const loadState = () => {
  const serializedState = localStorage.getItem(storageItem.role);
  if(serializedState) {
    return JSON.parse(serializedState);
  } else {
    return undefined;
  }
}

export { saveState, loadState }