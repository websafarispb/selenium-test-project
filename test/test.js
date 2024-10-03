import {Builder} from 'selenium-webdriver';
import browserstack from 'browserstack-local';

const capabilities = {
    'bstack:options': {
        'os': 'Windows',
        'osVersion': '10',
        'projectName': 'Chatbot',
        'buildName': 'Performance tests',
        'sessionName': 'Performance tests',
        'userName': 'evgeniistepanov_nTBDpC',
        'accessKey': 'ua6pukHAsP5bXdnzs6pr',
        'debug': 'true',
        'local': 'true', // Используйте, если работаете через прокси
    },
    'browserName': 'chrome',
    'browserVersion': 'latest',
};

(async function example() {

    const AZ_URL_AUTH = 'https://od-httpuser:hTd%40$sE6V!7@dev-med-origin-ic-medical-affairs-us.digital-astrazeneca.com';
    //AZ_URL_AUTH=https://od-httpuser:4vcR1Au7Gpiz6YsWRn7s@odpreprod65-origin-ic-medical-affairs-us.digital-astrazeneca.com  # preprod

    let bsLocal = new browserstack.Local();

    const bsLocalArgs = {
        'key': 'ua6pukHAsP5bXdnzs6pr'
        // 'proxyHost': 'emeapzen.astrazeneca.net',
        // 'proxyPort': '10263',
        // 'forceproxy': true,
    };

    await new Promise(resolve => setTimeout(resolve, 4 * 1000));
    console.log('Start BrowserStack Local:');


    await new Promise((resolve, reject) => {
        bsLocal.start(bsLocalArgs, function (error) {
            if (error) {
                console.error('Error on start BrowserStack Local:', error);
                return reject(error);
            }
            console.log('BrowserStack Local launched successfully.');
            resolve();
        });
    });
    console.log('BrowserStack completed successfully');


    console.log('example run !!!');
    const driver = await new Builder()
        .usingServer('https://hub-cloud.browserstack.com/wd/hub')
        .withCapabilities(capabilities)
        .build();
    console.log('driver ready !!!');
    //await driver.get('https://www.google.com');
    await driver.get(AZ_URL_AUTH);
    console.log(await driver.getTitle());

    await driver.quit();
})();
