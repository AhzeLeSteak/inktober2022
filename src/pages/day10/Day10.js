import './Day10.css';
import {useEffect, useState} from "react";

export const Day10 = () => {

    const [crabState, setCrabState] = useState(0);
    const [moetteState, setMoetteState] = useState(0);
    const [moette2State, setMoette2State] = useState(0);
    const [moette3State, setMoette3State] = useState(0);
    const [crabX, setCrabX] = useState(0);

    useEffect(() => {
        const intervals = [];
        intervals.push(setInterval(() => setCrabState(s => 1 - s), 100));
        intervals.push(setInterval(() => {
            const epoch = new Date().getTime()/1000;
            const y = 35 + (Math.cos(epoch) + .5) * 30; //img width
            setCrabX(y);
        }, 10));
        intervals.push(setInterval(() => setMoetteState(s => 1 - s), 900));
        intervals.push(setInterval(() => setMoette2State(s => 1 - s), 800));
        intervals.push(setInterval(() => setMoette3State(s => 1 - s), 950));

        return () => intervals.forEach(i => clearInterval(i));
    }, []);

    return <div id="day10">

        <div id="container10">
            <img src={`${process.env.PUBLIC_URL}/day10/moette_${moetteState+1}.png`}  style={{'--state': 1 - moetteState }} className="moette" alt=""/>
            <img src={`${process.env.PUBLIC_URL}/day10/moette_${moette2State+1}.png`} style={{'--state': 1 - moette2State}} className="moette" alt=""/>
            <img src={`${process.env.PUBLIC_URL}/day10/moette_${moette3State+1}.png`} style={{'--state': 1 - moette3State}} className="moette" alt=""/>
            <img src={`${process.env.PUBLIC_URL}/day10/crab_${crabState+1}.png`} id="crab" style={{'--offset-left': crabX}} alt=""/>
            <div id="front"></div>
        </div>
    </div>;
}