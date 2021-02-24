// import './hello-world-button.css';
import './hello-world-button.scss';

class HelloWorldButton {
    // Webpack does not know how to deal with modern js(ES6) syntex. We have to teach them.
    buttonCssClass = 'hello-world-button';  

    render() {    
        const button = document.createElement('button');
        button.innerHTML = 'Hello World';
        button.classList.add(this.buttonCssClass);  // Add css to button
        const body = document.querySelector('body');
        button.onclick = function() {
            const p = document.createElement('p');
            p.innerHTML = 'Hello World';
            p.classList.add('hello-world-text');
            body.appendChild(p);
        }
        body.appendChild(button);
    }
}

export default HelloWorldButton;


// Webpack does not know how to import css. 
// Loader can teach webpack how to add css, scss and anyother files