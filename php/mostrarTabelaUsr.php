<?php
    $server = 'localhost';
    $db_user = 'root';
    $db_password = 'Lucas@2301';
    $conn = new mysqli($server,$db_user,$db_password, "Bolao");
    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    
    $login = $_POST["login"];
    $query = "SELECT boloes,convites FROM Usuarios WHERE BINARY Login = '$login'";
    $query_result = $conn->query($query);
    $row = $query_result->fetch_assoc();
    $nconvites = count(json_decode($row["convites"]));

    echo "<ul style=\"width: 100%; overflow: hidden;\">
                                    <li style=\"float: left;\" class=\"see-invites menu-li clickable\"> Visualizar convites <span id=\"n-invites\" style=\"border-radius: 3em;padding: 0.8em;background: rgb(0,0,0);color: white;" . ($nconvites>0? "" : "display:none;" ) ."\">" . ($nconvites>0? $nconvites : "" ) . "</span></li>
                                    <li id=\"logout-btn\" class=\"menu-li clickable\"> Logout </li>
                                    <span style=\"float: right; padding: 14px 16px;border-radius: 10px;\"> E ai usuário $login! </span>
                                </ul>
                                <div id=\"bolao_panel\">
                                    Bolões que vocẽ está inserido: </br>
                                    <ul id=\"usr-bolao-list\">";

                                        $boloesArr = json_decode($row["boloes"]);
                                        for($i = 0; $i < count($boloesArr); $i++)  {
                                            $query = "SELECT * FROM Boloes WHERE id = '$boloesArr[$i]'";
                                            $query_result = $conn->query($query);
                                            $row = $query_result->fetch_assoc();
                                            $admobj = json_decode($row["administrador"]);
                                            $apostadoresarr = json_decode($row["apostadores"]);
                                            $jogosarr = json_decode($row["jogos"]);
                                            // Calcular número de apostas e montante
                                            $montanteTotal = 0;
                                            $nApostasTotal = 0;
                                            for($j = 0; $j < count($jogosarr); $j++) {
                                                $nApostasTotal += count($jogosarr[$j]->apostas);
                                                $montanteTotal += $jogosarr[$j]->montante;
                                            }
                                            echo "<li id=\"" . $row["id"] . "\" class=\"bolao-list-usr clickable\"> Bolão " . $row["id"] . " - Quantidade de apostadores: " . count($apostadoresarr) . " / Quantidade de jogos: " . count($jogosarr) . " / Quantidade total de apostas: " . $nApostasTotal . " / Montante total do Bolão: " . $montanteTotal .  " R$ <img class=\"boloes-icon\" src=\"../images/config.png\"> </li>";
                                        }
                                echo "</ul>";
    $conn->close();
?>