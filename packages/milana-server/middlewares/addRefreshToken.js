const axios = require('axios');
const config = require('../Casdoor/config');
const { createProxyMiddleware } = require('http-proxy-middleware');
const { StatusCodes, ReasonPhrases } = require('http-status-codes');

const casdoorProxyMiddleware = () => {
  return async (req, res, next) => {
    try {
      const casdoorUrl = 'https://milan.casdoor.com/api/';
      const { refresh_token } = req.body;

      const proxyMiddleware = createProxyMiddleware({
        target: casdoorUrl,
        changeOrigin: true,
        pathRewrite: {
          '^/api/refresh_token': '',
        },
      });
      proxyMiddleware(req, res, async () => {
        const response = await axios.post(
          `${casdoorUrl}login/oauth/refresh_token`,
          {
            refresh_token,
            grant_type: 'refresh_token',
            scope: 'profile',
            client_id: config.clientId,
            client_secret: config.clientSecret,
          }
        );

        if (response.status === 200) {
          res.status(StatusCodes.OK).json(response.data);
          next();
        } else {
          res.status(StatusCodes.BAD_GATEWAY).send(ReasonPhrases.BAD_GATEWAY);
        }
      });
    } catch (error) {
      console.error(error);
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send('Internal Server Error');
    }
  };
};

module.exports = casdoorProxyMiddleware;
