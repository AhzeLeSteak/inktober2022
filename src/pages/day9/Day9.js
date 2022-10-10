import './Day9.css';
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import home from "../../home.png";

const pkmns = ['bulb', 'charm', 'squirtle', 'chikorita', 'cynda', 'kaiminus', 'treecko', 'mudkip', 'torchic', 'turtwig', 'piplup', 'chimchar', 'pikachu', 'meowth', 'skitty', 'munchlax'];

export const Day9 = () => {

    const navigate = useNavigate();
    const [pkmn, setPkmn] = useState(9);
    const [pkmn2, setPkmn2] = useState(7);
    const [frame, setFrame] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => setFrame(f => 1-f), 1500);

        return () => clearInterval(interval);
    }, []);

    return <div id="day9">
        <img src={home} alt="" id="home" width={60} onClick={() => navigate('/')}/>

        <div id="container9">
            <div className="choice">
                {pkmns.map((pk, i) => <img onClick={() => setPkmn2(i)} alt=""
                                           src={`${process.env.PUBLIC_URL}/day9/${pk}.png`}
                                           style={i !== pkmn2 ? {filter: 'grayscale(1)'} : {}} />)}
            </div>
            <img alt="" src={`${process.env.PUBLIC_URL}/day9/${pkmns[pkmn2]}_${frame+1}.png`} className="pk" />
            <img alt="" src={`${process.env.PUBLIC_URL}/day9/${pkmns[pkmn]}_${frame+1}.png`} className="pk" />
            <div className="choice">
                {pkmns.map((pk, i) => <img onClick={() => setPkmn(i)} alt=""
                                           src={`${process.env.PUBLIC_URL}/day9/${pk}.png`}
                                           style={i !== pkmn ? {filter: 'grayscale(1)'} : {}}/>)}
            </div>
        </div>
    </div>
}