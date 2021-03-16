import HelloWorldButton from '../hello-world-button/hello-world-button';
import Heading from '../heading/heading';
import _ from 'lodash';

// create class
class HelloWorldPage {
    render() {
        const heading = new Heading();
        heading.render(_.upperFirst('hello world')); 
        
        const helloWorldButton = new HelloWorldButton();
        helloWorldButton.render();  
    }
}
 
export default HelloWorldPage;

// Dont need code here
// if (process.env.NODE_ENV == 'production') {
//     console.log('This is production mode');
// } else if(process.env.NODE_ENV == 'development') {
//     console.log('This is development mode');
// }

// Export Component and move to hello-world-page and update import 

