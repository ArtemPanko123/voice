import React, {useState} from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const locales =[
    {name: 'English', value: 'en_US'},
    {name: 'Thai', value: 'th_TH'},
    {name: 'Ukrainian', value: 'uk_UA'},
    {name: 'Czech', value: 'cs_CZ'},
    {name: 'Greek', value: 'el_GR'},
    {name: 'Spanish', value: 'es_ES'},
]

const Dictaphone = () => {
    const [locale, setLocale] = useState(locales[0].value);

    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition();

    if (!browserSupportsSpeechRecognition) {
        return <span>Browser doesn't support speech recognition.</span>;
    }

    const handleLocaleChange = (event) => {
        setLocale(event.target.value);
    }

    return (
        <div>
            <p>Microphone: {listening ? 'on' : 'off'}</p>
            <select value={locale} onChange={handleLocaleChange}>
                {locales.map((locale, index) => (
                    <option key={index} value={locale.value}>{locale.name}</option>
                ))}
            </select>
            <button onClick={() => {SpeechRecognition.startListening({ language: locale })}}>Start</button>
            <button onClick={SpeechRecognition.stopListening}>Stop</button>
            <button onClick={resetTranscript}>Reset</button>
            <p>{transcript}</p>
        </div>
    );
};

function App() {
    return (
        <Dictaphone/>
    );
}

export default App;
