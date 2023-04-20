/***********************************************************************************************************************************************************************                                                                                                                                                                      *
*   @desc Función que recibe el nombre de la template y manda a llamar a la función -getFile- mandandole la dirección de la template.                                  *                                                         
*                                                                                                                                                                      *
************************************************************************************************************************************************************************/
const format = ( d, fileName ) => {

    var producDet = getFile('../public/assets/templates/' + fileName);
    return producDet;

};

/************************************************************************************************************************************************************************
 *                                                                                                                                                                      *
 *   @desc Clase que permite que boton genere un spinner de carga, recibe 2 parámetros, el dom (jquery o javascript) y el texto de cargando                             *
 *         Método begin() inicializa el spinner y deshabilita el botón para que no le den click multiples veces.                                                        *
 *         Método stop() detiene un boton inicializado con begin() , reestablece el texto y habilita el botón                                                           *                                                         
 *                                                                                                                                                                      *
 ************************************************************************************************************************************************************************/
class loadingButton {
    constructor(dom, loadingText) {
        this.dom = dom;
        this.loadingText = loadingText;
        this.original = $(dom).html();
    }

    
    start(){
        const button = $(this.dom)
        button.html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> ' + this.loadingText)
        button.prop("disabled",true)

    }

    stop(){
        const button = $(this.dom);
        console.log(button);
        $(this.dom).html(this.original);
        console.log(button);

        button.prop("disabled",false);

    }

}

/************************************************************************************************************************************************************************
 *                                                                                                                                                                      *
 *   @desc Función que permite insertar un HTML script en el div que se le indique.                                                                                     *                                                         
 *                                                                                                                                                                      *
 ************************************************************************************************************************************************************************/
function getFile(U) { //FUNCION QUE PERMITE OBTENER UN ARCHIVO HTML COMO STRING
    var X = new XMLHttpRequest();
    X.open('GET', U, false);
    X.send();
    return X.responseText;
};

const getNameFromUuid = async ( tableId, tableDataKey,postData, postDataKey ,wrapperScroll, path, tableElement, filtro, ajaxPath ) => {

    const listAjax = [];
    const dataCheck = $( tableId ).data( tableDataKey );

    const data = dataCheck ? dataCheck : [];

    const dataId = ( postData.tableData ).map( ( item ) => item[ postDataKey ] );

    dataId.forEach( function(element, i) {

        const foundIndex = data.findIndex( item  => item.uuid == element);

        if( foundIndex != -1 ){

            postData.tableData[i][`${postDataKey}Table`] = data[ foundIndex ].nombre;

        }
        else{

            const foundIndexArray = listAjax.findIndex(empresaData => empresaData == element);

            if(foundIndexArray == -1){
                listAjax.push(element);
            }

        }

    });

    const arrayNames = await asyncPostAjax( path, { uuids: listAjax } );

    if(arrayNames.length > 0){

        const oldConvArray = $( tableId ).data( tableDataKey );

        if( oldConvArray ){

            $( tableId ).data( tableDataKey , oldConvArray.concat( arrayNames ));

        }
        else{

            $( tableId ).data( tableDataKey , arrayNames);

        }

        postData.tableData.forEach(function(element, i) {

            if( !element[`${postDataKey}Table`] ){

                const namesData = arrayNames.find( elm  => elm.uuid == element[ postDataKey ]);

                if( namesData ){

                    postData.tableData[i][`${postDataKey}Table`] = namesData.nombre;

                }
                
            }

        });

    }

};

const isOverflown = (element) => {

    console.log(element.scrollHeight,element.clientHeight)
    return element.scrollHeight > element.clientHeight;
    
}

const getParam = ( param ) => { 

    return new URLSearchParams(window.location.search).get(param);

};

const timeConverterDate = (UNIX_timestamp) => {
    
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();

    var time = date + ' ' + month + ' ' + year  ;

    return time;
};

const loadDataTable = async ( url, idTable ) => {

    const dataArray = await asyncPostAjax( `/${url}` );

    $(`#${idTable}`).DataTable().rows.add( dataArray ).draw();

};

const clearModalAndClose = ( idModal, idForm, closeModal = true ) => {

     console.log('entra clear modal')

    $(`${idForm} .form-input`).val('');
    $(`${idForm} .form-input`).prop('disabled', false);

    $(`${idForm} .form-select`).val('').trigger('change');
    $(`${idForm} .form-select`).prop('disabled', false);

    if( !closeModal ) return;

    $( idModal ).modal('hide');

};

const numberWithCommas = ( x )  => {

    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    
};

var notificationTimeOut;
function showNotification(style,Message,time_ms = 5000){
    
    
    const alert = $(".notificacionAlert")[0];
    if($(alert).is(":visible")){
        clearTimeout(notificationTimeOut);
    }
    else{
        
    }
    
    let icon;

    switch ( style.toLowerCase() ) {
        
        case 'success':
            icon = $(alert).find(".icon-alert");
            icon.text("done");
            icon.css("color","#40475c")
            break;
        case 'warning':
            icon = $(alert).find(".icon-alert");
            icon.text("warning");
            icon.css("color","#ff9500");
            break;
        case 'error':
            icon = $(alert).find(".icon-alert");
            icon.text("close");
            icon.css("color","#ff4857");
            break;
        default:
            console.log('style no reconocido. Los argumentos validos son "success", "warning" , "error"');
            break;
    }
    
    $(alert).find(".alert-content span").html(Message);
    $(alert).show("slide");
    notificationTimeOut = setTimeout(() => {
        $(alert).hide("slide");
    }, time_ms);

    
};

