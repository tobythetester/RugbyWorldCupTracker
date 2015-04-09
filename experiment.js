/**
 * Created by tobysinclair on 09/04/2015.
 */


    /**
     * Created by tobysinclair on 01/04/2015.
     * carmel2304@hotmail.com dyoung@uclan.ac.uk
     */

    var fs = require('/usr/local/lib/node_modules/file-system');

var today = new Date();
today.toDateString();

fs.appendFile("/Users/Shared/Jenkins/Home/workspace/RugbyWorldCupTicketChecker/ticketStatus.html", "TIME: " + today.toDateString() + "<br>", function(err) {})


describe('Check Status of Tickets', function() {

    var list = [
        {matchName:"AUSTRALIA v FIJI", matchID:16, numberOfTicketsUnavailable:4}
    ];

    it('should login', function () {

        browser.ignoreSynchronization = true;

        //browser.get('file:///Users/tobysinclair/Downloads/Rugby%20World%20Cup%20-%20Select%20Tickets.html');
        //
        ////browser.sleep(10000);
        ////
        ////element(by.css('#ctl00_body_logincontainer1_login1_txtPrimary')).sendKeys(browser.params.userName);
        ////element(by.css('#ctl00_body_logincontainer1_login1_txtSecondary')).sendKeys(browser.params.password);
        ////element(by.css('#ctl00_body_logincontainer1_login1_cmdLogin')).click();
        ////
        ////browser.sleep(5000);
        ////
        ////expect(browser.getCurrentUrl()).toContain('https://tickets.rugbyworldcup.com/gpctp/TicketingInformation');
    });


    it('should have correct ticket status', function () {

        for (var i=0; i < list.length; i++) {

            var numberOfTicketsUnavailable = list[i].numberOfTicketsUnavailable;

            browser.driver.get('file://///Users/tobysinclair/Downloads/Rugby%20World%20Cup%20-%20Select%20Tickets.html');

            browser.sleep(5000);

            var matchTitle = element(by.css('.sessiontitle')).getText();

            expect(matchTitle).toContain(list[i].matchName);

            browser.sleep(5000);

            var numberOfTickets = element.all(by.css('.unavailable'));

            element.all(by.css('.unavailable')).count().then((function (index, count) {

                var numberOfTicketsAvailable = (numberOfTicketsUnavailable - count);

                if (count < numberOfTicketsUnavailable) {

                    element.all(by.css('.trigger.woggle>legend')).getText().then((function (index, text){

                        console.log(text);
                    }).bind(null, i));

                    console.log(list[index].matchName + " TICKETS ON SALE!!! " + "THERE ARE " + numberOfTicketsAvailable + " TICKET CATEGORIES AVAILABLE")
                    fs.appendFile
                    fs.appendFile('/Users/Shared/Jenkins/Home/workspace/RugbyWorldCupTicketChecker/ticketStatus.html', list[index].matchName + " TICKETS ON SALE!!! " + "THERE ARE " + numberOfTicketsAvailable + " TICKET CATEGORIES AVAILABLE" + "<br>", function(err) {})
                }
                else {
                    console.log(list[index].matchName + " TICKETS SOLD OUT. " + "THERE ARE " + numberOfTicketsAvailable + " TICKET CATEGORIES AVAILABLE");
                    fs.appendFile('/Users/Shared/Jenkins/Home/workspace/RugbyWorldCupTicketChecker/ticketStatus.html', list[index].matchName + " TICKETS SOLD OUT. " + "THERE ARE " + numberOfTicketsAvailable + " TICKET CATEGORIES AVAILABLE" + "<br>", function(err) {})
                }

            }).bind(null, i));

            expect(numberOfTickets.count()).toEqual(list[i].numberOfTicketsUnavailable);

            browser.sleep(5000);
        }
    });

    //it('should logout', function () {
    //
    //    element(by.css('.log-out>a')).click();
    //
    //    browser.sleep(5000);
    //
    //    expect(browser.getCurrentUrl()).toContain('https://tickets.rugbyworldcup.com/message.aspx?key=message_loggedout');
    //
    //});

});
