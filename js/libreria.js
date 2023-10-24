$(function(){
  obtnCiudad();
  obtnTipo();
})

$('#mostrarTodos').on('click', function(){
  buscarItem(false);
})

$('#formulario').on('submit', function(event){
  event.preventDefault();
  buscarItem(true);
})
/*
  Funcion para el input select
*/
function obtnCiudad(){
  $.ajax({
    url:'./city.php',
    type: 'GET',
    data:{},
    success:function(ListaCiudades){
      ListaCiudades = validarJson(ListaCiudades, 'Ciudad')
      $.each(ListaCiudades, function( index, value ) {
        $('#selectCiudad').append('<option value="'+value+'">'+value+'</option>')
      });
    }
  })
}
/*
  Funcion para el input select
*/
function obtnTipo(){
  $.ajax({
    url:'./type.php',
    type: 'GET',
    data:{},
    success:function(tipoList){
      tipoList = validarJson(tipoList, 'Tipo')
      $.each(tipoList, function( index, value ) {
        $('#selectTipo').append('<option value="'+value+'">'+value+'</option>')
      });
    },
  }).done(function(){
    $('select').material_select(); 
  })
}

function validarJson(validarJson, lista){
  try {
    var validarJson = JSON.parse(validarJson)
    return validarJson
  } catch (e) {
    obtnError('','SyntaxError '+lista);
    }
}

function buscarItem(filtrar){
  if($('.colContenido > .item') != 0){
    $('.colContenido > .item').detach()
  }
  var filtro = obtFiltros(filtrar)
  $.ajax({
    url:'./search.php',
    type: 'GET',
    data:{filtro},
    success:function(items, textStatus, errorThrown ){

      try {
        item = JSON.parse(items);
      } catch (e) {
        obtnError(500,'SyntaxError');
      }

      $.each(item, function(index, item){
        $('.colContenido').append(
          '<div class="col s12 item">'+
            '<div class="card itemMostrado">'+
              '<img src="./img/home.jpg">'+

                  '<div class="card-content">'+
                    '<p><b>Direccion: </b>'+item.Direccion+'</p>'+ 
                    '<p><b>Ciudad: </b>'+item.Ciudad+'</p>'+ 
                    '<p><b>Teléfono: </b>'+item.Telefono+'</p>'+ 
                    '<p><b>Código postal: </b>'+item.Codigo_Postal+'</p>'+ 
                    '<p><b>Tipo: </b>'+item.Tipo+'</p>'+ 
                    '<p><b>Precio: </b><span class="precioTexto">'+item.Precio+'</span></p>'+ 
                  '<div class="tituloContenido1 card">'+ 
                  '<span>VER MAS</span>'+
                  '</div>'+
                  '</div>'+  
            '</div>'+
          '</div>'
        )
      })
    },
  }).done(function(){ 
    var totalItems = $('.colContenido > .item').length 
    $('.tituloContenido.card > h5').text("Resultados de la búsqueda: "+ totalItems + " items" ) 
  }).fail(function( jqXHR, textStatus, errorThrown ){ 
      obtnError(jqXHR, textStatus) 
  })
}

function obtFiltros(filtrar){
  var rango = $('#rangoPrecio').val(), 
  rango = rango.split(";") 
  if (filtrar == false){ 
    var obtnCiudad = '',
        obtnTipo = '',
        obtnPrecio = ''
  }else{
    var obtnPrecio = rango,
        obtnCiudad = $('#selectCiudad option:selected').val(),
        obtnTipo = $('#selectTipo option:selected').val()
  }

    var filtro = {
      Precio:obtnPrecio,
      Ciudad: obtnCiudad,
      Tipo: obtnTipo
    }

  return filtro;
}