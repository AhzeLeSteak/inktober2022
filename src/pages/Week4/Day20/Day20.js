import './Day20.css'
import {useEffect, useState} from "react";

export const Day20 = () => {

    element={<WithRoute component={$1}/>}const [out, setOut] = useState(true);
    const [frame, setFrame] = useState(0);
    const [frameW, setFrameW] = useState(0);

    useEffect(() => {
        const increment = () => setFrame(i => (i+1)%9);
        const interval = setInterval(increment, 200);
        const incrementW = () => setFrameW(i => (i+1)%4);
        const intervalW = setInterval(incrementW, 200);


        return () => {
            clearInterval(interval);
            clearInterval(intervalW);
        };
    }, []);

    return <>

        <div id="container20">
            {out ?
                <div id="out">
                    <img src={`${process.env.PUBLIC_URL}/day20/out/${frame+1}.png`} id="wave" alt=""/>
                    <div id="go-in" onClick={() => setOut(false)}></div>
                </div>
                :
                <div id="in">
                    <img src={`${process.env.PUBLIC_URL}/day20/in/${frame+1}.png`} id="wave" alt=""/>
                    <img src={`${process.env.PUBLIC_URL}/day20/in/w${frameW+1}.png`} id="w" alt=""/>
                    <div id="go-out" onClick={() => setOut(true)}></div>
                </div>
            }
        </div>
    </>
}
