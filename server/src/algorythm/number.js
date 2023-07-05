module.exports.numberToDB = function(numberstr){
    let bdnumber = '';
    for (let i = 0; i < numberstr.length; i++) {
        if(numberstr[i] >= '0' && numberstr[i] <= '9'){
            bdnumber = bdnumber + numberstr[i];
        }
    }
    if (bdnumber.length > 12 || bdnumber.length < 1) {
        return '0';
    }
    if (numberstr[0] + numberstr[1] === '+7'){
        bdnumber = '8' + bdnumber.slice(1);
    }
    return bdnumber;
}
