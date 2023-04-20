$( document ).ready(function(e){
    const isReports = getUrlParameter("reports");
    
    if(isReports){
        $("#nav-link-reports").addClass("active");
    }else{
        $("#nav-link-app").addClass("active");
    }
})