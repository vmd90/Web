
(function() {
    "use strict";

	angular.module('app')
	.controller('perfilController', function ($scope, Service, $location) {

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


				//Recupera Posts do usuario
				Service.get_posts(res.data.id).then(
					//Sucesso
					function (res) {
						// Array de posts
						var posts = res.data;
						posts.forEach( function (post, index_post){
							if(user.id != post.user){
								posts[index_post]['remove_icon'] = 'hidden';
							}
							posts[index_post]['photo'] = $scope.user_img;
							posts[index_post]['name'] = $scope.user_nome;
							var date = new Date(post.createdAt);
							var f_date = date.getDate().toString() + '/' + (date.getMonth()+1).toString() + '/' + date.getFullYear()
							+' as ' +date.getHours().toString() + ':';
							if(date.getMinutes()<10)
								f_date+='0';
							f_date+=date.getMinutes().toString();
							posts[index_post]['date'] = f_date;
						});
						posts.sort(function(a, b){return new Date(b.createdAt) - new Date(a.createdAt);});
						$scope.posts = posts;
					},
					//Erro
					function (res) {
						console.log('Erro ao carregar posts');
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
		},

		$scope.removePost = function(post){
			Service.remove_post(post.id).then(
				//ok
				function (res){
					window.location = window.location.href+'#';
				},
				//erro
				function (res){
				}
			);
		},

		$scope.posts = [];
		$scope.format_post_date = function(date) {
			var d = new Date(date);
			return d.toLocaleString();
		},


		$scope.perfil_edit = function () {
			//window.location = "#/perfil-editar.html";
			$location.path('/perfil-editar');
		},

		// Exibe janela para editar post
		$scope.show_post_edit_modal = function() {
			angular.element('#edit-post-modal-'+this.$index).modal('show');
		},
		// Atualiza um post
		$scope.update_post = function() {
			// esconde a janela modal
			angular.element('#edit-post-modal-'+this.$index).modal('hide');

			var updated_post = {
				'title': this.post.title,
				'text': this.post.text,
				'updatedAt': new Date()
			};

			Service.update_post(this.post.id, updated_post).then(
				// sucesso
				function(res) {
					// atualizar posts na pagina
					console.log("Sucesso no update: "+ res.data);
				},
				// erro
				function(res) {
					console.log("Erro ao atualizar post: "+res);
				}
			);
		}
	});
})();