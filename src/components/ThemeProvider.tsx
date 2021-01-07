import React, { useMemo } from "react";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import themeConfig from "assets/themeConfig";

interface Props {
  children: React.ReactNode;
}

export default ({ children }: Props) => {
  const theme = useMemo(() => {
    return createMuiTheme(themeConfig);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  );
};
