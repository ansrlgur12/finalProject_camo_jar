import React from "react";
import styled from "styled-components"
import AxiosApi from "../../API/TestAxios";
import { useEffect, useContext, useState } from "react";
import { MarkerContext } from "../../context/MarkerInfo";
import elec from "../../images/전기.png";
import wifi from "../../images/와이파이.png";
import firewood from "../../images/장작.png";
import hotWater from "../../images/온수.png";
import trampoline from "../../images/트램펄린.png";
import waterPlayground from "../../images/수영장.png";
import playground from "../../images/놀이터.png";
import hikingTrail from "../../images/산책로.png";
import sportsField from "../../images/운동장.png";
import gym from "../../images/운동시설.png";
import mart from "../../images/마트.png";
import convenienceStore from "../../images/마트.png";
import dog from "../../images/강아지.png";
import noDog from "../../images/강아지금지.png";
import shower from "../../images/샤워.png";


const IconListBox = styled.div`
    height: auto + 5vh;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    margin: 0 2vw;
    padding: 1em;
    margin-top: 2vh;
    background-color: rgb(235, 235, 235);

`;

const Icon = styled.div`
    width: 4vw;
    height: 4vw;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: .5em;
    flex-direction: column;
    .icon{
        width: 3vw;
        height: 3vw;
    }
    .desc{
        font-size: .7em;
    }
    @media screen and (max-width: 768px) {
        width: 10.5vw;
        margin: .7rem;
        margin-bottom: 1.3rem;
      .icon {
        width: 6.5vw;
        height: 6.5vw;
    }
}
`;

const IconList = () => {
    const context = useContext(MarkerContext);
    const {contentId} = context;
    const [sbrsCl, setSbrsCl] = useState("");
    const [animalCmgCl, setAnimalCmgCl] = useState(""); 
    const [swrmCo, setSwrmCo] = useState("");

    const iconMap = {
        "전기" : elec,
        "무선인터넷" : wifi,
        "장작판매" : firewood,
        "온수" : hotWater,
        "트렘폴린" : trampoline,
        "물놀이장" : waterPlayground,
        "놀이터" : playground,
        "산책로" : hikingTrail,
        "운동장" : sportsField,
        "운동시설" : gym,
        "마트.편의점" : mart,
        "편의점" : convenienceStore,
      };

    const animalMap = {
        "가능" : dog,
        "가능(소형견)" : dog,
        "불가능" : noDog
    }

    useEffect(()=>{
        if(contentId === ""){
            return;
        }else{
            const getAbleIcon = async() => {
                const rsp = await AxiosApi.getAbleIcon(contentId.contentId);
                if(rsp.status === 200) {
                    console.log(rsp.data);
                    setSbrsCl(rsp.data[0].sbrsCl);
                    setAnimalCmgCl(rsp.data[0].animalCmgCl);
                    setSwrmCo(rsp.data[0].swrmCo);
                    console.log(rsp.data)
                }
            }
            getAbleIcon();
        }
    },[contentId])

    const splitSbrsCl = sbrsCl.split(",");

    return(
        <IconListBox>
            {sbrsCl.length !== 0 && splitSbrsCl.map((icon, index) => (
            <Icon key={index}>
                <img className="icon" src={`${iconMap[icon.trim()]}`} alt={icon} />
                <div className="desc">{icon.trim()}</div>
            </Icon>
            ))}
            <Icon>
                <img className="icon" src={`${animalMap[animalCmgCl.trim()]}`} alt={animalCmgCl} />
                <div className="desc">{animalCmgCl.trim()}</div>
            </Icon>
            
            {swrmCo === 0 ? "" : 
                <Icon>
                    <img className="icon" src={shower} alt={swrmCo} />
                    <div className="desc">샤워장</div>
                </Icon>
            }
        </IconListBox>
    );
}

export default IconList;