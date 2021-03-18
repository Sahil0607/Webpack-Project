import ButterflyImage from '../butterfly-image/butterfly-image';
import Heading from '../heading/heading';
import _ from 'lodash';

class ButterflyPage {
    render() {
        const heading = new Heading();
        heading.render(_.upperFirst('butterfly'));  

        const butterflyImage = new ButterflyImage();
        butterflyImage.render(); 
    }
}

export default ButterflyPage;
// same as hello-world-page
 