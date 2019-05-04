import React, {Component} from 'react';
import { unwatchFile } from 'fs';

class QuoteMachine extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            quote: '',
            author: '',
            color: ''
        }
    }

    componentDidMount(){
        this.getRandomQUote();
    }

    render(){
        return(
            <React.Fragment>
                    <h3 id="text">
                        {this.state.quote}
                    </h3>
                    <h4 id="author">
                        - {this.state.author}
                    </h4>
                <button type="button" class="btn btn-info" id="new-quote" onClick = {this.getRandomQUote}>
                    Get a random quote
                </button>
                <a id="tweet-quote" target="_blank" href="http://twitter.com/intent/tweet">
                    <button type="button" class="btn btn-info">
                        Share on Twitter
                    </button>
                </a>
                <br/>
                
            </React.Fragment>
        )
    }
    
    getRandomQUote = () => {
        fetch('https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json')
         .then(response => response.json())
          .then(data => {
              if(data.quotes){
                  let randomQuote = data.quotes[Math.floor(Math.random()*data.quotes.length)];
                  this.setState(
                      {
                          quote: randomQuote.quote,
                          author: randomQuote.author
                      }
                  )
                  console.log(this.state);
              }else{
                  return console.log('No quote was found')
              }
        }).then(this.changeColor())
    }

    changeColor = () => {
        

    }
}
 


export default QuoteMachine;