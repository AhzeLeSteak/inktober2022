import './Day13.css'
import pie from './pei.png';
import {useEffect, useState} from "react";
import Sound from "react-sound";
import ost from './Undertale OST 013 - Home (Music Box).mp3'

export const Day13 = () => {

    element={<WithRoute component={$1}/>}const [textBoxOpened, setTextBoxOpened] = useState(false);
    const [textIndex, setTextIndex] = useState(0);
    const [light, setLight] = useState(false);
    const [tailleTxt, setTailleTxt] = useState(0);
    const [piePickedUp, setPiePickedUp] = useState(false);

    const texts  = [
        `(A box of kid's shoes in a disparity of sizes)`,
        `(An empty photo frame)\n(It's really dusty)`,
        `Look at these cool toys!\nThey don't interest you at all`,
        `You found a slice of\nbutterscotch-cinnamon pie.`
    ];

    const boxes = [
        [52, 50, 19, 17],
        [72, 43, 40, 31],
        [170, 113, 30, 21],
        [99, 94, 20, 14],
        [20, 30, 20, 45]
    ]

    const handleClick = (i, ev) => {
        ev.preventDefault();
        ev.stopPropagation();
        if(i === 4){
            setLight(l => !l);
            return;
        }
        if(textBoxOpened){
            setTextBoxOpened(false);
            if(textIndex === 3)
                setPiePickedUp(true);
        }
        else if(i !== 3 || !piePickedUp){
            setTextIndex(i);
            setTextBoxOpened(true);
            setTailleTxt(0);
        }
    };

    useEffect(() => {
        const listener = () => {
            setTextBoxOpened(false);
            if(textIndex === 3)
                setPiePickedUp(true);
        };
        document.body.addEventListener('click', listener);

        const interval = setInterval(() => setTailleTxt(i => (i+1)), 30);

        return () => {
            clearTimeout(interval);
            document.body.removeEventListener('click', listener);
        };
    });

    let chars = 0;

    return <div id="day13">

        <div id="container13" style={{backgroundImage: `url("${process.env.PUBLIC_URL}/day13/bg_${light ? 2 : 1}.png")`}}>

            {!piePickedUp &&  <img src={pie} id="pie" alt=""/>}

            {boxes.map((b, i) => <div key={i}
                                      onClick={(ev) => handleClick(i, ev)}
                                      className="box"
                                      style={{'--x': b[0], '--y': b[1], '--w': b[2], '--h': b[3]}} />)}

            {textBoxOpened && <div id="textBox">
                {texts[textIndex].split('\n').map((txt, i) => {
                    const size = tailleTxt - chars;
                    const res = <>
                        <span>{(textIndex === 3 && i > 0) || size < 1 ? '' : '*'}</span> <span>{txt.slice(0, size > 0 ? size : 0)}</span>
                    </>;
                    chars += txt.length;
                    return res;
                })}
            </div>}
        </div>

        <Sound url={ost}
               playStatus={Sound.status.PLAYING}
               loop={true}
        />


    </div>
}