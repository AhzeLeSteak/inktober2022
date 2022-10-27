import './Day8.css'
import {useMemo, useState} from "react";
import {pkmns} from "./pkmns";
import green_time from './green_time.png';
import red_time from './red_time.png';
import ok from './ok.png';
import ko from './ko.png';
import highscore from './highscore.png'

const excluded = [10, 13, 22, 23, 40, 49, 50, 69, 70, 71, 72, 73, 85, 86, 87, 88, 89, 90, 91, 92, 94, 99, 100, 101, 108, 109, 115, 116, 117, 118, 123,
    128, 129, 130, 131, 146, 147]

const pkIndexToFootPrintCoord = (pkId) => [1 + pkId % 31, 1 + Math.floor(pkId / 31)];
const randomElFromArray = array => array[Math.floor(array.length*Math.random())];

const MAX_ID = 151;
const TEMPS_MAX = 15;//secondes

let interval;
let timeout;

export const Day8 = () => {

    const [manche, setManche] = useState(-1);
    const [printToGuess, setPrintToGuess] = useState(0);
    const [propositions, setPropositions] = useState([]);
    const [choice, setChoice] = useState(false);
    const [score, setScore] = useState(0);
    const [lives, setLives] = useState(0);
    const displayScore = Math.floor(score * lives/3)
    const [bestScores, setBestScores] = useState([0, 0, 0, 0, 0]);
    const [playing, setPlaying] = useState(false);
    const [text, setText] = useState('Click on the bottom screen to start playing');

    const [time, setTime] = useState({t: 0, waiting: false});
    const [waiting, setWaiting] = [time.waiting, (w) => setTime(ti => ({t:ti.t, waiting: w}))];

    const lancerJeu = () => {
        setManche(0);
        setLives(3);
        setScore(0);
        setPlaying(true);
        lancerManche();
    }

    const setAskingText = () =>
        setText(randomElFromArray([`Whose footprint is this ?`, `Here comes a Pokémons! Check its footprint and tell me what it is!`]));



    const lancerManche = () => {
        //reset
        if(manche === 6){
            setBestScores(bs => [...bs, displayScore].sort((a, b) => b -a).slice(0, 5));
            setPlaying(false);
            return;
        }

        setManche(m => m+1);
        setTime({t: TEMPS_MAX, waiting: false});
        setChoice(false);

        if(interval)
            clearInterval(interval);

        setAskingText();


        let newGuess = 0;
        do{
           newGuess = Math.floor(Math.random()*MAX_ID);
        }while (excluded.includes(newGuess));
        setPrintToGuess(newGuess);
        const newPropositions = [newGuess];
        for(let i = 0; i < 3; i++){
            let newProposition = 0;
            do{
                newProposition = Math.floor(Math.random()*MAX_ID);
            }while (excluded.includes(newProposition) || newPropositions.includes(newProposition));
            newPropositions.push(newProposition);
        }
        setPropositions(newPropositions.sort(() => Math.random() > .5 ? 1 : -1));



        interval = setInterval(() => {
            setTime(ti => {
                if (ti.t === 0) return {t: 0, waiting: false};
                if (ti.waiting) return {t: ti.t, waiting: true};
                return {t: ti.t-1, waiting: false};
            });
        }, 1000);

    }


    const choose = (p) => {
        if(waiting || lives === 0)
            return;
        const goodAnswer = p === printToGuess;
        setWaiting(true);
        setText(`The footprint is ${pkmns[p]}'s! The footprint is ${pkmns[p]}!`)
        const actual_time = time.t;
        setTimeout(() => {

            setChoice(p);
            if(goodAnswer){
                setText(randomElFromArray(['Heard ya! Come in, visitor!', '......Yep! Looks like you\'re right!']))
                setScore(s => s + Math.floor((TEMPS_MAX - actual_time)*10/15)*100);
                setTimeout(() => lancerManche(), 2000);
            }
            else{
                setText(randomElFromArray([`......Huh?! Looks wrong to me!`]))
                setTimeout(() => {
                    setAskingText();
                    setWaiting(false);
                }, 2000);
                setLives(l => l - 1)
                if(lives === 1){
                    setBestScores(bs => [...bs, displayScore].sort((a, b) => b -a).slice(0, 5));
                    setPlaying(false);
                }
            }
        }, 2000);
    }


    if(time.t === 0 && playing && !timeout){
        if(lives > 1)
            timeout = setTimeout(() => {
                timeout = undefined;
                lancerManche();
            }, 2000);
        setLives(l => l-1);
    }

    const [printX, printY] = useMemo(() => pkIndexToFootPrintCoord(printToGuess), [printToGuess]);
    const tempsRestant = useMemo(() => new Array(time.t).fill(0), [time]);
    const tempsEcoule = useMemo(() => new Array(TEMPS_MAX - time.t).fill(0), [time]);

    return <div id="day8">

        <div id="container8">
            <div id="topscreen" className="screen">
                {waiting ? 'waiting' : ''}
                {playing ?
                    <>
                        <span id="manche">{manche}</span>
                        <span id="score">{displayScore}</span>
                        <img alt="" src={`${process.env.PUBLIC_URL}/day8/footprints/row-${printY}-column-${printX}.png`} id="footprints"/>
                        <div id="temps">
                            {tempsRestant.map((_, i) => <img alt="" key={i} src={green_time}/> )}
                            {tempsEcoule.map((_, i) =>  <img alt="" key={i} src={red_time}/> )}
                        </div>
                    </> :
                    <div>
                        <img alt="" src={highscore} id="highscore"/>
                        <div id="scores">
                            {bestScores.map((sc, i) => <span key={i}>{sc}</span>)}
                        </div>
                    </div>
                }
            </div>
            <div id="bottomscreen" className="screen" onClick={playing ? () => null : () => lancerJeu()}>
                {playing && propositions.map(p => {
                    const [x, y] = pkIndexToFootPrintCoord(p);
                    return <div key={p} className="poke" onClick={() => choose(p)}>
                        <span className="name">{pkmns[p]}</span>
                        {tempsEcoule.length > 4 && <img alt="" className="pp" src={`${process.env.PUBLIC_URL}/day8/pkmn/${p}.png`}/>}
                        {tempsEcoule.length > 8 && <img alt="" className="footprint" src={`${process.env.PUBLIC_URL}/day8/footprints/row-${y}-column-${x}.png`}/>}
                        {choice === p && <img alt="" id="result" src={choice === printToGuess ? ok : ko}/> }
                    </div>;
                })}
                <span id="text">{time.t === 0 && playing ? 'Out of time!' : text}</span>
            </div>
        </div>

    </div>
}