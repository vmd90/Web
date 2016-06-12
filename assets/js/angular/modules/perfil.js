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

	//Recupera posts do usuário
	Service.get_tweets(user.id).then(
		//Sucesso
		function (res) {
			// Array de tweets
			var tweets = res.data;

			// Para cada tweet do usuario, adiciona uma div no html
			for(var tweet in tweets) {
				var div_tweet_list = '<div class="row">'+
							'<div id="posts" class="panel panel-default">'+
								'<div class="panel-heading">'+
									'<b>'+tweet.title+'</b>'+
								'</div>'+
								'<div class="panel-body">'+
									'<div class="col-sm-2">'+
										'<img ng-src="'+$scope.user_photo+'">'+
									'</div>'+
									'<div class="col-sm-9">'+
										'<p>'+tweet.text+'</p>'+
										'<p><small>'+$scope.user_name+'</small></p>'+
									'</div>'+
									'<div class="col-sm-1">'+
										'<button ng-click="editPost()" type="button" class="btn btn-default" aria-label="Left Align">'+
				  							'<span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>'+
										'</button>'+
									'</div>'+
								'</div>'+
							'</div>';
				$('#div-tweet-list').append(div_tweet_list);
			}
		},
		//Erro
		function (res) {
			console.log('Erro ao carregar tweets');
		}
	);

	$scope.perfil_edit = function () {
		window.location = "#/perfil-editar.html";
	}
});