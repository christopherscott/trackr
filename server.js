import React from 'react';
import express from 'express';
import trackr from './trackr';
import serialize from 'serialize-javascript';
import HtmlComponent from './components/Html';
import { navigateAction } from 'fluxible-router';

// 0. create server
const server = express();

server.use('/public', express.static(`${__dirname}/build`));
server.set('state namespace', 'APP');

// - route request, render application
server.use((req, res, next) => {

  // 1. create new context (one per request)
  let context = trackr.createContext();

  // 2. retrieve action context, so we can execute an action
  context
    .getActionContext()
    // 3. execute a navigate action
    .executeAction(navigateAction, { url: req.url }, (err) => {

      // 4. handle any errors
      if (err) {
        if (err.statusCode && err.statusCode === 404) {
          next();
        } else {
          next(err);
        }
        return;
      }

      // 5. dehydrate the state of the application
      // 6. serialize that state
      // 7. setup string to expose on window object
      const dehydratedState = trackr.dehydrate(context);
      const serializedState = serialize(dehydratedState);
      const exposed = `window.APP=${serializedState};`;

      // 8. create main markup
      const htmlComponent = React.createFactory(HtmlComponent);
      const appComponent = context.createElement();
      const appMarkup = React.renderToString(appComponent);
      const html = React.renderToStaticMarkup(htmlComponent({
        state: exposed,
        markup: appMarkup,
        context: context.getComponentContext()
      }));

      // 9. send main markup
      res.type('html');
      res.write('<!DOCTYPE html>' + html);
      res.end();
    });

});

export default server;
