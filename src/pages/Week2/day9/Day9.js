import './Day9.css';
import {useEffect, useState} from "react";

const pkmns = ['bulb', 'charm', 'squirtle',
    'chikorita', 'cynda', 'kaiminus',
    'treecko', 'mudkip', 'torchic',
    'turtwig', 'piplup', 'chimchar',
    'pikachu', 'vulpix', 'meowth',
    'eevee', 'phanpy', 'skitty',
    'linxy', 'munchlax', 'riolu'];

const ratio = [20, 21, 22,
                18, 16, 22,
                24, 18, 24,
                20, 20, 20,
                24, 19, 22,
                26, 22, 24,
                28, 24, 21]

export const Day9 = () => {

    const [pkmnL, setPkmnL] = useState(9);
    const [pkmnR, setPkmnR] = useState(7);
    const [frame, setFrame] = useState(0);
    const ratioL = ratio[pkmnL] ?? 20;
    const ratioR = ratio[pkmnR] ?? 20;

    useEffect(() => {
        const interval = setInterval(() => setFrame(f => 1-f), 1500);

        return () => clearInterval(interval);
    }, []);

    return <div id="day9">

        <div id="container9">
            <div className="choice">
                {pkmns.map((pk, i) => <img onClick={() => setPkmnL(i)} alt=""
                                           src={`${process.env.PUBLIC_URL}/day9/${pk}.png`}
                                           style={{filter:  i !== pkmnL ?  'grayscale(1)' : 'none'}}/>)}
            </div>
            <img alt="" src={`${process.env.PUBLIC_URL}/day9/${pkmns[pkmnL]}_${frame+1}.png`} className="pk"  style={{'--ratio': ratioL}} />
            <img alt="" src={`${process.env.PUBLIC_URL}/day9/${pkmns[pkmnR]}_${frame+1}.png`} className="pk"  style={{'--ratio': ratioR}}/>
            <div className="choice">
                {pkmns.map((pk, i) => <img onClick={() => setPkmnR(i)} alt=""
                                           src={`${process.env.PUBLIC_URL}/day9/${pk}.png`}
                                           style={{filter:  i !== pkmnR ?  'grayscale(1)' : 'none'}}/>)}
            </div>
        </div>
    </div>
}
