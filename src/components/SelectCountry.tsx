import React, { useCallback, useEffect, useState } from "react";
import { getAllCountries } from "../services/countries/api";
import VirtualAutoComplete, { ComboboxOption } from "./VirtualAutoComplete";

interface Props {
  selectedOption: ComboboxOption | null;
  onChange: (event: any, value: ComboboxOption | null) => void;
}

const SelectCountry = ({
  selectedOption,
  onChange
}: Props) => {
  const [countries, setCountries] = useState<ComboboxOption[]>([]);

  const fetchAllCountries = useCallback(async () => {
    const allCountries = await getAllCountries();
    setCountries(allCountries);
  }, []);

  useEffect(() => {
    try {
      fetchAllCountries();
    }
    catch (error) {
      console.log(error);
    }
  }, [fetchAllCountries]);

  return (
    <VirtualAutoComplete
      selectedOption={selectedOption}
      options={countries}
      onChange={onChange}
      isFullWidth={true}
    />
  );
};

export default React.memo(SelectCountry);