const getTodaysFormattedDate = (  ) => {

    const today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1;
    const yyyy = today.getFullYear();

    if (dd < 10) {

        dd = '0' + dd;

    }
    if (mm < 10) {

        mm = '0' + mm;

    }

    const date = yyyy + '-' + mm + '-' + dd;

    return date;

};

const loadDataToSelect = async ( url, bodyObj, idSelect, arrData, selectedValue = "" ) => {

    if( url ){

        arrData = await asyncPostAjax( url, bodyObj );

    }

    arrData.forEach( value => {

        const { nombre, uuid } = value;

        var newOption = new Option( nombre, uuid, false, false );
        $( idSelect ).append(newOption);

    });

    $( idSelect ).val(selectedValue != "" ? selectedValue : "" ).change();

};

const formatMoneyToDecimal = ( value ) => { 

    value = value.toString();

    value = value.replace(/[^0-9\.]/g, "");
    value = value.trim();

    return parseFloat( value ) ;

};

const UUIDv4 = new function(){

    function generateNumber(limit) {
    
        var value = limit * Math.random();
        return value | 0;
    
    };

    function generateX() {
    
        var value = generateNumber(16);
    
        return value.toString(16);
    };

    function generateXes(count) {
    
        var result = '';
        for (var i = 0; i < count; ++i) {
            result += generateX();
        }
    
        return result;
    };

    function generateVariant() {
    
        var value = generateNumber(16);
        var variant = (value & 0x3) | 0x8;
    
        return variant.toString(16);
    };

    /*********************************************************
     *                                                       *
     *   UUID v4                                             *
     *                                                       *
     *   varsion: M=4                                        *
     *   variant: N                                          *
     *   pattern: xxxxxxxx-xxxx-Mxxx-Nxxx-xxxxxxxxxxxx       *
     *                                                       *
     *********************************************************/

    this.generate = function() {
    
        var result = generateXes(8) +
            '-' + generateXes(4) +
            '-' + '4' + generateXes(3) +
            '-' + generateVariant() + generateXes(3) +
            '-' + generateXes(12)
    
            return result;
    };
    
};

/************************************************************************************************************************************************************************
 *                                                                                                                                                                      *
 *   @desc Función que formatea una cantidad a money, le pasas la divisa ( MXN, EUR, GBP, ETC ) y la cantidad.                                                          *                                                         
 *                                                                                                                                                                      *
 ************************************************************************************************************************************************************************/
const formatterMoney = (divisa, amount) => {

    if( amount == '-' || !amount ){

        return '-';

    }

    const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: divisa,
    });

    return formatter.format(amount).replace('MX', '');

}

function get_hostname(url) {

    const m = url.match(/^http:\/\/[^/]+/);
    return m ? m[0] : null;

}

const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);

        fileReader.onload = () => {
        resolve(fileReader.result.split(',')[1]);
        };

        fileReader.onerror = (error) => {
        reject(error);
        };
    });
};

// const showPDF = async ( cotizacion, fletes, productos, divisa ) => {
    
//     const { folioOpcion } = cotizacion;
//     let { folioCotizacion } = cotizacion;
//     let stringFolio = '';

//     if ( folioOpcion == 0 ) {
        
//         stringFolio = `XSEL${ folioCotizacion }`;
    
//     } else {
    
//         stringFolio = `XSEL${folioCotizacion}-${folioOpcion}`;
    
//     }

//     const textUSD = divisa != 'USD' ? '' : 'PRECIOS EN DOLARES AMERICANOS PAGADEROS EN PESOS MONEDA NACIONAL, AL TIPO DE CAMBIO QUE\nPUBLIQUE EL DIARIO OFICIAL DE LA FEDERACION EN LA FECHA DE PAGO, O BIEN EN LA MISMA MONEDA \nCOTIZADA' 

//     let { empresaUid, clienteUid, empresa, cliente, iva, subtotal, total, vigencia, numeroDeSolicitud, usuarioUid } = cotizacion;

//     if( !numeroDeSolicitud ){

//         const uuidVenta = getParam( 'uuid' );

//         numeroDeSolicitud = await asyncPostAjax( '/getNumeroDeSolicitud', { uuidVenta } );

//     }

//     const vigenciaDisplay = ( $("#vigenciaDays").val() ) ? $("#vigenciaDays").val() : vigencia;

//     const { imageLogoSumestraB64, imgTelefonoB64, imgFooterB64 }  = await getAjax( '/getImagesForPDF');

//     postAjax( '/getEmpresaData', { empresaUid, clienteUid, usuarioUid }, async data => {

//             const { telefono, nombre } = data.empresasObject;

