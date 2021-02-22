import HelloWorldButton from './component/hello-world-button/hello-world-button';
import Heading from './component/heading/heading';

const heading = new Heading();
heading.render();

const helloWorldButton = new HelloWorldButton();
helloWorldButton.render();   // invoke render method so create button