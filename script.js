const moment = require("moment")

function getDatee(){
    console.log(moment().format("YYYY/MM/DD hh:mm:ss"))
}
getDatee()