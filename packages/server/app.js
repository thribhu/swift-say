require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const url = require('url');
const { initializeClient } = require('./DatabaseClient/ClientInstance');
const { sdk } = require('./Casdoor');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const getRefresh = require('./middlewares/addRefreshToken');
const OnlyAuthenticatedUser = require('./middlewares/onlyAuthenticated');
const OnlySupervisor = require('./middlewares/onlySupervisor');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// cors for react application
app.use(
	cors({
		origin: 'http://localhost:9000',
		credentials: true,
	}),
);

app.use('/', indexRouter);
app.get('/api/check-db', async (_, res) => {
	const { db } = await initializeClient();
	const collections = await db.listCollections().toArray();
	return res.status(200).json({ database: db.databaseName, collections });
});
app.get('/api/getSalesOpportunities', [OnlyAuthenticatedUser, OnlySupervisor], (req, res) => {
	res.status(200).json({
		isValid: true,
		opportunities: [
			{
				id: 1,
				opportunityName: 'Project ABC',
				potentialRevenue: 25000,
				closingDate: '2023-10-15',
				status: 'Prospecting',
			},
			{
				id: 2,
				opportunityName: 'Renovation Project',
				potentialRevenue: 18000,
				closingDate: '2023-11-30',
			},
			{
				id: 3,
				opportunityName: 'Industrial Client X',
				potentialRevenue: 35000,
				closingDate: '2024-11-03',
				status: 'Qualified',
			},
		],
	});
});

app.use('/api/users', usersRouter);

// user refresh token
app.post('/refreshToken', (req, res) => {
	return getRefresh(req, res);
});
app.post('*', (req, res) => {
	let urlObj = url.parse(req.url, true).query;
	sdk.getAuthToken(urlObj.code).then((response) => {
		const accessToken = response.access_token;
		const refreshToken = response.refresh_token;
		res.send(JSON.stringify({ token: accessToken, refreshToken }));
	});
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res) {
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};
	res.status(err.status || 500);
	res.render('error');
});

module.exports = app;
