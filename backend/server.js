// Copyright 2023 The Casdoor Authors. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

const url = require('url')
const { SDK } = require('casdoor-nodejs-sdk');
const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors')

//init sdk
const cert = `
-----BEGIN CERTIFICATE-----
MIIE2TCCAsGgAwIBAgIDAeJAMA0GCSqGSIb3DQEBCwUAMCYxDjAMBgNVBAoTBWFk
bWluMRQwEgYDVQQDDAtjZXJ0X2M5cm9hZzAeFw0yMzA5MTUwNDAyMjBaFw00MzA5
MTUwNDAyMjBaMCYxDjAMBgNVBAoTBWFkbWluMRQwEgYDVQQDDAtjZXJ0X2M5cm9h
ZzCCAiIwDQYJKoZIhvcNAQEBBQADggIPADCCAgoCggIBALmXZkp9Dv1tJ6Qhd2w9
JCxUq8FePmvatseG5psBW6cgXMIX3OtRdXShxkyc/BJTILJIyIaiaqPuQy3aNexQ
zBM9U14/FkBNG+oAh+r3QYF2fbxUQlINW/scnsjqxDa1/7qK8aZRaLlEypYSmVGB
vSOwg/ycgAN9d+8Z0kMVNi6X8uH/lWBzsP82NJPFoRTaPYdL0Qggc7I+eDl67nX1
UrgtrGgChNbUk+Q8xiJFzi8TV+/Tf3n1IJsmWq36XO5bTvy9clpTUdH1AIe2oclY
Y4SW8I5AL0m0ef563xGt6QiwhH6i9+HFcYq+zvObxysXqfBQ6e812idhTu6itjF1
sX1Y1t9twPKmkOK+YNk+yHbaCFWSj6wNjezOqtjMXp/Wr7cxLdLEzFP2JNvd0+XC
dxt+Xiay8hJMna/aHXEUIyZ3W/yiqLTq3WEpHpA4J3TswulJQbd4NHNJt9+lb39p
ZRnVQVBJlFfXe6ZMcGUBkqOww8g7fr8AxuDxsg5QXV8gjERPBuM8wE4P8oACM2E1
6Ek/JFtpsR4RW4Owo7VuZbVJ/AWtVHNfQkxTaSmzQI3dC6Gp/bp926heJTz4Ggkx
o3YaYNzMOOirdfvkwaumDr2TNeNHo3hFW0zuP7GWdLJ7g03LS0VC/3E4AiI2t8WF
56aswHK9u1VNSABqNbLTATkbAgMBAAGjEDAOMAwGA1UdEwEB/wQCMAAwDQYJKoZI
hvcNAQELBQADggIBAFInyUnDK+8vuVzM3af3XS4S/I9rv/KGfwUuvd1gcgamj3Vd
xsYfd4LJwvZumwb4wf/+Vifq/036a3Ek590krQY6peBSpQG+7fIENSYv+e+SZEGS
w0zgw14zlqi7lXDTja0ZFN5Gh8cpLqpYbP4Rp896lirCkQZMBbG9659A/vaU21oY
hitEYXPsRGRDNcJdJr1sZvL/8cpotDxf37NI/HGbyr89O+yEa9o6LH9pqCJDwURo
tg61jthtusPB/Ph2poElMrSvjcrHuGvSdLLLDd/JYoTJIi3GtmmFiBY2gQBKUqBq
JRyvf2OmcLhgT9O9tfueUP2YGIct5uNdlXFcjClHj4VPWP4TgG7pDOAWqKrBj2XX
A2f/AT50/hh/McFIXlRyjHbE6z3y5y2OLd2iZqInAhhChtpvlJoLvbedXSg+m7z8
kGoePsnndEybSh6Im6tljcjd6yddEl+DSHO/IAOPNpWUbYGh9lXvZNtaXGuLffJr
NZiJbKpN8L0wRq2wftKxu57NKH8vhNLdAC1FM+w9QytiDDTYOiDtmNaD1P9mioSr
037abn//DozJhvy4DJF2UUVySmfXFNhiW7ob+g0yJdn7OhXTNUb46TxsaX+XYNEd
ZzdL33u2e56I7NJ25MRITZ9vIIoTZyznDHb3Aw85lqSDi5sGKyJ/ZaK9wP2B
-----END CERTIFICATE-----
`;

const authCfg = {
  endpoint: 'https://door.casdoor.com',
  clientId: 'f6f79118fa0fa4f4a73f',
  clientSecret: 'c3b18d239f040de8999ea844429bc0f56c6d08cf',
  certificate: cert,
  orgName: 'milana',
  appName: 'milana',
}

const sdk = new SDK(authCfg);
console.log(sdk.getAuthToken())
const app = express();

app.use(cors({
  origin: 'http://localhost:9000',
  credentials: true
}))

app.get('/', (req, res) => {
  fs.readFile(path.resolve(__dirname, './index.html'), (err, data) => {
    res.setHeader('Content-Type', 'text/html');
    res.send(data);
  });
});

app.get('/api/getUserInfo', (req, res) => {
  let urlObj = url.parse(req.url, true).query;
  console.log(urlObj)
  let user = sdk.parseJwtToken(urlObj.token);
  console.log(user)
  res.send(JSON.stringify(user));
});

app.post('*', (req, res) => {
  let urlObj = url.parse(req.url, true).query;
  sdk.getAuthToken(urlObj.code).then(response => {
    console.log(response)
    const accessToken = response.access_token;
    // const refresh_token = response.refresh_token;
    res.send(JSON.stringify({ token: accessToken }));
  });
});

app.listen(8080, () => {
  console.log('Server listening at http://localhost:8080');
});
