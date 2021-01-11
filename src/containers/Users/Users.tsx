import React from "react";
import { Switch } from "react-router-dom";
import PrivateRoute from "../../infrastructure/routing/PrivateRoute";

const endpoint = "/users";

export const USERS_SECTIONS = [
  {
    link: `${endpoint}/browse`,
    text: "Browse"
  },
  {
    link: `${endpoint}/create`,
    text: "Create"
  },
  {
    link: `${endpoint}/assign`,
    text: "Assign"
  }
];

const Users = () => {
  return (
    <Switch>
      {
        USERS_SECTIONS.map(x => {
          return (
            <PrivateRoute exact path={x.link} key={x.link}/>
          );
        })
      }
    </Switch>
  );
};

export default Users;
