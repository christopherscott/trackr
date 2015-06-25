import React from 'react';
import ApplicationStore from '../stores/ApplicationStore';
import provideContext from 'fluxible/addons/provideContext';
import connectToStores from 'fluxible/addons/connectToStores';
import { handleHistory } from 'fluxible-router';

class Application extends React.Component {

  componentDidUpdate(prevProps) {
    const newProps = this.newProps;
    if (newProps.pageTitle !== prevProps.pageTitle) {
      document.title = newProps.pageTitle;
    }
  }

  render() {
    var Handler = this.props.currentRoute.get('handler');
    return (
      <div id="trackr-app">
        <Handler />
      </div>
    );
  }

}

Application = provideContext(Application);
Application = handleHistory(Application);
Application = connectToStores(Application, [ApplicationStore], (stores) => {
  const appStore = stores.ApplicationStore;
  return {
    currentPageName: appStore.getCurrentPageName(),
    pageTitle: appStore.getPageTitle(),
    pages: appStore.getPages()
  };
});


export default Application;
