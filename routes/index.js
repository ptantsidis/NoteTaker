// const express = require('express');
// Import our modular routers for /tips and /feedback

const notesRouter = require('./notes');
// const indexRouter = require('./index')

const app = require("express").Router();

app.use('/notes', notesRouter);
// app.use('/index', indexRouter);


module.exports = app;
