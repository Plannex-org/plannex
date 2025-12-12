import { registerService, loginService } from "./auth.service.js";

export const register = async (req, res, next) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const { user, token } = await registerService({ name, email, password });
    res.status(201).json({ user, token });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await loginService({ email, password });
    res.json({ user, token });
  } catch (error) {
    next(error);
  }
};
