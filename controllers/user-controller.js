const userService = require('../service/user-service');
const ApiError = require('../exceptions/api-error');
const { validationResult } = require('express-validator');

class UserController {
  async registration(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest('Ошибка при валидации', errors.array()))
      }
      const { email, password, gender, age, isMarried, job, hobby, salary } = req.body;
      const userData = await userService.registration(email, password, gender, age, isMarried, job, hobby, salary);
      res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const userData = await userService.login(email, password);
      res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const token = await userService.logout(refreshToken);
      res.clearCookie('refreshToken');
      return res.json(token);
    } catch (e) {
      next(e);
    }
  }

  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const userData = await userService.refresh(refreshToken);
      res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async getAllUsers(req, res, next) {
    try {
      const users = await userService.getAllUsers();
      return res.json(users);
    } catch (e) {
      next(e);
    }
  }

  async getUsersByQuery(req, res, next) {
    try {
      let query = {};

      if (req.query.gender) {
        query.gender = req.query.gender;
      }

      if (req.query.age) {
        query.age = parseInt(req.query.age);
      }

      if (req.query.isMarried !== undefined) {
        query.isMarried = req.query.isMarried === 'true';
      }

      if (req.query.job) {
        query.job = req.query.job;
      }

      if (req.query.hobby) {
        query.hobby = req.query.hobby;
      }

      if (req.query.salary) {
        query.salary = req.query.salary;
      }

      const users = await userService.getUsersByQuery(query);
      return res.json(users);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new UserController();