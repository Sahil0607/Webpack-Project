import HelloWorldButton from './component/hello-world-button/hello-world-button';
import Heading from './component/heading/heading';
import _ from 'lodash';

const heading = new Heading();
heading.render(_.upperFirst('hello world')); 

const helloWorldButton = new HelloWorldButton();
helloWorldButton.render();   


if (process.env.NODE_ENV == 'production') {
    console.log('This is production mode');
} else if(process.env.NODE_ENV == 'development') {
    console.log('This is development mode');
}

