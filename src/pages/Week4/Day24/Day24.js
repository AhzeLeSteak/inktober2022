import './Day24.css'
import {useEffect, useState} from "react";
import home from "../../../home.png";
import {useNavigate} from "react-router-dom";

const SPEED = 0.03;
let last_update = new Date();

export const Day24 = () => {

    const navigate = useNavigate();
    const [fairies, setFairies] = useState([
        {
            x: .4,
            y: .5,
            angle: 0,
            dist: 0
        },
        {
            x: .5,
            y: .5,
            angle: 0,
            dist: 0
        },
        {
            x: .6,
            y: .5,
            angle: 0,
            dist: 0
        },
    ]);
    const [captured, setCaptured] = useState(false);

    const update = () => {
        const now = new Date();
        const dt = (now.getTime() - last_update.getTime())/1000;
        last_update = now;

        setFairies(fs => fs.map(f => {
            const {x, y} = f;
            if(f.dist <= 0){
                f.angle = Math.random() * Math.PI * 2;
                f.dist = Math.random() * 0.1;
            }
            else{
                f.x += Math.cos(f.angle) * SPEED * dt * 1.75;
                f.x = Math.max(Math.min(f.x, .9), 0.1);
                f.y += Math.sin(f.angle) * SPEED * dt;
                f.y = Math.max(Math.min(f.y, .9), 0.1);
                const dist = Math.sqrt((f.x-x)**2 + (f.y-y)**2);
                f.dist -= dist;
            }

            return f;
        }))
    }

    useEffect(() => {
        const interval = setInterval(update, 10);

        return () => clearInterval(interval);
    }, []);

    function capture(e, i) {
        if(captured)
            return;
        e.preventDefault();
        e.stopPropagation();
        setCaptured(true);
        setFairies(fs => fs.filter((f, index) => i !== index));
    }

    const release = ({target, clientX, clientY}) => {
        if(!captured)
            return;


        const rect = target.getBoundingClientRect();
        const newFairy = {
            x: (clientX - rect.x) / rect.width,
            y: (clientY - rect.y) / rect.height,
            angle: 0,
            dist: 0
        };
        console.log(newFairy);
        setFairies(fs => [...fs, newFairy]);
        setCaptured(false);
    };

    return <>
        <img src={home} alt="" id="home" width={60} onClick={() => navigate('/')}/>

        <div id="container24" style={{cursor: `url("${process.env.PUBLIC_URL}/day24/${captured ? 'filled_' : ''}bottle.png"), auto`}}>
            <div id="subcontainer">
                <div id="fountain" onClick={ev => release(ev)}>
                    {fairies.map((f, i) =>
                        <img key={i}
                             src={`${process.env.PUBLIC_URL}/day24/fairy.png`}
                             onClick={e => capture(e, i)}
                             style={{'--top': f.y, '--left': f.x}}
                             className="fairy"
                             alt=""/>
                    )}
                </div>
            </div>
        </div>
    </>
}
