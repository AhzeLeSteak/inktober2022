import './Day30.css'
import {useEffect, useState} from "react";
import s1 from './snake_1.wav';
import s2 from './snake_2.wav';
import s3 from './s3.wav';
import c1 from './c1.wav'
import c2 from './c2.wav'
import call_sound from './callsound.mp3'
import Sound from "react-sound";
import replay from "../../../replay.png";


const script = [ //[qui parle, combien de temps, quel line]
    ['s', 2, s1, 'Colonel, can you hear me ?'],
    ['c', 1.5, c1, `I'm here, what is it ?`],
    ['s', 4.3, s2, `I would like to thank everyone that followed my progress for this inktober`],
    ['c', 5.5, c2, `Snake, don't forget to check if the source code on the Github page contains any virus`],
    ['s', 2, s3, `Will do, colonel`],

]

export const Day30 = () => {

    const [charFrame, setCharFrame] = useState(0);
    const [radioLvl, setRadioLvl] = useState(0);
    const [scriptIndex, setScriptIndex] = useState(-1);
    const [playing, setPlaying] = useState(false);

    useEffect(() => {
        const updateFrame = () => setCharFrame(f => 1 - f);
        const interval = setInterval(updateFrame, 200);

        const updateRadio = () => {
            const level = Math.floor((new Date().getTime() % 600) / 600 * 6) / 5;
            setRadioLvl(2*Math.abs(level - .5));
        }
        const intervalRadio = setInterval(updateRadio, 10);

        return () => {
            clearInterval(interval);
            clearInterval(intervalRadio);
        };
    }, []);

    const next = () => {
        if(playing || scriptIndex >= 4) return;
        setScriptIndex(i => i+1);
        setPlaying(true);
        setTimeout(() => setPlaying(false), script[scriptIndex+1][1]*1000);
    }


    function restart(ev) {
        ev.stopPropagation();
        ev.preventDefault();
        setScriptIndex(-1);
    }

    return <div id="container30" onClick={() => next()} style={{cursor: playing ? 'unset' : 'pointer'}}>
        <img src={replay} alt="" id="replay" width={60} onClick={restart}/>
        {scriptIndex >= 0 ?
            <>
                <div id="codec">
                    <div id="radio" style={{'--lvl': playing ? radioLvl : 0}}></div>
                    <div id="codec-front"></div>
                    <div id="snake" style={{backgroundImage: `url("${process.env.PUBLIC_URL}/day30/snake_${script[scriptIndex][0] === 's' && playing ? charFrame+2 : 1}.png")` }}></div>
                    <div id="colonel" style={{backgroundImage: `url("${process.env.PUBLIC_URL}/day30/colonel_${script[scriptIndex][0] === 'c' && playing ? charFrame+2 : 1}.png")` }}></div>

                    <Sound url={script[scriptIndex][2]}
                           playStatus={playing ? Sound.status.PLAYING : Sound.status.STOPPED}
                           loop={false}
                    />
                </div>
                <div id="text">
                    {script[scriptIndex][3]}
                </div>
            </>
            :
            <>
                <img src={`${process.env.PUBLIC_URL}/day30/call.png`} alt="" id="call"/>
                <Sound url={call_sound}
                       playStatus={Sound.status.PLAYING}
                       loop={true}
                />
            </>
        }
    </div>
}