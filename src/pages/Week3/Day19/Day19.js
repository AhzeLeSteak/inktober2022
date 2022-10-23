import {useEffect, useState} from "react";
import './Day19.css';
import home from "../../../home.png";
import {useNavigate} from "react-router-dom";

export const Day19 = () => {
    const navigate = useNavigate();
    const [hairIndex, setHairIndex] = useState(0);
    const [headIndex, setHeadIndex] = useState(0);

    useEffect(() => {

        const animateHair = () => setHairIndex(i => (i+1)%4);
        const i1 = setInterval(animateHair, 200);

        return () => clearInterval(i1);
    }, [])


    return <>
        <img src={home} alt="" id="home" width={60} onClick={() => navigate('/')}/>

        <div id="container19" onClick={() => setHeadIndex(i => (i+1)%7)}>

            <div id="undyne">
                <img src={`${process.env.PUBLIC_URL}/day19/hair/${hairIndex+1}.png`} alt="" id="hair"/>
                <img src={`${process.env.PUBLIC_URL}/day19/head/${headIndex+1}.png`} alt="" id="head"/>
                <img src={`${process.env.PUBLIC_URL}/day19/lefs.png`} alt="" id="legs"/>
                <img src={`${process.env.PUBLIC_URL}/day19/skirt.png`} alt="" id="skirt"/>
                <img src={`${process.env.PUBLIC_URL}/day19/r_arm.png`} alt="" id="r_arm"/>
                <img src={`${process.env.PUBLIC_URL}/day19/l_arm.png`} alt="" id="l_arm"/>
                <img src={`${process.env.PUBLIC_URL}/day19/buste.png`} alt="" id="bust"/>
            </div>



        </div>
    </>
}