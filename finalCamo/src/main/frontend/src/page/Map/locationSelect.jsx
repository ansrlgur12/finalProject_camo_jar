import React from 'react';

const LocationSelect = ({ dho, sigungu, onDhoChange, onSigunguChange, onResetClick }) => {

  
  const area1 = ["시.군.구","강남구","강동구","강북구","강서구","관악구","광진구","구로구","금천구","노원구","도봉구","동대문구","동작구","마포구","서대문구","서초구","성동구","성북구","송파구","양천구","영등포구","용산구","은평구","종로구","중구","중랑구"];
  const area2 = ["시.군.구","계양구","미추홀구","남동구","동구","부평구","서구","연수구","중구","강화군","옹진군"];
  const area3 = ["시.군.구","대덕구","동구","서구","유성구","중구"];
  const area4 = ["시.군.구","광산구","남구","동구","북구","서구"];
  const area5 = ["시.군.구","남구","달서구","동구","북구","서구","수성구","중구","달성군"];
  const area6 = ["시.군.구","남구","동구","북구","중구","울주군"];
  const area7 = ["시.군.구","강서구","금정구","남구","동구","동래구","부산진구","북구","사상구","사하구","서구","수영구","연제구","영도구","중구","해운대구","기장군"];
  const area8 = ["시.군.구","고양시","과천시","광명시","광주시","구리시","군포시","김포시","남양주시","동두천시","부천시","성남시","수원시","시흥시","안산시","안성시","안양시","양주시","오산시","용인시","의왕시","의정부시","이천시","파주시","평택시","포천시","하남시","화성시","가평군","양평군","여주군","연천군"];
  const area9 = ["시.군.구","강릉시","동해시","삼척시","속초시","원주시","춘천시","태백시","고성군","양구군","양양군","영월군","인제군","정선군","철원군","평창군","홍천군","화천군","횡성군"];
  const area10 = ["시.군.구","제천시","청주시","충주시","괴산군","단양군","보은군","영동군","옥천군","음성군","증평군","진천군","청원군"];
  const area11 = ["시.군.구","계룡시","공주시","논산시","보령시","서산시","아산시","천안시","금산군","당진군","부여군","서천군","연기군","예산군","청양군","태안군","홍성군"];
  const area12 = ["시.군.구","군산시","김제시","남원시","익산시","전주시","정읍시","고창군","무주군","부안군","순창군","완주군","임실군","장수군","진안군"];
  const area13 = ["시.군.구","광양시","나주시","목포시","순천시","여수시","강진군","고흥군","곡성군","구례군","담양군","무안군","보성군","신안군","영광군","영암군","완도군","장성군","장흥군","진도군","함평군","해남군","화순군"];
  const area14 = ["시.군.구","경산시","경주시","구미시","김천시","문경시","상주시","안동시","영주시","영천시","포항시","고령군","군위군","봉화군","성주군","영덕군","영양군","예천군","울릉군","울진군","의성군","청도군","청송군","칠곡군"];
  const area15 = ["시.군.구","거제시","김해시","마산시","밀양시","사천시","양산시","진주시","진해시","창원시","통영시","거창군","고성군","남해군","산청군","의령군","창녕군","하동군","함안군","함양군","합천군"];
  const area16 = ["시.군.구","서귀포시","제주시","남제주군","북제주군"];


  return (
    <div className="locationSelect">
      <select className="selectBar" value={dho} onChange={onDhoChange}>
        <option value="ALL">전국</option>
        <option value="서울">서울</option>
        <option value="대전">대전</option>
        <option value="대구">대구</option>
        <option value="부산">부산</option>
        <option value="인천">인천</option>
        <option value="광주">광주</option>
        <option value="울산">울산</option>
        <option value="경기">경기</option>
        <option value="강원">강원</option>
        <option value="충청북도">충북</option>
        <option value="충청남도">충남</option>
        <option value="전라북도">전북</option>
        <option value="전라남도">전남</option>
        <option value="경상북도">경북</option>
        <option value="경상남도">경남</option>
        <option value="제주">제주</option>
      </select>
    {dho!=="ALL" &&
        <select className="selectBar" value={sigungu} onChange={onSigunguChange}>
        {dho === "서울" && area1.map((area, index) => (
          <option key={index} value={area}>{area}</option>
        ))}
        {dho === "인천" && area2.map((area, index) => (
          <option key={index} value={area}>{area}</option>
        ))}
        {dho === "대전" && area3.map((area, index) => (
          <option key={index} value={area}>{area}</option>
        ))}
        {dho === "광주" && area4.map((area, index) => (
          <option key={index} value={area}>{area}</option>
        ))}
        {dho === "대구" && area5.map((area, index) => (
          <option key={index} value={area}>{area}</option>
        ))}
        {dho === "울산" && area6.map((area, index) => (
          <option key={index} value={area}>{area}</option>
        ))}
        {dho === "부산" && area7.map((area, index) => (
          <option key={index} value={area}>{area}</option>
        ))}
        {dho === "경기" && area8.map((area, index) => (
          <option key={index} value={area}>{area}</option>
        ))}
        {dho === "강원" && area9.map((area, index) => (
          <option key={index} value={area}>{area}</option>
        ))}
        {dho === "충청북도" && area10.map((area, index) => (
          <option key={index} value={area}>{area}</option>
        ))}
        {dho === "충청남도" && area11.map((area, index) => (
          <option key={index} value={area}>{area}</option>
        ))}
        {dho === "전라북도" && area12.map((area, index) => (
          <option key={index} value={area}>{area}</option>
        ))}
        {dho === "전라남도" && area13.map((area, index) => (
          <option key={index} value={area}>{area}</option>
        ))}
        {dho === "경상북도" && area14.map((area, index) => (
          <option key={index} value={area}>{area}</option>
        ))}
        {dho === "경상남도" && area15.map((area, index) => (
          <option key={index} value={area}>{area}</option>
        ))}
        {dho === "제주" && area16.map((area, index) => (
          <option key={index} value={area}>{area}</option>
        ))}
      </select>
    }
    <button className='selectBar reset' onClick={onResetClick}>초기화</button>
      
    </div>
  );
};

export default LocationSelect;
