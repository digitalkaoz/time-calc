import fetch from 'isomorphic-fetch'
import Moment from 'moment';
// eslint-disable-next-line
import durationFormat from 'moment-duration-format';

export const CALCULATE = 'CALCULATE'

const BACKEND = '//localhost:3001';

export function fetchCalculation(form) {

    return (dispatch) => {

        if (navigator.onLine) {
            const query = Object.keys(form.value).map(k => {
                if (form.value[k]) {
                    return `${encodeURIComponent(k)}=${encodeURIComponent(form.value[k])}`
                }

                return '';
            }).join('&');
            fetch(BACKEND + '/calculate?' + query)
                .then(response => response.json())
                .then((json) => {
                    dispatch({
                        type: CALCULATE,
                        form: form,
                        response: json
                    });
                })
        } else {
            //mh sadly we cant use the shared stuff because of es6 and we wont eject the react-app to fix the webpack config
            //so basically this is just copy/pasted

            const breakDuration = Moment.duration(form.value.break);
            const startDate = new Moment(form.value.start, 'HH:mm');
            const endDate = new Moment(form.value.end, 'HH:mm');
            const milliseconds = endDate.subtract(breakDuration).diff(startDate);
            const duration =  Moment.duration(milliseconds / 1000, 'seconds').format('HH:mm', { trim: false });

            dispatch({
                type: CALCULATE,
                form: form,
                response: {
                    start: startDate,
                    end: endDate,
                    break: breakDuration,
                    duration: duration
                }
            })
        }
    }
}