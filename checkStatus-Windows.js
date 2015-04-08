/**
 * Created by tobysinclair on 01/04/2015.
 * carmel2304@hotmail.com dyoung@uclan.ac.uk
 */

var fs = require('C:/Users/Administrator/AppData/Roaming/npm/node_modules/file-system');

function getDateTime() {

    var date = new Date();

    var hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour;

    var min  = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;

    var sec  = date.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;

    var year = date.getFullYear();

    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;

    var day  = date.getDate();
    day = (day < 10 ? "0" : "") + day;

    return year + ":" + month + ":" + day + ":" + hour + ":" + min + ":" + sec;

}

fs.appendFile("C:/Program Files (x86)/Jenkins/workspace/RugbyWorldCupTracker/ticketStatus.html", + getDateTime() + "<br>", function(err) {})

describe('Check Status of Tickets', function() {

    var list = [
        {matchName:"ENGLAND V WALES", matchID:16, numberOfTicketsUnavailable:5},
        {matchName:"ENGLAND V FIJI", matchID:1, numberOfTicketsUnavailable:5},
        {matchName:"ENGLAND V AUSTRALIA", matchID:26, numberOfTicketsUnavailable:5},
        {matchName:"ENGLAND V URUGUAY", matchID:36, numberOfTicketsUnavailable:5},
        ////{matchName:"WALES V URUGUAY", matchID:7, numberOfTicketsUnavailable:2},
        {matchName:"AUSTRALIA V WALES", matchID:35, numberOfTicketsUnavailable:5},
        {matchName:"FINAL", matchID:48, numberOfTicketsUnavailable:5},
        {matchName:"QF4: W POOL A V RU POOL B", matchID:44, numberOfTicketsUnavailable:5},
        {matchName:"QF1: W POOL B V RU POOL A", matchID:42, numberOfTicketsUnavailable:5},
        {matchName:"SF1: W QF1 V W QF2", matchID:45, numberOfTicketsUnavailable:5},
        {matchName:"SF2: W QF3 V W QF4", matchID:46, numberOfTicketsUnavailable:5},
    ];

    it('should login', function () {

        browser.ignoreSynchronization = true;

        browser.get('https://tickets.rugbyworldcup.com/');

        browser.sleep(10000);

        element(by.css('#ctl00_body_logincontainer1_login1_txtPrimary')).sendKeys(browser.params.userName);
        element(by.css('#ctl00_body_logincontainer1_login1_txtSecondary')).sendKeys(browser.params.password);
        element(by.css('#ctl00_body_logincontainer1_login1_cmdLogin')).click();

        browser.sleep(5000);

        expect(browser.getCurrentUrl()).toContain('https://tickets.rugbyworldcup.com/gpctp/TicketingInformation');
    });


    it('should have correct ticket status', function () {

        for (var i=0; i < list.length; i++) {

            var numberOfTicketsUnavailable = list[i].numberOfTicketsUnavailable;

            browser.get('https://tickets.rugbyworldcup.com/gpctp/addtickets.aspx?esref=' + list[i].matchID + '&qryparams=Browse%2f0');

            browser.sleep(5000);

            var matchTitle = element(by.css('.sessiontitle')).getText();

            expect(matchTitle).toContain(list[i].matchName);

            browser.sleep(5000);

            var numberOfTickets = element.all(by.css('.unavailable'));

            element.all(by.css('.unavailable')).count().then((function (index, count) {

                var numberOfTicketsAvailable = (numberOfTicketsUnavailable - count);

                if (count < numberOfTicketsUnavailable) {


                    console.log(list[index].matchName + ": "  + numberOfTicketsAvailable + " TICKET CATEGORIES AVAILABLE")
                    fs.appendFile("C:/Program Files (x86)/Jenkins/workspace/RugbyWorldCupTracker/ticketStatus.html", list[index].matchName + ": " +  numberOfTicketsAvailable + " TICKET CATEGORIES AVAILABLE" + "<br>", function(err) {})
                }
                else {
                    console.log(list[index].matchName + ": "  + numberOfTicketsAvailable + " TICKET CATEGORIES AVAILABLE");
                    fs.appendFile("C:/Program Files (x86)/Jenkins/workspace/RugbyWorldCupTracker/ticketStatus.html", list[index].matchName + ": "  + numberOfTicketsAvailable + " TICKET CATEGORIES AVAILABLE" + "<br>", function(err) {})
                }

            }).bind(null, i));

            expect(numberOfTickets.count()).toEqual(list[i].numberOfTicketsUnavailable);

            browser.sleep(5000);
        }
    });

    it('should logout', function () {

        element(by.css('.log-out>a')).click();

        browser.sleep(5000);

        expect(browser.getCurrentUrl()).toContain('https://tickets.rugbyworldcup.com/message.aspx?key=message_loggedout');

    });

});
/**
 * Created by tobysinclair on 07/04/2015.
 */
