// REF: https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/ses-examples-sending-email.html

const AWS = require("aws-sdk");

AWS.config.loadFromPath('./aws-config.json');
AWS.config.update({region: "us-east-1"});

var EmailParams = {
    Source: "stephenphyo2019.official@gmail.com",
    Destination: {
        "ToAddresses": [
            "stephenphyo.azure15@gmail.com"
        ]
    },
    Template: "SESTemplate01",
    TemplateData: '{}',
    ReplyToAddresses: [
        "stephenphyo2019.official@gmail.com"
    ]
};

/* AWS SES Object */
var sendEmailPromise = new AWS.SES({apiVersion: "2010-12-01"})
                                            .sendTemplatedEmail(EmailParams)
                                            .promise();

sendEmailPromise
    .then(
        (data) => {console.log(data)}
    ).catch(
        (err) => {console.log(err, err.stack)}
    );