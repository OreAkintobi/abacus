# Abacus React Native Mobile App

## How to run this project

1. This project runs and is built on [Expo CLI](https://docs.expo.dev/ 'Expo CLI'). If you do not have it on your computer, please run `npm install -g expo-cli` or `yarn add global expo-cli` to add it globally. If using a Mac, place `sudo ` before one of the above commands to install the CLI as a superuser.
2. Install the Expo Go App on your [Android](https://play.google.com/store/apps/details?id=host.exp.exponent 'Android') or [iOS](https://apps.apple.com/us/app/expo-go/id982107779 'iOS') mobile device.
3. clone the repo and run `cd abacus-app && yarn` && then `cd abacus-server && yarn` (EACH from project root folder) to install dependencies.
4. run `yarn dev` in `abacus-server` to start the mock backend server.
5. run `expo start` in `abacus-app` to start Expo server.
6. use your camera (on iOS) or the Expo Go app itself (on Android) to scan the QR code in your terminal or web page and install the Abacus Test React Native Mobile App on your phone.
7. This project can also be run on the web browser from the Expo server. **Screenshots** below.

---

## On My Experience with the Application

1. In its current form, it is not really ideal to initially GROUP the data by INDIVIDUAL dates if the user cannot filter out what s/he does not want to see. This is a problem because the data is not indexed by date, and the user cannot filter by date. I already grouped the data by year and month instead of just full dates. Given time, I would sort present the user with a single list already sorted by date and incorporate the ability for the user to enter a date range for the data s/he would want to see.
2. The user should be able to filter the data by a unique value column that is already exposed to her/him. In the case of financial data, a transaction reference should suffice.
3. Data becomes less performant on some devices as the list gets larger in size. This is because the React Native Flatlist component cannot handle transitions smoothly with much larger lists of items. I limited mock data to return just 50 items for purpose of this demo. Ideally, would tweak flatlist render props or replace with more performant component like [react-native-biglist](https://www.npmjs.com/package/react-native-big-list) or [recyclerlistview](https://www.npmjs.com/package/recyclerlistview).
4. Given more time, I would do the following:
   - write some tests (tests to ensure that each part of the app renders properly, as well as tests for the API and the util functions.
   - use [styled-components](https://styled-components.com/) to properly create a theming structure and more robust way to expose my screens and components to colors, fonts, et cetera.
   - if we were for some reason wedded to presenting data in groups of individual dates, then I would present each group in an accordion component, so the user doesn't have to endlessly scroll.
5. **Screenshots** of the project on iOS as well as web platforms are below.

![iOS Image](/1.png?raw=true 'iOS Image')
![iOS Image 2](/2.png?raw=true 'iOS Image 2')
![Web Image](/3.png?raw=true 'Web Image')
