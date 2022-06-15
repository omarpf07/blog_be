import userService from "../services/user-service";

async function create(req, res, next) {
  try {
    await userService.register(req, res);
  } catch (error) {
    console.log("Error while trying to create a user.", error.message);
    next(error);
  }
}

async function login(req, res, next) {
  try {
    await userService.login(req, res);
  } catch (error) {
    console.log("Error while trying to create a user.", error.message);
    next(error);
  }
}

module.exports = {
  create,
  login,
};
