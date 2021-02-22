import Butterfly from './butterfly.jpg';
import altTxt from './altTxt.txt';

function addImage() {
    const img = document.createElement('img');
    img.alt = altTxt;   // teach webpack how to add txt file
    img.width = 300;
    img.src = Butterfly;
    const body = document.querySelector('body');
    body.appendChild(img);
}

export default addImage;