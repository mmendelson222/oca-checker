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
		$results_data['result'] = 'normal';
	else
		$results_data['result'] = 'low';
}

/* output in json */
header('Content-type: application/json');
echo json_encode($results_data);
//echo json_encode(array('results_data'=>$results_data));

?>
