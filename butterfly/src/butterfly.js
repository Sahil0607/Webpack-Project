import ButterflyImage from './component/butterfly-image/butterfly-image';
import Heading from './component/heading/heading';
import _ from 'lodash';

const heading = new Heading();
heading.render(_.upperFirst('butterfly'));  

const butterflyImage = new ButterflyImage();
butterflyImage.render();  

// No longer needed
// import('HelloWorldApp/HelloWorldButton') 
//     .then(HelloWorldButtonModule => {
//         const HelloWorldButton = HelloWorldButtonModule.default;
//         const helloWorldButton =  new HelloWorldButton();
//         helloWorldButton.render();
//     });