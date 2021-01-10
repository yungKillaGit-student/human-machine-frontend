import React, { ReactNode } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Grid } from "@material-ui/core";
import ImageUploader from "./ImageUploader";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    height: "100%",
    alignItems: "center",
    justifyContent: "center"
  },
  formFields: {
    width: 900
  }
}));

interface Props {
  children: ReactNode;
  withImageUploader: boolean;
  imageUrl?: string;
  onChangeImage?: (event: React.ChangeEvent) => void;
  onDeleteImage?: () => void;
}

const Layout = ({
  children,
  withImageUploader,
  imageUrl,
  onDeleteImage,
  onChangeImage
}: Props) => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Box className={classes.formFields}>
        <Grid container spacing={withImageUploader ? 5 : 0}>
          {
            withImageUploader && !!onChangeImage && !!onDeleteImage
              ? (
                <>
                  <Grid container item xs={4}>
                    <ImageUploader
                      imageUrl={imageUrl}
                      onChangeImage={onChangeImage}
                      onDeleteImage={onDeleteImage}
                    />
                  </Grid>
                  <Grid container item xs={8} spacing={2}>
                    { children }
                  </Grid>
                </>
              )
              : (
                <Grid container>
                  { children }
                </Grid>
              )
          }
        </Grid>
      </Box>
    </Box>
  );
};

export default React.memo(Layout);
