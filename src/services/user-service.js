import { Op } from "sequelize";
import bcrypt from "bcrypt";
import model from "../models";

const { User } = model;

export default {
  async register(req, res) {
    const { email, password, first_name, last_name } = req.body;
    const salt = await bcrypt.genSalt(10);
    try {
      const user = await User.findOne({
        where: { email },
      });
      if (user) {
        return res
          .status(422)
          .send({ message: "User with that email already exists" });
      }

      await User.create({
        first_name,
        last_name,
        email,
        password: await bcrypt.hash(password.toString(), salt),
        admin: true,
        is_active: true,
      });
      return res.status(201).send({ message: "Account created successfully" });
    } catch (e) {
      console.log(e);
      return res.status(500).send({
        message:
          "Could not perform operation at this time, kindly try again later.",
      });
    }
  },

  async login(req, res) {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({
        where: {
          email,
        },
      });
      if (user) {
        const password_valid = await bcrypt.compare(
          password.toString(),
          user.password
        );

        if (password_valid) {
          return res.status(200).send({
            token: "token",
          });
        } else {
          return res.status(400).send({
            message: "Username or password are incorrect",
          });
        }
      } else {
        res.status(400).sned({ message: "User does not exist." });
      }
    } catch (e) {
      console.log(e);
      return res.status(500).send({
        message:
          "Could not perform operation at this time, kindly try again later.",
      });
    }
  },
};
