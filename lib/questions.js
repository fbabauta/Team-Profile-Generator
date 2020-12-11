const inquirer = require("inquirer");

// questions class
class Questions {
    constructor(role) {
        this.role = role;
        this.questions =
            [{
                type: "input",
                name: "name",
                message: `What is your ${this.role}'s name? `,
                validate: function (value) {
                    var pass = value.match(/^[A-Za-z\s\.]+$/);
                    if (pass) { return true }
                    return `Please enter a valid name with no numbers or special character`;
                }
            },
            {
                type: "input",
                name: "id",
                message: `What is your ${this.role}'s employee ID number? `,
                validate: function (value) {
                    var pass = value.match(/^[0-9]+$/);
                    if (pass) { return true }
                    return `Please enter a valid employee ID number`
                }
            },
            {
                type: "input",
                name: "email",
                message: `What is your ${this.role}'s email address? `,
                validate: function (value) {
                    var pass = value.match(
                        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                    );

                    if (pass) { return true }
                    return `Please enter a valid email address`;
                }
            },
            {
                type: "lsit",
                name: "addMember",
                message: `Which type of team member would you like to add? `,
                choices: ["Engineer", "Intern", "I'm done, I don't want to add any more members."]                     
        }]
    }

    addQuestion(question) {
        this.questions.splice(3, 0, question);
    }

    askQuestions() {
        return inquirer.prompt(this.questions);
    }
}

// extra questions depending on role
const githubQ = {
    type: "input",
    name: "github",
    message: "What is your engineer's GitHub username? ",
    validate: function (value) {
        if (value.trim().indexOf(" ") === -1) { return true }
        return "Please enter a valid GitHub username.";
    }
}

const officeQ = {
    type: "input",
    name: "officeNum",
    message: "What is your manager's office number? ",
    validate: function (value) {
        var pass = value.match(/^[0-9]+$/);
        if (pass) { return true }
        return 'Please enter a valid employee ID number'
    }
}

const schoolQ = {
    type: "input",
    name: "school",
    message: "Which school does your intern attend? ",
    validate: function (value) {
        var pass = value.match(/^[A-Za-z\s]+$/);
        if (pass) { return true }
        return 'Please enter a valid school name with no numbers or special character';
    }
};

// create new question instances
const managerQuestions = new Questions("manager");
const engineerQuestions = new Questions("engineer");
const internQuestions = new Questions("intern");

// add extra questions to instances depending on role
engineerQuestions.addQuestion(githubQ);
managerQuestions.addQuestion(officeQ);
internQuestions.addQuestion(schoolQ);

// export
module.exports = { managerQuestions, engineerQuestions, internQuestions };