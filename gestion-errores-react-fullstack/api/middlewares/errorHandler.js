const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Ha ocurrido un error en el servidor.',
    error: err.message,
  });
};

export default errorHandler;
