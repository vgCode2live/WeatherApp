import React, { useEffect, useReducer } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Weather from '../model/Weather';

export const NextWeekWeather = (props) => {
    let { load, lat, lon } = props;

    const reducer = (state, newState) => {
        return ({ ...state, ...newState });
    }

    const [state, setState] = useReducer(reducer, { loadA: load, isLoading: true, weatherData: [] });
    const { loadA, isLoading, weatherData } = state;

    const fetchData = async () => {
        try {
            const model = new Weather();
            const forcastedData = await model.GetForcastedData(lat, lon);
            setState({
                isLoading: false,
                weatherData: forcastedData
            });
        }
        catch (err) {
            console.error(err);
            let errorRes = [];
            errorRes.push({ error: 'No Data' });
            setState({
                isLoading: false,
                weatherData: errorRes
            });
        }
    }

    useEffect(() => {
        fetchData();
    }, [loadA]);

    return (<>
        {isLoading && <p>LOADING...</p>}
        {!isLoading && weatherData.map((d, i) => (
            <Card key={`card-rep-${i}`} raised style={{ marginBottom: '10px' }}>
                <CardContent>
                    <p>Location: {d.location || d.error}</p>
                    <p>Date: {d.date || d.error}</p>
                    <p>Temperature: {d.temperature || d.error}</p>
                    <p>Feels: {d.feelLikeTemp || d.error}</p>
                    <p>Condition: {d.weatherCondition || d.error}</p>
                    <p>Min: {d.min || d.error}</p>
                    <p>Max: {d.max || d.error}</p>
                    <p><img src={d.iconImage}></img></p>
                </CardContent>
            </Card>))
        }
    </>)
}


