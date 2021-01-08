import { withStyles, Theme } from "@material-ui/core/styles";
import ProgressButton from "./ProgressButton";

const DeleteButton = withStyles((theme: Theme) => ({
  root: {
    color: theme.palette.getContrastText(theme.palette.error.main),
    backgroundColor: theme.palette.error.main,
    "&:hover": {
      backgroundColor: theme.palette.error.dark
    }
  }
}))(ProgressButton);

export default DeleteButton;