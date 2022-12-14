import './Day22.css';
import {useEffect, useState} from "react";

const ACCELERATION = 50;
const MAX_SPEED = 100;

let last_update = new Date();
let last_frame_update = new Date();

export const Day22 = () => {

    const [bonom, setBonom] = useState({
        frame: 0,
        x: window.innerWidth/2,
        y: window.innerHeight/2,
        speed: 30,
        walking: true,
        left: false,
        mousePos: {x: 80, y: 100}
    });

    const update = () => {
        const now = new Date();
        const dt = (now.getTime() - last_update.getTime())/1000;
        last_update = now;
        let update_frame = (now.getTime() - last_frame_update.getTime())/1000 >= .2;
        if(update_frame)
            last_frame_update = now;

        setBonom(b => {
            const dist = Math.sqrt((b.mousePos.y - b.y)**2 + (b.mousePos.x - b.x)**2);
            const facing_left = b.mousePos.x > b.x;
            if(dist < 30)
                return {
                    ...b,
                    frame: (b.frame + (update_frame ? 1 : 0))%4,
                    walking: false,
                    speed: 0,
                    x: b.x,
                    y: b.y,
                    left: false
                }
            const speedUp = dist > 20 ? 1 : -1;
            const angle = Math.atan2(b.mousePos.y - b.y, b.mousePos.x - b.x);
            let x = b.x + Math.cos(angle) * b.speed * dt;
            x = Math.max(x, 100);
            x = Math.min(x, window.innerWidth - 100);
            let y =  b.y + Math.sin(angle) * b.speed * dt;
            y = Math.max(y, 100);
            y = Math.min(y, window.innerHeight - 100);
            return {
                ...b,
                walking: true,
                frame: (b.frame + (update_frame ? 1 : 0))%4,
                speed: Math.min(MAX_SPEED, b.speed + ACCELERATION * dt * speedUp),
                x,
                y,
                left: facing_left
            }
        });
    }

    useEffect(() => {
        const interval = setInterval(update, 10)

        return () => clearInterval(interval);
    }, []);

    const mouseMove = ({clientX, clientY}) => setBonom(b => ({...b, mousePos: {x: clientX, y: clientY}}));
    //const mouseMove = () => {};

    return <div id="container22" onMouseMove={mouseMove}>
        <img src={`${process.env.PUBLIC_URL}/day22/${bonom.walking ? 'w' : 'i'}${bonom.frame+1}.png`}
             style={{left: bonom.x+'px', top: bonom.y+'px', '--face-left': bonom.left ? 1 : -1}}
             id="ptibonom"
             alt=""/>
    </div>
}
