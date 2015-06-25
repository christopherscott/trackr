import React from 'react';
import ApplicationStore from '../stores/ApplicationStore';

export default class Html extends React.Component {
  render() {
    return (
      <html>
        <head>
          <meta charSet="utf-8" />
          <title>{this.props.context.getStore(ApplicationStore).getPageTitle()}</title>
        </head>
        <body>
          <div id="trackr" dangerouslySetInnerHTML={{ __html: this.props.markup }}></div>
          <script dangerouslySetInnerHTML={{ __html: this.props.state }}></script>
        </body>
      </html>
    );
  }
}
