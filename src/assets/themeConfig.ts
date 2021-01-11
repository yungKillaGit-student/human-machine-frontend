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

export const fontSize = 16;
export const border = "white 1px solid";
export const primaryButtonColor = "#5ae";
export const secondaryButtonColor = "#fc0";

const overrides: Overrides = {
  MuiButton: {
    outlinedPrimary: {
      fontSize: 12,
      backgroundColor: primaryButtonColor,
      color: "white",
      border: "none",
      boxShadow: "1.5px 1.5px 1.5px 1.5px #49d !important",
      "&:hover": {
        backgroundColor: primaryButtonColor,
        border: "none"
      }
    },
    outlinedSecondary: {
      fontSize: 12,
      backgroundColor: secondaryButtonColor,
      color: "white",
      border: "none",
      boxShadow: "1.5px 1.5px 1.5px 1.5px #eb0 !important",
      "&:hover": {
        backgroundColor: secondaryButtonColor,
        border: "none"
      }
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
  MuiList: {
    padding: {
      paddingTop: 0,
      paddingBottom: 0
    }
  },
  MuiCard: {
    root: {
      border: "1px solid #68d"
    }
  },
  MuiCardHeader: {
    root: {
      background: "#ace"
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
    h5: {
      fontSize: fontSize
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
