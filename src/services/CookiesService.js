function formato_cookies_usuario(listaPlazasUser){
    let plazasUsuario = listaPlazasUser.map(item => {
        return {
            refereciaPlaza: item.referenceSquare,
            administradorId: item.adminSquareId,
            numeroPlaza: item.squareCatalogId,
            plazaNombre: item.squareName
        }
    })
    let userValido = plazasUsuario.length > 0 ? true : false
    let cookies = {
        rollId: listaPlazasUser[0].rollId,
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