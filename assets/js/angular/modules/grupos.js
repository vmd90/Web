var grupos_module = angular.module('app.grupos', []);

grupos_module.controller('gruposController', function ($scope, Service) {
	//Recupera informações do usuario
	var user = Service.get_user();
	var follows;
	if(!user){
		window.location = "/";
	}
	$scope.user_id = user.id;
	$scope.user_img = user.photo;
	$scope.user_nome = user.name;
	$scope.user_bio = user.bio;
	$scope.user_birthday = user.birthday;
	$scope.user_email = user.email;

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
	}

	$scope.removeGrupo = function () {
	}
});