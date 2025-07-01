import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export type Country = {
  label: string;
  value: string;
};

export type Currency = {
  [key: string]: string;
};

export interface AppContextValue {
  countries: Country[];
  currencies: Currency;
}

export const AppContext = createContext<AppContextValue | null>(null);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [currencies, setCurrencies] = useState<Currency>({});

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all?fields=name,cca3")
      .then((res) => {
        const sortedCountries: Country[] = res.data
          .sort((a: any, b: any) => a.name.common.localeCompare(b.name.common))
          .map((country: any) => ({
            label: country.name.common,
            value: country.cca2,
          }));

        setCountries(sortedCountries);
      });

    axios
      .get<Currency>("https://openexchangerates.org/api/currencies.json")
      .then((res) => setCurrencies(res.data));
  }, []);

  return (
    <AppContext.Provider value={{ countries, currencies }}>
      {children}
    </AppContext.Provider>
  );
};
