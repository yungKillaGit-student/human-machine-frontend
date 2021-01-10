import React, { useMemo } from "react";
import { ProfileInfoTextField } from "./ProfileInfoEdit";
import GridRow from "../../../../../components/GridRow";
import startCase from "lodash/startCase";
import { Box, TextareaAutosize, TextField } from "@material-ui/core";
import OkCancelButtons from "../../../../../components/OkCancelButtons";
import Layout from "../../../../../components/Layout";

interface Props {
  formFields: Record<ProfileInfoTextField, string>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  validation: Record<string, string>;
  mainAction: () => void;
  cancelAction: () => void;
  imageUrl?: string;
  onChangeImage?: (event: React.ChangeEvent) => void;
  onDeleteImage?: () => void;
  about: string;
  onChangeAbout: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const ProfileInfoEditContent = ({
  formFields,
  onChange,
  validation,
  mainAction,
  cancelAction,
  imageUrl,
  onChangeImage,
  onDeleteImage,
  about,
  onChangeAbout
}: Props) => {
  const textBoxes = useMemo(() => {
    return Object.keys(formFields).map(textboxName => {
      return (
        <GridRow label={startCase(textboxName)} key={textboxName}>
          <Box width="100%" ml="auto">
            {
              <TextField
                variant="outlined"
                error={!!validation[textboxName]}
                value={formFields[textboxName as ProfileInfoTextField]}
                onChange={onChange}
                name={textboxName}
                fullWidth={true}
                helperText={validation[textboxName]}
              />
            }
          </Box>
        </GridRow>
      );
    });
  }, [onChange, formFields, validation]);

  return (
    <Layout
      withImageUploader={true}
      onDeleteImage={onDeleteImage}
      onChangeImage={onChangeImage}
      imageUrl={imageUrl}
    >
      { textBoxes }
      <GridRow label="About">
        <Box width="100%" ml="auto">
          <TextareaAutosize
            value={about}
            onChange={onChangeAbout}
            rows={6}
            style={{ width: "97%" }}
          />
        </Box>
      </GridRow>
      <OkCancelButtons
        mainAction={mainAction}
        cancelAction={cancelAction}
      />
    </Layout>
  );
};

export default React.memo(ProfileInfoEditContent);
