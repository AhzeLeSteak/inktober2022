import './Day2.css'
import '../../../fonts/sonic-the-hedgehog-2-hud-font.ttf'
import {useEffect, useState} from "react";

//const ratio_front = 0.005;
const ratio_back = 0.005;

//Scurry
function Day2() {

    const [rings, setRings] = useState(0);
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        const i = setInterval(() => setSeconds(s => s+1), 1000);

        return () => clearInterval(i);
    })

    function parallax(e) {
        let _w = window.innerWidth/2;
        let _h = window.innerHeight/2;
        let _mouseX = e.clientX;
        let _mouseY = e.clientY;
        let depth_back = `${50 - (_mouseX - _w) * ratio_back}% ${50 - (_mouseY - _h) * ratio_back}%`;
        //let depth_front = `${50 - (_mouseX - _w) * ratio_front}% ${50 - (_mouseY - _h) * ratio_front}%`;
        //document.getElementById('front').style.backgroundPosition = depth_front;
        document.getElementById('back').style.backgroundPosition = depth_back;
    }

    const onContextMenu = e => {
        e.preventDefault();
        setRings(r => r+10);
    }

    const spacesCt = 6 - rings.toString().length;
    const spaces = new Array(spacesCt).fill(0)

    return <div id="container2" onClick={() => setRings(r => r+1)} onContextMenu={onContextMenu} onMouseMove={parallax}>

        <div id="back" className="parallax"></div>
        <div id="front" className="parallax"></div>
        <div id="sonic"></div>
        <div id="eggman"></div>
        <em id="score">
            <span className="yellow">SCORE</span> &nbsp;02102022<br/>
            <span className="yellow">TIME</span> &nbsp; {seconds < 600 && '0'}{Math.floor(seconds/60)}:{seconds%60 < 10 && '0'}{seconds%60}<br/>
            <span className="yellow">RINGS</span>  {spaces.map((_, i) => <span key={i}>&nbsp;</span>)}{rings}
        </em>
    </div>;
}

export default Day2;
