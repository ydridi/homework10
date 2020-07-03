const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
​
const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html");
​
const render = require("./lib/htmlRenderer");
​
​
const questionManager = [
    {
        type:"input",
        name:"name",
        message:"What is your manager's name?"
    },
    {
        type:"input",
        name:"id",
        message:"What is your manager's id?"
    },
    {
        type:"input",
        name:"email",
        message:"What is your manager's email?"
    },
    {
        type:"input",
        name:"officenumber",
        message:"What is your manager's office number?"
    },
    {
        type:"list",
        name:"teammember",
        message:"Which type of team member would you like to add?",
        choices:["Engineer", "Intern", "I don't want to add anymore team members."]
    },
];

const questionEngineer = [
    {
        type:"input",
        name:"name",
        message:"What is your engineer's name?"
    },
    {
        type:"input",
        name:"id",
        message:"What is your engineer's id?"
    },
    {
        type:"input",
        name:"email",
        message:"What is your engineers's email?"
    },
    {
        type:"input",
        name:"github",
        message:"What is your engineer's GitHub username?"
    },
    {
        type:"list",
        name:"teammember",
        message:"Which type of team member would you like to add?",
        choices:["Engineer", "Intern", "I don't want to add anymore team members."]
    },
];

const questionIntern = [
    {
        type:"input",
        name:"name",
        message:"What is your intern's name?"
    },
    {
        type:"input",
        name:"id",
        message:"What is your intern's id?"
    },
    {
        type:"input",
        name:"email",
        message:"What is your intern's email?"
    },
    {
        type:"input",
        name:"school",
        message:"What school does your intern attend?"
    },
    {
        type:"list",
        name:"teammember",
        message:"Which type of team member would you like to add?",
        choices:["Engineer", "Intern", "I don't want to add anymore team members."]
    },
];

function init() {
  promptmanager();
}

function renderHTML() {
    render(employees);
    fs.writeFile(outputPath, render(employees), function(err) {
        if (err) {
            return console.log(err);
        }
    });
}

var employees = [];

function promptmanager() {
    inquirer.prompt(questionManager)
        .then(function(data) {

            const manager = new Manager(data.name, data.id, data.email, data.officenumber);
            employees.push(manager);

            if (data.teammember === "Engineer") {
                promptengineer();
            }
            else if (data.teammember === "Intern") {
                promptintern();
            }
            else {
            renderHTML();
            }
        });
}

function promptengineer() {
    inquirer.prompt(questionEngineer)
        .then(function(data) {

            const engineer = new Engineer(data.name, data.id, data.email, data.github);
            employees.push(engineer);

            if (data.teammember === "Engineer") {
                promptengineer();
            }
            else if (data.teammember === "Intern") {
                promptintern();
            }
            else {
            renderHTML();
            }
        });
}

function promptintern() {
    inquirer.prompt(questionIntern)
        .then(function(data) {

            const intern = new Intern(data.name, data.id, data.email, data.school);
            employees.push(intern);

            if (data.teammember === "Engineer") {
                promptengineer();
            }
            else if (data.teammember === "Intern") {
                promptintern();
            }
            else {
            renderHTML();
            }
        });
}

init();