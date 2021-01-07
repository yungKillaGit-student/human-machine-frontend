import React from "react";
import { BrowserRouter } from "react-router-dom";

import RemoveTrailingSlash from "./RemoveTrailingSlash";

interface Props {
  children: React.ReactNode;
}

const Router = ({ children }: Props) => {
  return (
    <BrowserRouter>
      <RemoveTrailingSlash>
        {children}
      </RemoveTrailingSlash>
    </BrowserRouter>
  );
};

export default Router;
