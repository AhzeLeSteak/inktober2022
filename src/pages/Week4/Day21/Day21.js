import './Day21.css';
import {useEffect, useState} from "react";

export const Day21 = () => {

    const [img, setImg] = useState(1);
    const [playing, setPlaying] = useState(false);
    const [df, setDF] = useState(0);

    useEffect(() => {
        const f = () => setDF(i => 1-i);
        const i = setInterval(f, 350);

        return () => clearInterval(i);
    }, []);

    const animate = (ev) => {
        if(playing)return;
        setPlaying(true);
        let newImg = -1;
        do{
            newImg = 1+Math.floor(Math.random()*4);
        }while (newImg === img);
        setImg(newImg);


        const el = document.getElementById('ouaf');
        el.style.animation = 'none';
        (() => el.offsetHeight)(); /* trigger reflow */
        el.style.animation = null;

        const rect = document.getElementById('container21').getBoundingClientRect();
        let x = ev.clientX - rect.left
        x = Math.max(x, rect.width*.15)
        x = Math.min(x, rect.width*.85);
        el.style.setProperty('--left', x+'px');
        setTimeout(() => setPlaying(false), 3000);

    }



    return <div id="container21" onClick={animate}>
        <img src={`${process.env.PUBLIC_URL}/day21/${img + (img === 4 ? df : 0)}.png`} alt="" id="ouaf"/>
        <img src={`${process.env.PUBLIC_URL}/day21/front.png`} alt="" id="front"/>

    </div>
}
