import store from 'store/dist/store.modern'
import Moment from 'moment'

import {ADD_TIME, LOAD_TIMES, CLEAR_TIMES, DELETE_TIME, DOWNLOAD_TIMES} from '../actions/actions'

export default class Timelist {

    static dispatch(state = { times: [] }, action) {
        if (!Timelist.instance) {
            Timelist.instance = new Timelist();
        }

        return Timelist.instance.process(state, action);
    }

    process(state = { times: [] }, action) {
        this.state = state;
        this.times = state.times || [];
        this.action = action;

        switch (action.type) {
            case LOAD_TIMES: return this.loadTimes();
            case ADD_TIME: return this.addTime();
            case CLEAR_TIMES: return this.clearTimes();
            case DELETE_TIME: return this.deleteTime();
            case DOWNLOAD_TIMES: return this.downloadTimes();
            default: return state;
        }
    }

    addTime() {
        let times = this.times;

        if (this.action.index !== undefined) {
            times[this.action.index] = this.action.time
        } else {
            times = [...this.times, this.action.time]
        }
        times = this.sortTimes(times);

        store.set('times', times)

        return { ...this.state, times: times };
    }

    sortTimes(times) {
        times = times.sort((a, b) => {
            a = Moment(a.date, 'L')
            b = Moment(b.date, 'L')

            if (a.isBefore(b)) {
                return -1
            }

            if (a.isAfter(b)) {
                return 1
            }
            return 0
        })
        return times;
    }

    loadTimes() {
        return {...this.state, times: store.get('times') || []}
    }

    clearTimes() {
        store.set('times', [])

        return {...this.state, times: []};
    }

    deleteTime() {
        const times = this.times.filter(t => t !== this.action.time)
        store.set('times', times)

        return {...this.state, times: times};
    }

    downloadTimes() {
        let lines = []

        this.times.forEach(function (line, index) {
            let lineData = []
            let headers = []
            for (let key in line) {
                if (line.hasOwnProperty(key)) {
                    lineData.push(line[key])
                }
                if (index === 0 && line.hasOwnProperty(key)) {
                    headers.push(key)
                }
            }

            if (index === 0) {
                lines.push('data:text/csv;charset=utf-8,' + headers.join(','))
            }
            lines.push(lineData.join(','))
        })
        const csvContent = lines.join('\n')
        window.open(encodeURI(csvContent))

        return {...this.state}
    }
}
