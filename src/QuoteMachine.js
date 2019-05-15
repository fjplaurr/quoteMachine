import React from 'react';

class QuoteMachine extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            quote: '',
            author: '',
            color: 'rgb(0, 30, 40)'
        }
        this.changeColor = this.changeColor.bind(this);
        this.quote = this.getRandomQUote.bind(this);
    }

    componentDidMount(){
        this.getRandomQUote();
    }

    componentDidUpdate(){ //Need this function to avoid async trouble due to state's updates
        document.getElementById('quote-box').style.backgroundColor= this.state.color;
    }

    render(){
        return(
            <div id="mainDiv">
                <h3 id="text" style={{color: this.state.color}}>
                    {this.state.quote}
                </h3>
                <h4 id="author" style={{color: this.state.color}}>
                    - {this.state.author}
                </h4>
                <div id="divButtons">
                <button id="new-quote" class="butt" style={{backgroundColor:this.state.color}}
                    onClick = {()=>
                        {
                            this.getRandomQUote();
                            this.changeColor();
                        }
                    }
                >
                    New quote
                </button>
                <a id="tweet-quote" target="_blank" rel="noopener noreferrer" href="http://twitter.com/intent/tweet">
                    <button class ="butt" style={{backgroundColor:this.state.color}}>
                        Tweet <i class="fab fa-twitter"></i>
                    </button>
                </a>
                </div>
                <br/>             
            </div>
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
              }else{
                  return console.log('No quote was found')
              }
        })
    }

    changeColor = () => {
        var letters = '0123456789ABCDEF';
	    var colory = '#';
	    for (var i = 0; i < 6; i++ ) {
		  colory += letters[Math.round(Math.random() * 16)];
	    }
        this.setState(
            {color: colory} 
        )   
    }
}
 
export default QuoteMachine;