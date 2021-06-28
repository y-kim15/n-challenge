import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { Grid, Paper, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ResultsTable from './ResultsTable';
import { search } from '../service/Api';

const useStyles = makeStyles((theme) => ({
    page: {
        width: '100%',
        //margin: theme.spacing(2, 6, 2, 6),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    padding: {
        padding: theme.spacing(1),
    },
    button: {
        margin: theme.spacing(3, 0, 2),
        textTransform: 'none',
    },
    marginTop: {
        marginTop: 10,
    },
}));

const SearchTab = (props: SearchProps) => {
    const [url, setUrl] = useState<string>('');
    const [result, setResult] = useState<IRecord[]>([]);
    const [error, setError] = useState<string>('');

    const onSearch = async (_: React.MouseEvent) => {
        try {
            const data = await search(url);
            setResult([data]);
            props.handleNewSearch(data);
        } catch (err) {
            if (err instanceof Error) {
                // handle errors thrown from frontend
                setError(err.message);
            } else {
                // handle errors thrown from backend
                setError(err);
            }
        }
    };
    const classes = useStyles();

    return (
        <Paper className={classes.padding}>
            <div className={classes.page}>
                <h3>Type URL here</h3>
                <Grid container spacing={8} alignItems="flex-start">
                    <Grid item md={true} sm={true} xs={true}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            id="url"
                            label="URL"
                            type="url"
                            value={url}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUrl(e.currentTarget.value)}
                            fullWidth
                            autoFocus
                            required
                        />

                        <Button variant="contained" color="primary" className={classes.button} onClick={onSearch}>
                            Search
                        </Button>
                    </Grid>
                </Grid>
                {result.length > 0 && <ResultsTable results={result} />}
            </div>
        </Paper>
    );
};
//elevation={3}>
export default SearchTab;
