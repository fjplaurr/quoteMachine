import React from 'react';

class QuoteMachine extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            quote: '',
            author: '',
            color: ''
        }
        this.changeColor = this.changeColor.bind(this);
        this.getRandomQUote = this.getRandomQUote.bind(this);
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
                <button type="button" className="btn btn-info" id="new-quote"
                    onClick = {()=>
                        {this.getRandomQUote();
                            this.changeColor();
                        }}
                >
                    Get a random quote
                </button>
                <a id="tweet-quote" target="_blank" rel="noopener noreferrer" href="http://twitter.com/intent/tweet">
                    <button type="button" className="btn btn-info">
                   
                    Tweet <i class="fab fa-twitter"></i>
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
              }else{
                  return console.log('No quote was found')
              }
        }).then(this.changeColor)
    }

    changeColor = () => {
        var letters = '0123456789ABCDEF';
	    var colory = '#';
	    for (var i = 0; i < 6; i++ ) {
		  colory += letters[Math.floor(Math.random() * 16)];
	    }
        this.setState(
            {
            color: colory
            }
        )
        document.body.style.backgroundColor=this.state.color;


    }


}
 
export default QuoteMachine;