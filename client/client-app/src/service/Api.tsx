import decodeJwt from 'jwt-decode';
import axios from 'axios';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export const launch = async () => {
    const data = new FormData();
    data.append('session', 'launched');
    //let output;
    return axios
        .post('/sessions/token', {
            session: 'launched',
        })
        .then(
            (response) => {
                const returned = response.data;

                if (response.status > 400 && response.status < 500) {
                    if (returned.detail) {
                        throw returned.detail;
                    }
                    throw returned;
                }

                if ('cookie' in response.headers) {
                    // const decodedToken: any = decodeJwt(returned['access_token']);
                    localStorage.setItem('token', response.headers['cookie']);
                    // localStorage.setItem('permissions', decodedToken.permissions);
                }

                cookies.set('cookie', response.headers['cookie'], {
                    path: '/',
                });
                return response.headers['cookie'] as string;
            },
            (error) => {
                throw new Error(error);
            },
        );
    //return output;
};

export const search = async (url: string) => {
    return axios
        .get<IRecord>('/records/', { params: { url: url }, withCredentials: true })
        .then(
            (response) => {
                return response.data as IRecord;
            },
            (error) => {
                throw new Error(error);
            },
        );
};

export const previous = async () => {
    return axios
        .get<IRecord[]>('/sessions/all', { withCredentials: true })
        .then(
            (response) => {
                return response.data as IRecord[];
            },
            (error) => {
                throw new Error(error);
            },
        );
};

export const oneOutput = async (id: string) => {
    return axios
        .get<IRecord>('/records', { params: { id: id }, withCredentials: true })
        .then(
            (response) => {
                response.data as IRecord;
            },
            (error) => {
                throw new Error(error);
            },
        );
};
