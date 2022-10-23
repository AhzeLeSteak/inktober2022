import './App.css';
import {useEffect, useState} from "react";
import {HashRouter, Navigate, Route, Routes} from "react-router-dom";
import Home from "./pages/Home/Home";
import Day1 from "./pages/Week1/Day1/Day1";
import Day2 from "./pages/Week1/Day2/Day2";
import {Day3} from "./pages/Week1/Day3/Day3";
import {Day4} from "./pages/Week1/Day4/Day4";
import Day5 from "./pages/Week1/Day5/Day5";
import {Day6} from "./pages/Week1/Day6/Day6";
import {Day7} from "./pages/Week1/Day7/Day7";
import {Day8} from "./pages/Week2/Day8/Day8";
import {Day9} from "./pages/Week2/day9/Day9";
import {Day10} from "./pages/Week2/day10/Day10";
import {Day11} from "./pages/Week2/Day11/Day11";
import {Day12} from "./pages/Week2/Day12/Day12";
import {Day13} from "./pages/Week2/Day13/Day13";
import {Day14} from "./pages/Week2/Day14/Day14";
import {Day15} from "./pages/Week3/Day15/Day15";
import {Day16} from "./pages/Week3/Day16/Day16";
import {Day22} from "./pages/Week4/Day22/Day22";
import {Day17} from "./pages/Week3/Day17/Day17";
import {Day18} from "./pages/Week3/Day18/Day18";
import {Day19} from "./pages/Week3/Day19/Day19";

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
                    <Route path={'/crabby'} element={<Day10/>}/>
                    <Route path={'/eagle'} element={<Day11/>}/>
                    <Route path={'/forget'} element={<Day12/>}/>
                    <Route path={'/kind'} element={<Day13/>}/>
                    <Route path={'/empty'} element={<Day14/>}/>
                    <Route path={'/armadillo'} element={<Day15/>}/>
                    <Route path={'/fowl'} element={<Day16/>}/>
                    <Route path={'/salty'} element={<Day17/>}/>
                    <Route path={'/scrape'} element={<Day18/>}/>
                    <Route path={'/ponytail'} element={<Day19/>}/>

                    <Route path={'/heist'} element={<Day22/>}/>
                </>}
                <Route path={'/'} element={<Home isMobile={isMobile}/>}/>
                <Route path={'/*'} element={<Navigate to={'/'}/>}/>
            </Routes>
        </HashRouter>
    </div>
}

export default App;
