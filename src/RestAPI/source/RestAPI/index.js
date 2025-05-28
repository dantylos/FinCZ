const express = require('express');
const mainRouter = express.Router();

// Импорт роутеров для пользователей
const userCreateRouter = require('./Users/CreateUser/Router.js');
const userLoginRouter = require('./Users/UserAuthentication/Router.js');

// Импорт роутеров для тредов
const threadCreateRouter = require('./Threads/CreateThread/Router.js');
const threadDeleteRouter = require('./Threads/DeleteThread/Router.js');
const threadGetAllRouter = require('./Threads/GetAllThreads/Router.js');
const threadDetailRouter = require('./Threads/GetThreadDetail/Router.js');

// Импорт роутеров для постов
const postCreateRouter = require('./Posts/CreatePost/Router.js');
const postDeleteRouter = require('./Posts/DeletePost/Router.js');

// Импорт роутеров для комментариев
const commentCreateRouter = require('./Comments/CreateComment/Router.js');
const commentDeleteRouter = require('./Comments/DeleteComment/Router.js');

// Регистрация роутеров для юзеров
mainRouter.use('/users', userCreateRouter);
mainRouter.use('/users', userLoginRouter);

// Регистрация роутеров для тредов
mainRouter.use('/threads', threadCreateRouter);
mainRouter.use('/threads', threadDeleteRouter);
mainRouter.use('/threads', threadGetAllRouter);
mainRouter.use('/threads', threadDetailRouter);

// Регистрация роутеров для постов
mainRouter.use('/posts', postCreateRouter);
mainRouter.use('/posts', postDeleteRouter);

// Регистрация роутеров для комментариев
mainRouter.use('/comments', commentCreateRouter);
mainRouter.use('/comments', commentDeleteRouter);

module.exports = mainRouter;