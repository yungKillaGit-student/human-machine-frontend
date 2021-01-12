import { executeRequest } from "../../infrastructure/apiService";
import { Country, Region } from "./models";
import { ComboboxOption } from "../../components/VirtualAutoComplete";

export const getAllCountries = async (): Promise<ComboboxOption[]> => {
  const countries = await executeRequest<Country[]>("https://restcountries.eu/rest/v2/all", {
    withCredentials: false
  });
  return countries.map(x => {
    return {
      name: x.name,
      value: x.alpha2Code
    };
  });
};

export const getAllRussianRegions = async (): Promise<ComboboxOption[]> => {
  const countries = await executeRequest<Region[]>("/common/russian-regions");
  return countries.map(x => {
    return {
      name: x.name,
      value: x.code
    };
  });
};
