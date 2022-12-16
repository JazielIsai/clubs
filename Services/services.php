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
include_once './model/Habilidades.php';
include_once './model/Idioma.php';
include_once './model/Incidencias.php';
include_once './model/UsuariosMiembros.php';
include_once './model/Especialidad.php';
include_once './model/rol_member_club.php';

$services_users = new Users();
$services_clubes = new Clubes();
$services_roles_user = new RolesUsers();
$services_activities = new Actividad();
$services_campuses = new Plantel();
$services_category_to_club = new CategoryClub();
$services_club_speciality = new ClubSpecialty();
$services_skills=new Habilidades();
$service_idioms=new Idioma();
$services_incidencias=new Incidencias();
$services_users_club = new UsuariosMiembros();
$services_specialities = new Especialidad();
$services_rol_member_club = new rol_member_club();

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
//Skills
    case 'get_all_skills':
        echo secure_json_encode($services_skills->get_all_skills());
        break;

    case 'insert_a_new_skill':
        if(isset($_POST['skill_info'])){
            echo $services_skills->insert_a_new_skill(secure_json_decode($_POST['skill_info']));
        }else{
            echo "Error";
        }
        break;
//Idiomas
    case 'get_all_idioms':
        echo secure_json_encode($service_idioms->get_all_idioms());
        break;
    case 'insert_a_new_idiom':
        if(isset($_POST['idiom_info'])){
            echo $service_idioms->insert_a_new_idioma(secure_json_decode($_POST['idiom_info']));
        }else{
            echo "Error";
        }
//Incidencias
    case 'get_all_incidencias':
        echo secure_json_encode($services_incidencias->get_all_incidencias());
        break;

//Usuarios Miembros
    case 'get_users_by_club':
        if (!isset($_GET['club_id']))
            echo 'Error: missing id.';
        else
        {
            echo secure_json_encode($services_users_club->get_users_by_club($_GET['club_id']));
        }
        break;
        
    case 'add_new_user_club':
        if (!isset($_POST['user_info']))
            echo 'Error: missing info.';
        else
        {
            echo ($services_users_club->add_new_user_club(secure_json_decode($_POST['user_info'])));
        }
        break;

    // Especialidad
    case 'get_all_especialidad':
        echo secure_json_encode($services_specialities->get_all_especialidad());
        break;

    case 'add_new_especialidad':
        if(isset($_POST['especialidad_info'])){
            echo $services_specialities->add_new_especialidad(secure_json_decode($_POST['especialidad_info']));
        }else{
            echo "Error";
        }
        break;
    //rol members club
    case 'get_all_rol_members_clubs':
        echo secure_json_encode($services_rol_member_club->get_all_rol_members_clubs());
        break;

    case 'get_rol_member_club_by_id':
        if ( isset($_GET['rol_members_clubs_id']) )
        echo secure_json_encode($services_rol_member_club->get_rol_member_club_by_id($_GET['rol_members_clubs_id']));
        break;

    case 'add_rol_member_club':
        if ( isset($_POST['add_nombre_rol_member_club']) )
        echo ($services_rol_member_club->add_rol_member_club($_POST['add_nombre_rol_member_club']));
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
