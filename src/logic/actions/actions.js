import fetch from 'isomorphic-fetch'

export const CALCULATE = 'CALCULATE'

const BACKEND = '//localhost:3001';

export function fetchCalculation(form) {

    return (dispatch) => {
        //validate so ask backend if network available, otherwise calculate on our own
        let query = Object.keys(form.value).map(k => `${encodeURIComponent(k)}=${encodeURIComponent(form.value[k])}`).join('&');

        return fetch(BACKEND+'/calculate?'+query)
            .then(response => response.json())
            .then((json) => {
                dispatch({
                    type: CALCULATE,
                    form: form,
                    response: json
                });
            })
    }
}