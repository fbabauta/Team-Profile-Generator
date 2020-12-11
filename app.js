const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const Questions = require("./lib/Questions");
const managerQuestions = Questions.managerQuestions;
const engineerQuestions = Questions.engineerQuestions;
const internQuestions = Questions.internQuestions;

let employeesArr = [];
let addMember;

init();

function init() {
    console.log("Please build your team.");
    managerQuestions.askQuestions()
        .then(data => {
            const {name, id, email, officeNum} = data;
            addMember = data.addMember;
            const manager = new Manager(name, id, email, officeNum);
            employeesArr.push(manager);
            addNewMember();
        })
        .catch(err => {
            if (err) throw err;
        });
}

function addNewMember() {
    if (addMember === "Engineer") {
        addEngineer();
    } else if (addMember === "Intern") {
        addIntern();
    } else {
        const html = render(employeesArr);
        fs.writeFile(outputPath, html, (err) => {
            if (err) throw err;
            console.log('The file has been saved!');
        });
    }
}

function addEngineer() {
    engineerQuestions.askQuestions()
        .then(data => {
            const { name, id, email, github } = data;
            addMember = data.addMember;
            const engineer = new Engineer(name, id, email, github);
            employeesArr.push(engineer);
            addNewMember();
        })
        .catch(err => {
            if (err) throw err;
        });
}

function addIntern() {
    internQuestions.askQuestions()
        .then(data => {
            const { name, id, email, school } = data;
            addMember = data.addMember;
            const intern = new Intern(name, id, email, school);
            employeesArr.push(intern);
            addNewMember();
        })
        .catch(err => {
            if (err) throw err;
        });
}
            
                
          

