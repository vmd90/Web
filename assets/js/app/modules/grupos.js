
(function() {
    "use strict";

	angular.module('app')
	.controller('gruposController', function ($scope, Service) {
		//Recupera informações do usuario
		var user = Service.get_user();
		var follows;
		if(!user){
			window.location = "/";
		}
		$scope.user_id = user.id;
		$scope.user_img = user.photo;
		$scope.user_nome = user.name;

		//Recupera grupos do usuário
		Service.get_groups(user.id).then(
			//OK
			function (res) {
				$scope.groups = res.data;
			},
			//Erro
			function (res){
				console.log('Erro ao recuperar grupos');
			}
		)

		//Recupera lista de usuarios seguindo
		Service.get_follows(user.id).then(
			//ok
			function (respon){
				$scope.follows = respon.data;
			},
			//erro
			function (respon){
				console.log('Erro ao recuperar usuario seguindo');
			}
		)

		//Recupera grupos criados pelo usuario
		Service.get_groups_owner(user.id).then(
			//ok
			function (res){
				$scope.my_groups = res.data;
			},
			//erro
			function (res){
				console.log('Erro ao recuperar grupos criado pelo usuario');
			}
		)

		$scope.addGrupo = function () {
			group = {
				'name': $scope.group_name,
				'bio': $scope.group_bio,
				'owner': user.id
			};

			Service.add_group(group).then(
				//ok
				function (res){
					$scope.my_groups.push(res.data);
					$scope.groups.push(res.data);
				},
				//erro
				function (res){
					console.log('Erro ao recuperar grupos criado pelo usuario');
				}
			);
		}

		$scope.removeGrupo = function (group) {
			Service.remove_group(group.id).then(
				//ok
				function (res){
					$scope.my_groups.splice($scope.my_groups.indexOf(group.id), 1);
					$scope.groups.splice($scope.groups.indexOf(group.id), 1);
				},
				//erro
				function (res){
					console.log('Erro ao recuperar grupos criado pelo usuario');
				}
			);
		}

		$scope.cancelar = function () {
			$scope.group_name = "";
			$scope.group_bio = "";
		}
	});
})();