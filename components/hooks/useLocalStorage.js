import { useState } from "react";

function getFromLocalStorage(key, defaultValue) {
    const savedValue = localStorage.getItem(key);
    if(savedValue){
        return JSON.parse(savedValue);
    }else {
        return defaultValue;
    }
}

function setValueToLocalStorage(key, value){
    localStorage.setItem(key, JSON.stringify(value));
}

const useLocalStorage = (key, defaultValue = null) => {
    const initalStateFn = ()=>{
        return getFromLocalStorage(key, defaultValue);
    }
    const [state, setState] = useState(initalStateFn);
    const setStateCustom = (v2) =>{
        let finalValue = v2;
        if (typeof finalValue === 'function') {
            finalValue = v2(state);
        }
        setValueToLocalStorage(key, finalValue);
        setState(finalValue)
    }
    return [state, setStateCustom]
}

export default useLocalStorage;