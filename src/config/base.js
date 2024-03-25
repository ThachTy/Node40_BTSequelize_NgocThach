export const checkPromises = async (promise = new Promise()) => {
  let data = await promise
    .then((res) => res)
    .catch((err) => {
      throw err;
    });
  return data;
};
