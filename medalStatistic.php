<?php

//require_once('vendor/autoload.php');
require_once('PlayerCompetitionReward.php');

use \WeDevs\ORM\Eloquent\Facades\DB;

displayMedalFilter();
// displayMedals();
// displayStatisticTable();
//$IDS = getAllMedalistsID();
// echo '<ul>';
// foreach ($IDS as $ID) {
//     echo '<li><a href="'.get_permalink($ID).'">'.get_the_title($ID).'</a></li>';
// }
// echo '</ul>';

if (isset($_POST['medal_button'])) {
    $game = $_POST['game_statistic'];
    $medal = $_POST['medal_statistic'];
    displayStatisticTable($medal);
}


function displayStatisticTable($medal)// wyświetlanie tabeli medalowej
{
    $teams = [];
    $medals = 0;
    $teamMedals = 0;
    $individualMedals = 0;
    $dataToJSON = [];
    $playersInfo = get_medal_statistic();
    echo '<table><th>zawodnik</th><th>igrzyska</th><th>dyscyplina</th><th>medal</th><th>team</th>';
    foreach ($playersInfo as $info) {
        if ($info->getReward()==$medal) {
            echo '<tr><td>'.get_the_title($info->getPlayer()).'</td>';
            echo '<td>'.get_the_title($info->getGame()).'</td>';
            echo '<td>'.get_the_title($info->getCompetition()).'</td>';
            echo  '<td>'.$info->getReward().'</td>';
            echo  '<td>'.getTeam($info).'</td></tr>';
            $team = getTeam($info);
            if ($team==null) {
                $individualMedals++;
            }
            if (!in_array($team, $teams) && isset($team)) {
                $teams[]=$team;
                $teamMedals ++;
            }
            $medals++;
            $dataToJSON[]=array('player'=>$info->getPlayer(),'game'=>$info->getGame(),'competition'=>$info->getCompetition(),'reward'=>$info->getReward());
        }

        // getTeam($teams, $info);
    // var_dump($info);
    }
    $json = json_encode($dataToJSON);
    //var_dump($json);

    // $individualMedals = $medals - $teamMedals;
    $allMedals = $individualMedals + $teamMedals;
    echo '<table><br>';
    echo '<ul><li><h1>ILOŚĆ MEDALISTÓW: '.$medals.'</h1></li>
    <li><h1>ILOŚĆ MEDALI '.$medal.': ' .$allMedals.'</h1></li>
    <li><h1>INDYWIDUALNE: '. $individualMedals.'</h1></li>
    <li><h1>DRUŻYNOWE: '.$teamMedals.'</h1></li></ul>';
}
function displayMedalFilter()
{
    echo "<form method='POST'>
    <label for=\"type\">Typ igrzysk</label>
    <select id=\"select-type\" name=\"type\">
        <option value=\"all\">Wszystkie</option>
        <option value=\"summer\">Letnie</option>
        <option value=\"winter\">Zimowe</option>
    </select>
    ".getGameOptions()."
    <select>
        <option>nie wybrano</option>
    </select>
    <select name='medal_statistic'>
        <option>Złoty</option>
        <option>Srebrny</option>
        <option>Brązowy</option>
    </select>
    <input list=\"person\">
    <datalist id=\"person\" name=\"person\">
      <option value=\"Krystian Kuźmiński\">
      <option value=\"Andrzej Duda\">
    </datalist>

    <button name='medal_button' type='submit'>szukaj</button>
    </form>";
}

function getAllMedalistsID()
{
    $all = get_medal_statistic();
    $medalists = [];
    foreach ($all as $row) {
        if (!in_array($row->getPlayer(), $medalists)) {
            $medalists[] = $row->getPlayer();
        }
    }
    return $medalists;
}


function getGameOptions()
{
    $selector = "<select name='game_statistic' id='game_statistic'><option>nie wybrano</option><option class=\"summer\">Jedyne letnie</option>";
    $args=array('post_type'=>'olympics_summer', 'posts_per_page'=>'-1');
    $options = collectGames($args);
    $selector.= $options;
    $args=array('post_type'=>'olympics_winter', 'posts_per_page'=>'-1');
    $options = collectGames($args);
    $selector.= $options;
    $selector.= "</select>";

    return $selector;
}
function collectGames($args)
{
    $args = $args;
    $selector='';
    $postTypeList = query_posts($args);
    foreach ($postTypeList as $post) {
        $selector.= '<option class="winter">' . $post->post_title . '</option>';
    }
    return $selector;
}
function getCompetitionOptions()
{
}


function displayMedals($medal)
{
    $playersInfo = get_medal_statistic();
    $teams = [];
    $medals = 0;
    foreach ($playersInfo as $info) {
        // var_dump($info->getReward());
        if ($info->getReward()==$medal && $info->getGame()==300) {
            $team = getTeam($info);
            if (!in_array($team, $teams) && isset($team)) {
                $teams[]=$team;
                $medals ++;
            }
        }
    }
    print_r($medals);
    var_dump($teams);
}


function getTeam(PlayerGameCompetitionReward $info)
{
    $posts = get_posts(array(
        'numberposts' => 1,
        'post_type' => 'team',
        'meta_query' => array(
            'relation' => 'AND',
            array(
                'key' => 'team_players',
                'value' => $info->getPlayer(),
                'compare' => 'LIKE',
            ),
            array(
                'key' => 'team_olimpic',
                'value' => $info->getGame(),
                'compare' => '=',
            ),
            array(
                'key' => 'team_competition',
                'value' => $info->getCompetition(),
                'compare' => '=',
            ),
        ),
    ));
    if (!empty($posts)) {
        return $posts[0]->ID;
    }
}
getGameStatistic('Ateny 2004');
