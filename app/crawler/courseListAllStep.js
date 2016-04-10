var loginStep = require('./loginStep');

/**
* Course List step. Retrieves all of the courses the student 
*   has taken
* @param {String} username
* @param {String} password
* @returns {Promise}
*/
function courseListAllStep(username, password) {
    
    function promiseExecutor(resolve, reject) {
        loginStep(username, password).then(function (crawlerObj) {
            var crawler = crawlerObj.crawler;
            
            crawler.waitForSelector("a#DERIVED_SSS_SCR_SSS_LINK_ANCHOR4");
            crawler.thenClick("a#DERIVED_SSS_SCR_SSS_LINK_ANCHOR4");
            crawler.waitForSelector("iframe#ptifrmtgtframe", function () {
                this.echo(this.getCurrentUrl() + "!!!test!!!");
            });
        });
    }

    return new Promise(promiseExecutor);

}

module.exports = exports = courseListAllStep;