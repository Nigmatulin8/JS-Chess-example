<?php
include 'class/storage.php';
//include 'class/sessionStorage.php';
include 'class/board.php';
include 'class/fileStorage.php';

$storage = new FileStorage('figures.txt');
$board = new Board($storage);

if (isset($_GET['newFigures'])) {
	echo $board->newFigures();
}

if (isset($_GET['getFigures']))
	echo $board->getFigures();

if(isset($_GET['moveFigure'])) {
	echo $board->moveFigure($_GET['frCoord'], $_GET['toCoord']);
}