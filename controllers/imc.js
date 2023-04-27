const imcView = (req, res)=>{
    const { reports } = req.query;

    if( reports ) res.render('reports')
    else res.render('imc');
    
}

module.exports = {
    imcView
}