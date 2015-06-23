import express from 'express';

const server = express();

server.use('/public', express.static(`${__dirname}/build`));

server.listen(process.env.PORT || 3000);

server.use()