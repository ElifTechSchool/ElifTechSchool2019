import httpStatus from 'http-status';

const getMessage = (error) => {
  if (error.name === 'SequelizeValidationError') {
    return 'validation error';
  }
  return error.message;
};

const getStatus = (error) => {
  const defaultStatusCode = httpStatus.UNPROCESSABLE_ENTITY;
  if (error.name === 'SequelizeValidationError') {
    return httpStatus.UNPROCESSABLE_ENTITY;
  }
  return error.statusCode || error.status || defaultStatusCode;
};

const getSequelizeErrors = (error) => {
  if (error.name !== 'SequelizeValidationError') {
    return undefined;
  }
  return error.errors;
};


export default function operationalErrorHandle(error, req, res, next) {
  return res.status(getStatus(error)).json({
    message: getMessage(error),
    stack: error.stack,
    errors: getSequelizeErrors(error),
  });
}
