import { useContext, useState, useEffect, createContext } from "react";

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
    const [userInfo, setUserInfo] = useState(null);

    const putUserData = (user) => {
        setUserInfo(user);
        localStorage.setItem("devburger:userData", JSON.stringify(user));
    };

    const logout = () => {
        setUserInfo(null);
        localStorage.removeItem("devburger:userData");
    };

    useEffect(() => {
        const userInfoLocalStorage = localStorage.getItem("devburger:userData");

        if (userInfoLocalStorage) {
            try {
                setUserInfo(JSON.parse(userInfoLocalStorage));
            } catch (error) {
                console.error("Erro ao carregar os dados do usuário:", error);
                localStorage.removeItem("devburger:userData");
            }
        }
    }, []);

    return (
        <UserContext.Provider value={{ userInfo, putUserData, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser deve ser utilizado dentro de um UserProvider!");
    }

    return context;
};
