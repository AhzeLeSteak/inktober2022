import './App.css';
import {useEffect, useState} from "react";
import {HashRouter, Navigate, Route, Routes} from "react-router-dom";
import Home from "./pages/Home/Home";
import Day2 from "./pages/Day2/Day2";
import Day1 from "./pages/Day1/Day1";
import {Day3} from "./pages/Day3/Day3";
import {Day4} from "./pages/Day4/Day4";
import Day5 from "./pages/Day5/Day5";
import {Day6} from "./pages/Day6/Day6";
import {Day7} from "./pages/Day7/Day7";
import {Day8} from "./pages/Day8/Day8";
import {Day9} from "./pages/day9/Day9";


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
                    <Route path={'/bouquet'} element={<Day6/>}/>
                    <Route path={'/trip'} element={<Day7/>}/>
                    <Route path={'/match'} element={<Day8/>}/>
                    <Route path={'/nest'} element={<Day9/>}/>
                </>}
                <Route path={'/'} element={<Home isMobile={isMobile}/>}/>
                <Route path={'/*'} element={<Navigate to={'/'}/>}/>
            </Routes>
        </HashRouter>
    </div>
}

export default App;
