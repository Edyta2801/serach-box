<?php
require_once('vendor/autoload.php');
require_once('PlayerCompetitionReward.php');

use \WeDevs\ORM\Eloquent\Facades\DB;



displayPanel();
function displayPanel()
{
    
echo '<input type="search" onkeyup="myFunction()" onchange="myFunction()" placeholder="Search by name" id="search-input" data-table="customers-list" style="margin:20px 0; display:flex; position: sticky; top:40px;">';
echo '<span id="myTable">';

$player = DB::table('olympians')
->join('wp_games', 'wp_olympians.game', '=', 'wp_games.ID')
->select('wp_olympians.*', 'wp_games.year')
->orderBy('wp_games.year')->limit(60)->get();

    foreach ($player as $pgc) {
        echo '<div id="row" style="display: flex; align-items: center; margin-bottom: 0.25rem;">';
        echo '<span style="flex: 20%; text-align: right; padding-right: 0.25rem;">'. get_the_title($pgc->nowe_id_zawodnika) .'</span>';
        echo displayGameSelector($pgc->game);
        echo displayChiefCompetitions($pgc);
        echo '<button 
            type="button"
            type="button"
            data-id="' . $pgc->id . '"
            data-name="' . get_the_title($pgc->player) . '"
            onclick="getFormData()"
            class="btn btn-success">Edytuj</button>';
        echo '</div>';  
    }
echo '</span>';
}

function displayGameSelector($selected): string
{
    $games = DB::table('posts')->where('post_type', 'like', '%olympics%')->get();
    $selector = '<select name="game" class="game">';
    foreach ($games as $game) {
        if ($game->ID == $selected) {
            $selector .= '<option selected>' . $game->post_title . '</option>';
        } else {
            $selector .= '<option>' . $game->post_title . '</option>';
        }
    }
    $selector .= '</select>';

    return $selector;
}

function displayChiefCompetitions($pgc): string
{
    $selected = $pgc->competition;
    $competitions = DB::table('posts')->where([
        ['post_type', '=', 'competition'],
    ])->get();

    $selector = '<select id="competitionSelect_'.$pgc->id.'" name="competition" onclick="sortOptions()">';
    foreach ($competitions as $competition) {
        if ($competition->ID == $selected) {
            if ($parent = wp_get_post_parent_id($competition->ID)) {
                $selector .= '<option selected>' . get_the_title($parent) . ':' . $competition->post_title . '</option>';
            } else {
                $selector .= '<option selected>' . $competition->post_title . '</option>';
            }
        } else {
            if ($parent = wp_get_post_parent_id($competition->ID)) {
                $selector .= '<option>' . get_the_title($parent) . ':' . $competition->post_title . '</option>';
            } else {
                $selector .= '<option>' . $competition->post_title . '</option>';
            }
        }
    }
    $selector .= '</select>';
    return $selector;
}

function displayMedalSelector($pgc): string
{
    $selector = '<select name="medal">';

    if ($pgc->gold) {
        $selector .= '<option selected>GOLD</option>
        <option>SILVER</option>
        <option>BRONZE</option>';
    } elseif ($pgc->silver) {
        $selector .= '<option>GOLD</option>
        <option selected>SILVER</option>
        <option>BRONZE</option>';
    } elseif ($pgc->bronze) {
        $selector .= '<option selected>GOLD</option>
        <option>SILVER</option>
        <option selected>BRONZE</option>';
    } else {
        $selector .= '<input name="medal" style="color:bronze" value="BRAK MEDALU">';
    }
    $selector .= '</select>';
    // var_dump($selector);
    return $selector;
}
// $playerID = 15667;


// $olimpics = DB::table('postmeta')->where([
//     ['post_id', '=', $playerID],
//     ['meta_key','like','olimpic_information%olimpic'],
// ])->get();

// foreach ($olimpics as $olimpic) {
//     $key = str_replace('_olimpic', '', $olimpic->meta_key);
//     $competitions = DB::table('postmeta')->where([
//         ['post_id', '=', $playerID],
//         ['meta_key','like',$key.'%competition'],
//     ])->get();

//     $rewards = DB::table('postmeta')->where([
//         ['post_id', '=', $playerID],
//         ['meta_key','like','olimpic_information%reward'],
//     ])->get('meta_value');
// }



// var_dump($playersInfo);


