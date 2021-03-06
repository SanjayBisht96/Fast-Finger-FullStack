import { useEffect, useState } from "react";
import { wordLengthLimit } from '../utils/consts';
import Router from 'next/router';
import { errorUrl } from '../utils/consts';
import { getRandomWord } from '../utils/callApi';

const getWord = async (diffLevel) => {
    if(typeof diffLevel !== undefined && diffLevel !== ''){
      if(Array.isArray(wordLengthLimit[diffLevel])){
        const [minLength, maxLength] = wordLengthLimit[diffLevel];
        let randomWord = await getRandomWord(diffLevel);
        if(!randomWord){
          Router.push(errorUrl);
        }
        while(randomWord.length < minLength || randomWord.length > maxLength){
          randomWord = await getRandomWord(diffLevel);
        }
        return randomWord.toUpperCase();
      }
    }
    return '';
  }


function useWord(diffLevel) {
    const [word, setWord] = useState('');
    const [input, setInput] = useState('');

    useEffect(() => {
        if (word === input) {
          async function getWordSync(){
            const randomWord = await getWord(diffLevel);
            setWord(randomWord);
            setInput('');
          }
          getWordSync();
        }
    }, [word,input])
    return { word, setWord, input, setInput  }
}
export default useWord;