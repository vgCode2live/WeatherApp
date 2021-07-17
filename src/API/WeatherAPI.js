const WeatherAPIKey = process.env.REACT_APP_WeatherAPIKey;
const WeatherURL = process.env.REACT_APP_WEATHER_API;
// const ForeCastAPIURL = process.env.REACT_APP_WEATHER_FORECASE_API;
const ForeCastAPIURLByLocationURL = process.env.REACT_APP_WEATHER_FORECAST_BYLOCATION_API;

class WeatherAPI {

    // GetCurrentWeatherByCityName = async (city) => {
    //     const qs = `?q=${city}&appid=${WeatherAPIKey}&units=imperial`;
    //     const url = `${WeatherURL}${qs}`;
    //     return this.getApiData(url);
    // }

    // GetWeatherForecastByCityName = async (city) => {
    //     const qs = `?q=${city}&appid=${WeatherAPIKey}&units=imperial&cnt=7`;
    //     const url = `${ForeCastAPIURL}${qs}`;
    //     console.log(`url is ${url}`);
    //     return this.getApiData(url);
    // }

    GetCurrentWeatherByLocation = async (lat, lon) => {
        const qs = `?lat=${lat}&lon=${lon}&appid=${WeatherAPIKey}&units=imperial`;
        const url = `${WeatherURL}${qs}`;
        return this.getApiData(url);
    }

    GetWeatherForecastByLocation = async (lat, lon) => {
        const qs = `?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&appid=${WeatherAPIKey}&units=imperial&cnt=7`;
        const url = `${ForeCastAPIURLByLocationURL}${qs}`;
        return this.getApiData(url);
    }

    getApiData = async (url) => {
        const response = await fetch(url);
        const jsonResp = await response.json();
        return jsonResp;
    }
}


export default WeatherAPI;

