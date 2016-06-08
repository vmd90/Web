var login_module = angular.module('app.login', []);

login_module.controller('loginController', function ($scope) {
	//Dados de login padrãos
	var email = "henrique@usp.br";
	var password = "henrique";

	$scope.login = function() {
		if($scope.email == email && $scope.password == password){
			window.location = "#/index.html";
		}else{
			alert("Email ou Password invalidos !");
		}
	},

	$scope.cadastrar = function(){
		window.location = "/cadastro.html";
	}
});