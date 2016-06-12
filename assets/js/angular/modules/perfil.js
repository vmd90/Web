
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
	$scope.user_photo = user.photo;
	$scope.user_name = user.name;
	$scope.user_bio = user.bio;
	$scope.user_birthday = user.birthday;
	$scope.user_email = user.email;

	$scope.tweets = [];
	$scope.format_tweet_date = function(date) {
		var d = new Date(date);
		return d.toLocaleString();
	}

	//Recupera posts do usuário
	Service.get_tweets(user.id).then(
		//Sucesso
		function (res) {
			// Array de tweets
			$scope.tweets = res.data;
		},
		//Erro
		function (res) {
			console.log('Erro ao carregar tweets');
		}
	);

	$scope.perfil_edit = function () {
		window.location = "#/perfil-editar.html";
	}

	// Exibe janela para editar tweet
	$scope.show_tweet_edit_modal = function(index) {
		angular.element('#edit-tweet-modal-'+index).modal('show');
	}
	// Atualiza um tweet
	$scope.update_tweet = function() {
		var title = angular.element('#tweet-title').value;
		var text = angular.element('#tweet-text').value;
		
	}
});