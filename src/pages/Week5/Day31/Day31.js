import './Day31.css'
import {useEffect, useState} from "react";


export const Day31 = () => {


    const [traps, setTraps] = useState(DEFAULT_TRAPS);
    const [fishCount, setFishCount] = useState(0);

    const wait_fish = (trap_index, first = false) => setTimeout(() => {
        setTraps(_traps => _traps.map((t, i) => ({...t, caught : i === trap_index ? true : t.caught})))
    }, (first ? 5000 : 15000)+Math.random()*25000);

    useEffect(() => {
        traps.forEach((t, i) => wait_fish(i, true));
    }, []);

    const catch_fish = ({clientX, clientY}, trap_index) => {
        if(!traps[trap_index].caught)
            return;

        setFishCount(i => i+1)

        setTraps(_traps => _traps.map((t, i) => ({...t, caught : i === trap_index ? false : t.caught})));
        wait_fish(trap_index);

        const fish = document.createElement('div');
        fish.classList.add('fish');
        fish.style.setProperty('left', clientX+'px');
        fish.style.setProperty('top', clientY+'px');
        document.getElementById('island').append(fish);
        setTimeout(() => fish.remove(), 300);
    };


    return <div id="container31">
        <div id="island">
            <div id="score">{fishCount}</div>
            {traps.map((t, i) => <div key={i}>
                <div className="trap" onClick={(ev) => catch_fish(ev, i)} style={{'--x': t.x, '--y': t.y, cursor: t.caught ? 'pointer' : 'unset'}}>
                    {t.caught && <div className="caught"></div>}
                </div>
            </div>)}
        </div>
    </div>
}


const DEFAULT_TRAPS = [
    {caught: false, x: 11, y: 0},
    {caught: false, x: 0, y: 1},
    {caught: false, x: 11, y: 1},
    {caught: false, x: 0, y: 2},
    {caught: false, x: 0, y: 3},
    {caught: false, x: 11, y: 4},
    {caught: false, x: 0, y: 6},
    {caught: false, x: 0, y: 7},
    {caught: false, x: 0, y: 8},
    {caught: false, x: 11, y: 9},
    {caught: false, x: 5, y: 10},
    {caught: false, x: 8, y: 10},
    {caught: false, x: 9, y: 10},
    {caught: false, x: 11, y: 10},
]