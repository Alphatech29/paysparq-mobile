export const retryRequest = async (
  requestFn,
  retries = 2,
  delay = 1500
) => {
  try {
    return await requestFn();
  } catch (error) {
    if (retries <= 0) {
      throw error;
    }

    await new Promise((resolve) => setTimeout(resolve, delay));
    return retryRequest(requestFn, retries - 1, delay);
  }
};
