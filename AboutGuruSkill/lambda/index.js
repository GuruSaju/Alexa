'use strict';

const Alexa = require('alexa-sdk');
const questions = require('./questions');

const ANSWER_COUNT = 4; // The number of possible answers per trivia question.
const GAME_LENGTH = 5;  // The number of questions per trivia game.
const GAME_STATES = {
    TRIVIA: "_TRIVIAMODE", // Asking trivia questions.
    START: "_STARTMODE", // Entry point, start the game.
    HELP: "_HELPMODE", // The user is asking for help.
};

//=========================================================================================================================================
//High level skill constants
//=========================================================================================================================================

const APP_ID = 'amzn1.ask.skill.6d5effc0-d416-47c5-8d9a-52fb0654f771';

const SKILL_NAME = 'About Guru';
const HELP_MESSAGE = 'You can ask guru about what he does, what he likes etc.. or play, How well do you know Guru? a small trivia about guru and see how well you score.';
const HELP_REPROMPT = 'What do you want to know about guru?';
const STOP_MESSAGE = 'Goodbye!';

//=========================================================================================================================================
//Speech output constants about guru
//=========================================================================================================================================

const guru_work = "Guru works as an Application developer at Nationwide.";
const guru_fullName = "His full name is Srisarguru Sridhar. He goes by either guru or batman";
const guru_launch = "Welcome to About Guru. This skill is to know about guru. If you don't know him well you can get to know him through this skill. What do you like to know about him ?";
const guru_color = "His favourite colors are red and black. Although he always told me he wanted rainbow dyed hair";
const guru_summary = "Guru is a software developer with a passion for technology, development and innovation. He strongly believes that learning is a continuous process and that the best way to gain knowledge, is not only by learning but also by sharing. He enjoys working on both backend as well as frontend, with a constant lookout to learn new technologies currently used in the industry. His career path has helped him to develop strong problem-solving, communication, mentoring and leadership skills, along with the ability to work both as a team player as well as a solo performer when needed.";
const guru_favActor = "His favourite actors are Hugh Jackman, Rajnikanth and Emma Watson";
const guru_relationship = "He is single and No!, we are not in a relationship";
const guru_favMovie = "His all time favourite movie is The Prestige directed by Christopher Nolan";
const guru_nationality = "He is Indian. But he resides now in the US";
const guru_contact = "You can ask him more by sending an email to him. I have sent his email address to your device";
const guru_email = "s.srisarguru@gmail.com";
const guru_contactCardTitle = "Guru's Email Id";
const guru_favAthlethe = "His most favourite is M.S. Dhoni";
const guru_favSports = "He likes to watch Cricket, American Football and Hockey";
const guru_favTeam = "His favourite teams are Chennai Super Kings, Indian cricket team and Boise State Broncos";
const guru_favFood = "He likes to eat everything except humans";
const guru_education = "He has a Master's degree in Computer Science";
const guru_favQuote = "It will be Alright in the end. If it is not Alright, it is not the end";
const guru_favMusicBand = "He likes Ed Sheeran, Bruno Mars, A.R.Rahman and Frank Sinatra";
const guru_favCar = "He always wanted a Ford Mustang";
const guru_favSuperhero = "His favorite superhero is The Wolverine";


//FOR GURU TRIVIA
const languageString = {
    "en": {
        "translation": {
            "QUESTIONS": questions["QUESTIONS"],
            "GAME_NAME": "How well do you know Guru",
            "HELP_MESSAGE": "I will ask you %s multiple choice questions. Respond with the number of the answer. " +
            "For example, say one, two, three, or four. To start a new game at any time, say, start game. ",
            "REPEAT_QUESTION_MESSAGE": "To repeat the last question, say, repeat. ",
            "ASK_MESSAGE_START": "Would you like to start playing?",
            "HELP_REPROMPT": "To give an answer to a question, respond with the number of the answer. ",
            "STOP_MESSAGE": "Would you like to keep playing?",
            "CANCEL_MESSAGE": "Ok, let\'s play again soon.",
            "NO_MESSAGE": "Ok, we\'ll play another time. Goodbye!",
            "TRIVIA_UNHANDLED": "Try saying a number between 1 and %s",
            "HELP_UNHANDLED": "Say yes to continue, or no to end the game.",
            "START_UNHANDLED": "Say start to start a new game.",
            "NEW_GAME_MESSAGE": "Welcome to %s. ",
            "WELCOME_MESSAGE": "I will ask you %s questions, try to get as many right as you can. " +
            "Just say the number of the answer. Let\'s begin. ",
            "ANSWER_CORRECT_MESSAGE": "correct. ",
            "ANSWER_WRONG_MESSAGE": "wrong. ",
            "CORRECT_ANSWER_MESSAGE": "The correct answer is %s: %s. ",
            "ANSWER_IS_MESSAGE": "That answer is ",
            "TELL_QUESTION_MESSAGE": "Question %s. %s ",
            "GAME_OVER_MESSAGE": "You got %s out of %s questions correct. Thank you for playing!",
            "SCORE_IS_MESSAGE": "Your score is %s. ",
        },
    }
}
//=========================================================================================================================================
//Handlers
//=========================================================================================================================================

