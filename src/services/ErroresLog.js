
import { wonder } from "wonderlog-console";
function mapear_error_404(errorResponse){    
    console.log(errorResponse.config.url.includes('login'));
    wonder.log("Normal text", wonder.purple("Purple text"));
    wonder.log(wonder.bold("Bold text"), wonder.italic("Italic text"));
    wonder.log(wonder.tag("Text in a tag"), wonder.dangerTag("Text in a red tag"));
    
}

export default {
    mapear_error_404
}