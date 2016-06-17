var perfil_module = angular.module('app.perfil', []);

perfil_module.controller('perfilController', function ($scope, Service) {
	
	//Recebe usuario logado
	var user = Service.get_user();
	if(!user){
		window.location = "/";
	}

	//Recebe id do perfil
	var url = window.location.href;
	var param = url.split("=");
	var id = param[1];
	
	//Recupera informações do perfil
	Service.find_user(id).then(
		//OK
		function (res){
			//Atualiza info do perfil
			$scope.user_id = res.data.id;
			$scope.user_img = res.data.photo;
			$scope.user_nome = res.data.name;
			$scope.user_bio = res.data.bio;
			$scope.user_birthday = res.data.birthday;
			$scope.user_email = res.data.email;
			if(user.id == res.data.id){
				$scope.edit_icon = 'show';
				$scope.tittle_groups = 'Meus Grupos';
				$scope.tittle_follows = 'Quem Sigo';
				$scope.follow_icon = 'hidden';
				$scope.unfollow_icon = 'hidden';
			}else{
				$scope.edit_icon = 'hidden';
				$scope.tittle_groups = 'Grupos do ' +  res.data.name;
				$scope.tittle_follows = 'Quem '+res.data.name+' Segue';
			}

			//Recupera grupos do usuario
			Service.get_groups(res.data.id).then(
				//OK
				function (res){
					$scope.groups = res.data;
				},
				//Erro
				function (res){
					console.log('Erro: perfil.find_user.get_groups');
				}
			);

			//Recupera quem o usuario segue
			Service.get_follows(res.data.id).then(
				//OK
				function (res){
					$scope.follows = res.data;
				},
				//Erro
				function (res){
					console.log('Erro: perfil.find_user.get_follows');
				}
			);

			//Recupera quem sigo
			Service.get_follows(user.id).then(
				//OK
				function (res){
					//$scope.follows = res.data;
					var contem = 0;
					res.data.forEach(function (u, index){
						if(u.id == id) contem=1;
					});
					if(contem){
						$scope.follow_icon = 'hidden';
					}else{
						$scope.unfollow_icon = 'hidden';
					}
				},
				//Erro
				function (res){
					console.log('Erro: perfil.find_user.get_follows');
				}
			);


			//Recupera Tweets do usuario
			Service.get_tweets(res.data.id).then(
				//Sucesso
				function (res) {
					// Array de tweets
					var tweets = res.data;
					tweets.forEach( function (tweet, index_tweet){
						tweets[index_tweet]['photo'] = $scope.user_img;
						tweets[index_tweet]['name'] = $scope.user_nome;
					});
					$scope.tweets = tweets;
					//$scope.tweets = res.data;
				},
				//Erro
				function (res) {
					console.log('Erro ao carregar tweets');
				}
			);
		},
		//Erro
		function (res){
			console.log('Erro: perfil.Service.find(user)');
		}
	);	

	

	$scope.follow = function (){
		Service.follow({'user': user.id, 'id': id}).then(
			//ok
			function (res){
				window.location = window.location.href+'#';
			},
			//erro
			function (res){
			}
		);
	}

	$scope.unfollow = function (){
		Service.unfollow({'user': user.id, 'id': id}).then(
			//ok
			function (res){
				window.location = window.location.href+'#';
			},
			//erro
			function (res){
			}
		);
	}

	$scope.tweets = [];
	$scope.format_tweet_date = function(date) {
		var d = new Date(date);
		return d.toLocaleString();
	}


	$scope.perfil_edit = function () {
		window.location = "#/perfil-editar.html";
	}

	// Exibe janela para editar tweet
	$scope.show_tweet_edit_modal = function() {
		angular.element('#edit-tweet-modal-'+this.$index).modal('show');
	}
	// Atualiza um tweet
	$scope.update_tweet = function() {
		// esconde a janela modal
		angular.element('#edit-tweet-modal-'+this.$index).modal('hide');

		var updated_tweet = {
			'title': this.tweet.title,
			'text': this.tweet.text,
			'updatedAt': new Date()
		};

		Service.update_tweet(this.tweet.id, updated_tweet).then(
			// sucesso
			function(res) {
				// atualizar tweets na pagina
				console.log("Sucesso no update: "+ res.data);
			},
			// erro
			function(res) {
				console.log("Erro ao atualizar tweet: "+res);
			}
		);
	}
});