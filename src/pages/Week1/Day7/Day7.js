import './Day7.css'
import oak from './oak.png';
import red from './red.png';
import ball from './ball.png'
import bulb from './bulb.png';
import charm from './charm.png';
import squirt from './squirt.png';
import bulb_sound from './bulb.mp3';
import charm_sound from './charm.mp3';
import squirtle_sound from './squirt.mp3';
import armoire from './armoire.png';
import {useEffect, useMemo, useState} from "react";
import Sound from "react-sound";
import text from './text.png';

export const Day7 = () => {

    const [selected, setSelected] = useState(0);
    const [playing, setPlaying] = useState(false);
    const pokeImg = useMemo(() => [false, bulb, charm, squirt][selected], [selected]);

    const [angle, setAngle] = useState(0);


    const playSound = () => {
        if(playing)
            return;
        setPlaying([false, bulb_sound, charm_sound, squirtle_sound][selected]);
        setTimeout(() => setPlaying(false), 800);
    }

    useEffect(() => {
        const interval = setInterval(() => {
            const cos = (Math.cos(new Date().getTime()/4000) + 1)/2; //entre 0 et 1
            setAngle(-30*cos)
        }, 10);

        return () => clearInterval(interval);
    })


    return <div id="day7">
        <div id="container7" style={{'--angle': angle+'deg', '--sin': 1-Math.sin(angle*0.0174533 + Math.PI/2)}}>

            {selected > 0 && <div id="pk-img">
                <img src={pokeImg} alt=""/>
            </div>}


            <img alt="" src={armoire} className="armoire shadow" style={{'--x': 6, '--y': 4.5}}/>
            <img alt="" src={armoire} className="armoire shadow" style={{'--x': 0, '--y': 4.5}}/>

            <img alt="" src={armoire} className="armoire" style={{'--x': 6, '--y': 0}}/>
            <img alt="" src={armoire} className="armoire" style={{'--x': 0, '--y': 5}}/>
            <img alt="" src={armoire} className="armoire" style={{'--x': 6, '--y': 5}}/>

            <img src={oak} className="oak shadow" alt=""/>
            <img src={oak} className="oak char" alt=""/>

            <img src={red} className="red shadow" alt=""/>
            <img src={red} className="red char" alt=""/>



            <img src={ball} className="ball" alt="" style={{'--offset': 0}} onClick={playSound} onMouseEnter={() => setSelected(1)} onMouseLeave={() => setSelected(0)}/>
            <img src={ball} className="ball" alt="" style={{'--offset': 1}} onClick={playSound} onMouseEnter={() => setSelected(2)} onMouseLeave={() => setSelected(0)}/>
            <img src={ball} className="ball" alt="" style={{'--offset': 2}} onClick={playSound} onMouseEnter={() => setSelected(3)} onMouseLeave={() => setSelected(0)}/>



            <Sound url={playing}
                   playStatus={playing ? Sound.status.PLAYING : Sound.status.STOPPED}
                   loop={false}
            />

        </div>
        <img src={text} id="text" alt=""/>

    </div>
}

/*


 */