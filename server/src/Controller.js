
export default class Controller {
  calculator;

  constructor (calculator) {
    this.calculator = calculator
  }

  async calculate (ctx, next) {
    ctx.body = {
      start: ctx.query.start,
      end: ctx.query.end,
      break: ctx.query.break,
      duration: this.calculator.calc(ctx.query['start'], ctx.query['end'], ctx.query['break'] || null)
    }

    next()
  }
}
