import React from 'react';

export default function DisplayMsg({inputText}){
    let styling={
        color : 'red',
    }
    return <p style={styling}>{inputText}</p>;
}