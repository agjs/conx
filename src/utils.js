const hasLocalStorage = () => {
  const test = 'test';
  try {
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch (e) {
    return false;
  }
};

const hasWorker = () => {
  return !!window.Worker;
};

module.exports = {
  hasLocalStorage,
  hasWorker
};
