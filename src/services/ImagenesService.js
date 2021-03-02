function obtener_array_imagenes(e, arrayComponete) {
    let array_imagenes = arrayComponete
    const crear_imagen = function(file){        
        var reader = new FileReader();
        reader.onload = (e) => {            
            let obj = {
                imgbase: e.target.result.split(",")[1],
                name: file.name,
            };            
            array_imagenes.push(obj);            
        };
        reader.readAsDataURL(file);
    }
    var files = e.target.files || e.dataTransfer.files;
    if (!files.length) return [];
    else {
        for (let item of files) {        
            crear_imagen(item);
        }               
        return array_imagenes
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
    base64_to_file
}