//             var dd = {
//                 content: [{
//                         alignment: 'justify',
//                         columns: [{
//                                 /*COLUMNA UNO*/
//                                 style: 'section',
//                                 table: {
//                                     /*TABLA LADO IZQ*/
//                                     widths: ["100%"],
//                                     body: [
//                                         [{
//                                                 border: [false, false, false, false],
//                                                 image: 'data:image/png;base64,' + imageLogoSumestraB64,
//                                                 width: 200,
//                                                 height: 50,
//                                                 margin: [0, 0, 0, 0],
//                                             },
//                                         ],
//                                         [
//                                             {
//                                                 border: [true, false, false, false],
//                                                 borderColor: ['#ffc001'],
//                                                 text: "SUMINISTROS ESTRATÉGICOS LAGUNA S.A DE C.V.",
//                                                 fontSize: 9.5,
//                                                 bold: true
//                                             }
//                                         ],
//                                         [{
//                                             border: [true, false, false, false],
//                                             borderColor: ['#ffc001'],
//                                             text: 'SEL140224K93',
//                                             fontSize: 9.5,
//                                             bold: true
//                                         }],
//                                         [{
//                                             border: [true, false, false, false],
//                                             borderColor: ['#ffc001'],
//                                             text: "Torreón, Coahuila, México C.P. 27100",
//                                             fontSize: 9.5
//                                         }, ],
//                                         [{
//                                             border: [false, false, false, false],
//                                             fillColor: '#ffc001',
//                                             text: "DATOS DEL CLIENTE",
//                                             fontSize: 10,
//                                             bold: true
//                                         }],
//                                         [{
//                                             border: [true, false, false, false],
//                                             text: nombre,
//                                             fontSize: 9.5
//                                         }],
//                                         [{
//                                             border: [true, false, false, false],
//                                             text: empresa,
//                                             fontSize: 9.5
//                                         }, ],
//                                         [{
//                                             border: [true, false, false, false],
//                                             text: "-",
//                                             fontSize: 9.5
//                                         }, ],
//                                         [{
//                                             border: [true, false, false, true],
//                                             text: "Tel " + telefono,
//                                             fontSize: 9.5
//                                         }],
//                                     ],
//                                 },
//                                 layout: {
//                                 },
//                                 styles: {
//                                     section: {
//                                         fontSize: 4,
//                                         color: '#FFFFFF',
//                                         fillColor: '#2361AE',
//                                         margin: ["100px", 5, 0, 5]
//                                     },
//                                 }
//                             },
//                             {
//                                 /*COLUMNA DOS*/
//                                 table: {
//                                     widths: "50% 50%",
//                                     body: [
//                                         [{
//                                             border: [false, false, false, false],
//                                             alignment: "center",
//                                             table: {
//                                                 widths: "100%",
//                                                 body: [
//                                                     [{
//                                                         border: [false, false, false, false],
//                                                         fontSize: 8,
//                                                         fillColor: "#ffc001",
//                                                         text: 'FECHA'
//                                                     }],
//                                                     [{
//                                                         border: [true, false, true, true],
//                                                         text: getTodaysFormattedDate(),
//                                                     }]
//                                                 ]
//                                             },
//                                         }, {
//                                             border: [false, false, false, false],
//                                             alignment: "center",
//                                             table: {
//                                                 widths: "100%",
//                                                 body: [
//                                                     [{
//                                                         border: [false, false, false, false],
//                                                         fontSize: 8,
//                                                         fillColor: "#ffc001",
//                                                         text: 'COTIZACIÓN'
//                                                     }],
//                                                     [{
//                                                         border: [true, false, true, true],
//                                                         text: stringFolio,
//                                                     }]
//                                                 ]
//                                             }
//                                         }],
//                                         [{
//                                             border: [false, false, false, false],
//                                             alignment: "center",
//                                             table: {
//                                                 widths: "100%",
//                                                 body: [
//                                                     [{
//                                                         border: [false, false, false, false],
//                                                         fontSize: 8,
//                                                         fillColor: "#ffc001",
//                                                         text: 'VIGENCIA'
//                                                     }],
//                                                     [{
//                                                         border: [true, false, true, true],
//                                                         text: vigenciaDisplay + " DÍAS"
//                                                     }]
//                                                 ]
//                                             },
//                                         }, {
//                                             border: [false, false, false, false],
//                                             alignment: "center",
//                                             table: {
//                                                 widths: "100%",
//                                                 body: [
//                                                     [{
//                                                         border: [false, false, false, false],
//                                                         fontSize: 8,
//                                                         fillColor: "#ffc001",
//                                                         text: 'COND. DE PAGO'
//                                                     }],
//                                                     [{
//                                                         border: [true, false, true, true],
//                                                         text: "45 DÍAS."
//                                                     }]
//                                                 ]
//                                             }
//                                         }],
//                                         [{
//                                             border: [false, false, false, false],
//                                             alignment: "center",
//                                             table: {
//                                                 widths: "100%",
//                                                 body: [
//                                                     [{
//                                                         border: [false, false, false, false],
//                                                         fontSize: 8,
//                                                         fillColor: "#ffc001",
//                                                         text: 'REF. DEL CLIENTE'
//                                                     }],
//                                                     [{
//                                                         border: [true, false, true, true],
//                                                         fontSize: 8.5,
//                                                         text: numeroDeSolicitud
//                                                     }]
//                                                 ]
//                                             },
//                                         }, {
//                                             border: [false, false, false, false],
//                                             alignment: "center",
//                                             table: {
//                                                 widths: "100%",
//                                                 body: [
//                                                     [{
//                                                         border: [false, false, false, false],
//                                                         fontSize: 8,
//                                                         fillColor: "#ffc001",
//                                                         text: 'COND. DE ENTREGA'
//                                                     }],
//                                                     [{
//                                                         border: [true, false, true, true],
//                                                         fontSize: 8.5,
//                                                         text: "-"
//                                                     }]
//                                                 ],
//                                                 margin: [0, 0, 2, 0]
//                                             }
//                                         }],
//                                         [{
//                                             colSpan: 2,
//                                             border: [false, false, false, false],
//                                             table: {
//                                                 widths: "100%",
//                                                 body: [
//                                                     [{
//                                                         fillColor: "#ffc001",
//                                                         alignment: "center",
//                                                         fontSize: 7.7,
//                                                         text: '\nDistribuimos más de 400 marcas a nivel mundial.\n"Seguro tenemos la que necesitas", y si no es así, te decimos el porque y\ndonde conseguirla.\nSi tiene alguna otra consulta o requiere de ayuda, no dude en contactarnos.'
//                                                     }]
//                                                 ],
//                                                 margin: [0, 0, 2, 0]
//                                             }
//                                         }]
//                                     ]
//                                 }
//                             }
//                         ],
//                     },
//                     {
//                         table: {
//                             widths: ["5%", "35%", "15%", "15%", "15%", "14%"],
//                             body: [
//                                 [{
//                                     text: 'PART.',
//                                     alignment: "center",
//                                     fontSize: 6,
//                                     bold: true,
//                                     border: [false, false, false, false],
//                                     fillColor: "#ffc001"
//                                 }, {
//                                     text: "NOMBRE",
//                                     alignment: "center",
//                                     fontSize: 6,
//                                     bold: true,
//                                     border: [false, false, false, false],
//                                     fillColor: "#ffc001"
//                                 }, {
//                                     text: 'U.MED.',
//                                     alignment: "center",
//                                     fontSize: 6,
//                                     bold: true,
//                                     border: [false, false, false, false],
//                                     fillColor: "#ffc001"
//                                 }, {
//                                     text: 'CANT.',
//                                     alignment: "center",
//                                     fontSize: 6,
//                                     bold: true,
//                                     border: [false, false, false, false],
//                                     fillColor: "#ffc001"
//                                 }, {
//                                     text: 'P UNITARIO',
//                                     alignment: "center",
//                                     fontSize: 6,
//                                     bold: true,
//                                     border: [false, false, false, false],
//                                     fillColor: "#ffc001"
//                                 }, {
//                                     text: 'IMPORTE',
//                                     alignment: "center",
//                                     fontSize: 6,
//                                     bold: true,
//                                     border: [false, false, false, false],
//                                     fillColor: "#ffc001"
//                                 }],
//                                 /*INICIA RELLENO*/
//                                 /*FIN RELLENO*/
//                                 [{
//                                         border: [true, true, true, true],
//                                         alignment: "left",
//                                         colSpan: 4,
//                                         text: "SUMESTRA no se hace responsable por errores en descripciones u omisiones que el Cliente haya cometido \nal momento de solicitar la compra de uno o varios productos. Si el Cliente recibe productos erróneos por este \nmotivo, SUMESTRA no acepta devoluciones, ni cambios, ni reintegra dinero.",
//                                         fontSize: 7,
//                                     },
//                                     "",
//                                     "",
//                                     "",
//                                     {
//                                         border: [false, true, true, true],
//                                         alignment: "right",
//                                         fontSize: 7,
//                                         colSpan: 2,
//                                         rowSpan: 2,
//                                         text: "\nSUBTOTAL:" + formatterMoney( divisa, subtotal ) + "\n\nIVA 16%: " + formatterMoney( divisa, iva ) + `\n\nTOTAL (${ divisa }): ` + formatterMoney( divisa, total ),
//                                     },
//                                     {
//                                         border: [false, false, true, false],
//                                         text: ""
//                                     },
//                                 ],
//                                 [{
//                                         border: [true, false, true, true],
//                                         alignment: "center",
//                                         colSpan: 4,
//                                         text: textUSD,
//                                         fontSize: 7,
//                                     },
//                                     "",
//                                     "",
//                                     "",
//                                     {
//                                         border: [false, false, false, false],
//                                         text: ""
//                                     },
//                                     {
//                                         border: [false, false, true, false],
//                                         text: ""
//                                     },
//                                 ],
//                             ],
//                         }
//                     },
//                     {
//                         table: {
//                             widths: ["10%", "70%", "20%"],
//                             body: [
//                                 [{
//                                         border: [false, false, false, false],
//                                         alignment: "left",
//                                         width: 20,
//                                         margin: [0, 5, 0, 0],
//                                         image: 'data:image/png;base64,' + imgTelefonoB64,
//                                     },
//                                     {
//                                         bold: true,
//                                         border: [false, false, false, false],
//                                         margin: [-13, 9, 0, 0],
//                                         fontSize: 10,
//                                         text: 'T +52 871 167 68 65'
//                                     },
//                                     {
//                                         alignment: "left",
//                                         fontSize: 14,
//                                         border: [false, false, false, false],
//                                         margin: [0, 5, 0, 0],
//                                         color: "gray",
//                                         text: 'sumestra.com'
//                                     }
//                                 ],
//                             ]
//                         }
//                     }, {
//                         margin: [0, 10, 0, 0],
//                         width: "510.5",
//                         image: 'data:image/png;base64,' + imgFooterB64,
//                     }
//                 ]
//             }
            
