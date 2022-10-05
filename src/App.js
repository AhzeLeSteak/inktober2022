import './App.css';
import {useEffect, useState} from "react";
import {HashRouter, Navigate, Route, Routes} from "react-router-dom";
import Home from "./pages/Home/Home";
import Day2 from "./pages/Day2/Day2";
import Day1 from "./pages/Day1/Day1";
import {Day3} from "./pages/Day3/Day3";
import {Day4} from "./pages/Day4/Day4";
import Day5 from "./pages/Day5/Day5";


function App() {

    const [width, setWidth] = useState(window.innerWidth);

    const handleWindowSizeChange = () => setWidth(window.innerWidth);
    useEffect(() => {
        window.addEventListener('resize', handleWindowSizeChange);
        return () => window.removeEventListener('resize', handleWindowSizeChange);
    }, []);

    const isMobile = width <= 1100;


    return <div className="App">
        <div className="background"></div>
        <HashRouter>
            <Routes>
                {!isMobile && <>
                    <Route path={'/gargoyle'} element={<Day1/>}/>
                    <Route path={'/scurry'} element={<Day2/>}/>
                    <Route path={'/bat'} element={<Day3/>}/>
                    <Route path={'/scallop'} element={<Day4/>}/>
                    <Route path={'/flame'} element={<Day5/>}/>
                </>}
                <Route path={'/'} element={<Home isMobile={isMobile}/>}/>
                <Route path={'/*'} element={<Navigate to={'/'}/>}/>
            </Routes>
        </HashRouter>
    </div>
}

export default App;
