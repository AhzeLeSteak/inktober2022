import {useEffect} from "react";
import './Day12.css'

export const Day12 = () => {


    useEffect(() => {
        function update(e){
            const x = e.clientX || e.touches[0].clientX
            const y = e.clientY || e.touches[0].clientY

            document.getElementById('cursor').style.setProperty('--cursorX', x + 'px')
            document.getElementById('cursor').style.setProperty('--cursorY', y + 'px')
        }

        document.addEventListener('mousemove', update)
        document.addEventListener('touchmove', update);

        return () => ['mousemove', 'touchmove'].forEach(type => document.removeEventListener(type, update));
    }, []);

    return <>
        <div id="day12">
            <div id="cursor"></div>
            <span id="text">YOU LOST THE GAME</span>
        </div>
    </>;
}
