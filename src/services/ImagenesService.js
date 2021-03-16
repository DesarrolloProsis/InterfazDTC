function obtener_array_imagenes(e, arrayComponete) {
    let contar = arrayComponete.length
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
<<<<<<< HEAD
    else {        
        for (let item of files) {              
            if(contar  < 5){
=======
    else {
        
        for (let item of files) {  
            
            if(contar  < 36){
>>>>>>> 0c7806e2ce6c0887f3eedeb5b6c9f8e0e8131563
                crear_imagen(item)
                contar++
            }                
        }  
        console.log(array_imagenes)             
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