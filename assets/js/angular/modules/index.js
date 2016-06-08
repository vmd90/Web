var index_module = angular.module('app.index', []);

index_module.factory('Service', function ($http){
	
	return {
		'get_user': function(id){
			return $http.get('/user/get_user?id='+id);
		},
		'get_posts': function(){
			return $http.get('/post/show_posts');
		}
	}
});

index_module.controller('indexController', function ($scope, Service) {
	//Recupera informações do usuario
	Service.get_user(1).then(
		//Sucesso
		function (res) {
			$scope.user_img = "images/"+res.data.photo;
			console.log($scope.user_img);
			$scope.user_nome = res.data.name;
			$scope.user_bio = res.data.bio;
			$scope.user_birthday = res.data.birthday;
			$scope.user_email = res.data.email;
		},
		//Erro
		function (res) {
			console.log('Erro ao carregar informacoes do usuario');
		}
	);

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

});