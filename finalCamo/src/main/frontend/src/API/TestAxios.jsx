import axios from "axios";
export const domain = "";
export const weatherApiKey = "12779614ba1e41d795943be1a07331ac";

const AxiosApi = {

    campingTest : async() => {

        return await axios.get(domain + "/camp/camping-data")
    },
// 캠핑데이터 가져오기
    getCampData : async(sortBy) => {

        return await axios.get(domain + `/camp/campData/${sortBy}`)
    },

    getItemList : async() => {
        return await axios.get(domain+ "/product")
    },





// 로그인
    memberLogin: async (email, password) => {
        const loginData = {
            email: email,
            password: password
        };
        return await axios.post(domain + "/auth/login", loginData);
    },

    productDetail : async(id) =>{
        return await axios.get(domain+ `/productDetail/${id}`)

    },

//회원 가입
memberReg : async(nickName, email, password, agreed) => {
    const member = {
        nickName : nickName,
        email : email,
        password : password,
        agreed : agreed
    };
    return await axios.post(domain + "/auth/signup", member);

},

//임시 비밀번호 전송 (여기부터 시작)
newPassEmail : async(email) => {
        try {
          return await axios.get(domain + `/auth/password/${email}`, {

          });
        } catch (error) {
          throw error;
        }
      },


// 캠핑데이터 오버레이 띄우기
    getOverlayInfo : async(xValue, yValue) => {
        return await axios.get(domain + `/camp/overlay/${xValue}/${yValue}`)
    },
// 애완동물 가능 캠핑장 데이터
    getAnimalCampData : async(dho, sigungu) => {

    return await axios.get(domain + `/camp/animalData/${dho}/${sigungu}`)
},

    // 회원 가입 여부 확인
    memberRegCheck : async(email) => {
        return await axios.get(domain + `/check?join=${email}`);
    },


// 일반 캠핑장 검색
    searchCampData : async(searchValue, currentData, page, size) => {
        return await axios.get(domain + `/camp/searchData/${searchValue}/${currentData}/${page}/${size}`)
    },
// 날씨 가져오기
    getWeather : async(mapX, mapY, date) => {
        return await axios.get(domain + `/weather/getWeather/${mapX}/${mapY}/${date}`)
    },
// 조회수
    viewCount : async(facltNm) => {
        return await axios.get(domain + `/camp/viewCount/${facltNm}`);
    },
// 이미지 띄우기
    getImage : async(contentId) => {
        return await axios.get(domain + `/image/getImage/${contentId}`);
    },

    // 닉네임 중복 체크
    checkNick : async(nickName) => {
        const check = {
            params: {
                nickName : nickName
            }
        }
        return await axios.get(domain + "/api/v1/intro/nickName", check);
    },

    // 사용자 ID를 이용해서 회원 정보를 조회
    userInfoMe : async(token)=> {
        try {
            return await axios.get(domain + "/api/v1/intro/me", {
              headers: {
              'Content-Type': 'application/json',
             'Authorization': 'Bearer ' + token
             }
         });
        } catch (error) {
          throw error;
         }
        },

    // 회원 정보 조회
    userInfo : async(token)=> {
         try {
             return await axios.get(domain + "/api/v1/userinfo", {
               headers: {
               'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + token
              }
          });
         } catch (error) {
           throw error;
          }
         },

    // 회원 탈퇴
    userDelete : async(token)=> {
        try {
            return await axios.delete(domain + "/api/v1/deleteUser", {
              headers: {
              'Content-Type': 'application/json',
             'Authorization': 'Bearer ' + token
             }
         });
        } catch (error) {
          throw error;
         }
        },

    // 회원 정보 수정
    userUpdate : async(token, userAddr, userPhoneNm, userImg)=> {
        const info = {
            userAddr : userAddr,
            userPhoneNm : userPhoneNm,
            userImg : userImg
        };

        try {
          return await axios.put(domain + "/api/v1/updateUserInfo", info, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + token
            }
          });
        } catch (error) {
          throw error;
        }
      },

    // 비밀번호 변경
    updateUserPwd: async (token, password) => {
        const newPwd = {
          password: password
        };

        try {
          return await axios.put(domain + "/api/v1/changePwd", newPwd, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + token
            }
          });
        } catch (error) {
          throw error;
        }
      },


