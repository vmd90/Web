var app_module = angular.module('app', ['ngRoute', 'app.login', 'app.index', 'app.service', 'app.perfil',
										 'app.cadastro', 'app.perfil-editar', 'app.grupos', 'app.grupo', 'app.relatorios']);

app_module.config(['$routeProvider',
	function($routeProvider){
		$routeProvider.when('/', {
			templateUrl: '/templates/login.html',
			controller: 'loginController'
		}).when('/index.html', {
			templateUrl: '/templates/index.html',
			controller: 'indexController'
		}).when('/cadastro.html', {
			templateUrl: '/templates/cadastro.html',
			controller: ''
		}).when('/perfil.html', {
			templateUrl: '/templates/perfil.html',
			controller: 'perfilController'
		}).when('/perfil-editar.html', {
			templateUrl: '/templates/perfil-editar.html',
			controller: 'perfilEditarController'
		}).when('/grupos.html', {
			templateUrl: '/templates/grupos.html',
			controller: 'gruposController'
		}).when('/grupo.html', {
			templateUrl: '/templates/grupo.html',
			controller: 'grupoController'
		}).when('/relatorios.html', {
			templateUrl: '/templates/relatorios.html',
			controller: 'relatoriosController'
		}).otherwise({
			redirectTo: '/'
		});
	}
]);