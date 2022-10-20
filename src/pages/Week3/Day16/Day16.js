import './Day16.css'
import home from "../../../home.png";
import {useNavigate} from "react-router-dom";
import {useEffect, useMemo, useState} from "react";
import chick from './Chicken.gif';

export const Day16 = () => {

    const navigate = useNavigate();

    const [atk, setAtk] = useState(false);

    useEffect(() => {
        const style = document.getElementById('chick').style;
        let x, y;
        const go = () => {
            const track = (new Date().getTime()/200)%100;
            if(track < 35)
                [x, y] = [track * 100/35, 0];
            else if(track < 50)
                [x, y] = [100, (track - 35)*100/15];
            else if(track < 85)
                [x, y] = [100 - (track-50)*100/35, 100];
            else
                [x, y] = [0, 100-(track - 85)*100/15];
            style.setProperty('--x', x.toString());
            style.setProperty('--y', y.toString());
            style.setProperty('transform', `scaleX(${track < 50 ? -1 : 1})`)
        };
        const interval = setInterval(go, 10);
        return () => clearInterval(interval);
    }, []);


    return <div id="day16">
        <img src={home} alt="" id="home" width={60} onClick={() => navigate('/')}/>

        <div id="container16">
            <img src={chick} id="chick" alt=""
                 onClick={() => setAtk((a => a+1))}/>
        </div>
    </div>;
}
