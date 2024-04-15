let numRefresh = 0;
chrome.runtime.onMessage.addListener((message) => {
    if (message.url && message.url.includes("ratemyprof")) {
      console.log("Professor page detected:", message.url);
      // Now you can call your script to process data (runScript())
      numRefresh = 0;
      location.reload();
    }
  });

const currentURL = window.location.href;
console.log("Current URL: " + currentURL);
if (currentURL.includes("https://www.ratemyprofessors.com/professor/")) {
    console.log("Inside the site");
    
    // Function to fetch and process all hidden data
    function fetchAllData() {
        numRefresh += 1;
        console.log("Number of refresh: " + numRefresh);
        // Function to simulate clicking the "Load More Ratings" button
        function clickLoadMoreButton() {
            const loadMoreButton = document.querySelector(".Buttons__Button-sc-19xdot-1");
            if (loadMoreButton) {
                loadMoreButton.click();
                return true;
            }
            return false;
        }
    
        // Click the "Load More Ratings" button to load hidden data
        const loadMoreClicked = clickLoadMoreButton();
    
    
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
            "Pass": 0,
            "No Pass": 0
        };
    
        // Populates the grade dictionary based off the grade received in RMP
        for (let i = 0; i < gradeTextArray.length; i++) {
            if (gradeTextArray[i] !== "Rather not say" && gradeTextArray[i] !== "Not sure yet") {
                gradeDictionary[gradeTextArray[i]]++;
            }
        }
    
        // totalGradeCredit = total grade received
        // GPA = totalGradeCredit/numberRatings
        let totalGradeCredit = 0.0;
        let numberRatings = 0;
        let mostOften = 0;
        let mostOftenGrade = "--";
        let numberPassed = 0;
        // Calculates the total GPA
        for (let grade in gradeDictionary) {
            switch (grade) {
                case "A+":
                case "A":
                case "A-":
                case "B+":
                case "B":
                case "B-":
                case "C+":
                case "C":
                case "C-":
                    totalGradeCredit += (calculateGradeValue(grade) * gradeDictionary[grade]);
                    numberRatings += gradeDictionary[grade];
                    numberPassed += gradeDictionary[grade];
                    if (gradeDictionary[grade] > mostOften) {
                        mostOften = gradeDictionary[grade];
                        mostOftenGrade = grade;
                    }
                    break;
                case "D+":
                case "D":
                case "D-":
                case "F":
                    totalGradeCredit += (calculateGradeValue(grade) * gradeDictionary[grade]);
                    numberRatings += gradeDictionary[grade];
                    if (gradeDictionary[grade] > mostOften) {
                        mostOften = gradeDictionary[grade];
                        mostOftenGrade = grade;
                    }
                    break;
                case "Pass":
                    numberPassed += gradeDictionary[grade];
                    break;
            }
        }
    
        let avgGrade = (numberRatings !== 0) ? totalGradeCredit / numberRatings : -1;
        let numberTotal = numberRatings + gradeDictionary["Pass"] + gradeDictionary["No Pass"];
        let passRate = (numberTotal !== 0) ? (numberPassed / numberTotal) * 100 : -1;
        let aRate = (numberRatings !== 0) ? ( (gradeDictionary["A"] + gradeDictionary["A+"])/ numberRatings) * 100 : -1;
        let overBRate = (numberRatings !== 0) ? ( (gradeDictionary["A-"] + gradeDictionary["A+"] + gradeDictionary["A"] + gradeDictionary["B+"]) / numberRatings) * 100 : -1;
    
        if (avgGrade != -1){
            avgGrade = avgGrade.toFixed(2);
        } else avgGrade = "--";
        if(passRate != -1){
            passRate = passRate.toFixed(0);
        } else passRate = "--";
        if(aRate != -1){
            aRate = aRate.toFixed(0);
        } else aRate = "--";
        if(overBRate != -1){
            overBRate = overBRate.toFixed(0);
        } else overBRate = "--";
    
        console.log("Average Grade for this professor: " + avgGrade);
        console.log("Number of grade ratings: " + numberRatings);
    
        let convertedGrade = convertToLetterGrade(avgGrade);
    
        // Generate and append elements to display the calculated statistics
        if(numRefresh == 1){
            generateStatisticsElements(avgGrade, gradeDictionary, mostOftenGrade, passRate, aRate, overBRate, convertedGrade);
        } else{
            refreshStatisticsElements(avgGrade, gradeDictionary, mostOftenGrade, passRate, aRate, overBRate, convertedGrade);
        }
        
         // Select elements matching the CSS selector .cxVUGc
         let rows = document.querySelectorAll('.cxVUGc');
         // Loop through each selected element
         rows.forEach(function(row) {
             // Update the padding property
             row.style.marginBottom = '20px';
         });
     
         // Select elements matching the CSS selector .cxVUGc > :nth-child(2)
         let boxes1 = document.querySelectorAll('.cxVUGc > :nth-child(1)');
         // Loop through each selected element
         boxes1.forEach(function(box1) {
             // Update the padding property
             box1.style.padding = '12px 0px';
             box1.style.justifyContent = 'center';
         });
     
         // Select elements matching the CSS selector .cxVUGc > :nth-child(2)
         let boxes2 = document.querySelectorAll('.cxVUGc > :nth-child(2)');
         // Loop through each selected element
         boxes2.forEach(function(box2) {
             box2.style.padding = '12px 0px';
             box2.style.justifyContent = 'center';
         });
     
         let rmpBoxes = document.querySelectorAll(".dTFbKx");
         rmpBoxes.forEach(rmpBox => {
             rmpBox.style.width = "125px";
         });
    }
    
    // Helper function to calculate grade values
    function calculateGradeValue(grade) {
        switch (grade) {
            case "A+":
                return 4.0;
            case "A":
                return 4.0;
            case "A-":
                return 3.7;
            case "B+":
                return 3.3;
            case "B":
                return 3.0;
            case "B-":
                return 2.7;
            case "C+":
                return 2.3;
            case "C":
                return 2.0;
            case "C-":
                return 1.7;
            case "D+":
                return 1.3;
            case "D":
                return 1.0;
            case "D-":
                return 0.7;
            case "F":
                return 0.0;
        }
    }
    
    // Helper function to convert numerical grade to letter grade
    function convertToLetterGrade(avgGrade) {
        if (avgGrade > 3.7) {
            return "A";
        } else if (avgGrade > 3.3) {
            return "A-";
        } else if (avgGrade > 3.0) {
            return "B+";
        } else if (avgGrade > 2.7) {
            return "B";
        } else if (avgGrade > 2.3) {
            return "B-";
        } else if (avgGrade > 2.0) {
            return "C+";
        } else if (avgGrade > 1.7) {
            return "C";
        } else if (avgGrade > 1.3) {
            return "C-";
        } else if (avgGrade > 1.0) {
            return "D+";
        } else if (avgGrade > 0.7) {
            return "D";
        } else if (avgGrade >= 0.0) {
            return "F";
        } else {
            return "--";
        }
    }

    
    // Function to generate and append elements for displaying statistics
    function generateStatisticsElements(avgGrade, gradeDictionary, mostOftenGrade, passRate, aRate, overBRate, convertedGrade) {
        let profStatsDiv = document.querySelector(".TeacherFeedback__StyledTeacherFeedback-gzhlj7-0");
        let profStatsParentDiv = document.querySelector(".TeacherInfo__StyledTeacher-ti1fio-1");
        let beforeDiv = document.querySelector(".TeacherInfo__InfoButtonContainer-ti1fio-4");
    
        // 1st new row
        let profStatsDiv2 = document.createElement("div");
        let avgGradeDiv = createFeedbackItemDiv("Avg Grade", convertedGrade);
        console.log("Avg Grade: " + convertedGrade)
        let gradePointElem = createFeedbackItemDiv("Class GPA", avgGrade);
        console.log("Class GPA: " + avgGrade)
        avgGradeDiv.classList.add("avgGradeDiv");
        gradePointElem.classList.add("gradePointElem");
        profStatsDiv2.appendChild(avgGradeDiv)
        profStatsDiv2.appendChild(gradePointElem)
        profStatsDiv2.classList.add("TeacherFeedback__StyledTeacherFeedback-gzhlj7-0", "cxVUGc");
        profStatsDiv2.classList.add("profStatsDiv2");
        profStatsParentDiv.insertBefore(profStatsDiv2, beforeDiv);
        
    
        gradePointElem.style.backgroundColor = calculateColorFromGrade(avgGrade);
        avgGradeDiv.style.backgroundColor = calculateColorFromLetterGrade(convertedGrade);
    
    
        // 2nd new row
        let profStatsDiv3 = document.createElement("div");
        let modeGradeDiv = createFeedbackItemDiv("Most Common Grade", mostOftenGrade);
        let passRateElem = createFeedbackItemDiv("Passed", passRate + "%");
        modeGradeDiv.classList.add("modeGradeDiv");
        passRateElem.classList.add("passRateElem");
        profStatsDiv3.appendChild(modeGradeDiv)
        profStatsDiv3.appendChild(passRateElem)
        profStatsDiv3.classList.add("TeacherFeedback__StyledTeacherFeedback-gzhlj7-0", "cxVUGc");
        profStatsDiv3.classList.add("profStatsDiv3");
        profStatsParentDiv.insertBefore(profStatsDiv3, beforeDiv);
    
        modeGradeDiv.style.backgroundColor = calculateColorFromLetterGrade(mostOftenGrade);
        passRateElem.style.backgroundColor = calculateColorFromPassRate(passRate);
    
    
        // 3rd new row
        let profStatsDiv4 = document.createElement("div");
        let aGradeRateElem = createFeedbackItemDiv("Received an A", aRate + "%");
        let overBRateElem = createFeedbackItemDiv("B+ or Higher", overBRate + "%");
        aGradeRateElem.classList.add("aGradeRateElem");
        overBRateElem.classList.add("overBRateElem");
        profStatsDiv4.appendChild(aGradeRateElem)
        profStatsDiv4.appendChild(overBRateElem)
        profStatsDiv4.classList.add("TeacherFeedback__StyledTeacherFeedback-gzhlj7-0", "cxVUGc");
        profStatsDiv4.classList.add("profStatsDiv4");
        profStatsParentDiv.insertBefore(profStatsDiv4, beforeDiv);
    
        aGradeRateElem.style.backgroundColor = calculateColorFromARate(aRate);
        overBRateElem.style.backgroundColor = calculateColorFromOverBRate(overBRate);
    
        // reload button
        let reloadBtnRowDiv = document.querySelector(".TeacherInfo__InfoButtonContainer-ti1fio-4");
        let reloadButtonDiv = document.createElement("div");
        profStatsDiv.parentNode.insertBefore(reloadButtonDiv, document.querySelector(".TeacherInfo__InfoButtonContainer-ti1fio-4"));
        reloadBtnRowDiv.appendChild(reloadButtonDiv);
        reloadButtonDiv.classList.add("reloadButtonClass");
        reloadButtonDiv.classList.add(".EeKLq");
        var reloadButton = document.createElement("button");
        reloadButton.textContent = "Reload"; // Button text
        reloadButtonDiv.appendChild(reloadButton);

    
        // Add event listener to reloadButton
        if(reloadButtonDiv){
            reloadButton.addEventListener("click", function() {
                console.log("Refreshed the button!");
                runScript();
            
            });
        } else{
            console.log("Button doesn't exist.");
        }
    }
    
    function refreshStatisticsElements(avgGrade, gradeDictionary, mostOftenGrade, passRate, aRate, overBRate, convertedGrade) {
        let profStatsDiv = document.querySelector(".TeacherFeedback__StyledTeacherFeedback-gzhlj7-0");
    
        
        // Update the first row
        let profStatsDiv2 = document.querySelector(".profStatsDiv2");
        let avgGradeDiv = document.querySelector(".avgGradeDiv");
        let gradePointElem = document.querySelector(".gradePointElem");
    
    
        let avgGradeValue = avgGradeDiv.querySelector(".value");
        let avgGradeDescription = avgGradeDiv.querySelector(".description");
        avgGradeValue.innerText = convertedGrade;
        avgGradeDescription.innerText = "Avg Grade";
    
    
        let gradePointValue = gradePointElem.querySelector(".value");
        let gradePointDescription = gradePointElem.querySelector(".description");
        gradePointValue.innerText = avgGrade;
        gradePointDescription.innerText = "Class GPA";
    
    
        avgGradeDiv.style.backgroundColor = calculateColorFromLetterGrade(convertedGrade);
        gradePointElem.style.backgroundColor = calculateColorFromGrade(avgGrade);
    
        // Update the second row
        let profStatsDiv3 = document.querySelector(".profStatsDiv3");
        let modeGradeDiv = document.querySelector(".modeGradeDiv");
        let passRateElem = document.querySelector(".passRateElem");
    
        let modeGradeVal = modeGradeDiv.querySelector(".value");
        let modeGradeDescription = modeGradeDiv.querySelector(".description");
        modeGradeVal.innerText = mostOftenGrade;
        modeGradeDescription.innerText = "Most Common Grade";
    
        let passRateValue = passRateElem.querySelector(".value");
        let passRateDescription = passRateElem.querySelector(".description");
        passRateValue.innerText = passRate + "%";
        passRateDescription.innerText = "Passed";
    
        modeGradeDiv.style.backgroundColor = calculateColorFromLetterGrade(mostOftenGrade);
        passRateElem.style.backgroundColor = calculateColorFromPassRate(passRate);
    
        // Update the third row
        let profStatsDiv4 = document.querySelector(".profStatsDiv4");
        let aGradeRateElem = document.querySelector(".aGradeRateElem");
        let overBRateElem = document.querySelector(".overBRateElem");
    
        let aGradeVal = aGradeRateElem.querySelector(".value");
        let aGradeDescription = aGradeRateElem.querySelector(".description");
        aGradeVal.innerText = aRate + "%";
        aGradeDescription.innerText = "Received an A";
    
        let overBRateValue = overBRateElem.querySelector(".value");
        let overBRateDescription = overBRateElem.querySelector(".description");
        overBRateValue.innerText = overBRate + "%";
        overBRateDescription.innerText = "B+ or Higher";
    
        aGradeRateElem.style.backgroundColor = calculateColorFromARate(aRate);
        overBRateElem.style.backgroundColor = calculateColorFromOverBRate(overBRate); 
    }
    
    // Helper function to calculate color based on grade value
    function calculateColorFromGrade(grade) {
        // Convert grade to a number
        let numericGrade = parseFloat(grade);
        if (numericGrade > 3.7) {
            return '#13bf13'; // A
        } else if (numericGrade > 3.3) {
            return '#8ac93c'; // A-
        } else if (numericGrade > 3.0) {
            return '#96c91e'; // B+
        } else if (numericGrade > 2.7) {
            return '#e0b226'; // B
        } else if (numericGrade > 2.3) {
            return '#f0912b'; // B-
        } else if (numericGrade > 2) {
            return '#de6137'; // C+
        } else {
            return '#e34f44'; // C or below
        }
    }
    
    // Helper function to calculate color based on grade value
    function calculateColorFromLetterGrade(letterGrade) {
        // Convert grade to a number
        if (letterGrade === "A+") {
            return '#13bf13'; // A
        }
        else if (letterGrade === "A") {
            return '#13bf13'; // A
        } else if (letterGrade === "A-") {
            return '#8ac93c'; // A-
        } else if (letterGrade === "B+") {
            return '#96c91e'; // B+
        } else if (letterGrade === "B") {
            return '#e0b226'; // B
        } else if (letterGrade === "B-") {
            return '#f0912b'; // B-
        } else if (letterGrade === "C+") {
            return '#de6137'; // C+
        } else {
            return '#e34f44'; // C or below
        }
    }
    
    function calculateColorFromPassRate(passRate) {
        // Convert passRate to a number
        let numericPass = parseFloat(passRate);
        if (numericPass == 100) {
            return '#13bf13';
        } else if (numericPass >= 95) {
            return '#8ac93c';
        } else if (numericPass >= 90) {
            return '#96c91e';
        } else if (numericPass >= 85) {
            return '#e0b226';
        } else if (numericPass >= 80) {
            return '#f0912b';
        } else if (numericPass >= 75) {
            return '#de6137';
        } else {
            return '#e34f44';
        }
    }
    
    function calculateColorFromARate(aRate) {
        let numericARate = parseFloat(aRate);
        if (numericARate >= 50) {
            return '#13bf13';
        } else if (numericARate >= 35) {
            return '#8ac93c';
        } else if (numericARate >= 25) {
            return '#96c91e';
        } else if (numericARate >= 15) {
            return '#e0b226';
        } else if (numericARate >= 10) {
            return '#f0912b';
        } else if (numericARate >= 5) {
            return '#de6137';
        } else {
            return '#e34f44';
        }
    }
    
    function calculateColorFromOverBRate(overBRate) {
        let numericOverBRate = parseFloat(overBRate);
        if (numericOverBRate >= 95) {
            return '#13bf13';
        } else if (numericOverBRate >= 90) {
            return '#8ac93c';
        } else if (numericOverBRate >= 80) {
            return '#96c91e';
        } else if (numericOverBRate >= 70) {
            return '#e0b226';
        } else if (numericOverBRate >= 60) {
            return '#f0912b';
        } else if (numericOverBRate >= 50) {
            return '#de6137';
        } else {
            return '#e34f44';
        }
    }
    
    // Function to create a feedback item div
    function createFeedbackItemDiv(description, value) {
        let feedbackItemDiv = document.createElement("div");
        feedbackItemDiv.classList.add("FeedbackItem__StyledFeedbackItem-uof32n-0", "dTFbKx");
    
        let valueElem = document.createElement("div");
        valueElem.innerText = value;
        valueElem.classList.add("FeedbackItem__FeedbackNumber-uof32n-1", "kkESWs", "value");
        feedbackItemDiv.appendChild(valueElem);
    
        let descriptionElem = document.createElement("div");
        descriptionElem.innerText = description;
        descriptionElem.classList.add("FeedbackItem__FeedbackDescription-uof32n-2", "hddnCs", "description");
        feedbackItemDiv.appendChild(descriptionElem);
    
        return feedbackItemDiv;
    }
    
    // Function to fetch and process all hidden data
    fetchAllData();
    
    
    // Function to run the script
    function runScript() {
        fetchAllData();
    }


}

