import React, {Component} from 'react';
import { unwatchFile } from 'fs';
import '/.QuoteMachine.css';

class QuoteMachine extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            quote: '',
            hasQuote: false
        }
        this.END_POINT = 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json'
    }

    render(){
        return(
            <React.Fragment>
                <h1>Pruebaa</h1>
                <button onClick = {this.getRandomQUote}>
                    Click me to get a random quote
                </button> 
                <br/>
                {this.state.hasQuote === false ? 'There is not a quote yet' : this.state.quote}
            </React.Fragment>
        )
    }
    
    getRandomQUote = () => {
        fetch(this.END_POINT)
         .then(response => response.json())
          .then(data => {
              if(data.quotes){
                  let randomQuote = data.quotes[Math.floor(Math.random()*data.quotes.length)];
                  this.setState(
                      {
                          hasQuote: true,
                          quote: randomQuote.quote
                      }
                  )
                  console.log(this.state);
              }else{
                  return console.log('No quote was found')
              }
        })
    }
}
 


export default QuoteMachine;