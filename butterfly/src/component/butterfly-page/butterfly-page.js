import ButterflyImage from './component/butterfly-image/butterfly-image';
import Heading from './component/heading/heading';
import _ from 'lodash';

class ButterflyPage {
    render() {
        const heading = new Heading();
        heading.render(_.upperFirst('butterfly'));  

        const butterflyImage = new ButterflyImage();
        butterflyImage.render(); 
    }
}

export default ButterflyImage;
// same as hello-world-page
 