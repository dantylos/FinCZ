const express = require('express');
const mainRouter = express.Router();

// Импорт роутеров для пользователей
const userCreateRouter = require('./Users/CreateUser/Router.js');

// Импорт роутеров для тредов
const threadCreateRouter = require('./Threads/CreateThread/Router.js');
const threadDeleteRouter = require('./Threads/DeleteThread/Router.js');

// Импорт роутеров для постов
const postCreateRouter = require('./Posts/CreatePost/Router.js');
const postDeleteRouter = require('./Posts/DeletePost/Router.js');

// Импорт роутеров для комментариев
const commentCreateRouter = require('./Comments/CreateComment/Router.js');
const commentDeleteRouter = require('./Comments/DeleteComment/Router.js');

// Регистрация роутеров для юзеров
mainRouter.use('/users', userCreateRouter);

// Регистрация роутеров для тредов
mainRouter.use('/threads', threadCreateRouter);
mainRouter.use('/threads', threadDeleteRouter);

// Регистрация роутеров для постов
mainRouter.use('/posts', postCreateRouter);
// mainRouter.use('/posts', postDeleteRouter);

// Регистрация роутеров для комментариев
mainRouter.use('/comments', commentCreateRouter);
mainRouter.use('/comments', commentDeleteRouter);

module.exports = mainRouter;