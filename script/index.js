let localTime;
const hourWords = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve'];
const minuteWords = ['five', 'ten', 'fifteen', 'twenty', 'twenty five', 'thirty', 'thirty five', 'forty', 'forty five', 'fifty', 'fifty five'];
let wordArr = [];
let timeString = [];
let remainder = 0;

let mainDiv = document.getElementById("main");


let grid = mainDiv.innerHTML;

const timeToWords = (time) => {
    timeString = []

    let simpleTime = time.split(":");
    let hour = simpleTime[0];
    let minute = simpleTime[1];
    let seconds = simpleTime[2];

    wordArr.push(hourWords[hour > 12 ? hour - 12 : hour - 1]);

    let roundedMinute;
    if (minute % 5 == 0) {
        roundedMinute = minute;
    } else {
        for (let i = 1; i < 4; i++) {
            if ((minute - i) % 5 == 0) {
                roundedMinute = minute - i;
                remainder = i;
            }
        }
    }

    console.log(roundedMinute);

    wordArr.push(minuteWords[roundedMinute / 5 - 1]);

    if (roundedMinute == 0) {
        timeString[0] = wordArr[0]
        timeString[1] = "oclock";
    } else if (roundedMinute == 30) {
        timeString[0] = "half"
        timeString[1] = "past";
        timeString[2] = wordArr[0];
    } else if (roundedMinute == 5 || roundedMinute == 10 || roundedMinute == 20 || roundedMinute == 25) {
        timeString[0] = wordArr[1];
        timeString[1] = "past";
        timeString[2] = wordArr[0];
    } else if (roundedMinute == 15) {
        timeString[0] = "quarter"
        timeString[1] = "past";
        timeString[2] = wordArr[0];
    } else if (roundedMinute == 45) {
        timeString[0] = "quarter"
        timeString[1] = "to";
        timeString[3] = hourWords[hour + 1];
    } else if (roundedMinute == 55 || roundedMinute == 50 || roundedMinute == 40 || roundedMinute == 25) {
        timeString[0] = minuteWords[roundedMinute - 60];
        timeString[1] = "to"
        timeString[2] = hourWords[hour + 1];
    }
};

const getTime = () => {
    localTime = new Date().toLocaleTimeString('en-GB');

    timeToWords(localTime);

    let dots = [];
    for (let i = 0; i < remainder; i++) {
        dots.push("•");
    }

    console.log(timeString);

    for (let i = 0; i < timeString.length; i++) {
        grid = mainDiv.innerHTML;

        const upperString = timeString[i].toUpperCase();
        const newString = upperString.split("").join(" ");

        const index = grid.indexOf(newString);
        console.log(`${index} -> ${grid[index]}`)

        let updatedGrid = grid.substring(0, index) + `<span style="color: white">` + grid.substring(index, index + newString.length) + "</span>" + grid.substring(index + newString.length);
        mainDiv.innerHTML = ' ';
        mainDiv.innerHTML = updatedGrid;
    }
};