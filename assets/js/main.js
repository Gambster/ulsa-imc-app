$( document ).ready(function(e){
    const isReports = getUrlParameter("reports");
    
    if(isReports){
        $("#nav-link-reports").addClass("active");
        $("#sidebar-reports").addClass("active");
    }else{
        $("#nav-link-app").addClass("active");
        $("#sidebar-imcapp").addClass("active");
    }
})