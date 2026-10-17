import * as userService from '../services/user.service.js';
import { AppError } from '../utils/AppError.js';

export const list = (req, res) => res.json(userService.findAll());

export const get = (req, res) => res.json(userService.findById(req.params.id));

export const create = (req, res) => {
  const { name, email } = req.body ?? {};
  if (!name || !email) throw new AppError('name and email are required', 400);
  res.status(201).json(userService.create({ name, email }));
};

export const update = (req, res) => res.json(userService.update(req.params.id, req.body ?? {}));

export const remove = (req, res) => {
  userService.remove(req.params.id);
  res.status(204).end();
};
