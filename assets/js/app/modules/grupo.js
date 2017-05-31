
(function() {
    "use strict";

	angular.module('app')
	.controller('grupoController', function ($scope, Service) {
		//Recupera informações do usuario
		var user = Service.get_user();
		if(!user){
			window.location = "/";
		}
		$scope.user_id = user.id;
		$scope.user_img = user.photo;
		$scope.user_nome = user.name;

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
		);

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
		);

		//Recupera usuarios no grupo
		Service.get_group_users(group_id).then(
			//ok
			function (res){
				$scope.group_name = res.data.name;
				$scope.group_bio = res.data.bio;
				$scope.group_users = res.data.users;
				if(res.data.owner != user.id){
					$scope.remove_icon = 'hidden';
					$scope.div_add = 'hidden';
				}
			},
			//erro
			function (res){
			}
		);

		//Recupera Posts do grupo
		Service.get_group_posts(group_id).then(
			//ok
			function (res){
				var posts = res.data;
				posts.forEach( function (post, index_post){
					if(post.user == user.id){
						posts[index_post]['photo'] = user.photo;
						posts[index_post]['name'] = user.name;
					}else{
						posts[index_post]['remove_icon'] = 'hidden';
						$scope.follows.forEach( function (u, index){
							if(post.user == u.id){
								posts[index_post]['photo'] = u.photo;
								posts[index_post]['name'] = u.name;
							}
						});
						if(!posts[index_post]['name']){
							Service.find_user(post.user).then(
								//ok
								function (res2){
									post['photo'] = res2.data.photo;
									post['name'] = res2.data.name;
								},
								//erro
								function (res2){
								}
							);
						}
					}
					var date = new Date(post.createdAt);
					var f_date = date.getDate().toString() + '/' + (date.getMonth()+1).toString() + '/' + date.getFullYear()
					+' as ' +date.getHours().toString() + ':';
					if(date.getMinutes()<10)
						f_date+='0';
					f_date+=date.getMinutes().toString();
					post['date'] = f_date;
					posts[index_post] = post;
				});
				posts.sort(function(a, b){return new Date(b.createdAt) - new Date(a.createdAt);});
				$scope.group_posts = posts;
			},
			//erro
			function (res){
			}
		);

		$scope.addUser = function (){
			//Verifica se usuario existe
			Service.find_user_name($scope.user_name).then(
				//OK
				function (res) {
					if(res.data){//Usuario encontrado, adiciona no grupo
						var dados = {
							'user': res.data.id,
							'group_id': group_id
						};
						Service.add_user_group(dados).then(
							//OK
							function (res2) {
								$scope.group_users.push(res.data);
							},
							//Erro
							function (res2){
								console.log('Erro ao adicionar usuario ao grupo');
							}
						);
					}else{//Usuario nao existe
						alert('Usuario nao encontrado');
					}
				},
				//Erro
				function (res){
					console.log('Erro ao recuperar usuario por nome');
				}
			);
		},

		$scope.removeUser = function (u){
			var dados = {
				'group_id': group_id,
				'user': u.id
			};
			Service.remove_user_group(dados).then(
				//ok
				function (res){
					$scope.group_users.splice($scope.group_users.indexOf(u.id), 1);
				},
				//Erro
				function (res){
					console.log('Erro ao remover usuario do grupo');
				}
			)
		}

	});
})();