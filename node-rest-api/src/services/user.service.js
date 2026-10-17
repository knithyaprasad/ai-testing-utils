import { randomUUID } from 'node:crypto';
import { AppError } from '../utils/AppError.js';

// In-memory store — swap for a real DB (Postgres/Mongo) later.
const users = new Map();

export const findAll = () => [...users.values()];

export const findById = (id) => {
  const user = users.get(id);
  if (!user) throw new AppError('User not found', 404);
  return user;
};

export const create = ({ name, email }) => {
  const user = { id: randomUUID(), name, email, createdAt: new Date().toISOString() };
  users.set(user.id, user);
  return user;
};

export const update = (id, { name, email }) => {
  const user = findById(id);
  const updated = { ...user, ...(name && { name }), ...(email && { email }) };
  users.set(id, updated);
  return updated;
};

export const remove = (id) => {
  findById(id);
  users.delete(id);
};
