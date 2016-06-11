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
		'update_user': function(old_info, updated_info) {
			return $http.post('/user/update', {'old_info': old_info, 'updated_info': updated_info});
		},
		
		//Serviços para posts
		'get_posts': function(){
			return $http.get('/post/show_posts');
		},

		'add_tweet': function(id, title, text){
			return $http.post('/tweet/add_tweet', {'id': id, 'title': title, 'text': text});
		}
		

		//Serviços para groups

	}
});