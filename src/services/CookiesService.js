function formato_cookies_usuario(listaPlazasUser, tipoUsuario){
    let plazasUsuario = listaPlazasUser.map(item => {
        return {
            refereciaPlaza: item.referenceSquare,
            administradorId: item.adminSquareId,
            numeroPlaza: item.squareCatalogId,
            plazaNombre: item.squareName
        }
    })    
    let rollNombre = tipoUsuario.find(tipoUser => tipoUser.id == listaPlazasUser[0].rollId).nombre
    let userValido = plazasUsuario.length > 0 ? true : false
    let cookies = {
        rollId: listaPlazasUser[0].rollId,
        nombreRoll: rollNombre,
        userId: listaPlazasUser[0].userId,
        plazasUsuario: plazasUsuario,
        registrado: userValido
    }    
    localStorage.setItem('cookiesUser', cookies);   
    return cookies 
}
export default{
    formato_cookies_usuario
}