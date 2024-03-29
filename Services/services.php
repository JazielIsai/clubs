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
include_once './model/Evidences.php';
include_once './model/PlanAnual.php';
include_once  './model/ActaConstitutiva.php';
include_once './model/TypeActivity.php';
include_once './model/EvaluationMember.php';
include_once './model/LogoClub.php';
include_once './model/profile_user.php';

include_once './Controller/UploadDocument.php';

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
$services_evidences = new Evidences();
$services_planAnual = new PlanAnual();
$services_acta = new ActaConstitutiva();
$services_type_activity = new TypeActivity();
$services_evaluation_member = new EvaluationMember();
$services_logo = new LogoClub();
$services_profile_user = new ProfileUser();

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

    case 'existing_user':
        if ( isset($_GET['email'], $_GET['password'] ) ){
            echo json_encode($services_users->existing_user($_GET['email'], $_GET['password']));
        } else {
            echo 'Error: missing id.';
        }
        break;

    case 'add_user':
        if (!isset($_POST['user_info']))
            echo 'Error: missing info.';
        else
            echo ($services_users->add_user(secure_json_decode($_POST['user_info'])));
        break;

    case 'update_user':
        if (!isset($_POST['user_info']))
            echo 'Error: missing info.';
        else
            echo ($services_users->update_user(secure_json_decode($_POST['user_info'])));
        break;
    case 'update_role_user':
        if (!isset($_POST['user_rol_info']))
            echo 'Error: missing info.';
        else
            echo ($services_users->update_role_user(secure_json_decode($_POST['user_rol_info'])));
        break;
    
    // phot of profile user
    case 'add_photo':
        try {
            echo ($services_profile_user->add_photo(secure_json_decode($_POST['photo_data']), $_POST['nameUser']));
        } catch (Exception $e) {
            echo $e->getMessage();
        }

        break;
    
    case 'get_photo_by_user':
        if (!isset($_GET['user_id']))
            echo 'Error: missing id.';
        else
            echo secure_json_encode($services_profile_user->get_photo_by_user($_GET['user_id']));
        break;


    // Services to table clubs
    case 'get_all_clubs':
        echo secure_json_encode($services_clubes->get_all_clubs());
        break;
    
    case 'get_club_by_id':
        if (!isset($_GET['club_id']))
            echo 'Error: missing id.';
        else
            echo secure_json_encode($services_clubes->get_club_by_id($_GET['club_id']));
        break;

    case 'add_club':
        if (isset($_POST['club_info'])) {
            echo json_encode($services_clubes->add_club(json_decode($_POST['club_info'])));
        }
        break;

    case 'update_club':
        if (!isset($_POST['club_info']))
            echo 'Error: missing info.';
        else
            echo ($services_clubes->update_club(json_decode($_POST['club_info'])));
        break;

    case 'delete club':
        if (!isset($_POST['id_club']))
            echo 'Error: missing id.';
        else
            echo secure_json_encode($services_clubes->delete_club($_POST['id_club']));
        break;
    
    case 'get_count_clubs':
        echo secure_json_encode($services_clubes->get_count_clubs());
        break;

    //Services to table Activity
    case 'add_activity':
        if (!isset($_POST['activity_info']))
            echo 'Error: missing info.';
        else
            echo ($services_activities->add_activity(json_decode($_POST['activity_info'])));
        break;

    case 'update_activity':
        if (!isset($_POST['activity_info']))
            echo 'Error: missing info.';
        else
            echo ($services_activities->update_activity(secure_json_decode($_POST['activity_info'])));
        break;

    case 'delete_activity':
        if (!isset($_POST['id_activity']))
            echo 'Error: missing id.';
        else
            echo secure_json_encode($services_activities->delete_activity($_POST['id_activity']));
        break;

    case 'get_activities_by_club':
        if (isset( $_GET['club_id'] )) {
            echo secure_json_encode($services_activities->get_activities_by_club($_GET['club_id']));
        }
        break;

    case 'get_activities_by_id':
        if ( isset($_GET['activities_id'] ) ) {
            echo json_encode($services_activities->get_activities_by_id($_GET['activities_id']));
        }
        break;

    case 'get_count_activities_by_club':
        if (isset($_GET['club_id'])){
            echo secure_json_encode($services_activities->get_count_activities_by_club($_GET['club_id']));
        }
        break;

    case 'get_public_activities':
        echo secure_json_encode($services_activities->get_public_activities());
        break;

    case 'get_count_activities_public':
        echo json_encode($services_activities->get_count_activities_public());
        break;