//             let numOfProductos = 0;

//             for( const flete of fletes ){

//                 const { tiempoEntregaToNum, tiempoEntregaFromNum, unidadTiempo, lugarEntrega, productosData, uuidFlete, tipo } = flete; 

//                 console.log({ flete })

//                 if( tipo != 'otro' ){   

//                     dd.content[1].table.body.splice(1, 0, 
//                         [
//                             {
//                                 border: [true, false, true, false],
//                                 alignment: "center",
//                                 colSpan: 6,
//                                 text: "Tiempo de Entrega: " + tiempoEntregaFromNum + " A " + tiempoEntregaToNum + " " + unidadTiempo,
//                                 fontSize: 7.5,
//                                 bold: true
//                             },
//                             "",
//                             "",
//                             "",
//                             "",
//                             "",
//                         ],
//                         [
//                             {
//                                 border: [true, false, true, false],
//                                 alignment: "center",
//                                 colSpan: 6,
//                                 text: "Lugar de entrega: " + lugarEntrega,
//                                 fontSize: 7.5,
//                                 bold: true,
//                             },
//                             "",
//                             "",
//                             "",
//                             "",
//                             "",
//                         ]
//                     );
    
//                     let index = 0;
    
//                     for( const producto of productosData ){
//                         numOfProductos += 1;
    