// 각 캠핑장 부대시설, 강아지출입 등 정보 가져오기
    getAbleIcon : async(contentId) => {
        return await axios.get(domain + `/camp/getIcon/${contentId}`);
    },

     // 장바구니 추가
    addToCart : async(productId,quantity,email) => {
        const item = {
            productId : productId,
            quantity : quantity,
            email : email,
        };
        return await axios.post(domain + `/cart`, item);
    },

    // 장바구니 조회
    cartList : async(email) => {
        return await axios.post(domain + `/cart/cartList`, {
        email: email,
        })
    },

    // 장바구니 삭제
    deleteItem : async(cartItemId, email) => {
        const item = {
            cartItemId : Array.isArray(cartItemId) ? cartItemId : [cartItemId],
        email : email,

        }
        return await axios.post (domain + `/cart/deleteItem/`,item)
    },

    // 장바구니 수량 수정
    updateItem : async(cartItemId, quantity, email) => {
        const item = {
            cartItemId : cartItemId,
            quantity : quantity,
            email : email,
        };
        return await axios.post (domain + `/cart/updateItem/${cartItemId}`, item)
    },
    // 오지캠핑 데이터 db에 저장
    onojiCampData : async(token, mapX, mapY, sbrsCl, doNm, sigunguNm, facltNm, diff, intro, addr1, url) => {
        const data = {
            addr1 : addr1,
            mapX : mapX,
            mapY : mapY,
            sbrsCl : sbrsCl,
            doNm : doNm,
            sigunguNm : sigunguNm,
            facltNm : facltNm,
            diff : diff.toString(),
            intro : intro,
            url : url
        };
        try{
            return await axios.post(domain + '/oji/newMark', data, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                  }
            });
        }catch(error) {
            throw error;
        }
    },
  // 찜하기
  addToFavorite : async(productId,email) => {
    const item = {
        productId : productId,
      email : email,
    };
    
  return await axios.post(domain + `/favorite/add`, item)
},
// 찜목록 조회
favoriteList : async(email) => {
     
    return await axios.post(domain + `/favorite/favoriteList`, {
       email: email,
   })
  },
  // 찜한 상품 삭제
  favoriteDelete : async(favoriteItemId, email) => {
    return await axios.post (domain + `/favorite/deleteItem/${favoriteItemId}`, {email : email,
    })
},
  // 찜한 상품 장바구니로 옮기기
  favoriteMoveToCart : async(favoriteItemId, email) => {
    return await axios.post (domain + `/favorite/moveToCart/${favoriteItemId}`, {email : email,
    })
}, // 오지 캠핑 데이터 가져오기
getOjiNojiData : async(dho, sigungu) => {

    return await axios.get(domain + `/oji/ojiData/${dho}/${sigungu}`)
},  // 오지 캠핑 데이터 오버레이로 불러오기
getOjiOverLayInfo : async(xValue, yValue) => {
    return await axios.get(domain + `/oji/overlay/${xValue}/${yValue}`)
}, // 오지 캠핑 데이터 검색창 검색
searchOjiCampData : async(searchValue) => {
    console.log(searchValue)
    return await axios.get(domain + `/oji/searchOjiData/${searchValue}`)
}, // 오지 캠핑 상세페이지 조회수
viewOjiCount : async(facltNm) => {
    return await axios.get(domain + `/oji/viewCount/${facltNm}`);
},
createComment: async(campId, content) => {
    const comment = {
        campId: campId,
      content: content
    };
    return await axios.post(domain + `/campcomment`, comment);
  },
getComment : async(campId) => {
    return await axios.get(domain + `/campcomment/${campId}`);
},


viewCampMarker : async(markerLat, markerLng) => {

    return await axios.get(domain + `/camp/viewCampMarker/${markerLat}/${markerLng}`)
},


    // 이메일 인증
    emailCheck : async(checkEmail) => {
        const conEmail = {
            emailOverlap : checkEmail
        };
        return await axios.post(domain + `/api/v1/intro/email`, conEmail)
    },

campLike : async(contentId, id) => {
    
    return await axios.post(domain + `/likes/camp/${contentId}/member/${id}`);
},

//jwt 좋아요취소
campUnLike : async(token, contentId) => {
    try{
        return await axios.delete(domain + `/likes/camp/${contentId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
              }
        });
    }catch(error) {
        throw error;
    }
    
},

viewCampLike : async(contentId) => {

    return await axios.get(domain + `/likes/camp/${contentId}`);
},
// jwt 확인
checkLike : async(token, contentId) => {
    try{
        return await axios.get(domain + `/likes/checkLike/${contentId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
              }
        });
    }catch(error){
        throw error;
    }
    
},

commentCount : async(campId) => {
    return await axios.get(domain + `/campcomment/checkCount/${campId}`)
},

memberLikedCamp : async(token) => {
    try{
        return await axios.get(domain + `/likes/memberLikedCamp`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
              }
        });
    }catch(error){
        throw error;
    }
    
},

memberMarkedCamp : async(token) => {
    try{
        return await axios.get(domain + `/oji/memberMarkedCamp`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
              }
        });
    }catch(error){
        throw error;
    }
    
},
  // 주문 생성
  createOrder : async(email,productId,quantity) => {
    const item = {
        email : email,
        productId : productId,
      quantity : quantity,
    };
    
  return await axios.post(domain + `/order`, item)
},
// 결제 검증
verifyPayment : async(imp_uid) =>{
    return await axios.post(domain + `/verifyIamport/${imp_uid}`);
},

    // 메인페이지 캠핑장 정보
    getCampList : async(lt, sigungu) => {

        return await axios.get(domain + `/mainsection3/${lt}/${sigungu}`)
    },
    getOrderList : async(email) => {
        return await axios.post(domain + `/order/orders`, {
            email: email,
            })

    },

    getSidebarList : async(dho, sigungu, page, size, sortBy) => {
        return await axios.get(domain + `/camp/sideBarList/${dho}/${sigungu}/${page}/${size}/${sortBy}`)
    },
  
};
export default AxiosApi;