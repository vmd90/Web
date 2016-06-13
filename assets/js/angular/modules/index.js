var index_module = angular.module('app.index', []);

index_module.controller('indexController', function ($scope, Service) {
	//Recupera informações do usuario
	var user = Service.get_user();
	var follows;
	if(!user){
		window.location = "/";
	}
	$scope.user_img = "images/"+user.photo;
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
	

	//Recupera tweets dos usuário seguidos
	Service.get_tweets_follows(user.id).then(
		//Sucesso
		function (res) {
			//coloca foto e nome nos tweets
			var tweets = res.data;
			tweets.forEach( function (tweet, index_tweet){
				$scope.follows.forEach( function (u, index){
					if(tweet.user == u.id){
						tweets[index_tweet]['photo'] = u.photo;
						tweets[index_tweet]['name'] = u.name;
					}else if(tweet.user == user.id){
						tweets[index_tweet]['photo'] = user.photo;
						tweets[index_tweet]['name'] = user.name;
					}//Senao coloca foto padrao
				});
			});
			$scope.tweets = res.data;
		},
		//Erro
		function (res) {
			console.log('Erro ao carregar posts');
		}
	);

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
			},
			//Erro
			function (res) {
				console.log('Erro: index.js - postar().');
			}
		);
	},

	$scope.cancelar = function () {
		$scope.tweet_title = '';
		$scope.tweet_text = '';
	}
});