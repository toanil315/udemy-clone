import React, {memo} from 'react';
import "./Footer.scss";

function Footer() {
    return (
        <div className="footer">
            <div className="container footer-content">
                <div className="footer-content-top">
                    <ul>
                        <li>Udemy Business</li>
                        <li>Teach on Udemy</li>
                        <li>Get the app</li>
                        <li>About us</li>
                        <li>Contact us</li>
                    </ul>
                    <ul>
                        <li>Carrers</li>
                        <li>Blogs</li>
                        <li>Help & support</li>
                        <li>Affiliate</li>
                    </ul>
                    <ul>
                        <li>Terms</li>
                        <li>Privacy policy</li>
                        <li>Site map</li>
                    </ul>
                    <ul>
                        <li className="right"><button className="btn btn-black"><i className="fa fa-globe"></i> English</button></li>
                    </ul>
                </div>
                <div className="footer-content-bot">
                    <img src={require("../../assets/img/logo-white.svg").default} alt="logo-white" />
                    <p>© 2021 Udemy, Inc</p>
                </div>
            </div>
        </div>
    )
}

export default memo(Footer);
