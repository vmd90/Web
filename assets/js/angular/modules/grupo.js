var grupo_module = angular.module('app.grupo', []);

grupo_module.controller('grupoController', function ($scope, Service) {
	//Recupera informações do usuario
	var user = Service.get_user();
	if(!user){
		window.location = "/";
	}
	$scope.user_id = user.id;

	//Recebe id do grupo
	var url = window.location.href;
	var param = url.split("=");
	var group_id = param[1];

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

	//Recupera usuarios no grupo
	Service.get_group_users(group_id).then(
		//ok
		function (res){
			$scope.group_name = res.data.name;
			$scope.group_bio = res.data.bio;
			$scope.group_users = res.data.users;
		},
		//erro
		function (res){
		}
	)

	//Recupera Tweets do grupo
	Service.get_group_tweets(group_id).then(
		//ok
		function (res){
			var tweets = res.data;
			console.log(tweets);
			tweets.forEach( function (tweet, index_tweet){
				console.log(index_tweet);
				if(tweet.user == user.id){
					tweets[index_tweet]['photo'] = user.photo;
					tweets[index_tweet]['name'] = user.name;
				}else{
					tweets[index_tweet]['remove_icon'] = 'hidden';
					$scope.follows.forEach( function (u, index){
						if(tweet.user == u.id){
							tweets[index_tweet]['photo'] = u.photo;
							tweets[index_tweet]['name'] = u.name;
						}
					});
					if(!tweets[index_tweet]['name']){
						Service.find_user(tweet.user).then(
							//ok
							function (res2){
								tweet['photo'] = res2.data.photo;
								tweet['name'] = res2.data.name;
							},
							//erro
							function (res2){
							}
						);
					}
				}
				var date = new Date(tweet.createdAt);
				var f_date = date.getDate().toString() + '/' + (date.getMonth()+1).toString() + '/' + date.getFullYear()
				+' as ' +date.getHours().toString() + ':' +date.getMinutes().toString();
				tweet['date'] = f_date;
				tweets[index_tweet] = tweet;
			});
			console.log(tweets);
			tweets.sort(function(a, b){return new Date(b.createdAt) - new Date(a.createdAt);});
			$scope.group_tweets = tweets;
		},
		//erro
		function (res){
		}
	);

});