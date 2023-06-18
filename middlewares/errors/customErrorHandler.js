const CustomError = require("../../helpers/errors/CustomError");

const customErrorHandler = (err, req, res, next) => {
  //console.log(err); //*err.name ile hata ismini öğrenebilirsin
  let customError = err;
  if (err.name === "SyntaxError") {
    customError = new CustomError("Unexpected Syntax", 400);
  }
  if (err.name === "ValidationError") {
    customError = new CustomError(err.message, 400);
  }
  if (err.name === "CastError") {
    customError = new CustomError("Please enter a valid id", 400);
  }
  if (err.code === 11000) {
    customError = new CustomError("Duplicate Key Found: Check Your Input", 400);
  }
  console.log(customError.message, customError.status);

  res.status(customError.status || 500).json({
    success: false,
    message: customError.message || "Internal Server Error",
  });
};

module.exports = customErrorHandler;
