import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../service/AuthContext';
import SearchTab from './SearchTab';
import ResultsTable from './ResultsTable';
import { makeStyles } from '@material-ui/core/styles';

//import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    app: {
        textAlign: 'center',
    },
    header: {
        backgroundColor: '#003399',
        minHeight: '20vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 'calc(5px + 1vmin)',
        color: 'white',
    },
    body: {
        backgroundColor: '#f3f5e4',
        color: 'black',
    },
}));

const Main: React.FC = () => {
    const { token, previousRecords } = useContext(AuthContext) as ContextType;
    const [records, setRecords] = useState<IRecord[]>(previousRecords);

    // useEffect(() => {
    //     //token === '' && login();
    //     setRecords(previousRecords);
    // });

    const handleNewSearch = (result: IRecord) => {
        setRecords({
            ...records,
            [result.url]: result.output,
        });
    };

    const classes = useStyles();

    return (
        <div className={classes.app}>
            <header className={classes.header}>
                <h1>Simple Text Counter App</h1>
            </header>
            <div className={classes.body}>
                <SearchTab handleNewSearch={handleNewSearch} />
                {records.length > 0 ? (
                    <div>
                        <h3>Your Previous Searches</h3>
                        <ResultsTable results={records} />{' '}
                    </div>
                ) : (
                    <p> Any previous requests will show here! </p>
                )}
            </div>
        </div>
    );
};

export default Main;
