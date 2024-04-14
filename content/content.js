
// elements is the div item that stores the rating data from each reviewer
let elements = document.querySelectorAll(".MetaItem__StyledMetaItem-y0ixml-0");
let myArray = Array.from(elements);
let gradeTextArray = [];

// Creates an array that only gets the grade reported
for (let i = 0; i < myArray.length; i++) {
    if (myArray[i].innerText.startsWith("Grade: ")) {
        gradeTextArray.push(myArray[i].innerText.substring(7));
    }
}

// creates the dictionary to hold the amount of each grade is received
let gradeDictionary = {
    "A+": 0,
    "A": 0,
    "A-": 0,
    "B+": 0,
    "B": 0,
    "B-": 0,
    "C+": 0,
    "C": 0,
    "C-": 0,
    "D+": 0,
    "D": 0,
    "D-": 0,
    "F": 0
};

// Populates the grade dictionary based off the grade received in RMP
for(let i = 0; i < gradeTextArray.length; i++){
    if(gradeTextArray[i] !== "Rather not say" && gradeTextArray[i] !== "Not sure yet"){
        gradeDictionary[gradeTextArray[i]]++;
    }
    // console.log("String length: " + gradeTextArray[i].length + " Grade Received: " + gradeTextArray[i]);
}

// totalGradeCredit = total grade received
// GPA = totalGradeCredit/numberRatings
let totalGradeCredit = 0.0;
let numberRatings = 0;
// Calculates the total GPA
for (let grade in gradeDictionary) {
    if (grade === "A+") {
        totalGradeCredit += (4.0 * gradeDictionary[grade]);
        numberRatings += (1 * gradeDictionary[grade]);
    } else if (grade === "A") {
        totalGradeCredit += (4.0 * gradeDictionary[grade]);
        numberRatings += (1 * gradeDictionary[grade]);
    } else if (grade === "A-") {
        totalGradeCredit += (3.7 * gradeDictionary[grade]);
        numberRatings += (1 * gradeDictionary[grade]);
    } else if (grade === "B+") {
        totalGradeCredit += (3.3 * gradeDictionary[grade]);
        numberRatings += (1 * gradeDictionary[grade]);
    } else if (grade === "B") {
        totalGradeCredit += (3.0 * gradeDictionary[grade]);
        numberRatings += (1 * gradeDictionary[grade]);
    } else if (grade === "B-") {
        totalGradeCredit += (2.7 * gradeDictionary[grade]);
        numberRatings += (1 * gradeDictionary[grade]);
    } else if (grade === "C+") {
        totalGradeCredit += (2.3 * gradeDictionary[grade]);
        numberRatings += (1 * gradeDictionary[grade]);
    } else if (grade === "C") {
        totalGradeCredit += (2.0 * gradeDictionary[grade]);
        numberRatings += (1 * gradeDictionary[grade]);
    } else if (grade === "C-") {
        totalGradeCredit += (1.7 * gradeDictionary[grade]);
        numberRatings += (1 * gradeDictionary[grade]);
    } else if (grade === "D+") {
        totalGradeCredit += (1.3 * gradeDictionary[grade]);
        numberRatings += (1 * gradeDictionary[grade]);
    } else if (grade === "D") {
        totalGradeCredit += (1.0 * gradeDictionary[grade]);
        numberRatings += (1 * gradeDictionary[grade]);
    } else if (grade === "D-") {
        totalGradeCredit += (0.7 * gradeDictionary[grade]);
        numberRatings += (1 * gradeDictionary[grade]);
    } else if (grade === "F") {
        totalGradeCredit += (0.0 * gradeDictionary[grade]);
        numberRatings += (1 * gradeDictionary[grade]);
    }    
}

let avgGrade = totalGradeCredit/numberRatings;
console.log("Average Grade for this professor: " + avgGrade);
console.log("Number of grade ratings: " + numberRatings);

let profStatsDiv = document.querySelector(".TeacherFeedback__StyledTeacherFeedback-gzhlj7-0");
profStatsDiv.style.flex = "";
let newElem = document.createElement("div");
newElem.innerText = "This is a new element";
newElem.classList.add("FeedbackItem__FeedbackNumber-uof32n-1", "kkESWs");
newElem.style.color = "red";
profStatsDiv.appendChild(newElem);