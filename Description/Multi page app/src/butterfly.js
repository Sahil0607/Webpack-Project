import ButterflyImage from './component/butterfly-image/butterfly-image';
import Heading from './component/heading/heading';
import _ from 'lodash';

const heading = new Heading();
heading.render(_.upperFirst('butterfly'));  // Make first letter uppercase

const butterflyImage = new ButterflyImage();
butterflyImage.render();  