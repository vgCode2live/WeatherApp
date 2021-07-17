import React, { useEffect, useReducer } from 'react';
import Card from '@material-ui/core/Card';
import Divider from '@material-ui/core/Divider';
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
                        <p><strong>Location: </strong>{weatherData.location || weatherData.error}</p>
                        <Divider light />
                        <p><strong>Temperature:</strong> {weatherData.temperature || weatherData.error}</p>
                        <Divider light />
                        <p><strong>Feels: </strong>{weatherData.feelLikeTemp || weatherData.error}</p>
                        <Divider light />
                        <p><strong>Condition:</strong> {weatherData.weatherCondition || weatherData.error}</p>
                        <Divider light />
                        <p><img src={weatherData.iconImage}></img></p>
                    </CardContent>

                </Card>}
        </>)
}

{/* <p><img src={'http://openweathermap.org/img/wn/10d@2x.png'}></img></p> */ }
