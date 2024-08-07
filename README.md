[![Build Status](https://travis-ci.com/kavros/UI.Tools.svg?branch=master)](https://travis-ci.com/kavros/UI.Tools)

# AppSuite

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.13.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Build and deploy project locally

- Run `npm run build:prod`
- Install http-server globaly `npm install http-server -g`
- Run scripts to create the SQL database.
- Run `mvn package`
- Copy and paste
  - the jar file
  - fonts folder inside dist.
- Run `dotnet publish -c Release -r win-x64`
- Copy `publish` folder and paste it inside app-suite folder:+

## Run project locally

- Set local ip to `192.168.1.249`
- Run `runApp.bat`
