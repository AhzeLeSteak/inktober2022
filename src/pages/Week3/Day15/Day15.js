import './Day15.css'
import {useEffect, useMemo, useState} from "react";
import {useNavigate} from "react-router-dom";
import home from "../../../home.png";

const size = 128;

export const Day15 = () => {
    const navigate = useNavigate();
    const [pixels, setPixels] = useState([]);

    useEffect(() => {
        const image = new Image();
        image.src = process.env.PUBLIC_URL+'/day15/sando.png';
        image.addEventListener('load', () => {
            const canvas = document.createElement('canvas');
            canvas.setAttribute("width",  size.toString());
            canvas.setAttribute("height", size.toString());
            const context = canvas.getContext("2d");
            context.drawImage(image, 0, 0);

            const array = [];
            for (let y = 0; y < size; y++) {
                for (let x = 0; x < size; x++) {
                    const data = context.getImageData(x, y, 1, 1).data;
                    // array.push(`#${rgbToHex(data[0])}${rgbToHex(data[1])}${rgbToHex(data[2])} `);
                    array.push({
                        r: data[0],
                        g: data[1],
                        b: data[2],
                    });
                }
            }
            setPixels(array);
            console.log(array);
        });
    }, []);


    return <div id="day15">
        <img src={home} alt="" id="home" width={60} onClick={() => navigate('/')}/>

        <div id="container15">
            {pixels.length > 0 ? <Square x={0} y={0} size={size} pixels={pixels}></Square> : <></>}
        </div>
    </div> ;
}


const Square = (props) => {

    const [canBeSplitted, setCanBeSplitted] = useState(false);
    const [splitted, setSplitted] = useState(false);

    useEffect(() => {
        const to = setTimeout(() => setCanBeSplitted(true), 300);
        return () => clearTimeout(to);
    }, []);

    const {r, g, b} = useMemo(() => {
        let r = 0, g = 0, b = 0;
        for(let x = props.x; x < props.x + props.size; x++){
            for(let y = props.y; y < props.y + props.size; y++){
                const i = y*size + x;
                r += props.pixels[i].r;
                g += props.pixels[i].g;
                b += props.pixels[i].b;
            }
        }
        r /= props.size**2;
        g /= props.size**2;
        b /= props.size**2;

        return {r, g, b};
    }, [props]);


    return splitted && props.size > 2
        ? <div className="wrapper">
            <Square x={props.x} y={props.y} size={props.size/2} pixels={props.pixels}></Square>
            <Square x={props.x + props.size/2} y={props.y} size={props.size/2} pixels={props.pixels}></Square>
            <Square x={props.x} y={props.y + props.size/2} size={props.size/2} pixels={props.pixels}></Square>
            <Square x={props.x + props.size/2} y={props.y + props.size/2} size={props.size/2} pixels={props.pixels}></Square>
        </div>
        : <div className={'box ' + (props.size === size ? 'first' : '')}
               style={{backgroundColor: `rgb(${r}, ${g}, ${b})`, '--size': props.size}}
               onMouseEnter={() => canBeSplitted && setSplitted(true)}
        ></div>
}