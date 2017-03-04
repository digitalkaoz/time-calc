import Bottle from 'bottlejs';
import Formatter from './Formatter';
import Calculator from './Calculator';
import Controller from '../server/Controller';

const b = new Bottle();

b.service('formatter', () => {
    return new Formatter();
});

b.service('calculator', () => {
    return new Calculator(b.container.formatter);
});

b.service('controller', () => {
    return new Controller(b.container.calculator, b.container.formatter);
});

export default b;