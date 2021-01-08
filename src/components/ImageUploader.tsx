import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Button, Grid } from "@material-ui/core";
import AccountBoxIcon from "@material-ui/icons/AccountBox";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    "&>div:not(:first-child)": {
      marginTop: theme.spacing(2)
    },
    "&>div": {
      width: "100%",
      textAlign: "center"
    }
  },
  imageBox: {
    width: 150,
    height: 150
  }
}));

interface Props {
  imageUrl?: string;
  onChangeImage: (event: React.ChangeEvent) => void;
  onDeleteImage: () => void;
}

const ImageUploader = ({
  imageUrl,
  onChangeImage,
  onDeleteImage
}: Props) => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Box>
        {
          imageUrl
            ? <img src={imageUrl} alt="" width="100%" height="100%"/>
            : <Box mt={-4}><AccountBoxIcon classes={{ root: classes.imageBox }}/></Box>
        }
      </Box>
      <Box>
        <input
          type="file"
          name="file"
          style={{ display: "none" }}
          accept="image/*"
          id="image-file"
          onChange={onChangeImage}
        />
        <label htmlFor="image-file">
          <Button
            color="primary"
            variant="outlined"
            component="span"
          >
            Upload
          </Button>
        </label>
      </Box>
      <Box>
        <Button
          color="primary"
          variant="outlined"
          onClick={onDeleteImage}
        >
          Delete
        </Button>
      </Box>
    </Box>
  );
};

export default React.memo(ImageUploader);