const initialhandlers = {
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
    'FavoriteIntent': function () {
        const intentObj = this.event.request.intent;
        const favAbout = intentObj.slots.favAbout.value;
        switch (favAbout) {
            case 'colors':
            case 'color': {
                this.emit('ColorIntent');
                break;
            }
            case 'cars':
            case 'car': {
                this.emit('CarIntent');
                break;
            }
            case 'actor':
            case 'actors': {
                this.emit('ActorIntent');
                break;
            }
            case 'movie':
            case 'movies':
            case 'picture': {
                this.emit('MovieIntent');
                break;
            }
            case 'sport':
            case 'sports': {
                this.emit('SportsIntent');
                break;
            }
            case 'sportsperson':
            case 'sportspersons':
            case 'athletes':
            case 'athlete': {
                this.emit('SportspersonIntent');
                break;
            }
            case 'music':
            case 'music band':
            case 'band':
            case 'singer':
            case 'musician': {
                this.emit('MusicIntent');
                break;
            }
            case 'food':
            case 'food to eat':
            case 'to eat':
            case 'dish': {
                this.emit('FoodIntent');
                break;
            }
            case 'saying':
            case 'quote':
            case 'quotes': {
                this.emit('FavQuoteIntent');
                break;
            }
            case 'superhero':
            case 'superheroes':
            case 'comic superhero':
            case 'comic character':
            case 'comic superhero':
            case 'comic hero': {
                this.emit('FavSuperheroIntent');
                break;
            }
            default:
                this.emit('AMAZON.HelpIntent');
        }
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
    'ActorIntent': function () {
        const speechOutput = guru_favActor;
        this.response.speak(speechOutput);
        this.emit(':responseReady');
    },
    'RelationshipIntent': function () {
        const speechOutput = guru_relationship;
        this.response.speak(speechOutput);
        this.emit(':responseReady');
    },
    'MovieIntent': function () {
        const speechOutput = guru_favMovie;
        this.response.speak(speechOutput);
        this.emit(':responseReady');
    },
    'NationalityIntent': function () {
        const speechOutput = guru_nationality;
        this.response.speak(speechOutput);
        this.emit(':responseReady');
    },
    'CarIntent': function () {
        const speechOutput = guru_favCar;
        this.response.speak(speechOutput);
        this.emit(':responseReady');
    },
    'DegreeIntent': function () {
        const speechOutput = guru_education;
        this.response.speak(speechOutput);
        this.emit(':responseReady');
    },
    'SportsIntent': function () {
        const speechOutput = guru_favSports;
        this.response.speak(speechOutput);
        this.emit(':responseReady');
    },
    'SportspersonIntent': function () {
        const speechOutput = guru_favAthlethe;
        this.response.speak(speechOutput);
        this.emit(':responseReady');
    },
    'FoodIntent': function () {
        const speechOutput = guru_favFood;
        this.response.speak(speechOutput);
        this.emit(':responseReady');
    },
    'MusicIntent': function () {
        const speechOutput = guru_favMusicBand;
        this.response.speak(speechOutput);
        this.emit(':responseReady');
    },
    'FavQuoteIntent': function () {
        const speechOutput = guru_favQuote;
        this.response.speak(speechOutput);
        this.emit(':responseReady');
    },
    'FavSuperheroIntent': function () {
        const speechOutput = guru_favSuperhero;
        this.response.speak(speechOutput);
        this.emit(':responseReady');
    },
    'ContactIntent': function () {
        const speechOutput = guru_contact;
        this.emit(':tellWithCard', speechOutput, guru_contactCardTitle, guru_email);
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
    "GuruTriviaIntent": function () {
        this.handler.state = GAME_STATES.START;
        this.emitWithState("StartGame", true);
    },
    "AMAZON.StartOverIntent": function () {
        this.handler.state = GAME_STATES.START;
        this.emitWithState("StartGame", true);
    },

};


const startStateHandlers = Alexa.CreateStateHandler(GAME_STATES.START, {
    "StartGame": function (newGame) {
        let speechOutput = newGame ? this.t("NEW_GAME_MESSAGE", this.t("GAME_NAME")) + this.t("WELCOME_MESSAGE", GAME_LENGTH.toString()) : "";
        
        const translatedQuestions = this.t("QUESTIONS");
        // Select GAME_LENGTH questions for the game
        const gameQuestions = populateGameQuestions(translatedQuestions);

        // Generate a random index for the correct answer, from 0 to 3
        const correctAnswerIndex = Math.floor(Math.random() * (ANSWER_COUNT));
        // Select and shuffle the answers for each question

        // Build reprompt for the question

        //Build object for session

        //Handle trivia state

        //build and send the response as listen
        
    },
});

//=========================================================================================================================================
//Guru Trivia Game
//=========================================================================================================================================

//pick random game length questions for the trivia game
function populateGameQuestions(translatedQuestions) {
    const gameQuestions = [];
    const indexList = [];
    let index = translatedQuestions.length;

    if (GAME_LENGTH > index) { // handle boundary conditions
        throw new Error("Invalid Game Length.");
    }

    for (let i = 0; i < translatedQuestions.length; i++) {
        indexList.push(i);
    }

    // Pick GAME_LENGTH random questions from the list to ask the user, make sure there are no repeats.
    for (let j = 0; j < GAME_LENGTH; j++) {
        const rand = Math.floor(Math.random() * index);
        index -= 1;

        const temp = indexList[index];
        indexList[index] = indexList[rand];
        indexList[rand] = temp;
        gameQuestions.push(indexList[index]);
    }

    return gameQuestions;
}


exports.handler = function (event, context, callback) {
    const alexa = Alexa.handler(event, context, callback);
    alexa.APP_ID = APP_ID;
    alexa.resources = languageString;
    alexa.registerHandlers(initialhandlers, startStateHandlers);
    alexa.execute();
};
