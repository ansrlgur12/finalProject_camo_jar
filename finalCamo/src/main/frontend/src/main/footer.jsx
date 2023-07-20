import React from "react";
import { styled } from "styled-components";

const FooterStyle = styled.div`
    background-color: #ccc;
    padding: 40px 10px;
    margin-top: 40px;

    footer p {
        margin-bottom: 10px;
    }

    footer ul.social-media {
        list-style: none;
        padding: 0;
    }

    footer ul.social-media li {
        display: inline-block;
        margin-right: 10px;
    }

    footer ul.social-media li:last-child {
        margin-right: 0;
    }

    footer ul.social-media li a {
        color: #000;
        font-size: 20px;
    }
    @media screen and (max-width: 768px) {
        display: none;
    }
`;

const Footer = () => {
    return(
        <FooterStyle>
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <h3>About Us</h3>
                        <p>문기혁 정승현 정인식 권영진</p>
                    </div>
                    <div className="col-md-4">
                        <h3>Contact Us</h3>
                        <p>서울시 강남구</p>
                        <p>camoricamo@gmail.com</p>
                        <p>02-1588-5050</p>
                    </div>
                    <div className="col-md-4">
                        <h3>Follow Us</h3>
                        <ul className="social-media">
                            <li></li>
                            
                        </ul>
                    </div>
                </div>
            </div>
        </FooterStyle>
    );
}

export default Footer;