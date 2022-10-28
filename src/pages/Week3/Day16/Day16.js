import './Day16.css'
import {useEffect, useState} from "react";
import chick from './Chicken.gif';

const speed = 9;


export const Day16 = () => {


    const [chicks, setChicks] = useState([
        {x: -100, y: 0, angle: Math.PI},
        {x: -100, y: 0, angle: Math.PI},
        {x: -100, y: 0, angle: Math.PI},
        {x: -100, y: 0, angle: Math.PI},
        {x: -100, y: 0, angle: Math.PI},
        {x: -100, y: 0, angle: Math.PI},
    ])
    const [nextIndex, setNextIndex] = useState(0);

    useEffect(() => {
        const updateSoloChick = () => {
            let x, y;
            const style = document.getElementById('solo').style;
            const track = (new Date().getTime()/400)%100;
            if(track < 35)
                [x, y] = [track * 100/35, 0];
            else if(track < 50)
                [x, y] = [100, (track - 35)*100/15];
            else if(track < 85)
                [x, y] = [100 - (track-50)*100/35, 100];
            else
                [x, y] = [0, 100-(track - 85)*100/15];
            style.setProperty('--x', x.toString());
            style.setProperty('--y', y.toString());
            style.setProperty('transform', `scaleX(${track < 50 ? -1 : 1})`)
        };

        const update = () => {
            updateSoloChick();
            setChicks(st => st.map(({x, y, angle}) => ({
                    x: x + Math.cos(angle) * speed,
                    y: y + Math.sin(angle) * speed,
                    angle
                })
            ));
        }

        const interval = setInterval(update, 20);


        return () => {
            clearInterval(interval);
        };
    }, []);

    const click = () => {
        const style = document.getElementById('solo').style;
        style.setProperty('filter', 'hue-rotate(440deg)');
        setTimeout(() => style.removeProperty('filter'), 150);

        setChicks(st => st.map((ck, i) => {
            if(i !== nextIndex)
                return ck;
            const track = Math.floor(Math.random()*100);
            let x, y, angle;
            if(track < 35)
                [x, y] = [track * 100/35, 0];
            else if(track < 50)
                [x, y] = [100, (track - 35)*100/15];
            else if(track < 85)
                [x, y] = [100 - (track-50)*100/35, 100];
            else
                [x, y] = [0, 100-(track - 85)*100/15];
            x *= window.innerWidth/100;
            y *= window.innerHeight/100;
            angle = Math.atan((window.innerHeight/2 - y) / (window.innerWidth/2 - x));
            console.log({x, y, angle})
            return {x, y, angle};
        }));
        setNextIndex(i => (i+1)%chicks.length)
    };

    return <div id="day16">

        <div id="container16">

            <img src={chick} className="chick" id="solo" alt="" onClick={click}/>
            {chicks.map((ck, i) =>
                <img key={i} src={chick} className="chick" alt="" style={{'--x': ck.x, '--y': ck.y}}/>
            )};

        </div>
    </div>;
}
