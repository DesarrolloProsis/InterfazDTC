function obtener_array_imagenes(e, arrayComponete) {    
    let array_imagenes = arrayComponete
    const crear_imagen = function(file){        
        var reader = new FileReader();
        reader.onload = (e) => {
            let obj = {
                imgbase: e.target.result.split(",")[1],
                name: file.name.substr(-20),
            };                        
            array_imagenes.push(obj);            
        };
        reader.readAsDataURL(file);
    }
    var files = e.target.files || e.dataTransfer.files;
    if (!files.length) return [];
    else {        
        for (let item of files) {                          
            crear_imagen(item)                      
        }                    
        return array_imagenes
    }
}
function obtener_array_imagenes_agregadas(urlLocal, arrayComponete, objGetImage){
    let paramsSplit = urlLocal.split('\\')    
    console.log(urlLocal.split('\\'));
    let url = ''
    if(objGetImage.tipo == 1){
        url = `${objGetImage.rutaGetImagen}/${paramsSplit[2]}/${paramsSplit[4]}/${paramsSplit[6]}`
        arrayComponete.push({
            imgbase: url,
            name: paramsSplit[6]
        })
        return arrayComponete
    }
    else if(objGetImage.tipo == 2){
        url = `${objGetImage.rutaGetImagen}/${paramsSplit[2]}/${paramsSplit[4]}/${paramsSplit[6]}`
        arrayComponete.push({
            imgbase: url,
            name: paramsSplit[6]
        })
        return arrayComponete
    }
    else if(objGetImage.tipo == 3){
        url = `${objGetImage.rutaGetImagen}/${paramsSplit[2]}/${paramsSplit[4]}/${paramsSplit[6]}`
        arrayComponete.push({
            imgbase: url,
            name: paramsSplit[6]
        })
        return arrayComponete
    }
    else if(objGetImage.tipo == 5){
        url = `${objGetImage.rutaGetImagen}/${paramsSplit[2]}/${paramsSplit[4]}/${paramsSplit[8]}/${paramsSplit[6]}`
        arrayComponete.push({
            imgbase: url,
            name: paramsSplit[8]
        })
        return arrayComponete
    }
    else{
        url = `${objGetImage.rutaGetImagen}/${paramsSplit[2]}/${paramsSplit[4]}/${paramsSplit[6]}`
        arrayComponete.push({
            imgbase: url,
            name: paramsSplit[6]
        })
        return arrayComponete
    }
    
   
}
function base64_to_file(dataurl, fileName) {    
    let url = "data:image/jpeg;base64," + dataurl;      
    var arr = url.split(","),
    mime = arr[0].match(/:(.*?);/)[1],    
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }        
    return new File([u8arr], fileName, { type: mime });
}
export default {
    obtener_array_imagenes,
    obtener_array_imagenes_agregadas,
    base64_to_file
}