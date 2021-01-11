import React, { useMemo } from "react";
import { ProfileInfoTextField } from "./ProfileInfoEdit";
import GridRow from "../../../../../components/GridRow";
import startCase from "lodash/startCase";
import { Box, TextareaAutosize, TextField } from "@material-ui/core";
import OkCancelButtons from "../../../../../components/OkCancelButtons";
import Layout from "../../../../../components/Layout";
import { ComboboxOption } from "../../../../../components/VirtualAutoComplete";
import SelectCountry from "../../../../../components/SelectCountry";
import SelectRussianRegion from "../../../../../components/SelectRussianRegion";

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
  selectedCountry: ComboboxOption | null;
  onChangeCountry: (event: any, value: ComboboxOption | null) => void;
  selectedRegion: ComboboxOption | null;
  onChangeRegion: (event: any, value: ComboboxOption | null) => void;
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
  onChangeAbout,
  selectedCountry,
  onChangeCountry,
  selectedRegion,
  onChangeRegion
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

  const isRussiaSelected = useMemo(() => {
    if (selectedCountry) {
      return selectedCountry.value === "RU";
    }
    return false;
  }, [selectedCountry]);

  return (
    <Layout
      withImageUploader={true}
      onDeleteImage={onDeleteImage}
      onChangeImage={onChangeImage}
      imageUrl={imageUrl}
    >
      { textBoxes }
      <GridRow label="Country">
        <SelectCountry
          selectedOption={selectedCountry}
          onChange={onChangeCountry}
        />
      </GridRow>
      <GridRow label={isRussiaSelected ? "Region" : ""}>
        <Box
          visibility={isRussiaSelected ? "visible" : undefined}
          display={isRussiaSelected ? undefined : "none"}
          width="100%"
        >
          <SelectRussianRegion
            selectedOption={selectedRegion}
            onChange={onChangeRegion}
          />
        </Box>
      </GridRow>
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
