import './heading.scss';

class Heading {
    render(message) {
        const h1 = document.createElement('h1');
        const body = document.querySelector('body');
        h1.innerHTML = message;  
        body.appendChild(h1);
    }
}

export default Heading;