# JungleSocks tests

## Prerequisites:
Node.js and Java already installed. First we need to to start a selenium server that executes all selenium commands within the browser. To do so create a test folder:

## Setup:

 1. Create a simple test folder 
 2. Download latest selenium standalone server
 3. Download the latest version geckodriver for your environment and unpack it in your project directory
 4. Start selenium standalone server
```
$ java -jar -Dwebdriver.gecko.driver=./geckodriver selenium-server-standalone-3.5.3.jar
```
 5. Download WebdriverIO
```
npm install webdriverio
```
## Run:
Start Selenium:
```
npm run selenium
```
Run Tests:
```
npm test
```
