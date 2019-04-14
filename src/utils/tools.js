function transferDate(str) {
    let dateArr = str.split("-");
    return dateArr[0] + "年" + dateArr[1] + "月" + dateArr[2] + "日"; 
}

export default {
    transferDate
}