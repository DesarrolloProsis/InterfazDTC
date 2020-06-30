/*///////////////////////////////////////////////////////////////////*/
/*//              FUNCIONES PARA LA FECHA EN LETRAS                //*/
/*///////////////////////////////////////////////////////////////////*/

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
    var totoal_dias = cantMonths * 30;




    if (cantYears > 0)
        msg = cantYears + ' años ';    
    if (cantDays > 0)
        totoal_dias += cantDays    
    if (cantYears > 0 && totoal_dias > 0){       
        msg += 'y '
    }    
    else{
        msg += ' '
    }
    if(totoal_dias > 0)
        msg +=  totoal_dias + ' dias'	

        
	return msg;
}


/*///////////////////////////////////////////////////////////////////////////////*/
/*//  FUNCIONES PARA COMPONENTE PRE-PARTIDA && EDITAR &&  PARTIDA $STORE       //*/
/*///////////////////////////////////////////////////////////////////////////////*/

import moment from "moment";
    
function lane_select(laneSelect, keyObjectRequire, equipoValid, dateSinester){

    let key_Require = []
    let arrayRequire = {}

    if(Array.isArray(keyObjectRequire)){
        
        let newObj = new Object();
        for(const key of keyObjectRequire){
            newObj[key] = []
        }
        arrayRequire = newObj
        key_Require = Object.keys(arrayRequire)        
    }    
    else{
        arrayRequire = keyObjectRequire
        key_Require = Object.keys(arrayRequire)        
    }        
    //Patida
    arrayRequire[key_Require[0]] = []
    //Unidad
    arrayRequire[key_Require[1]] = equipoValid[0].unity
    //Nombre Componente
    arrayRequire[key_Require[2]] = ""
    //Cantidad
    arrayRequire[key_Require[3]] = laneSelect.length
    //Ubicacion
    arrayRequire[key_Require[7]] = []
    //UpRow
    arrayRequire[key_Require[14]] = true

    for(const lane of laneSelect){

        let component = equipoValid.find(comp => comp.lane === lane)    
        //Marca
        if(arrayRequire[key_Require[4]].includes(component.brand) == false)
            arrayRequire[key_Require[4]].push(component.brand)
        //Modelo        
        arrayRequire[key_Require[5]].push(component.model)
        //Numero Serie        
        arrayRequire[key_Require[6]].push(component.serialNumber)
        //Fecha Instalacion
        arrayRequire[key_Require[8]].push(component.instalationDate)
        //Fecha Mantenimiento                
        arrayRequire[key_Require[9]].push(component.maintenanceDate)
        //Folio Mantenimiento        
        arrayRequire[key_Require[10]].push(component.maintenanceFolio)
        //Fecha Real
        let fechaInstalacion = moment(component.instalationDate).format("DD/MM/YYYY");
        let fechaSinester = moment(dateSinester).format("DD/MM/YYYY");
        let fecha_format = daysMonthsYearsInDates(fechaInstalacion, fechaSinester)        
        arrayRequire[key_Require[11]].push(fecha_format)
        //Fecha Fabricante        
        arrayRequire[key_Require[12]].push(component.lifeTime)            
        //Precio
        if(arrayRequire[key_Require[13]].includes(component.unitaryPrice) == false)
            arrayRequire[key_Require[13]].push(component.unitaryPrice)                
    }

    return arrayRequire    
}

function obj_partida(laneSelect, equipoValid, dateSinester){
        
    let newObjectPartida = []
    for(const lane of laneSelect){
                        
        let component = equipoValid.find(item => item.lane == lane)

        
        
        let fechaInstalacion = moment(component.instalationDate).format("DD/MM/YYYY");
        let fechaSinester = moment(dateSinester).format("DD/MM/YYYY");
        let fecha_format = daysMonthsYearsInDates(fechaInstalacion, fechaSinester)   
        
        let obj = {
            ComponentsStockId: component['componentsStockId'],
            ReferenceNumber: "",
            CapufeLaneNum: component['capufeLaneNum'],
            IdGare: component['idGare'],
            Marca: component['brand'],
            Modelo: component['model'],
            NumSerie: component['serialNumber'],
            Unity: component['unity'],
            DateInstallationDate: component['instalationDate'],
            DateMaintenanceDate: component['maintenanceDate'],
            MaintenanceFolio: component['maintenanceFolio'],
            IntLifeTimeExpected: component['lifeTime'],
            strLifeTimeReal: fecha_format,
            IntPartida: ""
        };
        newObjectPartida.push(obj)        
    }
    
    return newObjectPartida
}


export default{
    
    lane_select,
    obj_partida
    
}