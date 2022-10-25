import './Day23.css'
import {useEffect, useState} from "react";
import home from "../../../home.png";
import replay from "../../../replay.png";
import {useNavigate} from "react-router-dom";

let last_update = new Date();
const SPEED = 1;

const borne1 = .25;
const borne2 = .36;
const borne3 = .45;
const borne4 = .55;
const borne5 = .64;
const borne6 = .76;
const debug = false;

export const Day23 = () => {

    const navigate = useNavigate();
    const [state, setState] = useState({});

    const restart = () => setState({x: Math.random(), y: 1, go_left: Math.random() > .5, movingX: true, movingY: false, perdu: false});

    const update = () => {
        const now = new Date();
        const dt = (now.getTime() - last_update.getTime())/1000;
        last_update = now;
        setState(p => {
            p = {...p};
            if(p.movingX){
                p.x += SPEED * dt * (p.go_left ? -1 : 1);
                if(p.x < 0)
                    p.go_left = false;
                if(p.x > 1)
                    p.go_left = true;
            }
            else if(p.movingY){
                const x = p.x, y = p.y;
                const sur_nez = (x >= borne1 && x <= borne2) || (x >= borne5 && x <= borne6) || (x >= borne3 && x <= borne4);
                const dans_nez = (x > borne2 && x <= borne3) || (x >= borne4 && x <= borne5);
                if(dans_nez && y <= .4)
                    p.movingY = false;
                else if(sur_nez && y <= .55){
                    p.movingY = false;
                    p.perdu = true;
                }
                else if(!sur_nez && !dans_nez && y <= .4)
                    p.movingY = false;
                if(p.movingY)
                    p.y -= SPEED * dt;
            }
            return p;
        })
    }

    useEffect(() => {
        restart();
        const interval = setInterval(update, 10);
        return () => clearInterval(interval);
    }, []);

    return <>
        <img src={home} alt="" id="home" width={60} onClick={() => navigate('/')}/>
        <img src={replay} alt="" id="replay" width={60} onClick={() => restart()}/>
        <div id="container23">
            <div id="subcontainer" onClick={() => setState(s => ({...s, movingX: false, movingY: true}))}>


                {!state.perdu && <img src={`${process.env.PUBLIC_URL}/day23/nez_front.png`} className="nez" alt=""/>}
                <img src={`${process.env.PUBLIC_URL}/day23/index.png`}
                     id="doigt"
                     style={{'--left': state.x, '--top': state.y, zIndex: state.perdu ? 2 : 0}}
                     alt=""/>
                <img src={`${process.env.PUBLIC_URL}/day23/nez${state.perdu ? '_perdu' : ''}.png`}
                     className="nez"
                     alt=""/>

                {debug && <>
                    <div className="borne" style={{'--left': borne1}}></div>
                    <div className="borne" style={{'--left': borne2}}></div>
                    <div className="borne" style={{'--left': borne3}}></div>
                    <div className="borne" style={{'--left': borne4}}></div>
                    <div className="borne" style={{'--left': borne5}}></div>
                    <div className="borne" style={{'--left': borne6}}></div>
                </>}

                <img src={`${process.env.PUBLIC_URL}/day23/nez_perdu.png`}
                     style={{display: 'none'}}
                     alt=""/>

            </div>
        </div>
    </>
}
