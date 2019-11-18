import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { ThemeProvider } from "emotion-theming";
import { findLocation } from "./utils";
// import cloudyIcon from "./images/icon144.png"; // *.svg don't work
import WeatherCard from "./WeatherCard";
import WeatherSetting from "./WeatherSetting";
import useWeatherApi from "./useWeatherApi";

const themes = {
  light: {
    backgroundColor: "#ededed",
    foregroundColor: "#f9f9f9",
    boxShadow: "0 1px 3px 0 #999999",
    titleColor: "#212121",
    temperatureColor: "#757575",
    textColor: "#828282"
  },
  dark: {
    backgroundColor: "#1F2022",
    foregroundColor: "#121416",
    boxShadow:
      "0 1px 4px 0 rgba(12, 12, 13, 0.2), 0 0 0 1px rgba(255, 255, 255, 0.15)",
    titleColor: "#f9f9fa",
    temperatureColor: "#dddddd",
    textColor: "#cccccc"
  }
};

const Container = styled.div`
  background-color: ${({ theme }) => theme.backgroundColor};
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  /* border: 3px solid red; */
`;

const WeatherApp = () => {
  /* use localStorage item "cityName" */
  const storageCity = localStorage.getItem("cityName");
  const [theme, setTheme] = useState("light");
  const [page, setPage] = useState("WeatherCard");
  const [city, setCity] = useState(storageCity || "臺北市");
  const location = findLocation(city) || {};
  const [weather, loading, updateData] = useWeatherApi(location);

  useEffect(() => {
    localStorage.setItem("cityName", city);
  }, [city]);

  return (
    <ThemeProvider theme={themes[theme]}>
      <Container>
        {page === "WeatherCard" && (
          <WeatherCard
            city={location.cityName}
            weather={weather}
            loading={loading}
            updateData={updateData}
            setPage={setPage}
          />
        )}
        {page === "WeatherSetting" && (
          <WeatherSetting
            city={location.cityName}
            setCity={setCity}
            setPage={setPage}
          />
        )}
      </Container>
    </ThemeProvider>
  );
};

export default WeatherApp;
