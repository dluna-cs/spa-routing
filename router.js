const Router = {
  routes: [],

  register(name, component) {
    this.routes.push({ name, component });
  },

  goTo(view) {
    const url = new URL(window.location.href);
    url.hash = view;
    window.location.href = url.toString();
  },

  applyRouting(routeName) {
    let routeMatch = false;
      this.routes.forEach((route) => {
        routeMatch = routeMatch || routeName === route.name;
        route.component.setAttribute('style', routeName === route.name ? '' : 'display:none');
      });

      if (!routeMatch) {
        const defaultRoute = this.routes.find(route => route.name === '*');

        if (defaultRoute) {
          defaultRoute.component.setAttribute('style', '');
        }
      }
  },

  init() {
    // Routing logic
    window.addEventListener('hashchange', (event) => {
      const url = new URL(event.newURL);
      const routeName = url.hash.replace(/^#/, '');
      
      this.applyRouting(routeName);
    });

    const currentUrl = new URL(window.location.href);
    const reouteName = currentUrl.hash.replace(/^#/, '');
    this.applyRouting(reouteName);
  }
};
