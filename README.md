# Time Calculator

https://time-calc.digitalkaoz.net

## Whats Inside

> all the fancy stuff out there ;)

* react (unejected react-app)
* redux
* service-worker (works perfectly as PWA)
* sass
* totally educational koa2 server side app (as the app works perfect without backend)

## Features

* timetable is written to localstorage on each *save*
* timetable can be downloaded as *csv*
* pwa - yeah service worker
* responsive mdl

## Installation

```bash
$ yarn install
```

## Commands

```bash
$ yarn cs       # fix codings standards
$ yarn dev      # starts the dev environment
$ yarn start    # production build running through koa2
```

## TODO

* datepicker for day to track
* fix form reset (reload all the things)
* Revert to mdl upstream once https://github.com/google/material-design-lite/pull/5054 is merged