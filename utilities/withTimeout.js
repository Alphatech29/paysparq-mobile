export const withTimeout = (promise, timeout = 15000) => {
  return Promise.race([
    promise,
    new Promise((_, reject) =>
      setTimeout(() => {
        reject(new Error("NETWORK_TIMEOUT"));
      }, timeout)
    ),
  ]);
};
