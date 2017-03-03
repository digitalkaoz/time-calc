import Moment from 'moment';
import durationFormat from 'moment-duration-format';

export default class Formatter {

    convertTime(time) {
        return Moment(time, 'HH:mm');
    }

    convertDuration(duration) {
        return Moment.duration(duration);
    }

    convertMilliSeconds(seconds) {
        return Moment.duration(seconds / 1000, 'seconds').format('HH:mm', { trim: false });
    }
}
