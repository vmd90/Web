var login_module = angular.module('app.login', []);

login_module.controller('loginController', function ($scope, Service, $location) {

	$scope.login = function() {
		var email = $scope.email;
		var password = $scope.password;
		//var email = 'vitor@usp.br';
		//var password = 'vitor';


		Service.login(email, password).then(
			//Sucesso
			function (res) {
				if(res.data){
					//console.log(res.data.id);
					Service.set_user(res.data);
					//window.location = "#/index.html";
					$location.path('/index.html');
				}else{
					alert('Email ou Password invalidos !');
				}
			},

			//Erro
			function (res) {
				alert('Erro ao consultar banco !');
			}
		);
	},

	$scope.cadastrar = function(){
		//window.location = "#/cadastro.html";
		$location.path('/cadastro.html');
	}
});