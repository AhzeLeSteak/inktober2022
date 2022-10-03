import './Home.css'

function Home(){

    const themes = [
        'gargoyle',
        'scurry',
        'test',
        'test',
        'test',
        'test',
        'test',
        'test',
        'test',
        'test',
    ];

    return <div className="grid">
        {themes.map(theme =>
            <div className="card">
                {theme}
            </div>
        )}
    </div>
}

export default Home;
