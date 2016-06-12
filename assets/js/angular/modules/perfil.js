var perfil_module = angular.module('app.perfil', []);

/*index_module.factory('Service', function ($http){
	
	return {
		'get_user': function(id){
			return $http.get('/user/get_user?id='+id);
		},
		'get_posts': function(){
			return $http.get('/post/show_posts');
		}
	}
});
*/
perfil_module.controller('perfilController', function ($scope, Service) {
	//Recupera informações do usuario
	var user = Service.get_user();
	if(!user){
		window.location = "/";
	}
	$scope.user_img = user.photo;
	$scope.user_nome = user.name;
	$scope.user_bio = user.bio;
	$scope.user_birthday = user.birthday;
	$scope.user_email = user.email;

	//Recupera posts do usuário
	/*Service.get_posts().then(
		//Sucesso
		function (res) {
			$scope.post_titulo = res.data.titulo;
			$scope.post_texto = res.data.texto;
			$scope.post_nome = res.data.nome;
		},
		//Erro
		function (res) {
			console.log('Erro ao carregar posts');
		}
	);*/

	$scope.perfil_edit = function () {
		window.location = "#/perfil-editar.html";
	}
});