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

app_module.controller('loginController', function($scope) {
	
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

app_module.controller('editController', function($scope, MyData, MyService) {
	$scope.name = "Dkdkfjk Dkaklo";
	$scope.age = 25;
	$scope.city = "Santos";
	$scope.mail = "djsji@kfkd.com";
	$scope.phone = "(28) 82883-3828";

	MyData.name = $scope.name;

	$scope.edit = function () {
		
	}

});

app_module.controller('addPostController', function ($scope, MyData) {
	$scope.title = "New post";
	$scope.text = "Post content...";

	$scope.addPost = function() {
		MyData.name = "New Post";
	}
});

app_module.controller('postController', function($scope, MyData) {
	$scope.nome = MyData.name;
	$scope.titulo = "Feb 24 18:45 - Lsjdii jsjjao jsdkdk!!!";
    $scope.texto = "ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmodipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmodipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod";
	$scope.endImg = "img/img.png";

    $scope.editPost = function() {
    };

    $scope.nextPost = function() {
    	$scope.titulo = "May 31 00:00 - Titulo 2 Novo";
        $scope.texto = "wwwwwwwwwwwwwwwww wwwwwwwww wwwwwwwww w wwwwwwwww wwwwwwwwww wwwwwwwwww wwwwwwwwwwwwwwwww";
        $scope.endImg = "img/img2.png";
    };

    $scope.backPost = function () {
    	$scope.titulo = "Feb 24 18:45 - Lsjdii jsjjao jsdkdk!!!";
	    $scope.texto = "ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmodipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmodipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod";
		$scope.endImg = "img/img.png";
    }
});
