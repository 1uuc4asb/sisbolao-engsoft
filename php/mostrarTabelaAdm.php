<?php
    $server = 'localhost';
    $db_user = 'root';
    $db_password = 'x';
    $conn = new mysqli($server,$db_user,$db_password, "Bolao");
    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    
    $login = $_POST["login"];
    echo "<ul style=\"width: 100%; overflow: hidden;\">
                                    <li id=\"cria-bolao\" style=\"float: left;\" class=\"menu-li clickable\"> Criar Bolão </li>
                                    <li id=\"logout-btn\" class=\"menu-li clickable\"> Logout </li>
                                    <span style=\"float: right; padding: 14px 16px;border-radius: 10px;\"> E ai administrador $login! </span>
                                </ul>
                                <div id=\"bolao_panel\">
                                    Bolões que vocẽ administra: </br>
                                    <ul id=\"adm-bolao-list\">";

                                    $query = "SELECT * FROM Boloes";
                                    $query_result = $conn->query($query);

                                    while($row = $query_result->fetch_assoc()) {
                                        $admobj = json_decode($row["administrador"]);
                                        $apostadoresarr = json_decode($row["apostadores"]);
                                        $jogosarr = json_decode($row["jogos"]);
                                        // Calcular número de apostas e montante
                                        $montanteTotal = 0;
                                        $nApostasTotal = 0;
                                        for($i = 0; $i < count($jogosarr); $i++) {
                                            $nApostasTotal += count($jogosarr[$i]->apostas);
                                            $montanteTotal += $jogosarr[$i]->montante;
                                        }
                                        //$oi = var_dump ($admobj);
                                        //echo $oi;
                                        if($admobj->login == $login) {
                                            echo "<li id=\"" . $row["id"] . "\" class=\"bolao-list-adm clickable\"> Bolão " . $row["id"] . " - Quantidade de apostadores: " . count($apostadoresarr) . " / Quantidade de jogos: " . count($jogosarr) . " / Quantidade total de apostas: " . $nApostasTotal . " / Montante total do Bolão: " . $montanteTotal .  " R$ <img class=\"boloes-icon\" src=\"../images/config.png\"> </li>";
                                        }
                                    }
                                    echo "</ul>";
    $conn->close();
?>