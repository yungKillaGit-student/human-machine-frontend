import React from "react";

import { QueryCache, ReactQueryCacheProvider } from "react-query";

import Authentication from "infrastructure/auth/containers/Authentication";
import Router from "infrastructure/routing/Router";
import AppRouting from "infrastructure/routing/AppRouting";

const queryCache = new QueryCache({
  defaultConfig: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false
    }
  }
});

const App = () => {
  return (
    <ReactQueryCacheProvider queryCache={queryCache}>
      <Authentication>
        <Router>
          <AppRouting/>
        </Router>
      </Authentication>
    </ReactQueryCacheProvider>
  );
};

export default App;
