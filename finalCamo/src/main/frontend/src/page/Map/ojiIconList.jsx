import React from "react";
import styled from "styled-components"
import { useEffect, useContext, useState } from "react";
import { MarkerContext } from "../../context/MarkerInfo";
import elec from "../../images/전기.png";
import waterPlayground from "../../images/수영장.png";
import water from "../../images/수도.png"
import sink from "../../images/개수대.png"
import hiking from "../../images/등산.png"
import car from "../../images/승용차.png"
import trailer from "../../images/트레일러.png"
import toilet from "../../images/공중화장실.png"



const IconListBox = styled.div`
height: auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    
    margin: 0 2vw;
    padding: 1.5em 1em 1em 1em ;
    background-color: rgb(235, 235, 235);
    box-shadow: 1px salmon;
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
        display: flex;
        justify-content: center;
        text-align: center;

        padding-top: .5em;
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

const OjiIconList = () => {

    const context = useContext(MarkerContext);
    const {contentId} = context;
    const [sbrsCl, setSbrsCl] = useState("");

    const iconMap = {
        "주변 수돗물" : water,
        "주변 개수대" : sink,
        "승용차 출입" : car,
        "주변 공중화장실" : toilet,
        "소형 트레일러 접근가능" : trailer,
        "캠핑카 접근가능" : waterPlayground,
        "카라반 접근가능" : trailer,
        "등산로" : hiking,
        "주변 전기" : elec,
        "주변 물놀이" : waterPlayground,
      };


    useEffect(()=>{
        setSbrsCl(contentId.sbrsCl);
        
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
        </IconListBox>
    );
}

export default OjiIconList;