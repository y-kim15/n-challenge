import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { Grid, Paper, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ResultsTable from './ResultsTable';
import { search } from '../service/api';

const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(2),
    },
    padding: {
        padding: theme.spacing(1),
    },
    button: {
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
        <Paper className={classes.padding} elevation={3}>
            <div className={classes.margin}>
                <Grid container spacing={8} alignItems="flex-end">
                    <Grid item md={true} sm={true} xs={true}>
                        <TextField
                            id="url"
                            label="URL"
                            type="url"
                            value={url}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUrl(e.currentTarget.value)}
                            fullWidth
                            autoFocus
                            required
                        />

                        <Button variant="outlined" color="primary" className={classes.button} onClick={onSearch}>
                            Search
                        </Button>
                    </Grid>
                </Grid>
                {result.length > 0 && (
                    <div className="current">
                        <ResultsTable results={result} />
                    </div>
                )}
            </div>
        </Paper>
    );
};

export default SearchTab;
