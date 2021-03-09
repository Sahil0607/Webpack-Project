import ButterflyImage from './component/butterfly-image/butterfly-image';
import Heading from './component/heading/heading';
import _ from 'lodash';

const heading = new Heading();
heading.render(_.upperFirst('butterfly'));  

const butterflyImage = new ButterflyImage();
butterflyImage.render();  

// Consume hello-world button which we exposed
// HelloWorldApp: name of app that specify in webpack file in ModuleFederationPlugin.
// HelloWorldButton: component that exposes from outer world. From hello-world webpack
import('HelloWorldApp/HelloWorldButton') // Remote button loaded synch.
    .then(HelloWorldButtonModule => {
        const HelloWorldButton = HelloWorldButtonModule.default;
        const helloWorldButton =  new HelloWorldButton();
        helloWorldButton.render();
    });