<?php

$recepient = "epodgaetskiy@gmail.com";
$sitename = "http://cellmobile.com.ua/";

$mobile = trim($_POST["mobile"]);
$message = "Телефон: $mobile;

$pagetitle = "Новая заявка с сайта \"$sitename\"";
mail($recepient, $pagetitle, $message, "Content-type: text/plain; charset=\"utf-8\"\n From: $recepient");