var edit_module = angular.module('app.edit', []);

edit_module.controller('editController', function ($scope, Service) {
    var user = Service.get_user();
    if(!user) {
        window.location = "/";
    }
    console.log(user);
    
    $scope.user_img = "images/"+user.photo;
	$scope.user_nome = user.name;
	$scope.user_bio = user.bio;
	$scope.user_birthday = user.birthday;
	$scope.user_email = user.email;
    
    $scope.cancelar = function() {
        // Volta para pagina anterior
        window.history.back();
    }
    
    $scope.salvar = function () {
        
    }
});