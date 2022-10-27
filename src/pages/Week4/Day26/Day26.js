import './Day26.css'
import {useEffect, useState} from "react";
import sound from './Zelda Link Combo Attack - Sound Effect (HD).mp3';
import Sound from "react-sound";

export const Day26 = () => {

    const [state, setState] = useState({idle: true, frame: 0});

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


    return <div id="container26">
        <div id="subcontainer" onClick={() => setState(s => ({frame: 0, idle: false}))}>
            <img src={`${process.env.PUBLIC_URL}/day26/green/${state.idle ? 'idle' : state.frame+1}.png`} alt="" className="link"/>
            <img src={`${process.env.PUBLIC_URL}/day26/blue/${state.idle ? 'idle' : state.frame+1}.png`} alt="" className="link"/>
            <img src={`${process.env.PUBLIC_URL}/day26/purple/${state.idle ? 'idle' : state.frame+1}.png`} alt="" className="link"/>
            <img src={`${process.env.PUBLIC_URL}/day26/red/${state.idle ? 'idle' : state.frame+1}.png`} alt="" className="link"/>
        </div>

        <Sound url={sound}
               playStatus={state.idle ? Sound.status.STOPPED : Sound.status.PLAYING}
               loop={true}
        />
    </div>
}