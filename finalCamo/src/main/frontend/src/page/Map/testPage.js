import React from "react";
import axios from "axios";
import { useEffect } from "react";
import AxiosApi from "../../API/TestAxios";

const TestPage = () => {
    
    const onClick = async () => {
        try {
            const response = await axios.get(
                "http://apis.data.go.kr/B551011/GoCamping/basedList?serviceKey=q%2FN6THt6wGszjSEFU5zzQVQIq44LTMRAzwL8RLnLtj7YRmwQec87Tx1SMf48wKbaOH2LLcoHyXVnR8YTfHapdg%3D%3D&numOfRows=3507&MobileOS=ETC&MobileApp=AppTest&_type=json",
            );
            console.log(response.data.response.body);
        } catch (e) {
            console.log(e);
        }
    };

    return(
        <div>
            <div>
                <button onClick={onClick}>불러오기</button>
            </div>
            
        </div>
    )
};
export default TestPage;