<?php

function cors() {
    // Allow from any origin
    if (isset($_SERVER['HTTP_ORIGIN'])) {
        // Decide if the origin in $_SERVER['HTTP_ORIGIN'] is one
        // you want to allow, and if so:
        header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Max-Age: 86400');    // cache for 1 day
    }
    // Access-Control headers are received during OPTIONS requests
    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
            // may also be using PUT, PATCH, HEAD etc
            header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
            header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");

        exit(0);
    }
}

cors();

include_once './config/DBCnx.php';
include_once './model/MethodsCrud.php';
include_once './model/RolesUsers.php';
include_once './model/Users.php';
include_once './model/Clubes.php';
include_once './model/Actividad.php';
include_once './model/Plantel.php';
include_once './model/CategoryClub.php';
include_once './model/ClubSpecialty.php';

$services_users = new Users();
$services_clubes = new Clubes();
$services_roles_user = new RolesUsers();
$services_activities = new Actividad();
$services_campuses = new Plantel();
$services_category_to_club = new CategoryClub();
$services_club_speciality = new ClubSpecialty();


$servicesName = $_GET['servicesName'] ?? '';

switch ($servicesName){
    //Services to table roles users
    case 'get_all_roles':
        echo secure_json_encode($services_roles_user->get_all_roles());
        break;
    //Services to table users
    case 'get_all_users':
        echo secure_json_encode($services_users->get_all_users());
        break;
    case 'get_user_by_id':
        if ( isset($_GET['user_id']) )
        echo secure_json_encode($services_users->get_user_by_id($_GET['user_id']));
        break;
    // Services to table clubs
    case 'get_all_clubs':
        echo secure_json_encode($services_clubes->get_all_clubs());
        break;
    
    case 'get_club_by_id':
        if (!isset($_GET['id']))
            echo 'Error: missing id.';
        else
            echo secure_json_encode($services_clubes->get_club_by_id($_GET['id']));
        break;
    
        case 'get_count_clubs':
        echo secure_json_encode($services_clubes->get_count_clubs());
        break;

    case 'get_activities_by_club':
        if (isset( $_GET['club_id'] )) {
            echo secure_json_encode($services_activities->get_activities_by_club($_GET['club_id']));
        }
        break;
    case 'get_activities_by_id':
        if ( isset($_GET['activities_id'] ) ) {
            echo secure_json_encode($services_activities->get_activities_by_id($_GET['activities_id']));
        }
        break;
    case 'get_all_campuses':
        echo secure_json_encode($services_campuses->get_all_campuses());
        break;
    case 'get_all_category_to_club':
        echo secure_json_encode($services_category_to_club->get_all_category_to_club());
        break;
    case 'get_all_clubs_speciality':
        echo secure_json_encode($services_club_speciality->get_all_clubs_speciality());
        break;
    default:
        echo 'Error: wrong service.get';
        break;
}


function secure_json_encode($content): string
{
    try{
        return json_encode($content, JSON_THROW_ON_ERROR);
    } catch (JsonException $e) {
        error_log($e);
        return "Failed to encode object/array to json.";
    }
}

function secure_json_decode($string)
{
    try {
        return json_decode($string, false, 512, JSON_THROW_ON_ERROR);
    } catch (JsonException $e) {
        error_log($e);
        return "Failed to decode json string into an object.";
    }
}