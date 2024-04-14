//Url template for each professor
const ratingURLTemplate = "https://www.ratemyprofessors.com/professor/";

let professorRatings = new Map();

startHelper();

async function startHelper() {
    const response = await fetch(chrome.runtime.getURL("data/ratings.json"));
    const data = await response.json();
    let ratings = data;
    if (typeof data === "string") {
        ratings = JSON.parse(data);
    }
    for (const professor of ratings) {
        const nameClean = getCleanName(`${professor.firstName} ${professor.lastName}`);
        const professorsEntryForName = professorRatings.get(nameClean) || [];
        professorsEntryForName.push(professor);
        professorRatings.set(nameClean, professorsEntryForName);
    }
    
    //Pages URL
    const currentURL = window.location.href;

    //If we are on webreg or if we're on classes.usc.edu
    if (currentURL.includes("webreg") && !currentURL.includes("/myCourseBin")) {
      parseWebReg();
    }
}

function parseWebReg() {
    //Because we insert a new column, we need to change the CSS around to make it look right
    changeCSSColumnWidth();
    //Iterate over every div. The layout of webreg is alternating divs for class name/code and then its content
    const classes = $(".accordion-content-area");
    //Parses each class found previously
    $(classes).each(function () {
        try {
          //Insert Prof Rating column at top of each class view
          const header = $(this).find(".section_head");
          insertProfRatingHeader(header);
          //Iterate over every section in row. To get alternating colors, USC uses alt0 and alt1, so we must search for both
          const sections = $(this).find(".section_crsbin");
          parseSections(sections);
        } catch (e) {
          console.error(e);
          console.error("Failed to parse a class!");
        }
      });
}

function parseSections(sections) {
    $(sections).each(function () {
      try {
        //Retrieve Instructor cell from row
        const rows = $(this).find(".section_row").toArray();
        const instructorRow = rows.find((r) =>
          r.innerText.includes("Instructor")
        );
        //get all professor names in a hacky way
        const instructors = instructorRow.innerText
          .replace("Instructor:", "")
          .trim();

        // insertBlankRatingCell(this);
        //split on line breaks
        const names = instructors
          .trim()
          .split("<br>")
          .filter(Boolean)
          .flatMap((l) => l.split("\n"))
          .map((l) => l.trim())
          .filter(Boolean);
  
        //if there are multiple instructors
        for (const name of names) {
            parseProfessor(name, this);
        }
      } catch (e) {
        console.error(e);
        console.error(`Failed to parse row ${this}!`);
      }
    });
}

function parseProfessor(instructor, row) {
    let nameParts = instructor.split(/[, ]/).filter(Boolean);
    //generate actual name
    const professors =
      professorRatings.get(getCleanName(`${nameParts[1]} ${nameParts[0]}`)) ||
      professorRatings.get(
        getCleanName([nameParts.pop(), ...nameParts].join(" "))
      ) ||
      professorRatings.get(getCleanName(nameParts.reverse().join(" ")));
    //If instructor name in json
    if (professors) {
      insertRatingCell(row, professors);
    } else {
      insertBlankRatingCell(row);
    }
}

function insertBlankRatingCell(row) {
    $(row).addClass("blank_rating");
    const rows = $(row).find(".section_row").toArray();
    const instructorRow = rows.find((r) => r.innerText.includes("Instructor"));
    if (instructorRow) $(instructorRow).after('<span class="instr_alt1 empty_rating col-xs-12 col-sm-12 col-md-1 col-lg-1"><span \
    class="hidden-lg hidden-md visible-xs-* visible-sm-* table-headers-xsmall">Unavailable</span></span>');
}

function insertRatingCell(row, professors) {
    for (const prof of professors) {
    const url = ratingURLTemplate + prof.legacyId;

    const rows = $(row).find(".section_row").toArray();
    const instructorRow = rows.find((r) => r.innerText.includes("Instructor"));

    let grade = `<a class="rating" href=${url} target="_blank">View</a>`;
    $(instructorRow).after(
        `<span class="hours_alt1 text-md-center col-xs-12 col-sm-12 col-md-1 col-lg-1"><span class="hidden-lg hidden-md hidden-visible-xs-* visible-sm-* table-headers-xsmall">Average Grade</span>${grade}</span>`
    );
    }
}

function insertProfRatingHeader(header) {
    if (!header) {
      return;
    }
    let rows = $(header).find(".section_row");
    const instructorRow = rows.toArray().find((r) => r.innerText.includes("Instructor")) || rows[7];
    if (instructorRow) {
      $(instructorRow).after(
        '<span class="section_row col-md-1 col-lg-1"><b>Average Grade</b></span>'
      );
    }
}

function getCleanName(name) {
    return name.toLowerCase().replace(/[^a-zA-Z]/gi, "");
}

function changeCSSColumnWidth() {
    //Sets CSS of page to display everything correctly
    $(".rm_").css({
      width: "4%",
    });
    $(".btnAddToMyCourseBin").css({
      width: "12%",
      float: "right",
    });
  
    $(".session").css({
      width: "4%",
    });

    $(".section_row").css({
        width: "8%",
      });
  
    $(`<style type='text/css'>
        @media (min-width: 992px) {
            .text-md-center {
                text-align: center;
            }
        }
       </style>`).appendTo("head");
}