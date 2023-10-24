<?php
function lecturaDatos(){
  $data_file = fopen('./data-1.json', 'r'); 
  $data = fread($data_file, filesize('./data-1.json')); 
  $data = json_decode($data, true); 
  fclose($data_file); 
  return ($data);
};


function obtnciudad($getData){ 
  $getCities = Array(); 
  foreach ($getData as $cities => $city) { 
    if(in_array($city['Ciudad'], $getCities)){ 

    }else{
      array_push($getCities, $city['Ciudad']); 
    }
  }
  echo json_encode($getCities); 
}

function obtnTipo($getData){ 
  $getTipo = Array(); 
  foreach ($getData as $tipos => $tipo) { 
    if(in_array($tipo['Tipo'], $getTipo)){ 
      
    }else{
      array_push($getTipo, $tipo['Tipo']); 
    }
  }
  echo json_encode($getTipo); 
}

/*Filtrar la información*/
function filtrarDatos($filtroCiudad, $filtroTipo, $filtroPrecio,$data){
  $itemList = Array(); 
  if($filtroCiudad == "" and $filtroTipo=="" and $filtroPrecio==""){ 
    foreach ($data as $index => $item) {
      array_push($itemList, $item); 
    }
  }else{ 

    $menor = $filtroPrecio[0]; 
    $mayor = $filtroPrecio[1]; 

      if($filtroCiudad == "" and $filtroTipo == ""){ 
        foreach ($data as $items => $item) {
            $precio = precioNumero($item['Precio']);
        if ( $precio >= $menor and $precio <= $mayor){ 
            array_push($itemList,$item ); 
          }
        }
      }

      if($filtroCiudad != "" and $filtroTipo == ""){ 
          foreach ($data as $index => $item) {
            $precio = precioNumero($item['Precio']);
            if ($filtroCiudad == $item['Ciudad'] and $precio > $menor and $precio < $mayor){ 
              array_push($itemList,$item ); 
            }
        }
      }

      if($filtroCiudad == "" and $filtroTipo != ""){ 
          foreach ($data as $index => $item) {
            $precio = precioNumero($item['Precio']);
            if ($filtroTipo == $item['Tipo'] and $precio > $menor and $precio < $mayor){ 
              array_push($itemList,$item ); 
            }
        }
      }

      if($filtroCiudad != "" and $filtroTipo != ""){ 
          foreach ($data as $index => $item) {
            $precio = precioNumero($item['Precio']);
            if ($filtroTipo == $item['Tipo'] and $filtroCiudad == $item['Ciudad'] and $precio > $menor and $precio < $mayor){ 
              array_push($itemList,$item ); 
            }
        }
      }


  }
  echo json_encode($itemList); 
};

function precioNumero($itemPrecio){ 
  $precio = str_replace('$','',$itemPrecio); 
  $precio = str_replace(',','',$precio); 
  return $precio; 
}
?>
