import React, { useContext, useEffect, useState } from "react";
import { MarkerContext } from "../../context/MarkerInfo";
import styled from "@emotion/styled";
import Header from "../../main/header";
import SmallKakaoMap from "./SmallKakao";
import LocationSelect from "./locationSelect";
import AxiosApi from "../../API/TestAxios";
import { storage } from '../../firebase/firebaseConfig';
import { useNavigate } from "react-router";
import { UserContext } from "../../API/UserInfo";
import imageBar from "../../images/캠핑이미지바.jpg"
import Functions from "../../Functions";
import Modal from "../../util/modal";

const WriteContainer = styled.div`
    display: flex;
    margin-left: 5vw;
    padding-top: 6vh;
    margin-left: 10vw;
    position: relative;
    h2{
        color: rgb(45, 98, 71);
    }
    .buttonBox{
        padding-top: 5vh;
        position: absolute;
        right: 2vw;
        padding-bottom: 10vh;
    }
    .lastSubmit{
        width: 8vw;
        height: 6vh;
        font-size: 1.1em;
        margin-left: 1vw;
        border-radius: 5px;
        font-weight: bold;
        border: .5px solid rgb(117, 117, 117);
        background-color: #d8d8d8;
    }

    .sub{
        background-color: rgb(45, 98, 71);
        color: white;
        border: none;
    }
    .preview-image{
        margin: 10px;
    }
    .image{
        margin-top: 10vh;
    }
    .right{
        flex-basis: 50%;
        margin-top: 5vh;
    }
    .left{
        flex-basis: 50%;
    }
    .title{
        margin: 5vh 0;
    }
    .selectBar{
        height: 2.5em;
        width: 5vw;
    }
    .selectBar + .selectBar{
        margin-left: .5vw;
    }
    .reset{
        margin-left: 1vw;
    }
    .diff{
        width: 3vw;
        height: 2.5em;
    }
    .jubyun{
        margin-top: 10vh;
    }
    .radio{
    }
    label {
    margin-right: 0.5em;
    font-size: .9em;
    font-weight : bold;
    color: rgb(76, 76, 76);
  }
  .notice{
    font-size: 1em;
    color: red;
    font-weight: bold;
  }
  .App{
    width: 40vw;
    height: 40vw;
  }
  @media screen and (max-width: 768px) {
    flex-direction : column;
    .selectBar{
        height: 2.5em;
        width: 20vw;
    }
    .diff{
      width: 10vw;
    }
    .App{
      width: 80vw;
      height: 60vw;
    }
    .lastSubmit{
      width: 20vw;
      margin-right: .5em;
    }
    }

`;
  
const Option = styled.div`
  
  .spotNm{
    height: 2em;
    width: 20vw;
  }
  .selectLc{
    margin-right: 1vw;
  }
  .spotDesc{
    width: 80%;
    height: 30vh;
  }
 margin: 1vw;
 display: flex;
 align-items: center;
 @media screen and (max-width: 768px) {
    .selectLc{
        margin-right: 2vw;
    }
    }

`;

const Radio = styled.div`
  margin: 1vw;

  
`;

const ImageBar = styled.div`
  padding-top: 11vh;
  height: 30vh;
  width: 100%;
  background-color: #ccc;
`;



