import './Day3.css';
import Front from './front.png';
import Background from './background.png';
import Castle from './castle.png';
import {useState} from "react";

export function Day3(){

    const [animate, setAnimate] = useState(false);

    const click = () => {
        setAnimate(true);
        setTimeout(() => setAnimate(false), 8000);
    }


    return <div className="container3" onClick={click}>

        <img alt="" src={Background}/>
        <div className={animate ? 'animate' : ''}>
            <img alt="" src={Castle}/>
        </div>
        <img alt="" src={Front}/>
    </div>
}
