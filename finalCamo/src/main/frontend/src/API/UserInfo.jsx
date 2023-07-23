import { createContext, useState } from "react";
export const UserContext = createContext(null);


const UserStore = (props) => {
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    const[nickName, setNickName] = useState("");
    const[isLogin, setIsLogin] = useState(false);
    const[url, setUrl] = useState("");
    const[userImg, setUserImg] = useState("");
    const[token, setToken] = useState("");

    return(
        <UserContext.Provider value={{email, setEmail, password, setPassword, nickName, setNickName,
                                        isLogin, setIsLogin, url, setUrl, userImg, setUserImg, token, setToken}}>
            {props.children}
        </UserContext.Provider>
    );
};
export default UserStore;