//                         let { id, } = producto;
    
//                         console.log('PRODUCTOS ID')
//                         console.log(productos[id] )
//                         console.log({ id })
    
//                         const { unidadMedidaNombre: unidadMedida, precioUnitarioProrrateado, importeFinal, cantidad, descripcion } = productos[ id ];
    
//                         console.log(productos[ id ])
    
//                         dd.content[1].table.body.splice(1, 0, [{
//                                 alignment: "center",
//                                 fontSize: 7.5,
//                                 text: index + 1,
//                                 border: [true, false, false, false]
//                             },
//                             {
//                                 fontSize: 7.5,
//                                 text: descripcion,
//                                 border: [false, false, false, false]
//                             },
//                             {
//                                 alignment: "center",
//                                 fontSize: 7.5,
//                                 text: unidadMedida,
//                                 border: [false, false, false, false]
//                             },
//                             {
//                                 alignment: "center",
//                                 fontSize: 7.5,
//                                 text: cantidad,
//                                 border: [false, false, false, false]
//                             },
//                             {
//                                 alignment: "center",
//                                 fontSize: 7.5,
//                                 text: formatterMoney( divisa, precioUnitarioProrrateado ),
//                                 border: [false, false, false, false]
//                             },
//                             {
//                                 alignment: "center",
//                                 fontSize: 7.5,
//                                 text: formatterMoney( divisa, importeFinal ),
//                                 border: [false, false, true, false]
//                             },
//                         ]);
//                         index++;
//                     }

//                 }

//             }

//             const numFletesInfo = fletes.length;
//             const lines = numOfProductos + (numFletesInfo * 2);

//             for (let i = 0; i < 28 - lines; i++) {

//                 dd.content[1].table.body.splice(lines+1 , 0, [{
//                         fontSize: 7.5,
//                         text: "",
//                         border: [true, false, false, false]
//                     },
//                     {
//                         fontSize: 7.5,
//                         text: '',
//                         border: [false, false, false, false]
//                     },
//                     {
//                         fontSize: 7.5,
//                         text: "",
//                         border: [false, false, false, false]
//                     },
//                     {
//                         fontSize: 7.5,
//                         text: "",
//                         border: [false, false, false, false]
//                     },
//                     {
//                         fontSize: 7.5,
//                         text: "",
//                         border: [false, false, false, false]
//                     },
//                     {
//                         alignment: "center",
//                         fontSize: 7.5,
//                         text: "",
//                         border: [false, false, true, false]
//                     }
//                 ]);

//             }

//             const doc = pdfMake.createPdf(dd);
//             const f = document.getElementById('pdf-container');
            
//             const callback = function(url) {
//                 f.setAttribute('src', url);
//                 $(document).data('PDF',url);            
//             }

//             doc.getDataUrl(callback, doc);;

//         })
// }


