import Router from 'koa-router';
import Boom from 'boom';
import Container from './services/Container';
import validator, {
    object,
    string,
} from 'koa-context-validator';

const router = new Router();
const controller = Container.container.controller;

const timePattern = /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;

router.get('calculate', '/calculate', validator({
    query: object().keys({
        start: string().required().regex(timePattern),
        end: string().required().regex(timePattern),
        break: string().optional().regex(timePattern)
    })
}), controller.calculate.bind(controller));

export default {
    routing : router.routes(),
    allowed : router.allowedMethods({
        throw: true,
        notImplemented: () => new Boom.notImplemented(),
        methodNotAllowed: () => new Boom.methodNotAllowed()
    })
}