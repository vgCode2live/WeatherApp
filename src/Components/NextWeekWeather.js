import React, { useEffect, useReducer } from 'react';
import Card from '@material-ui/core/Card';
import Divider from '@material-ui/core/Divider';
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
                    <p><strong>Location: </strong> {d.location || d.error}</p>
                    <Divider light />
                    <p><strong>Date:  </strong> {d.date || d.error}</p>
                    <Divider light />
                    <p><strong>Temperature:</strong>{d.temperature || d.error}</p>
                    <Divider light />
                    <p><strong>Feels: </strong> {d.feelLikeTemp || d.error}</p>
                    <Divider light />
                    <p><strong>Min:  </strong> {d.min || d.error}</p>
                    <Divider light />
                    <p><strong>Max:  </strong> {d.max || d.error}</p>
                    <Divider light />
                    <p><strong>Condition:</strong> {d.weatherCondition || d.error}</p>
                    <p><img src={d.iconImage}></img></p>
                </CardContent>
            </Card>))
        }
    </>)
}


