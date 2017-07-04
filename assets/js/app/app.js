(function() {
    "use strict";

    angular
        .module('app', [
            'ngRoute'
        ])
        .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
            $routeProvider
                .when('/', {
                    templateUrl: '/templates/login.html',
                    controller: 'loginController'
                }).when('/index', {
                    templateUrl: '/templates/index.html',
                    controller: 'indexController'
                }).when('/signup', {
                    templateUrl: '/templates/signup.html',
                    controller: ''
                }).when('/perfil', {
                    templateUrl: '/templates/perfil.html',
                    controller: 'perfilController'
                }).when('/perfil-editar', {
                    templateUrl: '/templates/perfil-editar.html',
                    controller: 'perfilEditarController'
                }).when('/grupos', {
                    templateUrl: '/templates/grupos.html',
                    controller: 'gruposController'
                }).when('/grupo', {
                    templateUrl: '/templates/grupo.html',
                    controller: 'grupoController'
                }).when('/relatorios', {
                    templateUrl: '/templates/relatorios.html',
                    controller: 'relatoriosController'
                });

            $locationProvider.html5Mode(true);
        }]);
})();