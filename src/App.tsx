import React from "react";

import Authentication from "infrastructure/auth/containers/Authentication";
import Router from "infrastructure/routing/Router";
import NavigationFrame from "./infrastructure/routing/NavigationFrame";
import DialogManager from "infrastructure/dialogs/components/DialogManager";

const App = () => {
  return (
    <Authentication>
      <Router>
        <DialogManager>
          <NavigationFrame/>
        </DialogManager>
      </Router>
    </Authentication>
  );
};

export default App;