// Evidences
    case 'get_evidences_by_activity':
        if (isset($_GET['id_activity']))
        echo json_encode($services_evidences->get_evidences_by_activity($_GET['id_activity']));
        break;
    
    case 'update_evidence':
        if (!isset($_POST['evidence_info']))
            echo 'Error: missing info.';
        else
            echo ($services_evidences->update_evidence(secure_json_decode($_POST['evidence_info'])));
        break;

    case 'add_evidence':
        if (isset( $_POST['evidence_info'], $_POST['id_club'], $_POST['nameClub'] ))
            echo ($services_evidences->add_evidence(secure_json_decode($_POST['evidence_info']), $_POST['id_club'], $_POST['nameClub']));
        else
            echo 'Error: missing info.';
        break;

// Campuses
    case 'get_all_campuses':
        echo secure_json_encode($services_campuses->get_all_campuses());
        break;

    case 'add_campuses':
        if (!isset($_POST['name_campus'])){
            echo 'Error: missing info.';
        } else {
            echo $services_campuses->add_campuses($_POST['name_campus']);
        }
        break;

    case 'update_campuses':
        if (!isset($_POST['name_campus'], $_POST['id_campus'])){
            echo 'Error: missing info.';
        } else {
            echo $services_campuses->update_campuses($_POST['name_campus'],  $_POST['id_campus']);
        }
        break;

    case 'delete_campuses':
        if (!isset($_POST['id_campus'])){
            echo 'Error: missing info.';
        } else {
            echo $services_campuses->delete_campuses($_POST['id_campus']);
        }
        break;


// category by club
    case 'get_all_category_to_club':
        echo secure_json_encode($services_category_to_club->get_all_category_to_club());
        break;

    case 'add_category_to_club':
        if (!isset($_POST['name_category'])){
            echo 'Error: missing info.';
        } else {
            echo $services_category_to_club->add_category_to_club($_POST['name_category']);
        }
        break;

    case 'update_category_to_club':
        if (!isset($_POST['name_category'], $_POST['id_category'])){
            echo 'Error: missing info.';
        } else {
            echo $services_category_to_club->update_category_to_club($_POST['name_category'],  $_POST['id_category']);
        }
        break;

    case 'delete_category_to_club':
        if (!isset($_POST['id_category'])){
            echo 'Error: missing info.';
        } else {
            echo $services_category_to_club->delete_category_to_club($_POST['id_category']);
        }
        break;

// speciality by club
    case 'get_all_clubs_speciality':
        echo secure_json_encode($services_club_speciality->get_all_clubs_speciality());
        break;

    case 'add_clubs_speciality':
        if (!isset($_POST['name_speciality'])){
            echo 'Error: missing info.';
        } else {
            echo $services_club_speciality->add_clubs_speciality($_POST['name_speciality']);
        }
        break;

    case 'update_clubs_speciality':
        if (!isset($_POST['name_speciality'], $_POST['id_speciality'])){
            echo 'Error: missing info.';
        } else {
            echo $services_club_speciality->update_clubs_speciality($_POST['name_speciality'],  $_POST['id_speciality']);
        }
        break;

    case 'delete_clubs_speciality':
        if (!isset($_POST['id_speciality'])){
            echo 'Error: missing info.';
        } else {
            echo $services_club_speciality->delete_clubs_speciality($_POST['id_speciality']);
        }
        break;

// Type Activity
    case 'get_all_type_activity':
        echo json_encode($services_type_activity->get_all_type_activity());
        break;
    
    case 'add_type_activity':
        if (!isset($_POST['name_type_activity'])){
            echo 'Error: missing info.
                    ya mamaste';
        } else {
            echo $services_type_activity->add_type_activity($_POST['name_type_activity']);
        }
        break;
    case 'update_type_activity':
        if (!isset($_POST['activity_info'])){
            echo 'Error: missing info.';
        } else {
            echo $services_type_activity->update_type_activity( json_decode($_POST['activity_info']) );
        }
        break;
    case 'delete_type_activity':
        if (!isset($_POST['id_type_activity'])){
            echo 'Error: missing info.';
        } else {
            echo $services_type_activity->delete_type_activity($_POST['id_type_activity']);
        }
        break;


//Skills
    case 'get_all_skills':
        echo secure_json_encode($services_skills->get_all_skills());
        break;

    case 'insert_a_new_skill':
        if(isset($_POST['skill_info'])){
            echo $services_skills->insert_a_new_skill( $_POST['skill_info'] );
        }else{
            echo "Error";
        }
        break;

    case 'update_skill':
        if (!isset($_POST['name_skill'], $_POST['id_skill'])){
            echo 'Error: missing info.';
        } else {
            echo $services_skills->update_skill($_POST['name_skill'],  $_POST['id_skill']);
        }
        break;

    case 'delete_skill':
        if (!isset($_POST['id_skill'])){
            echo 'Error: missing info.';
        } else {
            echo $services_skills->delete_skill($_POST['id_skill']);
        }
        break;


