import { useEffect, useState } from "react";
import Search from "../search";

export default function Weather() {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [weatherData, setWeatherData] = useState(null);

  const ApiKey = "eb6f898588f69bbc72bd18dd02d36c5c";

  async function fetchWeather(param) {
    try {
      setLoading(true);

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${param}&appid=${ApiKey}`
      );
      const result = await response.json();
      console.log(result);

      if (result) {
        setLoading(false);
        setWeatherData(result);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  useEffect(() => {
    fetchWeather("São Paulo");
  }, []);

  function handleSearch() {
    fetchWeather(search);
  }

  function getCurrentDate() {
    return new Date().toLocaleDateString("en-us", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  }

  return (
    <div>
      <Search
        search={search}
        setSearch={setSearch}
        handleSearch={handleSearch}
      />
      {loading ? (
        <div>Carregando Dados</div>
      ) : (
        <div>
          <div className="city-name">
            <h2>
              {weatherData?.name}, <span>{weatherData?.sys?.country}</span>
            </h2>
          </div>
          <div className="date">
            <span>{getCurrentDate}</span>
          </div>
          <div>{weatherData?.main?.temp} </div>

          <p className="description">
            {weatherData && weatherData.weather && weatherData.weather[0]
              ? weatherData.weather[0].description
              : ""}
          </p>
          <div className="weather-info">
            <div>
                <div>
                    <p>'5:41:17'</p>
                </div>

            </div>

          </div>
        </div>
      )}
    </div>
  );
}
