
(function() {
    "use strict";

	angular.module('app')
	.factory('Service', function ($http){

		var user;

		return {
			//Serviços para user
			'get_user': function(){
				return this.user;
			},
			'find_user': function(id){
				return $http.post('/user/find_user', {'id': id});
			},
			'find_user_name': function(name){
				return $http.post('/user/find_user_name', {'name': name});
			},
			'set_user': function (user){
				this.user = user;
			},
			'login': function(email, password){
				return $http.post('/user/login', {'email':email, 'password': password});
			},
			'cadastrar': function(user){
				return $http.post('/user/add_user', user);
			},
			'get_follows': function(id){
				return $http.post('/user/get_follows', {'id': id});
			},
			'update_user': function(old_info, updated_info) {
				return $http.post('/user/update', {'old_info': old_info, 'updated_info': updated_info});
			},
			'unfollow': function(data){
				return $http.post('/user/unfollow', {'data': data});
			},
			'follow': function(data){
				return $http.post('/user/follow', {'data': data});
			},

			//Serviços para posts
			'get_posts': function(user_id){
				return $http.post('/post/get_posts', {id: user_id});
			},
			'add_post': function(post){
				return $http.post('/post/add_post', {'post': post});
			},
			'get_posts_follows': function(id){
				return $http.post('post/get_posts_follows', {'id': id});
			},
			'update_post': function(id, updated_post) {
				return $http.post('/post/update_post', {'id': id, 'updated_post': updated_post});
			},
			'remove_post': function(id){
				return $http.post('/post/remove_post', {'id': id});
			},

			//Serviços para groups
			'get_groups': function(id) {
				return $http.post('/user/get_groups', {'id': id});
			},
			'get_group_users': function(id){
				return $http.post('/group/get_group_users', {'id': id});
			},
			'get_groups_owner': function(id){
				return $http.post('/group/get_groups_owner', {'id': id});
			},
			'get_group_posts': function(id){
				return $http.post('/group/get_group_posts', {'id': id});
			},
			'add_group': function(group){
				return $http.post('/group/add_group', {'group': group});
			},
			'remove_group': function(id){
				return $http.post('/group/remove_group', {'id': id});
			},
			'add_user_group': function(dados){
				return $http.post('/group/add_user_group', {'dados': dados});
			},
			'remove_user_group': function(dados){
				return $http.post('/group/remove_user_group', {'dados': dados});
			},

			//Relatorios
			'get_top20_usuarios': function(d1, d2){
				return $http.post('/user/get_top20', {'ini': d1, 'fim': d2});
			}

		}
	});
})();