//Idiomas
    case 'get_all_idioms':
        echo secure_json_encode($service_idioms->get_all_idioms());
        break;

    case 'insert_a_new_language':
        if(isset($_POST['language_name'])){
            echo $service_idioms->insert_a_new_language( $_POST['language_name'] );
        }else{
            echo "Error: missing info.";
        }
        break;

    case 'update_language':
        if (!isset($_POST['language_info'])){
            echo 'Error: missing info.';
        } else {
            echo $service_idioms->update_language(json_decode($_POST['language_info']));
        }
        break;

    case 'delete_language':
        if (!isset($_POST['id_language'])){
            echo 'Error: missing info.';
        } else {
            echo $service_idioms->delete_language($_POST['id_language']);
        }
        break;


//Incidencias
    case 'get_all_incidencias':
        echo secure_json_encode($services_incidencias->get_all_incidencias());
        break;

//Usuarios Miembros
    case 'get_users_by_club':
        if (!isset($_GET['club_id']))
            echo 'Error: missing id.';
        else {
            echo secure_json_encode($services_users_club->get_users_by_club($_GET['club_id']));
        }
        break;

    case 'get_members_by_id':
        if (!isset($_GET['member_id'])) {
            echo 'Error: missing info.';
        } else {
            echo json_encode($services_users_club->get_members_by_id($_GET['member_id']));
        }
        break;

    case 'add_new_member_club':
        if (!isset($_POST['member_info'])) {
            echo 'Error: missing info.';
        }
        else {
            echo $services_users_club->add_new_member_club(json_decode($_POST['member_info']));
        }
        break;

    case 'update_member':
        if (!isset($_POST['member_info'])) {
            echo 'Error: missing info.';
        }
        else
            echo ($services_users_club->update_member(secure_json_decode($_POST['member_info'])));
        break;

    case 'update_rol_member_club':
        if (!isset($_POST['member_info'])) {
            echo 'Error: missing info.';
        }
        else
            echo ($services_users_club->update_rol_member_club(json_decode( $_POST['member_info'] )));
        break;

    case 'delete_member':
        if (!isset($_POST['id_member'])) {
            echo 'Error: missing id.';
        }
        else
            echo secure_json_encode($services_users_club->delete_member($_POST['id_member']));
        break;

    case 'get_all_members':
        echo secure_json_encode($services_users_club->get_all_members());
        break;

    case 'get_existing_members':
        echo secure_json_encode($services_users_club->get_existing_members());
        break;

    case 'get_existing_members_by_club':
        if (!isset($_GET['club_id']))
            echo 'Error: missing id.';
        else
            echo secure_json_encode($services_users_club->get_existing_members_by_club($_GET['club_id']));
        break;

    case 'get_members_by_speciality':
        if (!isset($_GET['speciality_id']))
            echo 'Error: missing id.';
        else
            echo secure_json_encode($services_users_club->get_members_by_speciality($_GET['speciality_id']));
        break;
    
    case 'get_all_presidents':
        echo secure_json_encode($services_users_club->get_all_presidents());
        break;

    // Especialidad
    case 'get_all_specialties':
        echo secure_json_encode($services_specialities->get_all_specialties());
        break;

    case 'add_new_specialty':
        if(isset($_POST['especialidad_info'])){
            echo $services_specialities->add_new_specialty(secure_json_decode($_POST['especialidad_info']));
        }else{
            echo "Error";
        }
        break;
    case 'update_specialty':
        if (!isset($_POST['specialty_info'])) {
            echo 'Error: missing info.';
        }
        else
            echo ($services_specialities->update_specialty(secure_json_decode($_POST['specialty_info'])));
        break;
    case 'delete_specialty':
        if (!isset($_POST['id_specialty'])) {
            echo 'Error: missing id.';
        }
        else
            echo secure_json_encode($services_specialities->delete_specialty($_POST['id_specialty']));
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
        if ( isset($_POST['name_rol_to_member']) )
            echo ($services_rol_member_club->add_rol_member_club($_POST['name_rol_to_member']));
        else
            echo 'Error: missing id.';
        break;

    case 'update_name_rol_member_club':
        if (!isset($_POST['name_rol_member_club'], $_POST['id_rol_member_club']))
            echo 'Error: missing info.';
        else
            echo ($services_rol_member_club->update_name_rol_member_club($_POST['name_rol_member_club'], $_POST['id_rol_member_club']));
        break;
    
    case 'delete_rol_member_club':
        if (!isset($_POST['id_rol_member_club']))
            echo 'Error: missing id.';
        else
            echo $services_rol_member_club->delete_rol_member_club($_POST['id_rol_member_club']);
        break;

        //actividades por club
    case 'get_activities_by_id_club':
        if (isset($_GET['get_activities_by_id_club']))
        echo secure_json_encode($services_activities->get_activities_by_id_club($_GET['get_activities_by_id_club']));
        break;

    case 'get_activities_in_progress_by_club':
        if (isset($_GET['activities_in_progress_by_club']))
        echo secure_json_encode($services_activities->get_activities_in_progress_by_club($_GET['activities_in_progress_by_club']));
        break;

    case 'get_uninitiated_activities_by_club':
        if (isset($_GET['uninitiated_activities_by_club']))
        echo secure_json_encode($services_activities->get_uninitiated_activities_by_club($_GET['uninitiated_activities_by_club']));
        break;

    case 'get_activities_completed_by_club':
        if (isset($_GET['activities_completed_by_club']))
        echo secure_json_encode($services_activities->get_activities_completed_by_club($_GET['activities_completed_by_club']));
        break;

    case 'get_activities_per_semester_by_club':
        if (isset($_GET['activities_per_semester_by_club']))
        echo secure_json_encode($services_activities->get_activities_per_semester_by_club($_GET['activities_per_semester_by_club']));
        break;

    case 'get_incidents_by_activity':
        if (isset($_GET['incidents_by_activity']))
        echo secure_json_encode($services_activities->get_incidents_by_activity($_GET['incidents_by_activity']));
        break;

    case 'get_number_of_incidents_by_activity':
        if (isset($_GET['number_of_incidents_by_activity']))
        echo secure_json_encode($services_activities->get_number_of_incidents_by_activity($_GET['number_of_incidents_by_activity']));
        break;

    case 'get_evidence_by_club':
        if (isset($_GET['evidence_by_club']))
        echo secure_json_encode($services_activities->get_evidence_by_club($_GET['evidence_by_club']));
        break;

    case 'get_skills_developed_by_club':
        if (isset($_GET['skills_developed_by_club']))
        echo secure_json_encode($services_activities->get_skills_developed_by_club($_GET['skills_developed_by_club']));
        break;

 //Plan anual
    case 'add_new_planAnual':
        if (isset($_POST['plan_info'], $_POST['nameClub'])) {
            echo $services_planAnual->add_new_planAnual(json_decode($_POST['plan_info']), $_POST['nameClub']);
        }
        break;

    case 'get_all_planAnual':
        echo secure_json_encode($services_planAnual->get_all_planAnual());
        break;

    case 'get_plan_anual_by_club_id':
        if (isset($_GET['club_id']))
            echo secure_json_encode($services_planAnual->get_plan_anual_by_club_id($_GET['club_id']));
        break;

