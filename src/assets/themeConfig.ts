import { ThemeOptions } from "@material-ui/core/styles/createMuiTheme";
import { SimplePaletteColorOptions } from "@material-ui/core/styles/createPalette";
import { Overrides } from "@material-ui/core/styles/overrides";

const primaryColor: SimplePaletteColorOptions = {
  dark: "#000",
  main: "#000",
  light: "#000",
  contrastText: "#FFFFFF"
};

const secondaryColor: SimplePaletteColorOptions = {
  dark: "#002848",
  main: "#225074",
  light: "#537CA3",
  contrastText: "#FFFFFF"
};

const fontSize = 11;

export const border = "#7D7D7D solid 0.5px";

const overrides: Overrides = {
  MuiButton: {
    contained: {
      "&$disabled": {
        color: "rgba(0, 0, 0, 0.38)",
        backgroundColor: "rgba(0, 0, 0, 0.12)"
      }
    },
    root: {
      maxHeight: "25px",
      fontSize: fontSize
    }
  },
  MuiTable: {
    root: {
      borderLeft: border,
      borderRight: border,
      borderBottom: border
    }
  },
  MuiTableRow: {
    head: {
      position: "sticky",
      top: 0,
      zIndex: 1,
      alignSelf: "flex-start"
    }
  },
  MuiTableCell: {
    root: {
      padding: "4px 4px 4px",
      minHeight: 30
    },
    head: {
      border: border
    },
    body: {
      borderLeft: border,
      borderRight: border
    }
  },
  MuiInputBase: {
    root: {
      fontSize: fontSize,
      letterSpacing: "0.25px",
      "& input": {
        letterSpacing: "0.25px"
      },
      "& input::-ms-clear, & input::-ms-reveal": {
        display: "none"
      },
      maxHeight: "25px"
    }
  },
  MuiOutlinedInput: {
    input: {
      paddingLeft: 12,
      paddingRight: 12,
      paddingTop: 10.5,
      paddingBottom: 10.5
    },
    multiline: {
      paddingTop: 10.5,
      paddingBottom: 10.5
    }
  },
  MuiFormHelperText: {
    contained: {
      marginLeft: 0,
      marginTop: 4,
      lineHeight: "16px"
    }
  },
  MuiFormControl: {
    root: {
      outline: "none"
    },
    marginDense: {
      marginTop: 4
    }
  },
  MuiTooltip: {
    tooltip: {
      fontSize: fontSize,
      lineHeight: "16px",
      fontWeight: "normal",
      backgroundColor: "#000000",
      padding: "4px 8px"
    }
  },
  MuiDialogTitle: {
    root: {
      padding: "16px 20px",
      color: primaryColor.main,
      "& h2": {
        fontWeight: "normal"
      }
    }
  },
  MuiDialogContent: {
    root: {
      padding: "8px 20px"
    }
  },
  MuiDialogContentText: {
    root: {
      marginTop: 4,
      marginBottom: 0,
      color: "#000000"
    }
  },
  MuiDialogActions: {
    root: {
      padding: 20
    }
  },
  MuiLink: {
    root: {
      color: "#225074" // Link should have the same hardcoded color in all themes. By design.
    }
  },
  MuiTab: {
    root: {
      borderBottom: "2px solid rgba(0, 0, 0, 0.12)"
    }
  },
  MuiList: {
    padding: {
      paddingTop: 0,
      paddingBottom: 0
    }
  }
};

const themeConfig: ThemeOptions = {
  spacing: 4,
  shape: {
    borderRadius: 4
  },
  typography: {
    h1: {
      fontSize: 32,
      fontWeight: 500,
      lineHeight: "36px"
    },
    h2: {
      fontSize: 20,
      fontWeight: "normal",
      letterSpacing: "0.15px"
    },
    subtitle1: {
      fontSize: 16,
      lineHeight: "24px",
      fontWeight: "normal",
      letterSpacing: "0.15px"
    },
    body1: {
      fontSize: fontSize,
      lineHeight: "20px",
      fontWeight: "normal",
      letterSpacing: "0.25px"
    },
    body2: {
      fontSize: fontSize,
      lineHeight: "20px",
      fontWeight: "normal",
      letterSpacing: "0.25px"
    },
    caption: {
      fontSize: fontSize,
      lineHeight: "16px",
      fontWeight: "normal",
      letterSpacing: "0.4px"
    },
    button: {
      fontSize: fontSize,
      fontWeight: 500,
      letterSpacing: "0.4px"
    }
  },
  props: {
    MuiButton: {
      disableElevation: true
    }
  },
  overrides: overrides,
  palette: {
    primary: primaryColor,
    secondary: secondaryColor
  }
};

export default themeConfig;
