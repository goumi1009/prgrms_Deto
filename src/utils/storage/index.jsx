const storage = window.sessionStorage;

export const getItem = (key, initialValue) => {
  try {
    const item = storage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  } catch (e) {
    console.error(e);
    return initialValue;
  }
};

export const setItem = (key, value) => {
  try {
    storage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error(e);
  }
};

export const removeItem = (key) => {
  try {
    storage.removeItem(key);
  } catch (e) {
    console.error(e);
  }
};
