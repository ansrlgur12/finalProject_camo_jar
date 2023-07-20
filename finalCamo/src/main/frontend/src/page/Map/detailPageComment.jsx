import React, {useState, useContext} from "react";
import styled from "@emotion/styled";
import { UserContext } from "../../API/UserInfo";
import { useEffect } from "react";
import { MarkerContext } from "../../context/MarkerInfo";
import AxiosApi from "../../API/TestAxios";

const CommentContainer = styled.div`
margin-top: 1vh;
position: relative;
    .commentBox{
        margin-top: 3vh;
        display: flex;
        justify-content: center;
    }
    .comment{
        width: 80%;
        height: 15vh;
    }
    .buttonBox{
        display: flex;
        justify-content: right;
    }
    .submitBtn{
        color: #fff;
        background-color: #2D6247;
        cursor: pointer;
        border-radius:8px;
        margin: .5em;
    }
    .comments{
        display: flex;
        align-items: center;
        margin-top: 2vh;
        margin-left: 1vw;
    }
    .userImage{
        width: 5vh;
        height: 5vh;
        border-radius: 50px;
        background-color: #ccc;
    }
    .content{
        margin-left: 2vw;
    }
    .writeBtn{
        color: #fff;
        background-color: #2D6247;
        border-radius:8px;
        cursor: pointer;
        width: 5vw;
        height: 5vh;
        position: absolute;
        right: 1vh;
        margin-top: 2vh;
    }
    .no-comments{
        margin-left: 2vw;
        font-size: .8em;
    }
    @media screen and (max-width: 768px) {
        .writeBtn{
            width: auto;
            height: 4vh;
            font-size: .8em;
        }
    }
`;



const DetailPageComment = () => {
    const markContext = useContext(MarkerContext);
    const context = useContext(UserContext);
    const {nickName} = context;
    const {contentId} = markContext;
    const [writeComment, setWriteComment] = useState(false);
    const [content, setContent] = useState("");
    const [comment, setComment] = useState([]);
    const [upload, setUpload] = useState(0)

    useEffect(()=>{
        console.log(contentId.id);
        const getComment = async() => {
            const rsp = await AxiosApi.getComment(contentId.id);
            console.log(rsp.data)
            setComment(rsp.data)
        }
        getComment();
    },[contentId, upload])

    const submit = async() => {
        const rsp = await AxiosApi.createComment(contentId.id, content);
        console.log(rsp);
        setUpload(rsp.data.id);
        setContent("");
    }

    const onClickWriteComment = () => {
        setWriteComment(true);
    }

    const onClickWriteFinish = () => {
        setWriteComment(false);
        submit();
    }

    const onClickGoBack = () => {
        setWriteComment(false)
    }
    const onChangeText = (e) => {
        setContent(e.target.value);
    }

    return(
        <CommentContainer>
             {comment.length === 0 ? (
                <div className="no-comments">작성된 댓글이 없습니다</div>
                ) : (
                comment.map((comment) => (
                <div className="comments" key={comment.id}>
                    <div className="nickNm">{nickName}</div>
                    <div className="content">{comment.content}</div>
                </div>
                ))
            )}
            {!writeComment && <button className="writeBtn" onClick={onClickWriteComment}>작성하기</button>}
            
            {writeComment && 
            <>
             <div className="commentBox">
                <textarea className="comment" type="text" value={content} placeholder="여러분의 소중한 댓글을 입력해주세요." onChange={onChangeText}/>
             </div>
             <div className="buttonBox">
                <button className="submitBtn" onClick={onClickWriteFinish}>등록</button>
                <button className="submitBtn" onClick={onClickGoBack}>취소</button>
             </div>
            
             </>
            }
        </CommentContainer>
    )
};
export default DetailPageComment;