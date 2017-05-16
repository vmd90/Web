var cadastro_module = angular.module('app.cadastro', []);

cadastro_module.controller('cadastroController', function ($scope, Service){

	$scope.cadastrar = function () {
		var user = {
			'name': $scope.user_name,
			'bio': $scope.user_bio,
			'birthday': $scope.user_birthday,
			'photo': $scope.user_photo,
			'email': $scope.user_email,
			'password': $scope.user_password
		};

		if(!$scope.user_photo) {
			$scope.user_photo = "/images/semfoto.jpg";
		}

		Service.cadastrar(user);
		Service.set_user(user);
		//window.location = "#/index.html";
		$location.path('/index.html');
	},

	$scope.cancelar = function () {
		window.location = "/";
	}

});