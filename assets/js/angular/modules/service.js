var service_module = angular.module('app.service', []);

service_module.factory('Service', function ($http){

	var user;
	
	return {
		//Serviços para user
		'get_user': function(id){
			return this.user;
		},
		'find_user': function(id){
			return $http.get('/user/get_user?id='+id);
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
		'get_groups': function(id) {
			return $http.post('/user/get_groups', {'id': id});
		},
		'get_follows': function(id){
			return $http.post('/user/get_follows', {'id': id});
		},
		'update_user': function(old_info, updated_info) {
			return $http.post('/user/update', {'old_info': old_info, 'updated_info': updated_info});
		},
		
		//Serviços para posts
		'get_tweets': function(user_id){
			return $http.get('/tweet/get_tweets?user_id='+user_id);
		},
		'add_tweet': function(id, title, text){
			return $http.post('/tweet/add_tweet', {'id': id, 'title': title, 'text': text});
		},
		'get_tweets_follows': function(id){
			return $http.post('tweet/get_tweets_follows', {'id': id});
		},
		'update_tweet': function(id, updated_tweet) {
			return $http.post('/tweet/update_tweet', {'id': id, 'updated_tweet': updated_tweet});
		}
		//Serviços para groups
		
	}
});