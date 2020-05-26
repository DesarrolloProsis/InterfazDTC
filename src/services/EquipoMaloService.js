function numDayInDates(dateStart, dateEnd){
    var arrayDateStart = dateStart.split('/'); 
    var arrayDateEnd = dateEnd.split('/');        
    var msegDateStart = Date.UTC(arrayDateStart[2], arrayDateStart[1]-1, arrayDateStart[0]); 
    var msegDateEnd = Date.UTC(arrayDateEnd[2], arrayDateEnd[1]-1, arrayDateEnd[0]); 
    var diff = msegDateEnd - msegDateStart;    
    var days = Math.floor(diff / (1000 * 60 * 60 * 24)); 
    return days;  
}
function daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
}
function sumDaysToDate(numDays, date){
    var arrayDate = date.split('/');
    var newDate = new Date(arrayDate[2]+'/'+arrayDate[1]+'/'+arrayDate[0]);
    newDate.setDate(newDate.getDate()+parseInt(numDays));        
    return newDate.getDate() + '/' + (newDate.getMonth()+1) + '/'+ newDate.getFullYear();
}
function daysMonthsYearsInDates(dateStart, dateEnd){
    var daysTotals = numDayInDates(dateStart, dateEnd);
    var daysCal = 0;
    var cantDays = 0;
    var cantMonths = 0;
    var cantYears = 0;
    while(daysCal < daysTotals){
         var arrayDateStart = dateStart.split('/');
         var daysOfMonth = daysInMonth(arrayDateStart[1], arrayDateStart[2]);
         daysCal = daysCal + daysOfMonth;
         if(daysCal <= daysTotals){
        cantMonths ++;
        if(cantMonths == 12){
           cantYears++;
           cantMonths = cantMonths - 12;
        }
        }else{
           cantDays = Math.abs(numDayInDates(dateStart, dateEnd));
        }
        dateStart = sumDaysToDate(daysOfMonth, dateStart);
    }
   
    var msg = '';
    var totoal_dias = 0;

    if (cantYears > 0)
        msg = cantYears + ' años ';
    if (cantMonths > 0) {
        // if (cantYears > 0) msg += ' y ';
        // msg += cantMonths + ' meses';
        totoal_dias = cantMonths * 30
    }
       
    if (cantDays > 0) {
    //    if (cantMonths > 0) msg += ' y ';         
    //    msg += cantDays + ' días';
        totoal_dias += totoal_dias + cantDays
    }   
    msg += 'y ' + totoal_dias + ' dias' 
    
    return msg;
    }



export default{

    daysMonthsYearsInDates
    
}