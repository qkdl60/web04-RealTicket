const cache = new Map();
const MAX_CACHE_SIZE = 10;

const setCache = (key: string, value: unknown) => {
  if (cache.size >= MAX_CACHE_SIZE) {
    cache.delete(cache.keys().next().value);
  }
  cache.set(key, value);
};

const getCache = (key: string) => {
  const hitCache = cache.has(key);
  if (hitCache) {
    const returnValue = cache.get(key);
    cache.delete(key);
    cache.set(key, returnValue);
    return returnValue;
  }
  return null;
};

const clearCache = () => {
  cache.clear();
};

export { setCache, getCache, clearCache };
