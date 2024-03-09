import React from 'react';
import "./footer.css"
import { Link } from 'react-router-dom';


function Footer() {
    return (
        <>
            {/* 頁尾footer */}
            <footer className="footer-1">
                <div className="footer-3">
                    <img className="footer-3-logo" src="http://localhost:8000/img/home/Logo%E9%BB%91.png" alt='footer' />
                    <p>Hire是一個致力於促進共享經濟和可持續發展的線上平台。我們相信，戶外冒險和自然探索是每個人都應該擁有的權利</p>
                    <p>All rights reserved.</p>
                </div>
                <div className="footer-4">
                    <p className="C1">Landings</p>
                    <Link to="/" className="C2">Home</Link>
                    <Link to="/" className="C3">Porduct</Link>
                    <Link to="/" className="C4">Services</Link>
                    <p className="C5">Company</p>
                    <Link to="/" className="C6">IG</Link>
                    <Link to="/" className="C7">FB</Link>
                    <Link to="/" className="C8">YT</Link>
                    <p className="C9">Resources</p>
                    <Link to="/" className="C10">Blog</Link>
                    <Link to="/" className="C11">Careers</Link>
                    <Link to="/" className="C12">Phone</Link>
                </div>
            </footer>
        </>
    );
}

export default Footer;