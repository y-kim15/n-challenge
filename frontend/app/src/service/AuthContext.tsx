import React from 'react';

const AuthContext = React.createContext<ContextType | null>(null);
export default AuthContext;
// export function useAuth() {
//     return useContext(AuthContext);
// }
