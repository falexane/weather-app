import { useState, useEffect, useCallback } from "react";

const fetchWeather = ({ cityName, locationName }) => {
  const authKey = "CWB-FC0BB3DA-A762-4E3E-8D56-EC27B29AF9D2";

  return Promise.all([
    // current weather
    fetch(
      `https://opendata.cwb.gov.tw/api/v1/rest/datastore/O-A0003-001?Authorization=${authKey}&locationName=${locationName}`
    ),
    // forecast in 3 hours
    fetch(
      `https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=${authKey}&locationName=${cityName}`
    )
  ])
    .then(responses =>
      // It needs another "Promise.all()" to work.
      Promise.all(responses.map(response => response.json()))
    )
    .then(([json, json2]) => {
      const data = json.records.location[0];
      const weather = data.weatherElement.reduce((wanted, item) => {
        if (["WDSD", "TEMP", "HUMD"].includes(item.elementName))
          wanted[item.elementName] = item.elementValue;
        return wanted;
      }, {});

      const data2 = json2.records.location[0];
      const weather2 = data2.weatherElement.reduce((neededElements, item) => {
        if (["Wx", "PoP", "CI"].includes(item.elementName)) {
          neededElements[item.elementName] = item.time[0].parameter;
        }
        return neededElements;
      }, {});

      return {
        observationTime: data.time.obsTime,
        locationName: data.locationName,
        temperature: weather.TEMP,
        windSpeed: weather.WDSD,
        humid: weather.HUMD,
        description: weather2.Wx.parameterName,
        weatherCode: weather2.Wx.parameterValue,
        rainPossibility: weather2.PoP.parameterName,
        comfortability: weather2.CI.parameterName
      };
    });
};

const useWeatherApi = location => {
  const [weather, setWeather] = useState({
    // current weather
    observationTime: new Date(),
    locationName: "=.=",
    temperature: 0.0,
    windSpeed: 0.0,
    humid: 0.0,
    // forecast in 3 hours
    description: "不告訴你",
    weatherCode: 0,
    rainPossibility: 0,
    comfortability: ""
  });
  const [loading, setLoading] = useState(false);

  /*   const updateData = async () => {
    setLoading(true);
    const data = await fetchWeather(location);
    setWeather(data);
    setLoading(false);
  };
 */
  const updateData = useCallback(() => {
    const _updateData = async () => {
      setLoading(true);
      const data = await fetchWeather(location);
      setWeather(data);
      setLoading(false);
    };

    _updateData();
  }, [location]);

  useEffect(() => {
    updateData();
    // console.log("useEffect, after updateData, loading = ", loading);
  }, [updateData]);

  return [weather, loading, updateData];
};

export default useWeatherApi;
