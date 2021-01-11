import React from "react";
import { Switch } from "react-router-dom";
import PrivateRoute from "../../infrastructure/routing/PrivateRoute";

const endpoint = "/documents";

export const DOCUMENTS_SECTIONS = [
  {
    link: `${endpoint}/browse`,
    text: "Browse"
  },
  {
    link: `${endpoint}/create`,
    text: "Create"
  },
  {
    link: `${endpoint}/download`,
    text: "Download"
  }
];

const Documents = () => {
  return (
    <Switch>
      {
        DOCUMENTS_SECTIONS.map(x => {
          return (
            <PrivateRoute exact path={x.link} key={x.link}/>
          );
        })
      }
    </Switch>
  );
};

export default Documents;
