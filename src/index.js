import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import logo from './logo.svg';
import axios from 'axios'

class QuoteMachine extends React.Component {
  constructor(props) {
      super(props);
      //Inicializo el state
      this.state = {
          quote: '',
          author: '',
          number: ''
      }
  }

  //Al iniciar cargo una frase
  componentDidMount() {
    this.getQuote()
  }

  //Funcion para obtener una frase
  getQuote() {
    let url = 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json'

    axios.get(url)
       .then(res => {
          let data = res.data.quotes //Listado de frases
          let quoteNum = Math.floor(Math.random() * data.length) //Indice de la frase a mostrar
          let randomQuote = data[quoteNum] //Frase actual

          //actualizo el state con la frase y el autor actual
          this.setState({ 
             quote: randomQuote['quote'],
             author: randomQuote['author'],
             number: quoteNum
          })
       })
 }

//Una frase nueva ?? ver mejor solucion
 getNewQuote = () => {this.getQuote()}

 //Funcion para obtener color de fondo random, en formato RGB
 randomColor() {
  const color = `rgb(
    ${Math.floor(Math.random() * 155)},
    ${Math.floor(Math.random() * 155)},
    ${Math.floor(Math.random() * 155)})`;
  return color;
}

  render() {
    const { quote, author, number } = this.state
    const color = this.randomColor();
    return (
      //Div contenedor
      <div id="wrapper" style={{backgroundColor: color}}>
        <h1 id="title"> APP Frases Aleatorias </h1>
      {/* Tarjeta de frases */}
        <div id="quote-box">
          <div id="headerCard"> 
            <h3>Frase:</h3>
            <p id="text">{quote}</p>
            <p id="author">Autor: {author}</p>
          </div>

          <div id="footerCard">
            <TwitterShare quote={quote} author={author} />
            {/* Contador de frase para luego agregar 3 opciones de interaccion: Aleatorio, siguiente o anterior */}
            <p id="number">Frase N°{number}</p>
            <button id="new-quote" className="button" onClick={this.getNewQuote}>Generar Frase</button>       
          </div>
        </div>
      {/* Pie de pagina */}
        <div id="footer">
          <img src={logo} className="App-logo" alt="logo" />
          <p>Made with React!</p>
        </div>

      </div>
    )
  }
}

//Boton reutilizable para luego realizar por ej share on FB o similar. (Utiliza Font Awesome para el icon)
const TwitterShare = ({ quote, author }) => {
  return (
     <React.Fragment>
        <a href={`https://twitter.com/intent/tweet?text=${quote} Autor: ${author}`} target="_blank" title="Share on twitter" id='tweet-quote' rel="noreferrer">
           <i className="fab fa-twitter twitter-icon" /> Share
        </a>
     </React.Fragment>
  )
}

ReactDOM.render(<QuoteMachine />, document.getElementById('root'));
