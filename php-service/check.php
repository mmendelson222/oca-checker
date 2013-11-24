<?php 

function ValidToken($token) {
	//a token is valid if >500
	if (intval($token) > 500) 
		return true;
	else
		return false;
}

/* require the user as the parameter */
$error = "";
if(!isset($_GET['token'])) 
	$error .= "token ";
if(!isset($_GET['mcc'])) 
	$error .= "mcc ";
if(!isset($_GET['receiptsCard'])) 
	$error .= "receiptsCard ";
if(!isset($_GET['receiptsTotal'])) 
	$error .= "receiptsTotal ";
if(!isset($_GET['transactionCount'])) 
	$error .= "transactionCount ";

//check for invalid data. 

if ($error) {
	$results_data = array(
		"valid" =>  'false',
		"error" => 'insufficient data.  missing fields: '.$error
	);
} else if (!ValidToken($_GET['token'])){
	$results_data = array(
		"valid" =>  'false',
		"error" => 'invalid token'
	);
} else {
	$results_data['valid'] = 'true';
	if (intval($_GET['mcc']) > 5000)
		$results_data['result'] = 'true';
	else
		$results_data['result'] = 'false';
}

if (isset($_GET['format']))
	$format = strtolower($_GET['format']) == 'json' ? 'json' : 'xml'; //xml is the default
else
	$format = 'xml';

/* output in necessary format */
if($format == 'json') {
	header('Content-type: application/json');
	echo json_encode(array('results_data'=>$results_data));
} else {
	header('Content-type: text/xml');
	echo '<results>';
	foreach($results_data as $key => $value) {
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
	echo '</results>';
}

?>
