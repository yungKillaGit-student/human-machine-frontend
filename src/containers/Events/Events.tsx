import React from "react";
import { Switch } from "react-router-dom";
import PrivateRoute from "../../infrastructure/routing/PrivateRoute";

const endpoint = "/events";

export const EVENTS_SECTIONS = [
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

const Events = () => {
  return (
    <Switch>
      {
        EVENTS_SECTIONS.map(x => {
          return (
            <PrivateRoute exact path={x.link} key={x.link}/>
          );
        })
      }
    </Switch>
  );
};

export default Events;
