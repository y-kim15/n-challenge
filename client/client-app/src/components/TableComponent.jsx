import React from 'react';

//const MAX_LIMIT = 50;

export default function Table(props) {
    const { counts } = props;

    const output = counts.map((result, _) => (
        <tr key={result.id}>
            <td> {result.url} </td> <td> {result.counts} </td> <td> {result.date} </td>{' '}
        </tr>
    ));

    return (
        <table className="results-table">
            <thead>
                <tr>
                    <th> URL </th> <th> Results </th> <th> Date </th>{' '}
                </tr>{' '}
            </thead>{' '}
            <tbody> {output} </tbody>{' '}
        </table>
    );
}
