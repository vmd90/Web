var index_module = angular.module('app.index', []);

index_module.controller('indexController', function ($scope, Service) {
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

	//Links
	$scope.perfil = function () {
		window.location = "#/perfil.html";
	},

	$scope.postar = function () {
		var title = $scope.tweet_title;
		var text = $scope.tweet_text;
		var id = user.id
		Service.add_tweet(id, title, text).then(
			//Sucesso
			function (res) {
				console.log(res);
				$scope.tweet_title = '';
				$scope.tweet_text = '';
			},
			//Erro
			function (res) {
				console.log('Erro: index.js - postar().');
				$scope.tweet_title = '';
				$scope.tweet_text = '';
			}
		);
	},

	$scope.cancelar = function () {
		$scope.tweet_title = '';
		$scope.tweet_text = '';
	}
});