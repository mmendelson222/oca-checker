<?php 

/* require the user as the parameter */
if(isset($_GET['ptin']) && isset($_GET['email'])) {
	$user_id = $_GET['ptin']; 
	
	if ($user_id == 'P00000000') {
		//issue valid token
		$user_data =  array(
			"valid" =>  'true', 
			"authorized" => 'true', 
			"token" => 501
		);
	} else if ($user_id == 'P00000001') {
		//issue invalid token (for testing)
		$user_data =  array(
			"valid" =>  'true', 
			"authorized" => 'true', 
			"token" => 1
		);
	} else {
		//invalid login
		$user_data =  array(
			"valid" =>  'true', 
			"authorized" => 'false', 
			"token" => 0
		);
	}
}  else {
	$user_data =  array(
		"valid" => 'false', 
		"authorized" => 'false', 
		"error" => 'insufficient data',
		"token" => 0
	);
}

/* output in json */
header('Content-type: application/json');
echo json_encode($user_data);
//echo json_encode(array('user_data'=>$user_data));

?>