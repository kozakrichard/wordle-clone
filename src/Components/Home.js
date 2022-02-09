import React, {useState} from 'react';
import axios from 'axios';
import './Home.css';

function Home () {

    let [currWord, setCurrWord] = useState("FAVOR ");
    let [wordLength, setWordLength] = useState(5);
    let [userAnswer, setUserAnswer] = useState("");
    let [validateAnswer, setValidateAnswer] = useState(null);

    const decrease = () => {
        if (wordLength > 4)
            setWordLength(wordLength - 1 )
    }

    const increase = () => {
        if (wordLength < 10)
            setWordLength(wordLength + 1)
    }

    function makeGetRequest(path) {
        return new Promise(function (resolve, reject) {
            axios.get(path).then(
                (response) => {
                    var result = response;
                    console.log('Processing Request');
                    resolve(result);
                },
                    (error) => {
                    reject(error);
                }
            );
        });
    }

    const fetchWord = () => {
        async function getWord() {
            let response = await makeGetRequest('https://random-word-api.herokuapp.com/word?number=100')
            //console.log(response.data);
            let wordNum = 0
            while (response.data[wordNum].length !== wordLength)
            {
                wordNum++;
            }
            setCurrWord(response.data[wordNum].toUpperCase() + " ");
            //console.log(wordNum);

        }
        getWord();
    }

    let checkWord = () => {
    }

    const handleInput = (event) => {
        setUserAnswer(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(userAnswer);
    }


    return (
        <div className = "clone-home">
            <div className = "controls"> 
                {currWord }
                Length = {wordLength}
                <button onClick = {increase}>
                    Increase Length
                </button>
                <button onClick = {decrease}>
                    Decrease Length
                </button>
                <button onClick = {fetchWord}>
                    Get New Word
                </button>
            </div>
            <form onSubmit = {handleSubmit} className = "guessbox">
                <input type = "text" autoComplete = "off" value = {userAnswer} onChange = {handleInput} maxLength = {wordLength} id = "text"/>
                <button type = "submit" onSubmit = {() => handleSubmit} className = "submit">Submit</button>
            </form>
            
        </div>
        
    );
    
}

export default Home;