// const getPDF = async ( cotizacion, fletes, productos, divisa ) => {
const getPDF = async ( cotizacion, tiemposDeEntrega, productos, divisa ) => {

    
    let { folioCotizacion, optionNumber } = cotizacion;
    let stringFolio = '';

    if ( !optionNumber || optionNumber == '0'  ) {
        
        stringFolio = `XSEL${ folioCotizacion }`;
    
    } else {
    
        stringFolio = `XSEL${folioCotizacion}-${optionNumber}`;
    
    }

    const textUSD = divisa != 'USD' ? '' : 'PRECIOS EN DOLARES AMERICANOS PAGADEROS EN PESOS MONEDA NACIONAL, AL TIPO DE CAMBIO QUE\nPUBLIQUE EL DIARIO OFICIAL DE LA FEDERACION EN LA FECHA DE PAGO, O BIEN EN LA MISMA MONEDA \nCOTIZADA' 

    
    let { empresaUid, usuario, empresa, cliente, iva, subtotal, total, vigencia, numeroDeSolicitud, compradorType } = cotizacion;
    
    console.log({ cotizacion })

    if( !numeroDeSolicitud ){

        const uuidVenta = getParam( 'uuid' );

        numeroDeSolicitud = await asyncPostAjax( '/getNumeroDeSolicitud', { uuidVenta } );

    }

    const vigenciaDisplay = ( $("#vigenciaDays").val() ) ? $("#vigenciaDays").val() : vigencia;

    const { imageLogoSumestraB64, imgTelefonoB64, imgFooterB64 }  = await getAjax( '/getImagesForPDF');

    console.log({ cliente, usuario });
    console.log(cliente.uuid);
    console.log({ compradorType })

    const data = await asyncPostAjax( '/getEmpresaData', { empresaUid, uuidComprador: compradorType == 'compradores' ? cliente.uuid : usuario.uuid, compradorType });

    const { telefono, nombre } = data.empresasObject;

    var dd = {
        content: [{
                alignment: 'justify',
                columns: [{
                        /*COLUMNA UNO*/
                        style: 'section',
                        table: {
                            /*TABLA LADO IZQ*/
                            widths: ["100%"],
                            body: [
                                [{
                                        border: [false, false, false, false],
                                        image: 'data:image/png;base64,' + imageLogoSumestraB64,
                                        width: 200,
                                        height: 50,
                                        margin: [0, 0, 0, 0],
                                    },
                                ],
                                [
                                    {
                                        border: [true, false, false, false],
                                        borderColor: ['#ffc001'],
                                        text: "SUMINISTROS ESTRATÉGICOS LAGUNA S.A DE C.V.",
                                        fontSize: 9.5,
                                        bold: true
                                    }
                                ],
                                [{
                                    border: [true, false, false, false],
                                    borderColor: ['#ffc001'],
                                    text: 'SEL140224K93',
                                    fontSize: 9.5,
                                    bold: true
                                }],
                                [{
                                    border: [true, false, false, false],
                                    borderColor: ['#ffc001'],
                                    text: "Torreón, Coahuila, México C.P. 27100",
                                    fontSize: 9.5
                                }, ],
                                [{
                                    border: [false, false, false, false],
                                    fillColor: '#ffc001',
                                    text: "DATOS DEL CLIENTE",
                                    fontSize: 10,
                                    bold: true
                                }],
                                [{
                                    border: [true, false, false, false],
                                    text: nombre,
                                    fontSize: 9.5
                                }],
                                [{
                                    border: [true, false, false, false],
                                    text: empresa,
                                    fontSize: 9.5
                                }, ],
                                [{
                                    border: [true, false, false, false],
                                    text: "-",
                                    fontSize: 9.5
                                }, ],
                                [{
                                    border: [true, false, false, true],
                                    text: "Tel " + telefono,
                                    fontSize: 9.5
                                }],
                            ],
                        },
                        layout: {
                        },
                        styles: {
                            section: {
                                fontSize: 4,
                                color: '#FFFFFF',
                                fillColor: '#2361AE',
                                margin: ["100px", 5, 0, 5]
                            },
                        }
                    },
                    {
                        /*COLUMNA DOS*/
                        table: {
                            widths: "50% 50%",
                            body: [
                                [{
                                    border: [false, false, false, false],
                                    alignment: "center",
                                    table: {
                                        widths: "100%",
                                        body: [
                                            [{
                                                border: [false, false, false, false],
                                                fontSize: 8,
                                                fillColor: "#ffc001",
                                                text: 'FECHA'
                                            }],
                                            [{
                                                border: [true, false, true, true],
                                                text: getTodaysFormattedDate(),
                                            }]
                                        ]
                                    },
                                }, {
                                    border: [false, false, false, false],
                                    alignment: "center",
                                    table: {
                                        widths: "100%",
                                        body: [
                                            [{
                                                border: [false, false, false, false],
                                                fontSize: 8,
                                                fillColor: "#ffc001",
                                                text: 'COTIZACIÓN'
                                            }],
                                            [{
                                                border: [true, false, true, true],
                                                text: stringFolio,
                                            }]
                                        ]
                                    }
                                }],
                                [{
                                    border: [false, false, false, false],
                                    alignment: "center",
                                    table: {
                                        widths: "100%",
                                        body: [
                                            [{
                                                border: [false, false, false, false],
                                                fontSize: 8,
                                                fillColor: "#ffc001",
                                                text: 'VIGENCIA'
                                            }],
                                            [{
                                                border: [true, false, true, true],
                                                text: vigenciaDisplay + " DÍAS"
                                            }]
                                        ]
                                    },
                                }, {
                                    border: [false, false, false, false],
                                    alignment: "center",
                                    table: {
                                        widths: "100%",
                                        body: [
                                            [{
                                                border: [false, false, false, false],
                                                fontSize: 8,
                                                fillColor: "#ffc001",
                                                text: 'COND. DE PAGO'
                                            }],
                                            [{
                                                border: [true, false, true, true],
                                                text: "45 DÍAS."
                                            }]
                                        ]
                                    }
                                }],
                                [{
                                    border: [false, false, false, false],
                                    alignment: "center",
                                    table: {
                                        widths: "100%",
                                        body: [
                                            [{
                                                border: [false, false, false, false],
                                                fontSize: 8,
                                                fillColor: "#ffc001",
                                                text: 'REF. DEL CLIENTE'
                                            }],
                                            [{
                                                border: [true, false, true, true],
                                                fontSize: 8.5,
                                                text: numeroDeSolicitud
                                            }]
                                        ]
                                    },
                                }, {
                                    border: [false, false, false, false],
                                    alignment: "center",
                                    table: {
                                        widths: "100%",
                                        body: [
                                            [{
                                                border: [false, false, false, false],
                                                fontSize: 8,
                                                fillColor: "#ffc001",
                                                text: 'COND. DE ENTREGA'
                                            }],
                                            [{
                                                border: [true, false, true, true],
                                                fontSize: 8.5,
                                                text: "-"
                                            }]
                                        ],
                                        margin: [0, 0, 2, 0]
                                    }
                                }],
                                [{
                                    colSpan: 2,
                                    border: [false, false, false, false],
                                    table: {
                                        widths: "100%",
                                        body: [
                                            [{
                                                fillColor: "#ffc001",
                                                alignment: "center",
                                                fontSize: 7.7,
                                                text: '\nDistribuimos más de 400 marcas a nivel mundial.\n"Seguro tenemos la que necesitas", y si no es así, te decimos el porque y\ndonde conseguirla.\nSi tiene alguna otra consulta o requiere de ayuda, no dude en contactarnos.'
                                            }]
                                        ],
                                        margin: [0, 0, 2, 0]
                                    }
                                }]
                            ]
                        }
                    }
                ],
            },
            {
                table: {
                    widths: ["5%", "35%", "15%", "15%", "15%", "14%"],
                    body: [
                        [{
                            text: 'PART.',
                            alignment: "center",
                            fontSize: 6,
                            bold: true,
                            border: [false, false, false, false],
                            fillColor: "#ffc001"
                        }, {
                            text: "NOMBRE",
                            alignment: "center",
                            fontSize: 6,
                            bold: true,
                            border: [false, false, false, false],
                            fillColor: "#ffc001"
                        }, {
                            text: 'U.MED.',
                            alignment: "center",
                            fontSize: 6,
                            bold: true,
                            border: [false, false, false, false],
                            fillColor: "#ffc001"
                        }, {
                            text: 'CANT.',
                            alignment: "center",
                            fontSize: 6,
                            bold: true,
                            border: [false, false, false, false],
                            fillColor: "#ffc001"
                        }, {
                            text: 'P UNITARIO',
                            alignment: "center",
                            fontSize: 6,
                            bold: true,
                            border: [false, false, false, false],
                            fillColor: "#ffc001"
                        }, {
                            text: 'IMPORTE',
                            alignment: "center",
                            fontSize: 6,
                            bold: true,
                            border: [false, false, false, false],
                            fillColor: "#ffc001"
                        }],
                        /*INICIA RELLENO*/
                        /*FIN RELLENO*/
                        [{
                                border: [true, true, true, true],
                                alignment: "left",
                                colSpan: 4,
                                text: "SUMESTRA no se hace responsable por errores en descripciones u omisiones que el Cliente haya cometido \nal momento de solicitar la compra de uno o varios productos. Si el Cliente recibe productos erróneos por este \nmotivo, SUMESTRA no acepta devoluciones, ni cambios, ni reintegra dinero.",
                                fontSize: 7,
                            },
                            "",
                            "",
                            "",
                            {
                                border: [false, true, true, true],
                                alignment: "right",
                                fontSize: 7,
                                colSpan: 2,
                                rowSpan: 2,
                                text: "\nSUBTOTAL:" + formatterMoney( divisa, subtotal ) + "\n\nIVA 16%: " + formatterMoney( divisa, iva ) + `\n\nTOTAL (${ divisa }): ` + formatterMoney( divisa, total ),
                            },
                            {
                                border: [false, false, true, false],
                                text: ""
                            },
                        ],
                        [{
                                border: [true, false, true, true],
                                alignment: "center",
                                colSpan: 4,
                                text: textUSD,
                                fontSize: 7,
                            },
                            "",
                            "",
                            "",
                            {
                                border: [false, false, false, false],
                                text: ""
                            },
                            {
                                border: [false, false, true, false],
                                text: ""
                            },
                        ],
                    ],
                }
            },
            {
                table: {
                    widths: ["10%", "70%", "20%"],
                    body: [
                        [{
                                border: [false, false, false, false],
                                alignment: "left",
                                width: 20,
                                margin: [0, 5, 0, 0],
                                image: 'data:image/png;base64,' + imgTelefonoB64,
                            },
                            {
                                bold: true,
                                border: [false, false, false, false],
                                margin: [-13, 9, 0, 0],
                                fontSize: 10,
                                text: 'T +52 871 167 68 65'
                            },
                            {
                                alignment: "left",
                                fontSize: 14,
                                border: [false, false, false, false],
                                margin: [0, 5, 0, 0],
                                color: "gray",
                                text: 'sumestra.com'
                            }
                        ],
                    ]
                }
            }, {
                margin: [0, 10, 0, 0],
                width: "510.5",
                image: 'data:image/png;base64,' + imgFooterB64,
            }
        ]
    }
    
    let numOfProductos = 0;

    let productosLength = Object.keys( productos ).length;

    console.log({ tiemposDeEntrega });

    for( const tiempoEntrega of tiemposDeEntrega ){

        const { tiempoEntregaToNum, tiempoEntregaFromNum, unidadTiempo, lugarDeEntrega, productos: productosTiemposEntrega } = tiempoEntrega; 

        dd.content[1].table.body.splice(1, 0, 
            [
                {
                    border: [true, false, true, false],
                    alignment: "center",
                    colSpan: 6,
                    text: "Tiempo de Entrega: " + tiempoEntregaFromNum + " A " + tiempoEntregaToNum + " " + unidadTiempo,
                    fontSize: 7.5,
                    bold: true
                },
                "",
                "",
                "",
                "",
                "",
            ],
            [
                {
                    border: [true, false, true, false],
                    alignment: "center",
                    colSpan: 6,
                    text: "Lugar de entrega: " + lugarDeEntrega,
                    fontSize: 7.5,
                    bold: true,
                },
                "",
                "",
                "",
                "",
                "",
            ]
        );

        for( const uuidProducto of productosTiemposEntrega ){
            
            numOfProductos += 1;

            console.log('PRODUCTOS ID')
            console.log(productos[ uuidProducto ] )
            console.log({ uuidProducto })

            const { unidadMedidaNombre: unidadMedida, precioUnitarioProrrateado, importeFinal, cantidad, descripcion, observaciones } = productos[ uuidProducto ];

            if( observaciones ){

                dd.content[1].table.body.splice(1, 0, [
                    {
                        text: "",
                        border: [true, false, false, false],
                    },
                    {
                        alignment: "left",
                        fontSize: 7.5,
                        color: '#5e5e5e',
                        text: `Observaciones: ${ observaciones }`,
                        border: [false, false, false, false]
                    },
                    { 
                        text: "",
                        border: [false, false, false, false]
                    },
                    {
                        text: "",
                        border: [false, false, false, false]
                    },
                    {
                        text: "",
                        border: [false, false, false, false]
                    },
                    {
                        text: "",
                        border: [false, false, true, false]
                    },
                ]);

            }

            dd.content[1].table.body.splice(1, 0, [{
                    alignment: "center",
                    fontSize: 7.5,
                    text: productosLength--,
                    border: [true, false, false, false]
                },
                {
                    fontSize: 7.5,
                    text: descripcion,
                    border: [false, false, false, false]
                },
                {
                    alignment: "center",
                    fontSize: 7.5,
                    text: unidadMedida,
                    border: [false, false, false, false]
                },
                {
                    alignment: "center",
                    fontSize: 7.5,
                    text: cantidad,
                    border: [false, false, false, false]
                },
                {
                    alignment: "center",
                    fontSize: 7.5,
                    text: formatterMoney( divisa, precioUnitarioProrrateado ),
                    border: [false, false, false, false]
                },
                {
                    alignment: "center",
                    fontSize: 7.5,
                    text: formatterMoney( divisa, importeFinal ),
                    border: [false, false, true, false]
                },
            ]);
        
        }

    }

    return pdfMake.createPdf(dd);

}

