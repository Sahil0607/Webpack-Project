import Butterfly from './butterfly.jpg';
import './butterfly-image.scss';

class ButterflyImage {
    render() {
        const img = document.createElement('img');
        img.src = Butterfly;
        img.alt = 'Butterfly Image';
        img.classList.add('butterfly-image');
        const body = document.querySelector('body');
        body.appendChild(img);
    }
}

export default ButterflyImage;