import './Day18.css'
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import home from "../../../home.png";
import replay from "../../../replay.png";
import $ from './$.png';
import house from './house.png'
import bills from './bills.png';

const IMGS = [$, bills, house];

const brush_size = 48;

export const Day18 = () => {

    const navigate = useNavigate();
    const [mouseDown, setMouseDown] = useState(false);
    const [symbols, setSymbols] = useState([0, 0, 0, 0, 0, 0]);
    const [winningSymbol, setWinningSymbol] = useState(-1);
    const [over, setOver] = useState(false);

    useEffect(() => {
        const canvas = document.getElementById('canvas');
        const context = canvas.getContext('2d');

        const image = document.getElementById('front');
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight
        image.addEventListener('load', function () {
            reset();
        });

        context.fillStyle = 'rgba(0, 0, 0, 1)';

    }, []);

    const draw = ev => {
        if(!mouseDown)return;
        const rect = ev.target.getBoundingClientRect();
        const x = ev.clientX - rect.left;
        const y = ev.clientY - rect.top;
        const context = ev.target.getContext('2d');
        context.fillRect(x - brush_size/2, y - brush_size/2, brush_size, brush_size);

    }

    const mouseUp = (ev) => {
        setMouseDown(false);
        const canvas = ev.target
        const context = canvas.getContext('2d');
        const left   = canvas.width * 115 / 256;
        const top    = canvas.height * 48 / 192;
        const width  = canvas.width / 2; //* 128 / 256
        const height = canvas.height * 128 / 192;
        console.log({left, top, width, height})
        const img_data = [...context.getImageData(left, top, width, height).data];
        let ratio = img_data.filter((v, i) => v > 0).length / img_data.length;
        ratio += 0.4;
        if(ratio < .55)
            setOver(true);
    }


    const reset = () => {
        setOver(false);
        const x = Math.floor(Math.random()*100);
        let newWinningSymbol;
        if(x === 0)
            newWinningSymbol = 2;
        else if(x < 10)
            newWinningSymbol = 1;
        else if(x < 50)
            newWinningSymbol = 0;
        else
            newWinningSymbol = -1;
        setWinningSymbol(newWinningSymbol);
        let newSymboles = [newWinningSymbol, newWinningSymbol, newWinningSymbol, 0, 0, 0];
        if(newWinningSymbol === -1)
            newSymboles = [0, 0, 1, 1, 2, 2];
        else
            for(let i = 3; i < 6; i++){
                do{
                    newSymboles[i] = Math.floor(Math.random()*3);
                }while (newSymboles[i] === newWinningSymbol || (i === 5 && newSymboles[5] === newSymboles[4]));
            }
        setSymbols(newSymboles.sort(() => Math.random() > .5));

            const canvas = document.getElementById('canvas');
        const context = canvas.getContext('2d');
        const image = document.getElementById('front');

        context.globalCompositeOperation="source-over";
        context.drawImage(image, 0, 0, 256, 192, 0, 0, canvas.width, canvas.height);
        context.globalCompositeOperation="destination-out";
    }


    return <div>
        <img src={home} alt="" id="home" width={60} onClick={() => navigate('/')}/>
        {over && <img src={replay} alt="" id="replay" width={60} onClick={reset}/>}

        <div id="container18">

            {symbols.map((s, i) => <img key={i} className="symbol" src={IMGS[s]} style={s === winningSymbol && over ? {opacity: '50%'} : {}}/>)}

            <canvas id="canvas"
                    onMouseMove={draw}
                    onMouseDown={() => setMouseDown(true)}
                    onMouseUp={mouseUp}
            ></canvas>

            <img src={`${process.env.PUBLIC_URL}/day18/front.png`} id="front" alt="" style={{display: 'none'}}/>

        </div>
    </div>
}