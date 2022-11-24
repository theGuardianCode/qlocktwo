let localTime;
const hourWords = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve'];
const minuteWords = ['five', 'ten', 'fifteen', 'twenty', 'twenty five', 'thirty', 'thirty five', 'forty', 'forty five', 'fifty', 'fifty five'];
let wordArr = [];
let timeString = '';
let remainder = 0;

const timeToWords = (time) => {
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

    wordArr.push(minuteWords[roundedMinute / 5 - 1]);

    if (roundedMinute == 0) {
        timeString = wordArr[0] + " o' clock";
    } else if (roundedMinute == 30) {
        timeString = "half past " + wordArr[0];
    } else if (roundedMinute == 5 || roundedMinute == 10 || roundedMinute == 20 || roundedMinute == 25) {
        timeString = wordArr[1] + " past " + wordArr[0];
    } else if (roundedMinute == 15) {
        timeString = "quarter past " + wordArr[0];
    } else if (roundedMinute == 45) {
        timeString = "quarter to " + hourWords[hour + 1];
    } else if (roundedMinute == 55 || roundedMinute == 50 || roundedMinute == 40 || roundedMinute == 25) {
        timeString = minuteWords[roundedMinute - 60] + " to " + hourWords[hour + 1];
    }
};

const getTime = () => {
    localTime = new Date().toLocaleTimeString('en-GB');

    timeToWords(localTime);

    let dots = [];
    for (let i = 0; i < remainder; i++) {
        dots.push("•");
    }

    console.log(`${wordArr.join(' ')}`);

    document.getElementById("clock").innerHTML = '';
    document.getElementById("dots").innerHTML = '';
    document.getElementById("clock").innerHTML = timeString;
    document.getElementById("dots").innerHTML = dots.join(' ');
};