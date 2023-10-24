<?php
  require('./principal.php');
  $filtroCiudad = $_GET['filtro']['Ciudad'];
  $filtroTipo = $_GET['filtro']['Tipo'];
  $filtroPrecio =  $_GET['filtro']['Precio'];
  $getData = lecturaDatos(); 

  filtrarDatos($filtroCiudad, $filtroTipo, $filtroPrecio,$getData);
 ?>
