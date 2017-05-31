
(function() {
    "use strict";

    angular.module('app')
    .controller('perfilEditarController', function ($scope, Service, $location) {
        var user = Service.get_user();
        if(!user) {
            window.location = "/";
        }
        //console.log(user);

        $scope.user_photo = user.photo;
    	$scope.user_name = '';
    	$scope.user_bio = '';
    	$scope.user_birthday = '';
    	$scope.user_email = '';
        $scope.user_password = '';

        $scope.cancel = function() {
            // Volta para pagina de perfil
            //window.location = "#/perfil.html";
            $location.path('/perfil');
        }

        $scope.save = function () {
            // Atualiza as informacoes do usuario
            var old_info = {'id': user.id};
            var updated_info = {'id': user.id};
            if ($scope.user_name) {
                old_info.name = user.name;
                updated_info.name = $scope.user_name;
            }
            if ($scope.user_bio) {
                old_info.bio = user.bio;
                updated_info.bio = $scope.user_bio;
            }
            if ($scope.user_photo) {
                old_info.photo = user.photo;
                updated_info.photo = $scope.user_photo;
            }
            if ($scope.user_birthday) {
                old_info.birthday = user.birthday;
                updated_info.birthday = $scope.user_birthday;
            }
            if ($scope.user_email) {
                old_info.email = user.email;
                updated_info.email = $scope.user_email;
            }
            if ($scope.user_password) {
                old_info.password = user.password;
                updated_info.password = $scope.user_password;
            }
            console.log(old_info);
            console.log(updated_info);

            Service.update_user(old_info, updated_info).then(
                // sucesso
                function(res) {
                    console.log("Sucesso update\n"+ res.data);
                },
                // erro
                function(res) {
                    console.log("Erro - perfil-editar.js - save()")
                }
            );
            Service.set_user(user);
            //window.location = "#/perfil.html";
            $location.path('perfil');
        }
    });
})();