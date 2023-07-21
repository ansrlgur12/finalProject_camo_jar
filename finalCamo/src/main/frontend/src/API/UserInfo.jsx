import { createContext, useState, useEffect } from "react";
import axios from 'axios'; 
import Functions from "../Functions";
export const UserContext = createContext(null);


const UserStore = (props) => {
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    const[nickName, setNickName] = useState("");
    const[isLogin, setIsLogin] = useState(false);
    const[url, setUrl] = useState("");
    const[userImg, setUserImg] = useState("");
    const[token, setToken] = useState("");
    const[userAddr, setUserAddr] = useState("");
    const[userPhoneNm, setUserPhoneNm] = useState("");

    useEffect(() => {
        const token = Functions.getAccessToken();
        const CAMO_DOMAIN = "";
      
        axios.get(CAMO_DOMAIN + "/api/v1/userinfo", {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
          }
        })
        .then(response => {
            console.log("response data: ", response.data); 
      
            setEmail(response.data.email);
            setNickName(response.data.nickName);
            setUserImg(response.data.userImg);
            setToken(response.data.token);       
        })
        .catch(error => {
            console.log(error);
        });
      }, [token]); 
      

    return(
        <UserContext.Provider value={{email, setEmail, password, setPassword, nickName, setNickName,
                                        isLogin, setIsLogin, url, setUrl, userImg, setUserImg, token, setToken}}>
            {props.children}
        </UserContext.Provider>
    );
};
export default UserStore;
