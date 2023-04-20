/******************** INICIO POST A REGISTRO EMPRESA ********************/
function validateEmpresaInput(){
    var emptytx = "";
    var num = 0;

    $("#submitEmpresa input").each(function(){
        if($(this).val() == ""){
            if($(this).prev('label').text() != "Número Interior"){ //Campo no obligatorio
                emptytx += '"'+ $(this).prev('label').text().replace("*","").trim() +'" ';   
                num++;   
            }    
        }
    });

    $('#submitEmpresa select').each(function(){
        if($(this).find(':selected').val() == "skipValue"){
            emptytx += '"'+ $(this).prev('label').text().replace("*","").trim() +'" ';   
            num++; 
        }
    });
    $('#condiciones-pago select').each(function(){
        if($(this).find(':selected').val() == "skipValue"){
            emptytx += '"'+ $(this).prev('label').text().replace("*","").trim() +'" ';   
            num++; 
        }
    });

    $('#lugar-de-entrega select').each(function(){
        if($(this).find(':selected').val() == "skipValue"){
            emptytx += '"'+ $(this).prev('label').text().replace("*","").trim() +'" ';   
            num++; 
        }
    });

    if (emptytx != ""){
        if (num > 1){
            $("#EmptyFieldsEmpresa").text("Los campos " + emptytx + "son necesarios.");
        }
        else{
            $("#EmptyFieldsEmpresa").text("El campo " + emptytx + "es necesario.");
        }
        console.log(emptytx);
        return false;
    }
    else{
        return true;
    }
}

document
.getElementById("submitEmpresa")
.addEventListener("submit", (event) => {
    event.preventDefault();
    //datos empresa
    var validate = validateEmpresaInput();
    if(validate){
        $('#collapseEmptyFieldsEmpresa').collapse("hide");
        var razonSocial = event.target.razonSocial.value
        var rfc = event.target.RFC.value
        var correoElectronico = event.target.email.value

        //direccion empresa
        var calle = event.target.calle.value    
        var numeroExterior = event.target.numeroExterior.value
        var numeroInterior = event.target.numeroInterior.value
        var codigoPostal = event.target.codigoPostal.value
        var ciudad = event.target.ciudad.value
        var estado = document.getElementById("selectEstados").options[document.getElementById("selectEstados").selectedIndex].innerHTML
        var pais = document.getElementById("selectPaises").options[document.getElementById("selectPaises").selectedIndex].innerHTML
        var lugarDeEntrega = $( "#lugar-de-entrega" ).val();
        var condicionesPago = $( "#condiciones-pago" ).val();

        $.ajax({
            type: 'POST',
            url: "/registrarEmpresa",
            data: JSON.stringify({ razonSocial: razonSocial, rfc: rfc, email: correoElectronico, calle: calle, numeroExterior: numeroExterior, numeroInterior: numeroInterior, codigoPostal: codigoPostal, ciudad: ciudad, estado: estado, pais: pais, lugarDeEntrega:lugarDeEntrega, condicionesPago:condicionesPago }),
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "CSRF-Token": Cookies.get("XSRF-TOKEN"),
            },
            success: function(result){
                console.log(result);
                if(result == "OK"){ //Se cierra el modal y se reinician las variables
                    //$('#nuevaEmpresa').modal('hide');
                    /*$('#collapseVeriSol').collapse('hide');
                    $('#collapseFinSol').collapse('hide');
                    $('#collapseSuccess').collapse('show');*/
                    window.location.reload();
                }else{
                    console.log("error");
                }
            }
        });
    }
    else{
        $('#collapseEmptyFieldsEmpresa').collapse("show");
    }  
})

/******************** FIN POST A REGISTRO EMPRESA ********************/