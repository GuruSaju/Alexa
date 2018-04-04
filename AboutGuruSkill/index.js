'use strict';
const Alexa = require('alexa-sdk');

//=========================================================================================================================================
//TODO: The items below this comment need your attention.
//=========================================================================================================================================

const APP_ID = 'amzn1.ask.skill.6d5effc0-d416-47c5-8d9a-52fb0654f771';

const SKILL_NAME = 'About Guru';
//const GET_FACT_MESSAGE = "Here's your fact: ";
const HELP_MESSAGE = 'You can ask guru about what he does, what he likes etc.. What do you like to know about him ?';
const HELP_REPROMPT = 'What do you want to know about guru?';
const STOP_MESSAGE = 'Goodbye!';

//=========================================================================================================================================
//TODO: Replace this data with your own.  You can find translations of this data at http://github.com/alexa/skill-sample-node-js-fact/data
//=========================================================================================================================================

const guru_work = "Guru works as an Application developer at Nationwide.";
const guru_fullName = "His full name is Srisarguru Sridhar. He goes by either guru or batman";
const guru_launch = "Welcome to About Guru. This skill is to know about guru. If you don't know him well you can get to know him through this skill. What do you like to know about him ?"
const guru_color = "His favourite colors are red and black. Although he always told me he wanted rainbow dyed hair"
const guru_summary = "Guru is a software developer with a passion for technology, development and innovation. He strongly believes that learning is a continuous process and that the best way to gain knowledge is not only by learning but also by sharing. He enjoys working on both back end as well as front end with a constant lookout to learn new technologies currently used in the industry. His career path has helped him to develop strong problem-solving, communication, mentoring and leadership skills along with the ability to work both as a team player as well as a solo performer when needed."

//=========================================================================================================================================
//Editing anything below this line might break your skill.
//=========================================================================================================================================

const handlers = {
    'LaunchRequest': function () {
        this.emit('LaunchGuruIntent');
    },
    'LaunchGuruIntent': function () {
        this.response.speak(guru_launch);
        this.emit(':responseReady');
    },
    'WorkIntent': function () {
        const speechOutput = guru_work; 
        this.response.speak(speechOutput);
        this.emit(':responseReady');
    },
    'RealNameIntent': function () {
        const speechOutput = guru_fullName; 
        this.response.speak(speechOutput);
        this.emit(':responseReady');
    },
    'ColorIntent': function () {
        const speechOutput = guru_color; 
        this.response.speak(speechOutput);
        this.emit(':responseReady');
    },
    'SummaryIntent': function () {
        const speechOutput = guru_summary; 
        this.response.speak(speechOutput);
        this.emit(':responseReady');
    },
    'AMAZON.HelpIntent': function () {
        const speechOutput = HELP_MESSAGE;
        const reprompt = HELP_REPROMPT;

        this.response.speak(speechOutput).listen(reprompt);
        this.emit(':responseReady');
    },
    'AMAZON.CancelIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
    'AMAZON.StopIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
};

exports.handler = function (event, context, callback) {
    const alexa = Alexa.handler(event, context, callback);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};
