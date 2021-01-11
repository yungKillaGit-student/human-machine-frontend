import { executeRequest } from "../../infrastructure/apiService";
import { Country, RegionsTable } from "./models";
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
  const corsAnyWhereServerUrl = "https://cors-anywhere.herokuapp.com";
  const wikiPageName = "Federal_subjects_of_Russia";
  const regionsTableIndex = 2;
  const regionsTableUrl = `${corsAnyWhereServerUrl}/https://www.wikitable2json.com/api/${wikiPageName}`;
  const { tables } = await executeRequest<{ tables: any[] }>(regionsTableUrl, {
    withCredentials: false,
    params: {
      table: regionsTableIndex
    }
  });

  const regionsTable: RegionsTable = tables[0];

  const regionCodeKey = "0";
  const regionNameKey = "1";
  // Delete column headers.
  delete regionsTable.rows["0"];

  const rows = regionsTable.rows;
  return Object.keys(rows).map(x => {
    return {
      name: rows[x].columns[regionNameKey],
      value: rows[x].columns[regionCodeKey]
    };
  });
};