/**Obtiene el Hash query como #usuarios**/
function getHash(hideURLHash = false) {
    if (window.location.hash) {
        var hash = window.location.hash.substring(1);

        if (hash.length === 0) { 
            return false;
        }
        else { 
            if(hideURLHash){
                history.pushState("", document.title, window.location.pathname + window.location.search);
            }
            return hash; 
        }
    } 
    else { 
        return false; 
    }
}

function activeTab(tab){
    $('.nav-tabs button[data-bs-target="#' + tab + '"]').tab('show');
  };

  /** Obtiene los valores id y texto de un select2 y los retorna en un objeto, en caso de error retorna undefinied */
  function getSelect2Values( idSelect ){
    let values;
    try{
        const s2 = $( idSelect ).select2('data')[0];
        const text = s2.text
        const value = s2.id     
        values = {text,value}
    }catch{
        values = null
    }

    return values
}

function sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

const removeEmpty = ( obj ) => {

    return Object.fromEntries(Object.entries(obj).filter(([_, v]) => !!v ));

}
/***/


    //Guarda la cookie del ultimo tab seleccionado

    function cookieTab(id,cookieName, minutes = 30){

        $(`${id} button[data-bs-toggle="tab"]`).on('shown.bs.tab', function (e) {
            const tabName = $(e.target).text()
            const date = new Date(); 
            date.setMinutes(date.getMinutes() + minutes);
            const dateString = date.toGMTString();
            /* Cookies.set(`tab-${cookieName}`,{ expires: date });  */
            document.cookie = `tab-${cookieName}=${tabName.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")};expires=${dateString};path=/`

        })
   
    }

    function getCookieTab(cookieName){
        let name = "tab-" + cookieName + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for(let i = 0; i <ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') {
            c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length).toLowerCase();
            }
        }
        return "";
    }

    function isValidEmail(e) {
        var filter = /^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/;
        return String(e).search (filter) != -1;
    }

// /* function sleep (time) {
//     return new Promise((resolve) => setTimeout(resolve, time));
//   } */

function delay(callback, ms) {
    var timer = 0;
    return function() {
        var context = this, args = arguments;
        clearTimeout(timer);
        timer = setTimeout(function () {
            callback.apply(context, args);
        }, ms || 0);
    };
}



function getIcon(filename){
    const extension = filename.split('.').pop();
    let icon = {};
   
    if(extension == "pdf"){
        icon = {
            icon : "description",
            class: "text-danger",
        }
        
    }else if(extension == "xml" || extension == "txt"){
        icon = {
            icon : "code",
            class: "text-primary",
        }
    }else if(extension == "png" || extension == "jpg" || extension == "jpeg" || extension == "svg"){
        icon = {
            icon : "image",
            class: "text-success",
        }

    }else{
        icon = {
            icon : "description",
            class: "text-warning",
        }
    }
    icon.extension = extension
    return icon
}