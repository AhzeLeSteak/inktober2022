import './Day27.css';
import {useEffect, useState} from "react";

let last_update = new Date();
let last_frame_update = new Date();

export const Day27 = () => {

    const [frame, setFrame] = useState(0);
    const [food, setFood] = useState({type: 0, pos: 1});

    const update = () => {
        const now = new Date();
        const dt = (now.getTime() - last_update.getTime())/1000;
        last_update = now;
        if((now.getTime() - last_frame_update.getTime())/1000 >= .05){
            last_frame_update = now;
            setFrame(f => (f + 1) % 3);
        }
        setFood(f => {
           f.pos -= .6 * dt;
           if(f.pos <= 0){
               f.pos = 1;
               f.type = 1 + Math.floor(Math.random()*5);
           }
           return {...f};
        });
    };

    useEffect(() => {
        const interval = setInterval(update, 10);

        return () => clearInterval(interval);
    }, []);

    return <div id="container27">
        <div id="bg"></div>
        <div id="front"></div>
        <img src={`${process.env.PUBLIC_URL}/day27/${frame+1}.png`} alt="" id="kaaabi"/>
        <img src={`${process.env.PUBLIC_URL}/day27/f${food.type}.png`} style={{'--pos': food.pos}} alt="" id="food"/>

    </div>
}
