
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
    "F": 0,
    "Pass:": 0,
    "No Pass": 0
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
let mostOften = 0;
let mostOftenGrade = "--";
// Calculates the total GPA
for (let grade in gradeDictionary) {
    if (grade === "A+") {
        totalGradeCredit += (4.0 * gradeDictionary[grade]);
        numberRatings += (1 * gradeDictionary[grade]);
        if(gradeDictionary[grade] > mostOften){
            mostOften = gradeDictionary[grade];
            mostOftenGrade = grade;
        }
    } else if (grade === "A") {
        totalGradeCredit += (4.0 * gradeDictionary[grade]);
        numberRatings += (1 * gradeDictionary[grade]);
        if(gradeDictionary[grade] > mostOften){
            mostOften = gradeDictionary[grade];
            mostOftenGrade = grade;
        }
    } else if (grade === "A-") {
        totalGradeCredit += (3.7 * gradeDictionary[grade]);
        numberRatings += (1 * gradeDictionary[grade]);
        if(gradeDictionary[grade] > mostOften){
            mostOften = gradeDictionary[grade];
            mostOftenGrade = grade;
        }
    } else if (grade === "B+") {
        totalGradeCredit += (3.3 * gradeDictionary[grade]);
        numberRatings += (1 * gradeDictionary[grade]);
        if(gradeDictionary[grade] > mostOften){
            mostOften = gradeDictionary[grade];
            mostOftenGrade = grade;
        }
    } else if (grade === "B") {
        totalGradeCredit += (3.0 * gradeDictionary[grade]);
        numberRatings += (1 * gradeDictionary[grade]);
        if(gradeDictionary[grade] > mostOften){
            mostOften = gradeDictionary[grade];
            mostOftenGrade = grade;
        }
    } else if (grade === "B-") {
        totalGradeCredit += (2.7 * gradeDictionary[grade]);
        numberRatings += (1 * gradeDictionary[grade]);
        if(gradeDictionary[grade] > mostOften){
            mostOften = gradeDictionary[grade];
            mostOftenGrade = grade;
        }
    } else if (grade === "C+") {
        totalGradeCredit += (2.3 * gradeDictionary[grade]);
        numberRatings += (1 * gradeDictionary[grade]);
        if(gradeDictionary[grade] > mostOften){
            mostOften = gradeDictionary[grade];
            mostOftenGrade = grade;
        }
    } else if (grade === "C") {
        totalGradeCredit += (2.0 * gradeDictionary[grade]);
        numberRatings += (1 * gradeDictionary[grade]);
        if(gradeDictionary[grade] > mostOften){
            mostOften = gradeDictionary[grade];
            mostOftenGrade = grade;
        }
    } else if (grade === "C-") {
        totalGradeCredit += (1.7 * gradeDictionary[grade]);
        numberRatings += (1 * gradeDictionary[grade]);
        if(gradeDictionary[grade] > mostOften){
            mostOften = gradeDictionary[grade];
            mostOftenGrade = grade;
        }
    } else if (grade === "D+") {
        totalGradeCredit += (1.3 * gradeDictionary[grade]);
        numberRatings += (1 * gradeDictionary[grade]);
        if(gradeDictionary[grade] > mostOften){
            mostOften = gradeDictionary[grade];
            mostOftenGrade = grade;
        }
    } else if (grade === "D") {
        totalGradeCredit += (1.0 * gradeDictionary[grade]);
        numberRatings += (1 * gradeDictionary[grade]);
        if(gradeDictionary[grade] > mostOften){
            mostOften = gradeDictionary[grade];
            mostOftenGrade = grade;
        }
    } else if (grade === "D-") {
        totalGradeCredit += (0.7 * gradeDictionary[grade]);
        numberRatings += (1 * gradeDictionary[grade]);
        if(gradeDictionary[grade] > mostOften){
            mostOften = gradeDictionary[grade];
            mostOftenGrade = grade;
        }
    } else if (grade === "F") {
        totalGradeCredit += (0.0 * gradeDictionary[grade]);
        numberRatings += (1 * gradeDictionary[grade]);
        if(gradeDictionary[grade] > mostOften){
            mostOften = gradeDictionary[grade];
            mostOftenGrade = grade;
        }
    }    
}

let avgGrade = 0;
if(numberRatings != 0){
    avgGrade = totalGradeCredit/numberRatings;
} else{
    avgGrade = -1;
}

