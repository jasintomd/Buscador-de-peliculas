function tipoBusqueda(){
    var texto = "&type=";
    var y = ""
    if($('#selYear').prop("checked")){
        
        texto += "&y=<"+ $('#range1').val();
    }
    if($("#selPeliculas").prop("checked")){
        texto += "movie";
        y = "&"        
    };
    if($("#selSeries").prop("checked")){
        texto += y+"series";
        y = "&"        
    };
    if($("#selEpisodios").prop("checked")){
        texto += y+"episode";
    };
    return texto;
}
function compruebaTitulo(titulo){
    var ntitulo = titulo;
    if (titulo.length >33){
        var ntitulo = titulo.slice(0,33)+"..."
    };
    return ntitulo
};

function busca(pagina){
    $.getJSON("http://www.omdbapi.com/?s="+$('input:first').val()+tipoBusqueda()+"&page="+pagina, function(result){
        $("#cargar").append("<img src='loading2.gif' class='loading'></img>");
        for(var i=0; i<result.Search.length; i++){
            var peli = result.Search[i];
            var tarjeta = $("#contenedor").append("<div class='tarjeta'><a href='http://www.imdb.com/title/"+peli.imdbID+"/'><img onerror=this.src='no-encontrada.jpg' src="+peli.Poster+"></img><p>"+compruebaTitulo(peli.Title) + "</p><p>"+ peli.Type+" - "+ peli.Year+"</p></a></div>");
        }
        $("#cargar").html('')
        });
    };
function rango(){    
    $("#year").html("Búsqueda en el año " + this.value);
}

function limpia(){
    $("#contenedor").html("");
}
var pagina=1;
$(window).scroll(function(){
    if ($(window).scrollTop() == $(document).height() - $(window).height()){
        pagina++;
        busca(pagina)
    }					
});
function buscar(){
    limpia();
    busca();
}


$(document).ready(function(){
    $('button:first').click(buscar);
    $('#range1').mousemove(rango);
  })

    


