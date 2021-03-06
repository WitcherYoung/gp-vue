function transferDate(str) {
    let dateArr = str.split("-");
    return dateArr[0] + "年" + dateArr[1] + "月" + dateArr[2] + "日";
}

function transferDateStr(str) {
    let time = new Date(str);
    console.log(time.getFullYear + "年" + (time.getMonth+1) + "月" + time.getDate + "日");
    return time.getFullYear() + "年" + (time.getMonth()+1) + "月" + time.getDate() + "日";
}

function transferTime(str) {
    let date = "", time = "", timeArr = str.split("T");
    date = transferDate(timeArr[0]);
    time = timeArr[1].substring(0,8);
    return date + " " + time;
}

function detectName(formRegister) {
    let regExp;
    let message = {
        isLegal: true,
        msg: ""
    }
    // 验证账号
    if (!formRegister.username) {
        message.isLegal = false;
        message.msg = "账号不能为空";
        return message
    } else {
        regExp = new RegExp("^[a-zA-Z][a-zA-Z0-9_]{1,9}$"); // 以字母开头，长度在2~8 之间，只能包含字符、数字
        if (!regExp.test(formRegister.username)) {
            message.isLegal = false;
            message.msg = "账号格式错误";
            return message
        }
    }
    // 验证用户名
    if (formRegister.name) {
        regExp = new RegExp("^[\u4E00-\u9FA5A-Za-z]+[\u4E00-\u9FA5A-Za-z0-9_]*$"); // 2~8个字符, 需以字母或中文开头, 可使用字母、中文、数字、下划线
        if (!(formRegister.name.length > 1 && formRegister.name.length < 9) || !regExp.test(formRegister.name)) {
            message.isLegal = false;
            message.msg = "用户名格式错误";
            return message
        }
    }
    // 验证密码
    if (!formRegister.pwd) {
        message.isLegal = false;
        message.msg = "密码不能为空";
        return message
    } else {
        regExp = new RegExp("^[A-Za-z]+[A-Za-z0-9_]*$"); // 6~16个字符, 需以字母开头, 可使用字母、数字、下划线
        if (!(formRegister.pwd.length > 5 && formRegister.pwd.length < 17) || !regExp.test(formRegister.pwd)) {
            message.isLegal = false;
            message.msg = "密码格式错误";
            return message
            
        }
    }
    // 验证年龄
    if (formRegister.age) {
        regExp = new RegExp("^(\\d|[1-9]\\d|100)$"); // 0~100数字
        if (!regExp.test(formRegister.age)) {
            message.isLegal = false;
            message.msg = "年龄格式错误";
            return message
        }
    }
    // 性别 默认值 为 男 无需验证
    // 验证邮箱
    if (!formRegister.mail) {
        message.isLegal = false;
        message.msg = "邮箱不能为空";
        return message
    } else {
        regExp = new RegExp("^([a-zA-Z0-9]+[-_\.]?)+@[a-zA-Z0-9]+\.[a-z]+$"); // 匹配邮箱
        if (!regExp.test(formRegister.mail)) {
            message.isLegal = false;
            message.msg = "邮箱格式错误";
            return message
        }
    }
    
    return message
}

function detectChange(type, val) {
    let regExp;
    let message = {
        isLegal: true,
        msg: ""
    }
    switch(type) {
        case 1: 
            // 验证用户名
            if (!val) {
                message.isLegal = false;
                message.msg = "用户名不能为空";
                return message
            }else {
                regExp = new RegExp("^[\u4E00-\u9FA5A-Za-z]+[\u4E00-\u9FA5A-Za-z0-9_]*$"); // 2~8个字符, 需以字母或中文开头, 可使用字母、中文、数字、下划线
                if (!(val.length > 1 && val.length < 9) || !regExp.test(val)) {
                    message.isLegal = false;
                    message.msg = "用户名格式错误";
                    return message
                }
            }
            break;
        case 2: 
            // 验证密码
            if (!val) {
                message.isLegal = false;
                message.msg = "密码不能为空";
                return message
            } else {
                regExp = new RegExp("^[A-Za-z]+[A-Za-z0-9_]*$"); // 6~16个字符, 需以字母开头, 可使用字母、数字、下划线
                if (!(val.length > 5 && val.length < 17) || !regExp.test(val)) {
                    message.isLegal = false;
                    message.msg = "密码格式错误";
                    return message
                    
                }
            }
            break;
        case 3: 
            // 验证年龄
            if (val) {
                regExp = new RegExp("^(\\d|[1-9]\\d|100)$"); // 0~100数字
                if (!regExp.test(val)) {
                    message.isLegal = false;
                    message.msg = "年龄格式错误";
                    return message
                }
            }
            break;
        // 性别 默认值 为 男 无需验证
        case 5: 
            // 验证邮箱
            if (!val) {
                message.isLegal = false;
                message.msg = "邮箱不能为空";
                return message
            } else {
                regExp = new RegExp("^([a-zA-Z0-9]+[-_\.]?)+@[a-zA-Z0-9]+\.[a-z]+$"); // 匹配邮箱
                if (!regExp.test(val)) {
                    message.isLegal = false;
                    message.msg = "邮箱格式错误";
                    return message
                }
            }
            break;
        default: 
            message.isLegal = false;
            message.msg = "缺少验证类型"
    }
    
    return message
}

function getCurrentTime() {
    let time = new Date();
    // 2018-03-23 19:34:00
    return time.getFullYear() + "-" + (time.getMonth()+1) + "-" + time.getDate() + " " + time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds()
}

export default {
    transferDate,
    transferDateStr,
    transferTime,
    detectName,
    getCurrentTime,
    detectChange
}