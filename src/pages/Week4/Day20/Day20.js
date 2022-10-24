import './Day20.css'
import {useEffect, useState} from "react";
import home from "../../../home.png";
import {useNavigate} from "react-router-dom";

export const Day20 = () => {

    const navigate = useNavigate();
    const [out, setOut] = useState(true);
    const [frame, setFrame] = useState(0);
    const [frameW, setFrameW] = useState(0);

    useEffect(() => {
        const increment = () => setFrame(i => (i+1)%9);
        const interval = setInterval(increment, 200);
        const incrementW = () => setFrameW(i => (i+1)%4);
        const intervalW = setInterval(incrementW, 200);


        return () => {
            clearInterval(interval);
            clearInterval(intervalW);
        };
    }, []);

    return <>
        <img src={home} alt="" id="home" width={60} onClick={() => navigate('/')}/>

        <div id="container20">
            {out ?
                <div id="out">
                    <img src={`${process.env.PUBLIC_URL}/day20/out/${frame+1}.png`} id="wave" alt=""/>
                    <div id="go-in" onClick={() => setOut(false)}></div>
                </div>
                :
                <div id="in">
                    <img src={`${process.env.PUBLIC_URL}/day20/in/${frame+1}.png`} id="wave" alt=""/>
                    <img src={`${process.env.PUBLIC_URL}/day20/in/w${frameW+1}.png`} id="w" alt=""/>
                    <div id="go-out" onClick={() => setOut(true)}></div>
                </div>
            }
        </div>
    </>
}
