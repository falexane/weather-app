import React from "react";
import styled from "@emotion/styled";
import WeatherIcon from "./WeatherIcon";

import { ReactComponent as AirFlowIcon } from "./images/air-flow.svg";
import { ReactComponent as RainIcon } from "./images/rain.svg";
import { ReactComponent as RefreshIcon } from "./images/refresh.svg";
import { ReactComponent as LoadingIcon } from "./images/loading.svg";
import { ReactComponent as CogIcon } from "./images/cog.svg";
// import WeatherSetting from "./WeatherSetting";

const WeatherCardWrapper = styled.div`
  position: relative;
  min-width: 360px;
  box-shadow: ${({ theme }) => theme.boxShadow};
  background-color: ${({ theme }) => theme.foregroundColor};
  box-sizing: border-box;
  padding: 30px 15px;
`;

const Location = styled.div`
  font-size: 28px;
  color: ${({ theme }) => theme.titleColor};
  margin-bottom: 20px;
  /* border: 1px solid red; */
`;

const Description = styled.div`
  font-size: 16px;
  color: ${({ theme }) => theme.textColor};
  margin-bottom: 30px;
`;

const CurrentWeather = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  /* border: 1px solid red; */
`;

const Temperature = styled.div`
  color: ${({ theme }) => theme.temperatureColor};
  font-size: 96px;
  font-weight: 300;
  display: flex;
  /* border: 1px solid limegreen; */
`;

const Celsius = styled.div`
  font-weight: normal;
  font-size: 42px;
  /* border: 1px solid cyan; */
`;

const AirFlow = styled.div`
  display: flex;
  align-items: center;
  font-size: 16x;
  font-weight: 300;
  color: ${({ theme }) => theme.textColor};
  margin-bottom: 20px;
  svg {
    width: 25px;
    height: auto;
    margin-right: 30px;
  }
`;

const Rain = styled.div`
  display: flex;
  align-items: center;
  font-size: 16x;
  font-weight: 300;
  color: ${({ theme }) => theme.textColor};
  svg {
    width: 25px;
    height: auto;
    margin-right: 30px;
  }
`;

const Refresh = styled.div`
  position: absolute;
  right: 15px;
  bottom: 15px;
  font-size: 12px;
  display: inline-flex;
  align-items: flex-end;
  color: ${({ theme }) => theme.textColor};
  svg {
    margin-left: 10px;
    width: 15px;
    height: 15px;
    cursor: pointer;
    animation: rotate ${({ loading }) => (loading ? "1s" : "0s")} linear
      infinite;
  }
  @keyframes rotate {
    from {
      transform: rotate(360deg);
    }
    to {
      transform: rotate(0deg);
    }
  }
`;

const Cog = styled(CogIcon)`
  position: absolute;
  top: 30px;
  right: 15px;
  width: 25px;
  height: 25px;
  cursor: pointer;
`;

const WeatherCard = ({ city, weather, loading, updateData, setPage }) => {
  return (
    <WeatherCardWrapper>
      <Cog onClick={() => setPage("WeatherSetting")} />
      {/* <Location>{weather.locationName}</Location> */}
      <Location>{city}</Location>
      <Description>
        {weather.description} {weather.comfortability}
      </Description>
      <CurrentWeather>
        <Temperature>
          {Math.round(weather.temperature)} <Celsius>°C</Celsius>
        </Temperature>
        <WeatherIcon weatherCode={weather.weatherCode} moment="day" />
      </CurrentWeather>
      <AirFlow>
        <AirFlowIcon />
        {weather.windSpeed} m/h
      </AirFlow>
      <Rain>
        <RainIcon />
        {/* Math.round(weather.humid * 100) */}
        {Math.round(weather.rainPossibility)} %
      </Rain>
      <Refresh onClick={updateData} loading={loading}>
        最後觀測時間：
        {new Intl.DateTimeFormat("zh-TW", {
          hour: "numeric",
          minute: "numeric"
        }).format(new Date(weather.observationTime))}{" "}
        {/* {console.log("render, before setloadingicon, loading = ", loading)} */}
        {loading ? <LoadingIcon /> : <RefreshIcon />}
        {/* {console.log("render, after setloadingicon, loading = ", loading)} */}
      </Refresh>
    </WeatherCardWrapper>
  );
};

export default WeatherCard;
