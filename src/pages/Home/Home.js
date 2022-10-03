import './Home.css'
import Logo from '../../inktober_logo.png';
import {useNavigate} from "react-router-dom";

function Home(){

    const themes = [
        'gargoyle',
        'scurry',
        'bat',
        'scallop',
        'flame',
        'bouquet',
        'trip',
        'match',
        'nest',
        'crabby',
        false,
        'eagle',
        'forget',
        'kind',
        'empty',
        'armadillo',
        'fowl',
        'salty',
        'scrape',
        'ponytail',
        'bluff',
        false,
        'bad dog',
        'heist',
        'booger',
        'fairy',
        'tempting',
        'ego',
        'snack',
        'camping',
        'uh-oh',
        'gear',
        'farm',
    ];

    const navigate = useNavigate();
    let i = 1;
    const day = 2;
    themes.length = day;

    return <div>
        <img src={Logo} alt="Inktober2022"/>
        <div className="grid">
            {themes.map((theme) =>
                <div className="card" onClick={() => navigate(theme)}>
                    {theme && <>{i++}.{theme}</>}
                </div>
            )}
        </div>
    </div>
}

export default Home;
