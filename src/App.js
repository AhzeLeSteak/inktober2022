import './App.css';
import {useEffect, useState} from "react";
import {HashRouter, Navigate, Route, Routes, useNavigate} from "react-router-dom";
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
import {Day20} from "./pages/Week4/Day20/Day20";
import {Day21} from "./pages/Week4/Day21/Day21";
import {Day23} from "./pages/Week4/Day23/Day23";
import {Day24} from "./pages/Week4/Day24/Day24";
import {Day25} from "./pages/Week4/Day25/Day25";
import homeImg from "./home.png";
import {Day26} from "./pages/Week4/Day26/Day26";
import {Day27} from "./pages/Week5/Day27/Day27";
import {Day28} from "./pages/Week5/Day28/Day28";
import {Day29} from "./pages/Week5/Day29/Day29";

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
                    <Route path={'/gargoyle'} element={<WithRoute component={<Day1/>}/>}/>
                    <Route path={'/scurry'} element={<WithRoute component={<Day2/>}/>}/>
                    <Route path={'/bat'} element={<WithRoute component={<Day3/>}/>}/>
                    <Route path={'/scallop'} element={<WithRoute component={<Day4/>}/>}/>
                    <Route path={'/flame'} element={<WithRoute component={<Day5/>}/>}/>
                    <Route path={'/bouquet'} element={<WithRoute component={<Day6/>}/>}/>
                    <Route path={'/trip'} element={<WithRoute component={<Day7/>}/>}/>
                    <Route path={'/match'} element={<WithRoute component={<Day8/>}/>}/>
                    <Route path={'/nest'} element={<WithRoute component={<Day9/>}/>}/>
                    <Route path={'/crabby'} element={<WithRoute component={<Day10/>}/>}/>
                    <Route path={'/eagle'} element={<WithRoute component={<Day11/>}/>}/>
                    <Route path={'/forget'} element={<WithRoute component={<Day12/>}/>}/>
                    <Route path={'/kind'} element={<WithRoute component={<Day13/>}/>}/>
                    <Route path={'/empty'} element={<WithRoute component={<Day14/>}/>}/>
                    <Route path={'/armadillo'} element={<WithRoute component={<Day15/>}/>}/>
                    <Route path={'/fowl'} element={<WithRoute component={<Day16/>}/>}/>
                    <Route path={'/salty'} element={<WithRoute component={<Day17/>}/>}/>
                    <Route path={'/scrape'} element={<WithRoute component={<Day18/>}/>}/>
                    <Route path={'/ponytail'} element={<WithRoute component={<Day19/>}/>}/>
                    <Route path={'/bluff'} element={<WithRoute component={<Day20/>}/>}/>
                    <Route path={'/baddog'} element={<WithRoute component={<Day21/>}/>}/>
                    <Route path={'/heist'} element={<WithRoute component={<Day22/>}/>}/>
                    <Route path={'/booger'} element={<WithRoute component={<Day23/>}/>}/>
                    <Route path={'/fairy'} element={<WithRoute component={<Day24/>}/>}/>
                    <Route path={'/tempting'} element={<WithRoute component={<Day25/>}/>}/>
                    <Route path={'/ego'} element={<WithRoute component={<Day26/>}/>}/>
                    <Route path={'/snack'} element={<WithRoute component={<Day27/>}/>}/>
                    <Route path={'/camping'} element={<WithRoute component={<Day28/>}/>}/>
                    <Route path={'/uhoh'} element={<WithRoute component={<Day29/>}/>}/>
                </>}
                <Route path={'/'} element={<Home isMobile={isMobile}/>}/>
                <Route path={'/*'} element={<Navigate to={'/'}/>}/>
            </Routes>
        </HashRouter>
    </div>
}

const WithRoute = ({component}) => {

    const navigate = useNavigate();
    return <>
        <img src={homeImg} alt="" id="home" width={60} onClick={() => navigate('/')}/>
        {component}
    </>
}

export default App;
