import './Day28.css'

export const Day28 = () => {

    function click(ev) {
        const {style} = document.getElementById('container28');
        style.setProperty('--lantern-x', (ev.clientX-90)+'px');
        style.setProperty('--lantern-y', ev.clientY+'px');
    }

    return <div id="container28" onClick={click}>
        <img src={`${process.env.PUBLIC_URL}/day28/lantern.png`} alt="" id="lantern"/>
        <div id="layer"></div>
    </div>
}