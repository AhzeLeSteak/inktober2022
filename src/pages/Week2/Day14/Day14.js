import './Day14.css'
import r from './r.png'
import ost from './Gameboy Startup Sound.mp3'
import {useEffect, useState} from "react";
import Sound from "react-sound";
import home from "../../../home.png";
import replay from "../../../replay.png";
import {useNavigate} from "react-router-dom";

let timeout;

export const Day14 = () => {

    const navigate = useNavigate();
    const [play, setPlay] = useState(false);

    const playSoundAfter4s = () => {
        clearTimeout(timeout);
        timeout = setTimeout(() => setPlay(true), 4000);
    }

    const restart = () => {
        setPlay(false);
        playSoundAfter4s();
        const el = document.getElementById('logo');
        el.style.animation = 'none';
        (() => el.offsetHeight)(); /* trigger reflow */
        el.style.animation = null;
    }

    useEffect(restart, []);


    return <div id="day14">

        <img src={home} alt="" id="home" width={60} onClick={() => navigate('/')}/>
        <img src={replay} alt="" id="replay" width={60} onClick={() => restart()}/>
        <div id="container14">
            <div id="logo">
                <div id="square"></div>
                <img src={r} id="r" alt=""/>
            </div>
        </div>
        <Sound url={ost}
               playStatus={play ? Sound.status.PLAYING : Sound.status.STOPPED}
               loop={false}
        />
        <Sound url={ost}
               playStatus={Sound.status.PLAYING}
               loop={false}
               volume={0}
        />
    </div>
}