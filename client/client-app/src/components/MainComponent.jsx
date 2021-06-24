import React, { Component } from 'react';
import SearchTabComponent from './SearchTabComponent';
import TableComponent from './TableComponent';
//import axios from 'axios';

class Main extends Component {
    state = {
        prev: [],
    };

    componentDidMount() {
        const sample = {
            id: '1',
            date: '2021-06-21',
            url: 'www.google.com',
            counts: 'I: 2, you: 5, google: 1',
        };

        //TODO use uuid
        // axios.get(``).then((res) => {
        //     const prev = res.data;
        //     this.setState({ prev });
        // });
        const newPrev = this.state.prev.concat(sample);
        this.setState({
            prev: newPrev,
        });
    }

    handleNewSearch(result) {
        const newPrev = this.state.prev.concat(result);
        this.setState({
            prev: newPrev,
        });
    }

    render() {
        return (
            <div className="main">
                <h1 className="header"> Simple Text Counter App </h1>{' '}
                <div className="body">
                    <SearchTabComponent onNewSearch={this.handleNewSearch} />{' '}
                    {this.state.prev.length > 0 ? (
                        ((<h3> Previous Searches </h3>), (<TableComponent counts={this.state.prev} />))
                    ) : (
                        <p> Any previous requests will show here! </p>
                    )}{' '}
                </div>{' '}
            </div>
        );
    }
}

export default Main;
