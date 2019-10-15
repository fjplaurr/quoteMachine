import React from 'react';

class QuoteMachine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quote: '',
      author: '',
      color: 'rgb(0, 30, 40)',
    };
    this.changeColor = this.changeColor.bind(this);
    this.quote = this.getRandomQUote.bind(this);
  }

  componentDidMount() {
    this.getRandomQUote();
  }

  componentDidUpdate() {
    // Need this function to avoid async trouble due to state's updates
    const { color } = this.state;
    document.getElementById('quote-box').style.backgroundColor = color;
  }

  getRandomQUote() {
    fetch('https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json')
      .then((response) => response.json())
      .then((data) => {
        if (data.quotes) {
          const randomQuote = data.quotes[Math.floor(Math.random() * data.quotes.length)];
          this.setState(
            {
              quote: randomQuote.quote,
              author: randomQuote.author,
            },
          );
        }
      });
  }

  changeColor() {
    const letters = '0123456789ABCDEF';
    let colory = '#';
    for (let i = 0; i < 6; i += 1) {
      colory += letters[Math.round(Math.random() * 16)];
    }
    this.setState(
      { color: colory },
    );
  }

  render() {
    const { color, author, quote } = this.state;
    return (
      <div id="mainDiv">
        <h3
          id="text"
          style={{ color }}
        >
          {quote}
        </h3>
        <h4
          id="author"
          style={{ color }}
        >
          -
          {author}
        </h4>
        <div
          id="divButtons"
        >
          <button
            type="button"
            id="new-quote"
            className="butt"
            style={{ backgroundColor: color }}
            onClick={() => {
              this.getRandomQUote();
              this.changeColor();
            }}
          >
            New quote
          </button>
          <a
            id="tweet-quote"
            target="_blank"
            rel="noopener noreferrer"
            href="http://twitter.com/intent/tweet"
          >
            <button
              type="button"
              className="butt"
              style={{ backgroundColor: color }}
            >
              Tweet
              <i
                className="fab fa-twitter"
              />
            </button>
          </a>
        </div>
        <br />
      </div>
    );
  }
}

export default QuoteMachine;
