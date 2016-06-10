var app_module = angular.module('app', ['ngRoute', 'app.login', 'app.index', 'app.service', 'app.perfil']);

app_module.config(['$routeProvider',
	function($routeProvider){
		$routeProvider.when('/', {
			templateUrl: '/templates/login.html',
			controller: 'loginController'
		}).when('/index.html', {
			templateUrl: '/templates/index.html',
			controller: 'indexController'
		}).when('/cadastro.html', {
			templateUrl: '/templates/cadastro.html',
			controller: ''
		}).when('/perfil.html', {
			templateUrl: '/templates/perfil.html',
			controller: 'perfilController'
		}).otherwise({
			redirectTo: '/'
		});
	}
]);



/*
app_module.factory('Service', function ($http, MyData){
	
	return {
		'get_user': function(id){
			return $http.get('/user/get_user?id='+id);
		},
		'get_posts': function(){
			return $http.get('/post/show_posts');
		},
		
		'load_page': function(){
			this.get_user(1).then(
				function (respon) {
					MyData.nome = respon.data.nome;
					//user_info = respon.data;
					//console.log(MyData.nome);
				},
				function (respon) {
					console.log('erro');
				}
			);
		},

		'get_user_info': function(){
			return user_info;
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
		window.location = "/cadastro.html";
	}
});

app_module.controller('editController', function ($scope, Service, MyData) {
	//var user = Service.get_user_info();
	//$scope.nome = user_info.nome;
	$scope.nome = MyData.nome;
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

/**
	Arrumar o controller para que chame e instancie as informações do usuário também

**/
/*
app_module.controller('postController', function ($scope, Service) {
	
	//Recupera informações no banco
	/*Service.get_posts().then(
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
	);*/

	/*Service.get_user(1).then(
		function (respon) {
			console.log('ok');
		},
		function (respon) {
			console.log('erro');
		}
	);*/
/*	
	Service.load_page();

    $scope.editPost = function() {
    };

    $scope.nextPost = function() {
    };

    $scope.backPost = function () {
    }
});

app_module.controller('indexController', function ($scope, Service) {
	//Recupera informações do usuario
	Service.get_user(1).then(
		//Sucesso
		function (res) {
			$scope.user_nome = res.data.nome;
			$scope.user_idade = res.data.idade;
			$scope.user_cidade = res.data.cidade;
			$scope.user_email = res.data.email;
			$scope.user_fone = res.data.fone;
		},
		//Erro
		function (res) {
			console.log('Erro ao carregar informacoes do usuario');
		}
	);

	//Recupera posts do usuário
	Service.get_posts().then(
		//Sucesso
		function (res) {
			$scope.post_titulo = res.data.titulo;
			$scope.post_texto = res.data.texto;
			$scope.post_nome = res.data.nome;
		},
		//Erro
		function (res) {
			console.log('Erro ao carregar posts');
		}
	);
});
*/