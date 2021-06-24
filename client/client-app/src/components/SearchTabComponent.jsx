import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
//import { Button, InputGroup, FormControl } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
import Table from './TableComponent';

export default class SearchTabComponent extends Component {
    state = {
        uuid: '', // session id
        ids: [], // search ids
        url: '', // current search url
        result: [], // current result
    };

    onInputSubmit = (e) => {
        // if previous result exists, add to previous before sending other request

        const value = e.target.value;

        this.setState({
            url: value,
        });
        if (this.state.result.length > 0) {
            const { onNewSearch } = this.props;
            onNewSearch(this.state.result);
        }

        if (value === '') {
            this.setState({
                result: [],
            });
        } else {
            // TODO call to fetch output
            // set state with the result
            const sample = {
                id: '1',
                date: '2021-06-21',
                url: 'www.google.com',
                counts: 'I: 2, you: 5, google: 1',
            };

            this.setState({
                result: [sample],
            });
        }
    };

    render() {
        return (
            <div>
                <Grid container spacing={1} alignItems="flex-end">
                    <Grid item>
                        <FaSearch />
                    </Grid>{' '}
                    <Grid item>
                        <TextField required id="input-with-icon-grid" label="Type your URL here" />
                    </Grid>{' '}
                </Grid>{' '}
                <Button variant="primary" onClick={this.onInputSubmit}>
                    Search{' '}
                </Button>{' '}
                {this.state.result.length > 0 && (
                    <div className="current">
                        <Table counts={this.state.result} />{' '}
                    </div>
                )}{' '}
            </div>
        );
    }
}
