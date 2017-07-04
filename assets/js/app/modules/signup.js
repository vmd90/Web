
(function() {
    "use strict";

	angular.module('app')
	.controller('cadastroController', ['$scope', 'Service', '$location', function ($scope, Service, $location){

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
			$location.path('/index');
		},

		$scope.cancelar = function () {
			window.location = "/";
		}

	}]);
})();