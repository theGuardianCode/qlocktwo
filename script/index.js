let localTime;
const hourWords = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve'];
const minuteWords = ['five', 'ten', 'fifteen', 'twenty', 'twenty five', 'thirty', 'thirty five', 'forty', 'forty five', 'fifty', 'fifty five'];
let wordArr = [];
let timeString = {};
let remainder = 0;

let dotDiv = document.getElementById("dots");

let mainDiv = document.getElementById("main");


let grid = mainDiv.innerHTML;

const timeToWords = (time) => {
    timeString = {}

    let simpleTime = time.split(":");
    let hour = parseInt(simpleTime[0]);
    let minute = parseInt(simpleTime[1]);
    let seconds = simpleTime[2];

    wordArr.push(hourWords[hour > 12 ? hour - 12 : hour - 1]);

    console.log(simpleTime);

    let roundedMinute;
    if (minute % 5 == 0) {
        roundedMinute = minute;
    } else {
        for (let i = 1; i < 5; i++) {
            if ((minute - i) % 5 == 0) {
                roundedMinute = minute - i;
                remainder = i;
            }
        }
    }

    wordArr.push(minuteWords[roundedMinute / 5 - 1]);

    if (roundedMinute == 0) {
        timeString = {
            hour: wordArr[0],
            connector: "oclock"
        };
    } else if (roundedMinute == 30) {
        timeString = {
            minute: "half",
            connector: "past",
            hour: wordArr[0]
        };
    } else if (roundedMinute == 5 || roundedMinute == 10 || roundedMinute == 20 || roundedMinute == 25) {
        timeString = {
            minute: wordArr[1],
            connector: "past",
            hour: wordArr[0]
        };
    } else if (roundedMinute == 15) {
        timeString = {
            minute: "quarter",
            connector: "past",
            hour: wordArr[0]
        };
    } else if (roundedMinute == 45) {
        timeString = {
            minute: "quarter",
            connector: "to",
            hour: hourWords[hour]
        };
    } else if (roundedMinute == 55 || roundedMinute == 50 || roundedMinute == 40 || roundedMinute == 35 || roundedMinute == 25) {
        timeString = {
            minute: minuteWords[(60 - roundedMinute) / 5 - 1],
            connector: "to",
            hour: hourWords[hour]
        };
    }
};

const getTime = () => {
    localTime = new Date().toLocaleTimeString('en-GB');

    timeToWords(localTime);

    let dots = [];
    for (let i = 0; i < remainder; i++) {
        dots.push("•");
    }

    dotDiv.innerHTML = ' ';
    dotDiv.innerHTML = dots.join(' ');

    for (let i in timeString) {
        
        if (Object.keys(timeString)[i] == "hour") {
            grid = document.getElementById("hourblock");
        } else {
            grid = mainDiv.innerHTML;
        }

        const upperString = timeString[i].toUpperCase();
        const newString = upperString.split("").join(" ");

        console.log(newString);

        const index = grid.indexOf(newString);

        let updatedGrid = grid.substring(0, index) + `<span style="color: white">` + grid.substring(index, index + newString.length) + "</span>" + grid.substring(index + newString.length);
        mainDiv.innerHTML = ' ';
        mainDiv.innerHTML = updatedGrid;

        i++;
    }
};