//Acta Constitutiva
    case 'get_all_acta':
        echo secure_json_encode($services_acta->get_all_acta());
        break;

    case 'add_new_acta':
        if (isset($_POST['acta_info'], $_POST['nameClub'])) {
            echo ($services_acta->add_new_acta(json_decode($_POST['acta_info']), $_POST['nameClub']));
        }
        break;

    case 'get_acta_constitutiva_by_club':
        if (isset($_GET['club_id']))
            echo secure_json_encode($services_acta->get_acta_constitutiva_by_club($_GET['club_id']));
        break;

// logo del club
    case 'add_logo':
        if (isset($_POST['logo_info'], $_POST['nameClub'])) {
            echo ($services_logo->add_logo(json_decode($_POST['logo_info']), $_POST['nameClub']));
        } else {
            echo 'Error: missing info.';
        }
        break;

    case 'get_logo_by_club':
        if (isset($_GET['id_club'])) {
            echo json_encode($services_logo->get_logo_by_club($_GET['id_club']));
        } else {
            echo 'Error: missing info.';
        }
        break;

// evaluation member by activity
    case 'get_evaluation_member':
        if (isset($_GET['id_activity'])) {
            echo json_encode($services_evaluation_member->get_evaluation_member($_GET['id_activity']));
        } else {
            echo 'Error: missing info.';
        }
        break;

    case 'add_evaluation_member_by_activity':
        if (isset($_POST['evaluation_member_info'])) {
            echo json_encode($services_evaluation_member->add_evaluation_member_by_activity(json_decode($_POST['evaluation_member_info'])));
        } else {
            echo "Error: Missing info.";
        }
        break;

    case 'update_evaluation_member_by_activity':
        if (isset($_POST['evaluation_member_info'])) {
            echo json_encode($services_evaluation_member->update_evaluation_member_by_activity(json_decode($_POST['evaluation_member_info'])));
        } else {
            echo "Error: Missing info.";
        }
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
