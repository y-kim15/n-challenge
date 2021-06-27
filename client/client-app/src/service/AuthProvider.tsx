import React, { useState, useEffect } from 'react';
import { AuthContext } from './AuthContext';
import { launch, previous } from './api';

export const AuthProvider: React.FC = ({ children }) => {
    //const [isAuthenticated, setAuthenticated] = useState(false);
    const [token, setToken] = useState('');
    const [previousRecords, setPreviousRecords] = useState<IRecord[]>([]);

    const login = async () => {
        launch().then((newToken) => setToken(newToken));
        //setAuthenticated(true);
    };

    const records = async () => {
        if (token) {
            previous().then((results) => {
                setPreviousRecords(results);
            });
        }
    };

    // const previousRe = () => {
    //     async () => {
    //         return previous().then((results) => {
    //             return results;
    //         })
    //             ;
    //     }
    // }

    useEffect(() => {
        const oldToken = localStorage.getItem('token');
        if (oldToken) {
            setToken(oldToken);
            previous().then((results) => {
                setPreviousRecords(results);
            });
        } else if (oldToken === null) {
            launch().then((newToken) => setToken(newToken));
        }

        //return (token, previousRecords);
    }, []);

    return <AuthContext.Provider value={{ token, previousRecords }}>{children}</AuthContext.Provider>;
};
