import React, { useCallback, useEffect, useState } from "react";
import { getAllCountries, getAllRussianRegions } from "../services/countries/api";
import VirtualAutoComplete, { ComboboxOption } from "./VirtualAutoComplete";

interface Props {
  selectedOption: ComboboxOption | null;
  onChange: (event: any, value: ComboboxOption | null) => void;
}

const SelectRussianRegion = ({
  selectedOption,
  onChange
}: Props) => {
  const [regions, setRegions] = useState<ComboboxOption[]>([]);

  const fetchAllRussianRegions = useCallback(async () => {
    const allRegions = await getAllRussianRegions();
    setRegions(allRegions);
  }, []);

  useEffect(() => {
    try {
      fetchAllRussianRegions();
    }
    catch (error) {
      console.error(error);
    }
  }, [fetchAllRussianRegions]);

  return (
    <VirtualAutoComplete
      selectedOption={selectedOption}
      options={regions}
      onChange={onChange}
      isFullWidth={true}
    />
  );
};

export default React.memo(SelectRussianRegion);
