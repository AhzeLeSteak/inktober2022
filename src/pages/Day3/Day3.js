import './Day3.css';
import Front from './front.png';
import Background from './background.png';
import Castle from './castle.png';
import {useState} from "react";
import home from "../../home.png";
import {useNavigate} from "react-router-dom";

export function Day3(){
    const navigate = useNavigate();

    const [animate, setAnimate] = useState(false);

    const click = () => {
        setAnimate(true);
        setTimeout(() => setAnimate(false), 8000);
    }


    return <>
        <img src={home} alt="" id="home" width={60} onClick={() => navigate('/')}/>

        <div className="container3" onClick={click}>

            <img alt="" src={Background}/>
            <div className={animate ? 'animate' : ''}>
                <img alt="" src={Castle}/>
            </div>
            <img alt="" src={Front}/>
        </div>
    </>
}