console.log("Average Grade for this professor: " + avgGrade);
console.log("Number of grade ratings: " + numberRatings);

let convertedGrade = "";
if (avgGrade > 3.7) {
    convertedGrade = "A";
} else if (avgGrade > 3.3) {
    convertedGrade = "A-";
} else if (avgGrade > 3.0) {
    convertedGrade = "B+";
} else if (avgGrade > 2.7) {
    convertedGrade = "B";
} else if (avgGrade > 2.3) {
    convertedGrade = "B-";
} else if (avgGrade > 2.0) {
    convertedGrade = "C+";
} else if (avgGrade > 1.7) {
    convertedGrade = "C";
} else if (avgGrade > 1.3) {
    convertedGrade = "C-";
} else if (avgGrade > 1.0) {
    convertedGrade = "D+";
} else if (avgGrade > 0.7) {
    convertedGrade = "D";
} else if (avgGrade >= 0.0){
    convertedGrade = "F";
} else{
    convertedGrade = "--";
    avgGrade = "--";
}

let profStatsDiv = document.querySelector(".TeacherFeedback__StyledTeacherFeedback-gzhlj7-0");
// profStatsDiv.style.display = "flex";

let afterStatsDiv = document.querySelector(".TeacherInfo__InfoButtonContainer-ti1fio-4");

// 1st new row
let profStatsDiv2 = document.createElement("div");
profStatsDiv2.classList.add("TeacherFeedback__StyledTeacherFeedback-gzhlj7-0", "cxVUGc");
let gradeElemParent = afterStatsDiv.parentNode;
gradeElemParent.insertBefore(profStatsDiv2, afterStatsDiv);

let gradeElem = document.createElement("div");
gradeElem.classList.add("FeedbackItem__StyledFeedbackItem-uof32n-0", "dTFbKx");

// Letter Grade div of the grade addition
let avgGradeElem = document.createElement("div");
avgGradeElem.innerText = convertedGrade;
avgGradeElem.classList.add("FeedbackItem__FeedbackNumber-uof32n-1", "kkESWs");
gradeElem.appendChild(avgGradeElem);

// "Avg Grade" div of the grade addition
let gradeElemText = document.createElement("div");
gradeElemText.innerText = "Avg Grade";
gradeElemText.classList.add("FeedbackItem__FeedbackDescription-uof32n-2", "hddnCs");
gradeElem.appendChild(gradeElemText);

profStatsDiv2.appendChild(gradeElem)

let gradePointElem = document.createElement("div");
gradePointElem.classList.add("FeedbackItem__StyledFeedbackItem-uof32n-0", "dTFbKx");

// Grade Point div of the grade addition
let avgGradeElem2 = document.createElement("div");
avgGradeElem2.innerText = avgGrade.toFixed(2);
avgGradeElem2.classList.add("FeedbackItem__FeedbackNumber-uof32n-1", "kkESWs");
gradePointElem.appendChild(avgGradeElem2);

// "GPA" div of the grade addition
let gradeElemText2 = document.createElement("div");
gradeElemText2.innerText = "        GPA        ";
gradeElemText2.classList.add("FeedbackItem__FeedbackDescription-uof32n-2", "hddnCs");
gradePointElem.appendChild(gradeElemText2);

profStatsDiv2.appendChild(gradePointElem)


// 2nd new row
let profStatsDiv3 = document.createElement("div");
profStatsDiv3.classList.add("TeacherFeedback__StyledTeacherFeedback-gzhlj7-0", "cxVUGc");
gradeElemParent = afterStatsDiv.parentNode;
gradeElemParent.insertBefore(profStatsDiv3, afterStatsDiv);

let gradeDistElem = document.createElement("div");
gradeDistElem.classList.add("FeedbackItem__StyledFeedbackItem-uof32n-0", "dTFbKx");

// Letter Grade div of the grade addition
let modeGradeElem = document.createElement("div");
modeGradeElem.innerText = mostOftenGrade;
modeGradeElem.classList.add("FeedbackItem__FeedbackNumber-uof32n-1", "kkESWs");
gradeDistElem.appendChild(modeGradeElem);

// "Most Common Grade" div of the grade addition
let mostGradeText = document.createElement("div");
mostGradeText.innerText = "Most Common Grade";
mostGradeText.classList.add("FeedbackItem__FeedbackDescription-uof32n-2", "hddnCs");
gradeDistElem.appendChild(mostGradeText);

profStatsDiv3.appendChild(gradeDistElem)

