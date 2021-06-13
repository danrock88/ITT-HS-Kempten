<?php
 
// include necessary classes 

include('inventory.php');


$inventory = new inventory();
$data = array_merge($_GET, $_POST);
$method = $data['action'];
$retlnk = '<br> <a href="index.html"> zur&uuml;ck zur Homeseite </a>';


 // create SQL based on HTTP method
switch ($method) 
{
  case 'GET':

    if(!empty($data['stationID']))
    {
        
        $sql = $inventory->findByStationID($data['stationID']);
        header('Content-type: application/json; charset=utf-8');
        echo json_encode($sql);
        break;
    }

    else
    {
    	$sql = $inventory->getInventory();
        header('Content-type: application/json; charset=utf-8'); 
        echo json_encode($sql);
        break;
    }

    break;

  case 'PUT':
  
    $sql = $inventory->updateInventory($data);
    if($sql == "OK")
    {
        error_log(print_r($data,true));
        header('Content-type: application/json; charset=utf-8'); 
        echo json_encode($send);        
    } 
    else
    {
        echo $sql;
    }
    break;

}



?>

