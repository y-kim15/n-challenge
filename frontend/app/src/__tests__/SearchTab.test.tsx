import React from 'react';
import { shallow, mount } from 'enzyme';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import SearchTab from '../components/SearchTab';
import { Button, TextField, Paper } from '@material-ui/core';
import { act } from 'react-test-renderer';
import ResultsTable from '../components/ResultsTable';
import renderer from 'react-test-renderer';

const handlers = [
    rest.get('/sessions/token', async (_, res, ctx) => {
        return res(
            ctx.delay(150),
            ctx.status(200, 'Mocked status - session created'),
            ctx.set('cookie', 'randomcookie'),
            ctx.json({
                message: 'New session created',
            }),
        );
    }),

    rest.get('http://localhost:8888/records/', async (req, res, ctx) => {
        // Respond with bad request if req does not have header set
        return res(
            ctx.json({
                output: [
                    {
                        id: 'id1',
                        url: 'dummy_url',
                        created: new Date().toLocaleDateString(),
                        output: ' dummy:1, output:1',
                    },
                ],
            }),
        );
    }),
];

const server = setupServer(...handlers);

// establish API mocking before all tests
beforeAll(() => server.listen());
// reset any request handlers that are declared as a part of our tests
// (i.e. for testing one-time error scenarios)
afterEach(() => server.resetHandlers());
// clean up once the tests are done
afterAll(() => server.close());

test('should display table with previous records', async () => {
    const wrapper = mount(<SearchTab handleNewSearch={jest.fn()} />);
    expect(wrapper.find(Paper).find('div').find('h3').text()).toEqual('Type URL here');

    await act(async () => {
        wrapper.find(TextField).simulate('change', { target: { value: 'dummyURL' } });
        wrapper.find(Button).simulate('click');
    });

    //expect(wrapper.find(Table)).toBeTruthy();
    expect(wrapper.find(ResultsTable)).toBeTruthy();
    //text()).toEqual('Record here');
    //expect(wrapper.find({ prop: 'url' })).toEqual('dummyURL');

    // const firstTableRow = wrapper.find(Table).find(TableHead).find(TableRow).first();
    // const tableCell = firstTableRow.find(TableCell);
    // expect(tableCell.find('Submitted URL')).toBeTruthy();
    // expect(tableCell.find('Date Created')).toBeTruthy();
});

test('should display result when returned', async () => {
    const wrapper = renderer
        .create(
            <ResultsTable
                results={[
                    {
                        id: 'id1',
                        url: 'dummy_url',
                        created: new Date().toLocaleDateString(),
                        output: ' dummy:1, output:1',
                    },
                    {
                        id: 'id2',
                        url: 'dummy_url2',
                        created: new Date().toLocaleDateString(),
                        output: ' dummy:2, output:2',
                    },
                ]}
            />,
        )
        .toJSON();
    expect(wrapper).toMatchSnapshot();
});
