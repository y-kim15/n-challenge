import React, { FC } from 'react';
import Main from './components/Main';

import { AuthProvider } from './service/AuthProvider';

const App: FC = () => (
    <AuthProvider>
        <Main />
    </AuthProvider>
);

export default App;
