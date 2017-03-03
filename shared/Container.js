import Bottle from 'bottlejs';

const b = new Bottle();

b.service('formatter', () => {
    const Formatter = require('./Formatter').default;
    return new Formatter();
});

b.service('calculator', () => {
    const Calculator = require('./Calculator').default;
    return new Calculator(b.container.formatter);
});

b.service('controller', () => {
    const Controller = require('../server/Controller').default;
    return new Controller(b.container.calculator, b.container.formatter);
});

export default b;