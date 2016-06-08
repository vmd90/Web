var app_module = angular.module('app', ['ngRoute']);

app_module.config(['$routeProvider',
	function($routeProvider){
		$routeProvider.when('/', {
			templateUrl: '/templates/login.html',
			controller: 'loginController'
		}).when('/index.html', {
			templateUrl: '/templates/index.html',
			controller: 'postController'
		}).otherwise({
			redirectTo: '/'
		});
	}
]);

app_module.factory('Service', function ($http){
	return {
		'get_posts': function(){
			return $http.get('/post/show_posts');
		}
	}
});


app_module.controller('loginController', function ($scope) {
	//Dados de login padrãos
	var email = "henrique@usp.br";
	var password = "henrique";

	$scope.login = function() {
		if($scope.email == email && $scope.password == password){
			window.location = "#/index.html";
		}else{
			alert("Email ou Password invalidos !");
		}
	},

	$scope.cadastrar = function(){
		window.location = "cadastro.html";
	}
});

app_module.controller('editController', function ($scope) {
	$scope.nome = "Vitor";
	$scope.idade = 25;
	$scope.cidade = "Santos";
	$scope.email = "djsji@kfkd.com";
	$scope.fone = "(28) 82883-3828";

	$scope.edit = function () {
		
	}
});

app_module.controller('addPostController', function ($scope) {
	//$scope.title = "New post";
	//$scope.text = "Post content...";

	$scope.addPost = function() {
	}
});

app_module.controller('postController', function ($scope, Service) {
	
	//Recupera informações no banco
	Service.get_posts().then(
		//Sucesso
		function(respon){
			$scope.post_titulo = respon.data.titulo;
			$scope.post_texto = respon.data.texto;
			$scope.post_nome = respon.data.nome;
		},
		//error
		function(respon){
			console.log('Erro ao recuperar post do servidor');
		}
	);

    $scope.editPost = function() {
    };

    $scope.nextPost = function() {
    	
    };

    $scope.backPost = function () {
    }
});
