import './Day17.css';

export const Day17 = () => {


    const move = ev => {
        const container = document.getElementById('container17');
        let img_index = 1 +Math.floor(16 * (ev.clientX - container.getBoundingClientRect().left) / container.offsetWidth);
        if(img_index < 10)
            img_index = '0' + img_index;
        container.style.setProperty('background-image', `url("${process.env.PUBLIC_URL}/day17/ezgif-frame-0${img_index}.jpg")`);
    }

    return <div id="day17">

        <div id="container17" onMouseMove={move}>

        </div>
    </div>
}
