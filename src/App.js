import './App.css';
import './fonts/sonic-the-hedgehog-2-hud-font.ttf'
import Day2 from "./pages/Day2/Day2";
import Day1 from "./pages/Day1/Day1";
import {HashRouter, Navigate, Route, Routes} from "react-router-dom";
import Home from "./pages/Home/Home";
import {Day3} from "./pages/Day3/Day3";
import {Day4} from "./pages/Day4/Day4";


function App() {



    return <div className="App">
        <div className="background"></div>
        <HashRouter>
            <Routes>
                <Route path={'/'} element={<Home/>}/>
                <Route path={'/gargoyle'} element={<Day1/>}/>
                <Route path={'/scurry'} element={<Day2/>}/>
                <Route path={'/bat'} element={<Day3/>}/>
                <Route path={'/scallop'} element={<Day4/>}/>
                <Route path={'/*'} element={<Navigate to={'/'}/>}/>
            </Routes>
        </HashRouter>
    </div>
}

export default App;
