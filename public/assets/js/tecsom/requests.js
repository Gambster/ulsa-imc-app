/* @desc Función que se encarga de todos los llamados POST AJAX
*  @func la funcion recibe el path donde se hara el post, el json.stringify de un objeto, 
y el tercer argumento es un callback funcion que lo esta invocando para detectar 
que ya termino de traer la respuesta, y el callback contiene el resultado*/
function postAjax(path, data, completionHandler, errorhandler){
    $.ajax({
        type: 'POST',
        url: path,
        data: JSON.stringify( data ),
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "CSRF-Token": Cookies.get("XSRF-TOKEN"),
        },
        success: function(result){
            if( result.Response !== undefined  ){

                result.Response === undefined ? result.Response = 'data' : null;

                const { Message, InputsError, Type, data } = result.Response;

                if( Type == 'error' ){

                    showNotification( Type, Message );
                    errorhandler( result );

                }else{

                    completionHandler( result );

                }
            
            }else{

                completionHandler( result );

            }
            
        },
    });
}

/* @desc Función que se encarga de todos los llamados GET AJAX 
*  @func la funcion recibe el path donde se hara el post y un segundo argumento
*        el cual es un callback para detectar que el llamado devolvio una respuesta, 
*        a la funcion que lo esta invocando, y le envia su resultado*/
async function getAjax ( path ){
    
   return await $.ajax({								
        type: 'GET',
        url: path,
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "CSRF-Token": Cookies.get("XSRF-TOKEN"),
        },
        success: function(result){

            return result;

        }
    });
}

async function asyncPostAjax( path, data, ){

    return await $.ajax({

        type: 'POST',
        url: path,
        data: JSON.stringify( data ),
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "CSRF-Token": Cookies.get("XSRF-TOKEN"),
        },
        success: function(result){
        
            return result;
            
        },

    });

}

