import React from 'react';
export const NavItem = (props) => {
    const { children, value, index, ...other } = props;
    return (
        <div
            style={{ paddingTop: '20px' }}
            role="tabpanel"
            hidden={value !== index}
            id={`tabIdpanel-${index}`}
            aria-labelledby={`tabId-${index}`}
            {...other}
        >
            {value === index && (
                <div >{children}</div>
            )}
        </div>
    );
}
