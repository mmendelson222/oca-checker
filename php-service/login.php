<?php 

/* require the user as the parameter */
if(isset($_GET['ptin']) && isset($_GET['email'])) {
	$user_id = $_GET['ptin']; 
	
	if ($user_id == 'P00000000') {
		//issue valid token
		$user_data =  array(
			"valid" =>  'true', 
			"token" => 501
		);
	} else if ($user_id == 'P00000001') {
		//issue invalid token (for testing)
		$user_data =  array(
			"valid" =>  'true', 
			"token" => 1
		);
	} else {
		//invalid login
		$user_data =  array(
			"valid" =>  'false', 
			"token" => 0
		);
	}
}  else {
	$user_data =  array(
		"valid" => 'false', 
		"error" => 'insufficient data',
		"token" => 0
	);
}
	
if (isset($_GET['num'])) 
	$format = strtolower($_GET['format']) == 'json' ? 'json' : 'xml'; //xml is the default
else
	$format = 'xml';

/* output in necessary format */
if($format == 'json') {
	header('Content-type: application/json');
	echo json_encode(array('user_data'=>$user_data));
}
else {
	header('Content-type: text/xml');
	echo '<user_data>';
	foreach($user_data as $key => $value) {
		echo '<',$key,'>';
		if(is_array($value)) {
			foreach($value as $tag => $val) {
				echo '<',$tag,'>',htmlentities($val),'</',$tag,'>';
			}
		} else {
			echo $value;
		}
		echo '</',$key,'>';
	}
	echo '</user_data>';
}

?>