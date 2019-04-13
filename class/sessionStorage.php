<?php
class SessionStorage implements Storage {
	var $name;

	function __construct($name) {
		session_start();
	}

	function save($figures) {
		$_SESSION[$name] = $figures;
	}

	function load() {
		return $_SESSION[$name];
	}
}