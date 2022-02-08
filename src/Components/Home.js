import React, {useState} from 'react';
import axios from 'axios';

function Home () {

    let [currWord, setCurrWord] = useState("Favor ");
    let [wordLength, setWordLength] = useState(5);

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
            setCurrWord(response.data[wordNum]);
            //console.log(wordNum);

        }
        getWord();
    }


    return (
        <div className = "home"> 
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
    );
    
}

export default Home;