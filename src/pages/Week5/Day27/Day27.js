import './Day27.css';
import {useEffect, useState} from "react";

let last_update = new Date();
let last_food_update = new Date();

export const Day27 = () => {

    const [frame, setFrame] = useState(0);
    const [food, setFood] = useState(1);

    const update = () => {
        const now = new Date();
        const dt = (now.getTime() - last_update.getTime())/1000;
        if(dt >= .05){
            last_update = now;
            setFrame(f => (f + 1) % 3);
        }
        const dt_food = (now.getTime() - last_food_update.getTime())/1000;
        if(dt_food >= .8){
            last_food_update = now;
            setFood(1 + Math.floor(Math.random()*5))
        }


    };

    useEffect(() => {
        const interval = setInterval(update, 5);

        return () => clearInterval(interval);
    }, []);

    return <div id="container27">
        <div id="bg"></div>
        <div id="front"></div>
        <img src={`${process.env.PUBLIC_URL}/day27/${frame+1}.png`} alt="" id="kaaabi"/>
        <img src={`${process.env.PUBLIC_URL}/day27/f${food}.png`} alt="" id="food"/>

    </div>
}
