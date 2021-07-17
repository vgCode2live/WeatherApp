import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { NavItem } from './NavItem';
import { CurrentWeather } from './CurrentWeather';
import { NextWeekWeather } from './NextWeekWeather';
import ErrorBoundary from './ErrorBoundary';


function getAttr(index) {
    return {
        id: `tabId-${index}`,
        'aria-controls': `tabIdpanel-${index}`,
    };
}
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
}));

export const NavBar = () => {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={classes.root}>
            <ErrorBoundary>
                <AppBar position="static">
                    <Tabs value={value} onChange={handleChange}>
                        <Tab label="Now" {...getAttr(0)} />
                        <Tab label="Weekly" {...getAttr(1)} />
                    </Tabs>
                </AppBar>
                <NavItem value={value} index={0}>
                    <CurrentWeather city={'Weston'} lat={26.1004} lon={-80.3998} load />
                </NavItem>
                <NavItem value={value} index={1}>
                    <NextWeekWeather city={'Weston'} lat={26.1004} lon={-80.3998} />
                </NavItem>
            </ErrorBoundary>

        </div>
    );
}



