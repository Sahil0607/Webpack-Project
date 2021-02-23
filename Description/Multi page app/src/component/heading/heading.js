import './heading.scss';
// import './heading.css';

class Heading {
    render(message) {
        const h1 = document.createElement('h1');
        const body = document.querySelector('body');
        h1.innerHTML = message;   // Try lodash for uppercase
        body.appendChild(h1);
    }
}

export default Heading;