export const responseData = (res, statusCode, data, message) => {
  return res
    .status(statusCode)
    .json({ data, message, statusCode, date: new Date() });
};
