/**
 * Created by tobysinclair on 01/04/2015.
 */
/**
 * Created by tobysinclair on 01/04/2015.
 */
var nodemailer = require('/usr/local/lib/node_modules/nodemailer');

describe('Send email', function() {

    it('should send email', function() {

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'tobysinclair86@gmail.com',
                pass: 'tobietrice86'
            }
        });
        transporter.sendMail({
            from: 'tobysinclair86@gmail.com',
            to: 'tobysinclair86@gmail.com',
            subject: 'test from protractor',
            text: 'hello world!'
        });

    });
});
