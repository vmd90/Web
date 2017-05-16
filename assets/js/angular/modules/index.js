var index_module = angular.module('app.index', []);

index_module.controller('indexController', function ($scope, Service, $location) {
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


	//Recupera tweets dos usuário seguidos
	Service.get_tweets_follows(user.id).then(
		//Sucesso
		function (res) {
			//coloca foto e nome nos tweets
			var tweets = res.data;
			tweets.forEach( function (tweet, index_tweet){

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
				}
				var date = new Date(tweet.createdAt);
				var f_date = date.getDate().toString() + '/' + (date.getMonth()+1).toString() + '/' + date.getFullYear()
				+' as ' +date.getHours().toString() + ':';
				if(date.getMinutes()<10)
					f_date+='0';
				f_date+=date.getMinutes().toString();
				tweets[index_tweet]['date'] = f_date;
			});
			tweets.sort(function(a, b){return new Date(b.createdAt) - new Date(a.createdAt);});
			$scope.tweets = tweets;
		},
		//Erro
		function (res) {
			console.log('Erro ao carregar posts');
		}
	);

	//Links
	$scope.postar = function () {
		var tittle = $scope.tweet_title;
		var text = $scope.tweet_text;
		var id = user.id

		$scope.tweet_title = '';
		$scope.tweet_text = '';

		var tweet = {
			tittle: tittle,
			text: text,
			user: id,
			themes: [],
			users: []
		}

		//Recupera temas por #
		var string = text.split('#');
		string.forEach( function (str, index){
			if(index != 0){
				var s = str.split(/[,!?;: ]/);
				if(s[0]!="")
					tweet.themes.push(s[0]);
			}
		});

		//Recupera usuarios
		string = text.split("@");
		string.forEach( function (str, index){
			if(index != 0){
				var s = str.split(/[,!?;: ]/);
				if(s[0]!="")
					tweet.users.push(s[0]);
			}
		});

		//console.log(tweet);
		Service.add_tweet(tweet).then(
			//Sucesso
			function (res) {
				var t = res.data;
				t['photo'] = user.photo;
				t['name'] = user.name;
				var date = new Date(t.createdAt);
				var f_date = date.getDate().toString() + '/' + (date.getMonth()+1).toString() + '/' + date.getFullYear()
				+' as ' +date.getHours().toString() + ':';
				if(date.getMinutes()<10)
					f_date+='0';
				f_date+=date.getMinutes().toString();
				t['date'] = f_date;
				$scope.tweets.push(t);
				$scope.tweets.sort(function(a, b){return new Date(b.createdAt) - new Date(a.createdAt);});
			},
			//Erro
			function (res) {
			}
		);
	},

	$scope.cancelar = function () {
		$scope.tweet_title = '';
		$scope.tweet_text = '';
	},

	$scope.removeTweet = function(tweet){
		Service.remove_tweet(tweet.id).then(
			//ok
			function (res){
				window.location = window.location.href+'#';
			},
			//erro
			function (res){

			}
		);
	},

	$scope.home = function(){
		//window.location = "#/index.html";
		$location.path('/index.html');
	},

	$scope.go = function(path) {
		$location.path(path);
	}
});