import {useNavigate} from "react-router-dom";
import home from "../../home.png";
import {useCollectionData} from "react-firebase-hooks/firestore";
import {addDoc, collection} from "firebase/firestore";
import {firestoreApp} from "../../firestore";
import './Day5.css';
import {useMemo, useState} from "react";
import '../../fonts/GIN.TTF';


export const Day5 = () => {

    const navigate = useNavigate();
    const message_collection = useMemo(() => collection(firestoreApp(), 'messages'), []);
    const [messages_data] = useCollectionData(message_collection);
    const [input, setInput] = useState('');
    const [pseudo, setPseudo] = useState('');
    const [tmp_pseudo, setTmpPseudo] = useState('');

    const messages = messages_data && messages_data.sort(({date: a}, {date: b}) => {
        return new Date(a.seconds*1000) - new Date(b.seconds*1000);
    })


    function sendMessage() {
        if(input)
            addDoc(message_collection, {
                author: pseudo,
                date: new Date(),
                msg: input
            }).then(() => setInput(''));
    }

    return <div id="day5">
        {pseudo !== '' ?
            <div id="container5">
                <input id="user-input" type="text"
                       value={input}
                       onChange={e => setInput(e.target.value)}
                       onKeyDown={e => e.key === 'Enter' && sendMessage()}/>
                <div id="messages">
                    {messages && messages.map((message, i) => {
                        const date = new Date(message.date.seconds*1000);
                        let hour = date.getHours();
                        if(hour < 10)
                            hour = '0' + hour;
                        let minute = date.getMinutes();
                        if(minute < 10)
                            hour = '0' + minute;
                        return <div key={i}>
                            [{hour}:{minute}]
                            <span className="author">{message.author}:</span>
                            <span>{message.msg}</span>
                        </div>;
                    })}
                </div>

            </div>
            : <div id="pseudo">
                <h2>Choose a name</h2>
                <input type="text" value={tmp_pseudo} onChange={e => setTmpPseudo(e.target.value)}/>
                <button onClick={() => setPseudo(tmp_pseudo)}>OK</button>
            </div>}
        <img src={home} alt="" id="home" width={60} onClick={() => navigate('/')}/>
    </div>
}

export default Day5;