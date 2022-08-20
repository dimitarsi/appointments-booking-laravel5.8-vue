<?php
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <script src="http://klendr.localhost/embed/123456.js"></script>
</body>
</html>
<?php
} else {
    $chandler = curl_init('http://klendr.localhost/tken');
    $params = ['secret' => '996bb240-4d90-4153-ad46-011eea2121ae'];
    curl_setopt($chandler, CURLOPT_POST, true);
    curl_setopt($chandler, CURLOPT_POSTFIELDS, $params);
    curl_setopt($chandler, CURLOPT_RETURNTRANSFER, true);
    $result = curl_exec($chandler);
    header('Content-Type: application/json');
    echo $result;
}