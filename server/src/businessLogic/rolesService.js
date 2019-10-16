import { models } from '../models/index.js';

const { roles } = models;

const getRoles = () => roles.findAll({ raw: true });

export default {
  getRoles,
};
