import React, { useState, Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Box,
    TableCell,
    Collapse,
    TableRow,
    Typography,
    Paper,
    IconButton,
    TableContainer,
    Table,
    TableBody,
    TableHead,
} from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

//const MAX_LIMIT = 50;
const useRowStyles = makeStyles({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
});

function Row(props: { row: IRecord }) {
    const { row } = props;
    const [open, setOpen] = useState(false);
    const classes = useRowStyles();
    return (
        <Paper>
            <Fragment>
                <TableRow className={classes.root}>
                    <TableCell>
                        <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </IconButton>
                    </TableCell>
                    <TableCell component="th" scope="row">
                        {row.url}
                    </TableCell>
                    <TableCell align="right">{row.created}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <Box margin={1}>
                                <Typography variant="h6" gutterBottom component="div">
                                    Output
                                </Typography>
                                <p>{row.output}</p>
                            </Box>
                        </Collapse>
                    </TableCell>
                </TableRow>
            </Fragment>
        </Paper>
    );
}

const ResultsTable: React.FC<TableProps> = ({ results }) => {
    return (
        <div>
            <h4>Record here</h4>
            <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell />
                            <TableCell>Submitted URL</TableCell>
                            <TableCell align="right">Date Created</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {results.map((row: IRecord) => (
                            <Row key={row.id} row={row} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default ResultsTable;
