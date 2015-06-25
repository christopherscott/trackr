import BaseStore from 'fluxible/addons/BaseStore';
import routesConfig from '../routes';

class ApplicationStore extends BaseStore {

  // set reasonable defaults
  // on the client, these will most likely immediately be
  // overwritten on rehydration
  constructor(dispatcher) {
    super(dispatcher);

    this.currentPageName = null;
    this.currentPage = null;
    this.pages = routesConfig;
    this.pageTitle = '';
  }

  handlePageTitle(currentRoute) {
    // wait for the current RouteStore to update
    this.dispatcher.waitFor('RouteStore', () => {
      if (currentRoute && currentRoute.get('title')) {
        // update title and emit change if neccessary
        this.title = currentRoute.get('title');
        this.emitChange();
      }
    });
  }

  getCurrentPageName() {
    return this.currentPageName;
  }

  getPageTitle() {
    return this.pageTitle;
  }

  getPages() {
    return this.pages;
  }

  dehydrate() {
    return {
      currentPageName: this.currentPageName,
      currentPage: this.currentPage,
      pages: this.pages,
      pageTitle: this.pageTitle
    };
  }

  rehydrate(state) {
    this.currentPageName = state.currentPageName;
    this.currentPage = state.currentPage;
    this.pages = state.pages;
    this.pageTitle = state.pageTitle;
  }

}

ApplicationStore.storeName = 'ApplicationStore';

// register handler for the navigatge success action
ApplicationStore.handlers = {
  'NAVIGATE_SUCCESS': 'handlePageTitle'
};

export default ApplicationStore;
