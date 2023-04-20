function showTNotification(style,Message,time=5000){

    //metodo que muestra notificacion
    const STN = (style,Message,time=5000) => {
        let notifications = document.querySelector("#Tnotifications");
        if(!notifications){
            let notContainer = document.createElement('div');
            notContainer.setAttribute("id", "Tnotifications");
            document.body.prepend(notContainer);
            notifications = document.querySelector("#Tnotifications");
        }
        
        //Le da estilo a la notificacion
        let icon;

        switch ( style.toLowerCase() ) {
            
            case 'success':
                icon = {
                    image:'<svg xmlns="http://www.w3.org/2000/svg" height="48" width="48"><path d="M18.9 35.7 7.7 24.5l2.15-2.15 9.05 9.05 19.2-19.2 2.15 2.15Z"/></svg>',
                    color:"#40475c"
                }
                break;
            case 'warning':
                icon = {
                    image:'<svg xmlns="http://www.w3.org/2000/svg" height="48" width="48"><path d="M2 42 24 4l22 38Zm22.2-5.85q.65 0 1.075-.425.425-.425.425-1.075 0-.65-.425-1.075-.425-.425-1.075-.425-.65 0-1.075.425Q22.7 34 22.7 34.65q0 .65.425 1.075.425.425 1.075.425Zm-1.5-5.55h3V19.4h-3Z"/></svg>',
                    color:"#ff9500"
                }
                break;
            case 'error':
                icon = {
                    image:'<svg xmlns="http://www.w3.org/2000/svg" height="48" width="48"><path d="m12.45 37.65-2.1-2.1L21.9 24 10.35 12.45l2.1-2.1L24 21.9l11.55-11.55 2.1 2.1L26.1 24l11.55 11.55-2.1 2.1L24 26.1Z"/></svg>',
                    color:"#ff4857"
                }
                break;
            default:
                console.log('style no reconocido. Los argumentos validos son "success", "warning" , "error"');
                break;
        }
        // Crea una nueva notificación
        const notfHTML = `
        <div class="t-notf-body" style="display:flex">
            <div style="display:flex; align-items:center;">
                <div class="t-notf-imgage-container">
                    <div class="t-notf-image">
                        <span class="material-icons" style="fill:${icon.color}">${icon.image}</span>
                    </div>
                </div>
                <div>
                    <span class="t-notf-text">${Message}</span>
                </div>
            </div>
            <div class="t-notf-close">
                <span class="material-icons" style="fill:white"><svg xmlns="http://www.w3.org/2000/svg" height="48" width="48"><path d="m12.45 37.65-2.1-2.1L21.9 24 10.35 12.45l2.1-2.1L24 21.9l11.55-11.55 2.1 2.1L26.1 24l11.55 11.55-2.1 2.1L24 26.1Z"/></svg></span>
            </div>
        </div>
        `;

        let newNotification = document.createElement("div");
        newNotification.classList.add("t-notification");
        newNotification.style.display = "none";
        newNotification.innerHTML = notfHTML;

        let timeout = setTimeout(function() {
            closeNotificaition(newNotification)
            
        }, time);

        newNotification.querySelector('.t-notf-close').addEventListener('click', function(){
            clearTimeout(timeout);
            closeNotificaition(newNotification)
        });
        
        // Añade la nueva notificación al principio del div de notificaciones
        notifications.insertBefore(newNotification, notifications.firstChild);
        $(newNotification).slideDown({duration:300})

        function closeNotificaition(newNotification){
            $(newNotification).fadeOut(300,function(){
                notifications.removeChild(newNotification);
            });
        }
    }
    //Crea conteneor donde se mostraran las notificaciones
    if(Array.isArray(style)){
        Object.entries(style).forEach(([index,{Type,Message,Time}]) => {
            if(Time){
                STN(Type,Message,Time)

            }else{
                STN(Type,Message)
            }
        });
    }else{

        STN(style,Message,time);
    }

    
}

/************************************************************** CÓDIGO DE EJEMPLO **************************************************************/
// <button id="myButton">Mostrar Notificación</button>
// <script>
//     const Not1 = [
//         {
//         Type: "success",
//         Message:"Muy bien",
//         Time: 2000
//     },{
//         Type: "Error",
//         Message:"Algo salio mal",
//   
//     },
//     {
//         Type: "Error",
//         Message:"Algo salio mal",
//         Time: 10000
//     },
// ]
//     $("#myButton").click(function(){
//         showTNotification(Not1); //Recibe Array de Objetos
//         showTNotification("success","Muy bien",3000); //Recibe parametro de tiempo
//         showTNotification("warning","Algo esta pasando"); // Recibe 2 parametros, el tiempo por defecto son 5 segudos

//     })
// </script>

    
// <script src="../public/assets/js/tecsom/notifications/TNotification.js"></script>
// <link rel="stylesheet" href="../public/assets/js/tecsom/notifications/T_notification_styles.css"></link>
 
