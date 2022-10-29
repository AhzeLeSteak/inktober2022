import './Day29.css'
import {useEffect, useState} from "react";

export const Day29 = () => {

    const [bg, setBg] = useState(0);
    const [hooh, setHooh] = useState(0);

    useEffect(() => {
        const updateBG = () => setBg(i => (i+1)%6);
        const updateHOOH = () => setHooh(i => (i+1)%5);

        const intervalBG = setInterval(updateBG, 2000);
        const intervalHOOH = setInterval(updateHOOH, 200);

        return () => {
            clearInterval(intervalBG);
            clearInterval(intervalHOOH);
        }
    }, [])

    return <div id="container29" style={{backgroundImage: `url("${process.env.PUBLIC_URL}/day29/bg/${bg+1}.png")`}}>
        <div id="front"></div>
        <div id="gf"></div>
        <div className="sprinkle"></div>
        <div className="sprinkle"></div>
        <div className="sprinkle"></div>
        <div className="sprinkle"></div>
        <div className="sprinkle"></div>
        <div className="sprinkle"></div>
        <div id="hooh" style={{backgroundImage: `url("${process.env.PUBLIC_URL}/day29/ohoh/${hooh+1}.png")`}}></div>
    </div>
}