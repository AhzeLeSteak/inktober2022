import './Home.css'
import Logo from './inktober_logo.png';
import {useNavigate} from "react-router-dom";

function Home({isMobile}){

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
    themes.length = 10;


    return <div>
        <img src={Logo} alt="Inktober2022" height={160}/>
        <div className="grid" style={{gridTemplateColumns: '1fr'}}>
            {isMobile ?
                <>
                    <div className="card"></div>
                    <div className="card"></div>
                    <div className="card"></div>
                    <div className="card" style={{textAlign: 'center'}}>
                        Please use a PC or a larger device
                    </div>
                </>
                :
                themes.map((theme, j) =>
                    <div key={j} className="card" onClick={() => navigate(theme)}>
                        {theme && <>{i++}.{theme}</>}
                    </div>
                )

            }
        </div>
    </div>
}

export default Home;