const WriteNewMarker = () => {
  const token = Functions.getAccessToken();
  const nav = useNavigate();
  const context = useContext(MarkerContext);
  const { isLatlng, setIsSubmit, isSubmit } = context;
  const [selectedRadios, setSelectedRadios] = useState([]); // 선택된 라디오 버튼의 상태를 저장할 배열
  const [dho, setDho] = useState('ALL');
  const [sigungu, setSigungu] = useState('시.군.구');
  const [spotNm, setSpotNm] = useState("");
  const [spotDiff, setSpotDiff] = useState(1);
  const [spotDesc, setSpotDesc] = useState("");
  const [mapX, setMapX] = useState("");
  const [mapY, setMapY] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [downloadUrls, setDownloadUrls] = useState([]);
  const selectedRadiosString = selectedRadios.join(', ');
  const selectedUrlsString = downloadUrls.join(', ');
  const addr1 = `${dho} ${sigungu}`;
  const[modalOpen, setModalOpen] = useState(false);

  const handleDhoChange = (event) => {
    setDho(event.target.value);
    setSigungu("시.군.구")
  };

    const handleSigunguChange = (event) => {
    setSigungu(event.target.value);
    };

    const handleResetClick = () => {
        setDho("ALL");
        setSigungu("시.군.구");
    }

  const radioOptions = [
    "주변 수돗물",
    "주변 개수대",
    "승용차 출입",
    "주변 공중화장실",
    "소형 트레일러 접근가능",
    "캠핑카 접근가능",
    "카라반 접근가능",
    "등산로",
    "주변 전기",
    "주변 물놀이",
  ];

  useEffect(() => {
    setMapY(isLatlng.Ma);
    setMapX(isLatlng.La);
    setIsSubmit(false);
  }, [isLatlng, selectedRadios]);

  function handleRadioChange(option) {
    if (selectedRadios.includes(option)) {
      // 이미 선택된 상태인 경우 선택 해제
      setSelectedRadios((prevSelected) =>
        prevSelected.filter((selectedOption) => selectedOption !== option)
      );
    } else {
      // 선택되지 않은 상태인 경우 선택 추가
      setSelectedRadios((prevSelected) => [...prevSelected, option]);
    }
  }
  const onChangeSpotNm = (e) => {
    setSpotNm(e.target.value);
  }
  const onChangeDiff = (e) => {
    setSpotDiff(e.target.value);
  }
  const onChangeSpotDesc = (e) => {
    setSpotDesc(e.target.value);
  }
  const onClickSubmit = () => {
    console.log("넘길 자료들");
    console.log(mapX);
    console.log(mapY);
    console.log(selectedRadiosString);
    console.log(dho);
    console.log(sigungu);
    console.log(spotNm);
    console.log(spotDiff);
    console.log(spotDesc);
    console.log(addr1);
    console.log(selectedUrlsString);
    setIsSubmit(true);
    setModalOpen(true);
  }
  const submit = async() => {
    setModalOpen(false);
    const rsp = await AxiosApi.onojiCampData(token, mapX, mapY, selectedRadiosString, dho, sigungu, spotNm, spotDiff, spotDesc, addr1, selectedUrlsString);
    console.log(rsp)
    if(rsp.request.status === 200){
        console.log("정상등록되었습니다.")
        nav("/ojinoji")
    }
    else{
        console.log("등록 실패")
    }
  }
  
  const closeModal = () => {
    setModalOpen(false);
}

  const handleFileChange = (event) => {
    const files = event.target.files;
    const filesArray = Array.from(files);
    setSelectedFiles([...selectedFiles, ...filesArray]);
  };

  const handleUpload = async () => {
    try {
      const uploadPromises = selectedFiles.map(async (file) => {
        const storageRef = storage.ref();
        const fileRef = storageRef.child(file.name);
        await fileRef.put(file);
        return fileRef.getDownloadURL();
      });

      const urls = await Promise.all(uploadPromises);
      setDownloadUrls(urls);
    } catch (error) {
      console.log(error);
      throw new Error('이미지 업로드에 실패하였습니다.');
    }
  };
  return (
    <>
      <Header />
      <ImageBar style={{backgroundImage: `url(${imageBar})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: '50% 60%'}}></ImageBar>
      <WriteContainer>
        
        <div className="left">
        <h2 className="title">캠핑 마커 신청하기</h2>
        <Option>
            <label className="selectLc">지역선택</label>
            <LocationSelect dho={dho} sigungu={sigungu} onDhoChange={handleDhoChange} onSigunguChange={handleSigunguChange} onResetClick={handleResetClick} />
        </Option>
        <Option><label className="spotLabel">스팟 이름</label><input type="text" className="spotNm" onChange={onChangeSpotNm}/></Option>
        <Option>
          <label className="spotLabel">스팟 소개</label>
          <textarea type="text" className="spotDesc" onChange={onChangeSpotDesc}/>
        </Option>
        <Option>
          <label>야영 난이도</label>
          <select className="diff" value={spotDiff} onChange={onChangeDiff}>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
        </Option>
       
        
        <h2 className="jubyun">주변시설</h2>
        {radioOptions.map((option) => (
        <Radio key={option}>
          <label  className="radio">
            {option}
            <input
              type="checkbox"
              checked={selectedRadios.includes(option)} // 선택된 상태인지 확인
              onChange={() => handleRadioChange(option)} // 선택 상태 업데이트
            />
          </label>
        </Radio>
      ))}
      
    </div>
            
        
        <div className="right">
            <div className="map">
          <h2>위치 설정</h2>
          <div className="App">
            <div id="wrap" style={{ width: "100%", height: "100%" }}>
              <SmallKakaoMap />
              <p className="notice">※ 취소하려면 마커를 한번 더 클릭해 주세요</p>
            </div>
          </div>
          </div>

        <div className="image">
        <h2>이미지 등록</h2>
            <div>
            <input type="file" multiple onChange={handleFileChange} />
            <button className="selectBar" onClick={handleUpload}>선택완료</button>
            </div>
            <div className="preview-container">
                {selectedFiles.map((file) => (
                <img
                    key={file.name}
                    src={URL.createObjectURL(file)}
                    alt={file.name}
                    style={{ maxWidth: "100px", maxHeight: "100px" }}
                    className="preview-image"
                />
                ))}
            </div>
        </div>
        <div className="buttonBox">
          {(mapX && mapY && selectedRadiosString && dho && sigungu && spotNm && spotDiff && spotDesc && addr1 && selectedUrlsString) ?
            <button className="lastSubmit sub" onClick={onClickSubmit}>등록</button> :
            <button className="lastSubmit">등록</button>
        }
            
            <button className="lastSubmit" onClick={()=>nav(-1)}>취소</button>
        </div>
        </div>
      </WriteContainer>
      <Modal open={modalOpen} close={closeModal} confirm={submit} type={true} header = {"등록"}>마커 등록을 신청하시겠습니까?</Modal>
    </>
  );
};

export default WriteNewMarker;
