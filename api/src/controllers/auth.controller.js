import express from 'express';
import AuthService from '../services/Auth.service.js';
import {
  loginValidation,
  registerValidation,
} from '../validations/auth.validation.js';
const router = express.Router();

router.post('/register', registerValidation, async (req, res) => {
  const { email, password, name } = req.body;

  try {
    const { user, token } = await AuthService.registerUser({
      email,
      password,
      name,
    });
    res.status(201).json({ user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/login', loginValidation, async (req, res) => {
  const { email, password } = req.body;

  try {
    const { user, token } = await AuthService.loginUser({ email, password });
    res.json({ user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
