
import WeatherAPI from '../API/WeatherAPI';
const ImageUrl = process.env.REACT_APP_WEATHER_CONDITION_IMAGE;

class Weather {
    constructor() {
        this.data = {
            temperature: '', feelLikeTemp: '', weatherCondition: '', min: '', max: '', date: '', iconImage: '',
            location: '',
            error: ''
        }
    }

    GetCurrentWeather = async (lat, lon) => {
        const weatherAPI = new WeatherAPI();
        let json = await weatherAPI.GetCurrentWeatherByLocation(lat, lon);
        this.SetWeatherData(json);
        return this.data;
    }

    GetForcastedData = async (lat, lon) => {
        const weatherAPI = new WeatherAPI();
        let json = await weatherAPI.GetWeatherForecastByLocation(lat, lon);
        let list = [];
        for (const data of json.daily) {
            let item = new Weather();
            item.SetForcastedData(data);
            list.push(item.data);
            console.log('test');
        }
        return list;
    }

    SetForcastedData = (json) => {
        this.data.temperature = `${json.temp.day} ℉`;
        this.data.feelLikeTemp = `${json.feels_like.day} ℉`;
        this.data.weatherCondition = json.weather[0].description;
        this.data.min = `${json.temp.min} ℉`;
        this.data.max = `${json.temp.max} ℉`;
        this.data.date = this.getDate(json.dt);
        this.data.iconImage = this.getIcon(json.weather[0].icon);
        this.data.location = 'Weston, FL';
    }

    SetWeatherData = (json) => {
        this.data.temperature = `${json.main.temp} ℉`;
        this.data.feelLikeTemp = `${json.main.feels_like} ℉`;
        this.data.weatherCondition = json.weather[0].description;
        this.data.min = `${json.main.temp_min} ℉`;
        this.data.max = `${json.main.temp_max} ℉`;
        this.data.date = this.getDate(json.dt);
        this.data.iconImage = this.getIcon(json.weather[0].icon);
        this.data.location = 'Weston, FL';
    }
    getDate = (dt) => {
        const dateObject = new Date(dt * 1000);
        const day = dateObject.toLocaleString("en-US", { weekday: "short" });
        const month = dateObject.toLocaleString("en-US", { month: "short" });
        const num = dateObject.toLocaleString("en-US", { day: "numeric" });
        return `${day}, ${month} ${num}`;
    }
    getIcon = (iconId) => {
        return `${ImageUrl}${iconId}@2x.png`
    }

}
export default Weather;