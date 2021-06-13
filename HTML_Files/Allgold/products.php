<?php
//Einfache version ohne Framework, berücksichtigt das die meißten Browser kein PUT und DELETE unterstützen


class products
{
   private $db;

   public function __construct()
   {
      //***TODO*** --> insert your database connection:
      $this->db = new mysqli("localhost","inttentwickler","ITT11pra!", "Allgold");

      if (mysqli_connect_errno())
      {
        die("error while connection to database!:".mysqli_connect_error());
      }
   }

  // Read 

   public function getAllPrdoucts()
   {
      $allProducts = array();
      $stmt = "SELECT * FROM products;";
      $result = $this->db->query($stmt);

        if(empty($result))
        {
           return "your statement: ".$stmt."<br /> received result:".$result;
        }

      while ($row = $result->fetch_assoc()) 
      {
        $allProducts[] = $row;
      }

      return  $allProducts;
   }

   public function getPrice($productID)
   {
   	  $allProducts = array();
   	  $stmt = "SELECT * FROM products WHERE productID = ".$sproductID.";";
   	  $result = $this->db->query($stmt);

        if(empty($result))
        {
           return "your statement: ".$stmt."<br /> received result:".$result;
        }

      while ($row = $result->fetch_assoc()) 
      {
        $allProducts[] = $row;
      }

      return $allProducts;
   	  //return $row = $result->fetch_assoc(); 
   }

   public function getName($productID)
   {
      $products = array();
      $stmt = "SELECT name FROM products WHERE productID = ".$productID.";";
      $result = $this->db->query($stmt);

        if(empty($result))
        {
           return "your statement: ".$stmt."<br /> received result:".$result;
        }

       while ($row = $result->fetch_assoc()) 
      {
        $products[] = $row;
      }


      error_log( print_r( $products, true ) );
      return $products;
      //return $row = $result->fetch_assoc(); 
   }
}

