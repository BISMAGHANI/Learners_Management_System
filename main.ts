#! /usr/bin/env node

import inquirer from "inquirer"
import chalk from "chalk"


console.log(chalk.italic.blueBright("\n\t****** LEARNER'S MANAGMENT SYSTEM ******\t\n"));

class learner {
    id: string;
    name: string;
    coursesEnrolled: string[];
    feeAmount: number;

    constructor(id: string, name: string, coursesEnrolled: string[], feeAmount: number ){
        this.id = id
        this.name = name
        this. coursesEnrolled =  coursesEnrolled
        this.feeAmount = feeAmount 
    }

}

let baseId = 10000
let learnerId: string = "";
let continueEnrollment = true

let learners: learner[] = []

do{
    let action = await inquirer.prompt({
        type: "list",
        name: "ans",
        message: "Please Confirm Your Choice:",
        choices: ["Enrolled a Learner", "Show Learner Status"]
    })

    if(action.ans === "Enrolled a Learner"){
        let learnerName = await inquirer.prompt({
            type: "input",
            name: "ans",
            message: "Please Enter Your Name:"
        })

        let trimmedLearnerName = (learnerName.ans).trim().toLowerCase()
        let learnerNamecheck = learners.map(obj => obj.name)

        
        if(learnerNamecheck.includes(trimmedLearnerName) === false){

        if(trimmedLearnerName !== ""){
            baseId++
            learnerId = "STID" + baseId

            console.log(chalk.greenBright.italic("\n\tYour Account Has Been Created\t\n"));
            console.log(chalk.italic.yellowBright(`\tWELCOME\t\n, ${trimmedLearnerName}!`));

            let course = await inquirer.prompt({
                  
                type: "list",
                name: "ans",
                message: "Please Select a Course",
                choices: ["IT", "C++", "CIT", "Adv.Language Course", "Baking", "Craft", "Self-Grooming"]

            })
            
            let courseFee = 0;
            switch(course.ans) {
              case "IT" :
                courseFee = 100000;
                break; 

                case "C++" :
                courseFee = 25000;
                break; 

                case "CIT" :
                courseFee = 15000;
                break; 

                case "Adv.Language Course" :
                courseFee = 10000;
                break; 

                case "Baking" :
                courseFee = 5000;
                break; 

                case "Craft" :
                courseFee = 2000;
                break; 

                case "Self-Grooming" :
                courseFee = 7000;
                break; 
    
            }

            
            
            let courseConfirm = await inquirer.prompt({
                type: "confirm",
                name: "ans",
                message: "Are You Planning To Enroll In This Course?"
            })


            if(courseConfirm.ans === true){
                let Learner = new learner(learnerId, trimmedLearnerName, [course.ans], courseFee)

                learners.push(Learner)

                console.log(chalk.greenBright.italic("\n\tYou are Now a Participant In This Course\t\n"));
                
            } 
          }
          else{
            console.log(chalk.bold.blackBright("\tInvalid Name\t"));
            
          }
       }else{
        console.log(chalk.italic.whiteBright("\tThis Participant Is Already Exist\t"));
        
       }
      
    }

    else if(action.ans === "Show Learner Status"){
        if(learners.length !== 0){
            let learnersNamecheck = learners.map(e => e.name)

            let selectedLearners = await inquirer.prompt({
                type: "list",
                name: "ans",
                message: "Please Select Name:",
                choices: learnersNamecheck 
            })

            let foundlearner = learners.find(Learner => Learner.name === selectedLearners.ans)

            console.log(chalk.italic.redBright("\tStudent Information\t"));
            console.log(foundlearner);
            console.log("\n");
            
            
        }else{
            console.log(chalk.whiteBright.italic("\tRecord is Empty\t"));
            
        }
    }

    let userConfirm = await inquirer.prompt({
        type: "confirm",
        name: "ans",
        message: "Do You Want to Continue?"
    })

    if(userConfirm.ans === false){
        continueEnrollment = false
    }

}while(continueEnrollment); 