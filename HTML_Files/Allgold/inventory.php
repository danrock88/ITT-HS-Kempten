<?php
//Einfache version ohne Framework, berücksichtigt das die meißten Browser kein PUT und DELETE unterstützen


class inventory
{
   private $db;

   public function __construct()
   {
      //***TODO*** --> insert your database connection:
      $this->db = new mysqli("localhost","inttentwickler","ITT11pra!");

      if (mysqli_connect_errno())
      {
        die("error while connection to database!:".mysqli_connect_error());
      }

      $this->db->select_db("Allgold");

      if($this->db->errno)
      {
        die ($this->db->error);
      }
   }


   // Create

   public function addInventory($data)
   {
   	   //create insert string
   	   $stmt = "INSERT INTO inventory ( 
   	   productID,
   	   stationID,
       currentAmount
   	   ) VALUES (
   	   '".$data['productID']."',
   	   '".$data['stationID']."',
       '".$data['currentAmount']."',
   	   );";

       //commit db request
   	   $result = $this->db->query($stmt);

   	   if($result == 1)
   	   {
   	   	 return "inventory succesfully inserted.";
   	   }

   	   return "your statment: ".$stmt."<br /> received result:".$result;
   }


  // Read 

   public function getInventory()
   {
      $Inventory = array();
      $stmt = "SELECT * FROM inventory;";
      $result = $this->db->query($stmt);

        if(empty($result))
        {
           return "your statement: ".$stmt."<br /> received result:".$result;
        }

      while ($row = $result->fetch_assoc()) 
      {
        $Inventory[] = $row;
      }

      return  $Inventory;
   }

      public function findByStationID($stationID)
   {
      $Inventory = array();
      $stmt = "SELECT * FROM inventory WHERE stationID = '$stationID';";
      $result = $this->db->query($stmt);
        if(empty($result))
        {
           return "your statement: ".$stmt."<br /> received result:".$result;
        }

      while ($row = $result->fetch_assoc()) 
      {
        $Inventory[] = $row;
      }

      return $Inventory;
   }


// Update
    
  public function updateInventory($data)
  {
    //create insert string
    $stmt = "UPDATE inventory SET currentAmount = '".$data['currentAmount']."'
                            WHERE stationID = '".$data['stationID']."' 
                            AND productID = '".$data['productID']."'
                            ;";

    //commit db request
    $result = $this->db->query($stmt);
    error_log(print_r($stmt,true));

    if($result == 1)
    {
      error_log(print_r("DEBUG: Query OK",true));
      return "OK";
    }

    return "your statement: ".$stmt."<br /> received result:".$result;
  }
}