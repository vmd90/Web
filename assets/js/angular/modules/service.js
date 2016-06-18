var service_module = angular.module('app.service', []);

service_module.factory('Service', function ($http){

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
		
		//Serviços para tweets
		'get_tweets': function(user_id){
			return $http.post('/tweet/get_tweets', {id: user_id});
		},
		'add_tweet': function(tweet){
			return $http.post('/tweet/add_tweet', {'tweet': tweet});
		},
		'get_tweets_follows': function(id){
			return $http.post('tweet/get_tweets_follows', {'id': id});
		},
		'update_tweet': function(id, updated_tweet) {
			return $http.post('/tweet/update_tweet', {'id': id, 'updated_tweet': updated_tweet});
		},
		'remove_tweet': function(id){
			return $http.post('/tweet/remove_tweet', {'id': id});
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
		'get_group_tweets': function(id){
			return $http.post('/group/get_group_tweets', {'id': id});
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
		}
		
	}
});