import React, { useEffect, useRef } from 'react';
import "./outdoor.css"
import { Link } from 'react-router-dom';

function Outdoor() {
    const odAmiCycle = useRef(null);
    const odAmiArrow = useRef(null);

    useEffect(() => {
        odAmiCycle.current.addEventListener('mouseenter', (e) => {
            // 圓形動畫
            odAmiCycle.current.classList.add('menu2-animation')
            odAmiCycle.current.classList.remove('menu3-animation')
            // 箭頭痛畫
            odAmiArrow.current.classList.add('menu4-animation')
            odAmiArrow.current.classList.remove('menu5-animation')
        })
        odAmiCycle.current.addEventListener('mouseleave', (e) => {
            // 圓形動畫
            odAmiCycle.current.classList.remove('menu2-animation')
            odAmiCycle.current.classList.add('menu3-animation')
            // 箭頭動畫
            odAmiArrow.current.classList.remove('menu4-animation')
            odAmiArrow.current.classList.add('menu5-animation')
        })
    })


    return (
        <>
            {/* 主頁畫面 */}
            <div className="outdoor">
                <img src="http://localhost:8000/img/home/homepage/surf1.jpg" alt='海爾戶外' />
                <div className="outdoor-word">
                    <p>Hire outdoor</p>
                    <p>海爾戶外</p>
                </div>
                <Link to="/"className="outdoor-btn">
                    <img src="http://localhost:8000/img/home/hirecircle.png" className="hireClass" id="hireId" alt='戶外2' />
                    <div className="btn-div2class" id="btn-div2" ref={odAmiCycle}></div>
                    <p className="btn-pClass" id="btn-p" ref={odAmiArrow}>↓</p>
                </Link>
            </div>
        </>
    );
}

export default Outdoor;