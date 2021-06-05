import "./Start.css";
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom';

const Start = () => {
    return (
        <div className="startmaindiv">
            <header>HAMSTERWARS</header>
            <p>Välcomen till HAMSTERWARS där vi sätter då oskyldiga gnaggare i en strid på ära och kändiskap klicka på Battle för att starta. <br/>
            Annars kan du alltid titta på Galleriet istället dör du kan dömma dessa djur till den mörka avgrunden.... eller bara titta på deras profiler <br/>
            Du gör detta genom att klicka på Gallery och sedn klicka på deras namn för att få ett störe fönster med mer information.</p>
            <Link to="/Battle"> Battle </Link>
            <Link to="/Gallery"> Gallery </Link>
        </div>
    )

}

export default Start;
