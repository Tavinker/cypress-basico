## cypress-basico-v2
Sample project for the basic course of the Talking About Testing online school.

## Pre-requirements
It is required to have Node.js and npm installed to run this project.
> I used versions `v20.16.0` and `10.8.1` of Node.js and npm, respectively. I suggest you use the same or later versions.<br>
> I'm using Cypress `9.5.1` version. For this project I recommend you to use the same as me due the specific funtionalities used here. 

## Installation
Run `npm install` (or `npm i` for the short version) to install the dev dependencies.

## Tests
You can run the tests simulating a desktop or mobile viewport.

### Desktop and Mobile
Run `npm test` (or `npm t` for the short version) to run the test in headless mode.<br>
--> You can run the test in different resolution view/viewport using the follow custom commands:<br>
● `npm run cy:run:1440:resolutionView` for 1440 desktop view<br>
● `npm run cy:run:1133:resolutionView` for 1133 desktop view<br>
● `npm run cy:run:960:resolutionView` for 960 desktop/tablet view<br>
● `npm run cy:run:744:resolutionView` for 744 desktop/tablet view<br>

Run `npm run cy:open` to open Cypress in interactive mode<br>
--> You can run the test in different resolution view/viewport using the follow custom commands:<br>
● `npm run cy:open:1440:resolutionView` for 1440 desktop view<br>
● `npm run cy:open:1133:resolutionView` for 1133 desktop view<br>
● `npm run cy:open:960:resolutionView` for 960 desktop/tablet view<br>
● `npm run cy:open:744:resolutionView` for 744 desktop/tablet view<br>