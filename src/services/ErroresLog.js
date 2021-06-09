
import { wonder } from "wonderlog-console";
function mapear_error_404(errorResponse){          
    wonder.log(wonder.dangerTag(`ERROR ${errorResponse.status} TIPO SOLICITUD ${errorResponse.config.method.toUpperCase()}`));
    wonder.log(wonder.bgBlue(wonder.white(`Ruta:`)), wonder.blue(`${errorResponse.config.url}`))
    wonder.log(wonder.bgBlue(wonder.white('PARAMETROS:')), wonder.blue(`${errorResponse.config.data}`))
    wonder.log(wonder.bgBlue(wonder.white('PARAMETROS:')), wonder.blue(`${errorResponse.config.data}`))    
}

export default {
    mapear_error_404
}