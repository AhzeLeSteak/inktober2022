import home from "../../../home.png";
import {useNavigate} from "react-router-dom";
import './Day6.css'
import {useMemo, useState} from "react";
import petal from './petal.png';
import ost from './ost.mp3';
import Sound from 'react-sound';

export const Day6 = () => {

    const navigate = useNavigate();
    const [emotion, setEmotion] = useState('neutral');
    const [lastEmotion, setLastEmotion] = useState('');
    const [rowCounter, setRowCounter] = useState(0);

    const [petalCount, setPetalCount] = useState(10 + (Math.random() > .5 ? 0 : 1));
    const [petalFallen, setPetalFallen] = useState(0);

    const message = useMemo(() => {
        const strike = rowCounter === 2;
        return {
            happy: 'loves_me',
            sad: 'loves_me_not',
            happyge: strike ? 'really_loves_me' : 'loves_me',
            sadge: strike ? 'really_loves_me_not' : 'loves_me_not'
        }[emotion];
    }, [emotion, rowCounter]);

    const reset = (e) => {
        if(lastEmotion === e)
            setRowCounter(i => i < 2 ? i+1 : 0);
        else
            setRowCounter(0);
        setLastEmotion(e);
        setPetalCount(1 + Math.floor(Math.random()*13));
        setPetalFallen(0);
        setEmotion('neutral');
        document.querySelectorAll('.falling').forEach(el => el.classList.remove('falling'));
    }

    const angles = useMemo(() => {
        const res = [];
        for(let i = 0; i < petalCount; i++)
            res.push(360*i/petalCount);
        return res;
    }, [petalCount]);

    const handleClick = (ev) => {
        if(ev.target.classList.contains('falling'))
            return
        ev.target.classList.add('falling')
        const over = petalFallen === petalCount-1;
        const e = {neutral: 'happy', happy: over ? 'sadge':'sad', sad: over ? 'happyge':'happy'}[emotion];
        setEmotion(e);
        setPetalFallen(i => i+1);
        if(over)
            setTimeout(() => reset(e), 3000);
    };

    return <div id="day6">
        <img src={home} alt="" id="home" width={60} onClick={() => navigate('/')}/>
        <div id="container6">

            <img id="face" src={`${process.env.PUBLIC_URL}/day6/${emotion}.png`}/>
            {emotion !== 'neutral' && <img alt="" id="message" src={`${process.env.PUBLIC_URL}/day6/${message}.png`}/>}

            {angles.map((a, i) =>
                <img className="petal"
                     key={i}
                     src={petal}
                     style={{'--angle': a, zIndex: i%2===0?1:2}}
                     onClick={handleClick}
                />
            )}

            <Sound url={ost}
                   playStatus={Sound.status.PLAYING}
                   loop={true}
            />


        </div>
    </div>
}