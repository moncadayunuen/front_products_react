import {createContext, type ReactNode, useContext, useState} from "react";

type User = {
    id: string;
    name: string;
    email: string;
}

type UserContextType = {
    user: User | null;
    login: (user: User) => void;
    logout: () => void;
}

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({children}: { children: ReactNode;}) =>
{
    const [user,setUser] = useState<User | null>(null);
    const login = (userData: User) => {
        setUser(userData);
    }
    const logout = () => {
        setUser(null);
    }

    return (
        <UserContext.Provider
            value={{user, login, logout}}
        >
            {children}
        </UserContext.Provider>
    );
};

export const userUser  = () => {
    const context = useContext(UserContext);

    if(!context) {
        throw new Error("useUser debe utilizarse dentro de un userprovider")
    }
    return context;
}

export default UserContext;