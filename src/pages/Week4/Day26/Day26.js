import './Day26.css'
import {useEffect, useState} from "react";
import sound from './atk_sound.mp3';
import Sound from "react-sound";

export const Day26 = () => {

    const [state, setState] = useState({idle: true, frame: 0});
    const [playing, setPlaying] = useState(false);

    const update = () => setState(s => {
        return {
            frame: s.idle ? s.frame : (s.frame+1)%7,
            idle: s.idle ? true : s.frame === 6
        }
    });

    useEffect(() => {
        const i = setInterval(update, 30);

        return () => clearInterval(i);
    }, []);

    const click = () => {
        setState(s => ({frame: 0, idle: false}));
        setPlaying(false);
        setTimeout(() => setPlaying(true), 1);
        setTimeout(() => setPlaying(false), 200);
    };


    return <div id="container26">
        <div id="subcontainer" onClick={click}>
            <img src={`${process.env.PUBLIC_URL}/day26/green/${state.idle ? 'idle' : state.frame+1}.png`} alt="" className="link"/>
            <img src={`${process.env.PUBLIC_URL}/day26/blue/${state.idle ? 'idle' : state.frame+1}.png`} alt="" className="link"/>
            <img src={`${process.env.PUBLIC_URL}/day26/purple/${state.idle ? 'idle' : state.frame+1}.png`} alt="" className="link"/>
            <img src={`${process.env.PUBLIC_URL}/day26/red/${state.idle ? 'idle' : state.frame+1}.png`} alt="" className="link"/>
        </div>

        <Sound url={sound}
               playStatus={!playing ? Sound.status.STOPPED : Sound.status.PLAYING}
               loop={false}
        />
    </div>
}
