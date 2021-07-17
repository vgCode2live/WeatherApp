import React, { useEffect, useReducer } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Weather from '../model/Weather';

export const CurrentWeather = (props) => {
    let { load, lat, lon } = props;

    const reducer = (state, newState) => {
        return ({ ...state, ...newState });
    }

    const [state, setState] = useReducer(reducer, { loadA: load, isLoading: true, weatherData: null });
    const { loadA, isLoading, weatherData } = state;

    const fetchData = async () => {

        try {
            const model = new Weather();
            const da = await model.GetCurrentWeather(lat, lon);
            setState({
                isLoading: false,
                weatherData: { ...da }
            });
        }
        catch (err) {
            console.error(err);
            setState({
                isLoading: false,
                weatherData: { error: 'No Data' }
            });
        }
    }

    useEffect(() => {
        fetchData();
    }, [loadA]);

    return (
        <>
            {isLoading && <p>LOADING...</p>}
            {!isLoading &&
                <Card raised>
                    <CardContent>
                        <p>Location: {weatherData.location || weatherData.error}</p>
                        <p>Temperature: {weatherData.temperature || weatherData.error}</p>
                        <p>Feels: {weatherData.feelLikeTemp || weatherData.error}</p>
                        <p>Condition: {weatherData.weatherCondition || weatherData.error}</p>
                        <p><img src={weatherData.iconImage}></img></p>
                    </CardContent>

                </Card>}
        </>)
}

{/* <p><img src={'http://openweathermap.org/img/wn/10d@2x.png'}></img></p> */ }
