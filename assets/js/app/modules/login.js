(function() {
    "use strict";

    angular
        .module('app')
        .controller('loginController', function($scope, Service, $location) {

            $scope.login = function() {
                    var email = $scope.email;
                    var password = $scope.password;

                    Service.login(email, password).then(
                        //Sucesso
                        function(res) {
                            if (res.data) {
                                //console.log(res.data.id);
                                Service.set_user(res.data);
                                //window.location = "#/index.html";
                                $location.path('/index');
                            } else {
                                alert('Email ou Password invalidos !');
                            }
                        },

                        //Erro
                        function(res) {
                            alert('Erro ao consultar banco !');
                        }
                    );
                },

                $scope.signup = function() {
                    //window.location = "#/cadastro.html";
                    $location.path('/signup');
                }
        });
})();