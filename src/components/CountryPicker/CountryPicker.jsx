import React, { useState, useEffect } from "react";

import { NativeSelect, FormControl } from "@material-ui/core";

import classes from "./CountryPicker.module.css";

import { fetchCountries } from "../../api/index";

const CountryPicker = ({ countryChangedHandler }) => {
  const [fetchedCountries, setFetchedCountries] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      setFetchedCountries(await fetchCountries());
    };

    fetchApi();
  }, [setFetchedCountries]);

  let form = null;

  if (fetchedCountries.length) {
    form = (
      <FormControl className={classes.formControl}>
        <NativeSelect
          defaultValue=""
          onChange={(e) => countryChangedHandler(e.target.value)}
        >
          <option value="">Global</option>
          {fetchedCountries.map((country, i) => (
            <option key={i} value={country}>
              {country}
            </option>
          ))}
        </NativeSelect>
      </FormControl>
    );
  }

  return form;
};

export default CountryPicker;
