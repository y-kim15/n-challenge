import React, { useContext, useState } from 'react';
import AuthContext from '../service/AuthContext';
import SearchTab from './SearchTab';
import ResultsTable from './ResultsTable';
import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    app: {
        backgroundColor: '#f3f5e4',
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    header: {
        backgroundColor: '#003399',
        minHeight: '10vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 'calc(5px + 1vmin)',
        color: 'white',
        marginTop: theme.spacing(8),
        padding: theme.spacing(2, 6, 2, 6),
    },
    body: {
        color: 'black',
        padding: theme.spacing(2, 6, 2, 6),
    },
    msg: {
        alignItems: 'center',
    },
}));

const Main: React.FC = () => {
    const { token, previousRecords } = useContext(AuthContext) as ContextType;
    const [records, setRecords] = useState<IRecord[]>(previousRecords);

    const handleNewSearch = (result: IRecord) => {
        setRecords({
            ...records,
            [result.url]: result.output,
        });
    };

    const classes = useStyles();

    return (
        <Container component="main" maxWidth="lg">
            <div className={classes.app}>
                <header className={classes.header}>
                    <h1>Simple Text Counter App</h1>
                </header>
                <div className={classes.body}>
                    <SearchTab handleNewSearch={handleNewSearch} />
                    {records.length > 0 ? (
                        <div id="previous">
                            <h3>Your Previous Searches</h3>
                            <ResultsTable results={records} />{' '}
                        </div>
                    ) : (
                        <p className={classes.msg}>Any previous requests will be displayed here!</p>
                    )}
                </div>
            </div>
        </Container>
    );
};

export default Main;
