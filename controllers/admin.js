const User = require("../models/User");
const CustomError = require("../helpers/errors/CustomError");
const asyncErrorWrapper = require("express-async-handler");

const blockUser = asyncErrorWrapper(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findById(id);
  user.blocked = !user.blocked; //*Blockluysa block kaldırır, değilse blocklar
  await user.save();

  return res.status(200).json({
    success: true,
    message: user.blocked ? `${user.name} Blocked` : `${user.name} Unblocked`,
  });
});
const deleteUser = asyncErrorWrapper(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findById(id);
  //   await user.remove();
  await User.findOneAndDelete({ _id: id });

  return res.status(200).json({
    success: true,
    message: `${user.name} Removed`,
  });
});
module.exports = {
  blockUser,
  deleteUser,
};
