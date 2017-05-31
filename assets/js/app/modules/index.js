
(function() {
    "use strict";

	angular.module('app')
	.controller('indexController', function ($scope, Service, $location) {
		//Recupera informações do usuario
		var user = Service.get_user();
		var follows;
		//if(!user){
		//	window.location = "/";
		//}
		$scope.user_id = user.id;
		$scope.user_img = user.photo ? user.photo : 'semfoto.jpg';
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


		//Recupera posts dos usuário seguidos
		Service.get_posts_follows(user.id).then(
			//Sucesso
			function (res) {
				//coloca foto e nome nos posts
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
					}
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

		//Links
		$scope.postar = function () {
			var tittle = $scope.post_title;
			var text = $scope.post_text;
			var id = user.id

			$scope.post_title = '';
			$scope.post_text = '';

			var post = {
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
						post.themes.push(s[0]);
				}
			});

			//Recupera usuarios
			string = text.split("@");
			string.forEach( function (str, index){
				if(index != 0){
					var s = str.split(/[,!?;: ]/);
					if(s[0]!="")
						post.users.push(s[0]);
				}
			});

			//console.log(post);
			Service.add_post(post).then(
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
					$scope.posts.push(t);
					$scope.posts.sort(function(a, b){return new Date(b.createdAt) - new Date(a.createdAt);});
				},
				//Erro
				function (res) {
				}
			);
		},

		$scope.cancelar = function () {
			$scope.post_title = '';
			$scope.post_text = '';
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

		$scope.home = function(){
			//window.location = "#/index.html";
			$location.path('/index');
		},

		$scope.go = function(path) {
			$location.path(path);
		}
	});
})();