import { mount } from 'enzyme';
import '@testing-library/jest-dom/extend-expect';
import Main from '../components/Main';
import AuthContext from '../service/AuthContext';
import 'jest-localstorage-mock';
import renderer from 'react-test-renderer';
import { TableCell, TableRow, Table, TableHead } from '@material-ui/core';

test('should display message if no previous records available', async () => {
    const wrapper = mount(
        <AuthContext.Provider
            value={{
                token: 'dummyToken',
                previousRecords: [],
            }}
        >
            <Main />
        </AuthContext.Provider>,
    );
    expect(wrapper.find('p').text()).toEqual('Any previous requests will be displayed here!');
});

test('should display table with previous records', async () => {
    const wrapper = mount(
        <AuthContext.Provider
            value={{
                token: 'dummyToken',
                previousRecords: [
                    {
                        id: 'id1',
                        url: 'dummy_url',
                        created: new Date().toLocaleDateString(),
                        output: ' dummy:1, output:1',
                    },
                ],
            }}
        >
            <Main />
        </AuthContext.Provider>,
    );
    expect(wrapper.find('h3').at(1).text()).toEqual('Your Previous Searches');

    const firstTableRow = wrapper.find(Table).find(TableHead).find(TableRow).first();
    const tableCell = firstTableRow.find(TableCell);
    expect(tableCell.find('Submitted URL')).toBeTruthy();
    expect(tableCell.find('Date Created')).toBeTruthy();
});

describe('Main snapshots', () => {
    // let mount;

    // beforeAll(() => {
    //   mount = createMount();
    // });

    // afterAll(() => {
    //   mount.cleanUp();
    // });
    test('should have previous records displayed if available on landing', async () => {
        const wrapper = renderer
            .create(
                <AuthContext.Provider
                    value={{
                        token: 'dummyToken',
                        previousRecords: [
                            {
                                id: 'id1',
                                url: 'dummy_url',
                                created: new Date().toLocaleDateString(),
                                output: ' dummy:1, output:1',
                            },
                        ],
                    }}
                >
                    <Main />
                </AuthContext.Provider>,
            )
            .toJSON();
        expect(wrapper).toMatchSnapshot();
    });

    test('should display new landing with no previous searches for new user', async () => {
        const wrapper = renderer
            .create(
                <AuthContext.Provider
                    value={{
                        token: 'dummyToken',
                        previousRecords: [],
                    }}
                >
                    <Main />
                </AuthContext.Provider>,
            )
            .toJSON();
        expect(wrapper).toMatchSnapshot();
    });
});
