import { models } from '../models/index.js';

const { roles } = models;

const getRoles = () => roles.findAll({ raw: true });

const createRole = (role) => roles.create(role);


export default {
  getRoles,
  createRole,
};
