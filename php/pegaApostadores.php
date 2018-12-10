<?php
    $server = 'localhost';
    $db_user = 'root';
    $db_password = 'x';

    $conn = new mysqli($server,$db_user,$db_password, "Bolao");

    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    
    $query = "SELECT * FROM Usuarios WHERE tipo = \"usr\"";
    $query_result = $conn->query($query);
    
    $apostadores = array();
    while($row = $query_result->fetch_assoc()) {
        array_push($apostadores, $row["Login"]);
    }
    $conn->close();
    echo json_encode($apostadores);
?>