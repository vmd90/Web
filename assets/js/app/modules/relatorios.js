
(function() {
    "use strict";

	angular.module('app')
	.controller('relatoriosController', function ($scope, Service) {

		$scope.links = [];
		$scope.links.push({'name':'Top 20 usuarios', 'show': 'hidden'});
		$scope.links.push({'name':'Top 20 posts', 'show': 'hidden'});
		$scope.div_result = 'hidden';

		$scope.show = function (link){
			if(link.show == ''){
				link.show = 'hidden';
			}else{
				link.show = '';
			}
		}

		$scope.pesquisar = function (link){
			var d1 = new Date(link.data1);
			var d2 = new Date(link.data2);
			if(link.name == 'Top 20 usuarios'){
				Service.get_top20_usuarios(d1.toUTCString(), d2.toUTCString()).then(
					//ok
					function (res){
						var users = res.data;
						$scope.results = [];
						$scope.div_result = "";
						for(var i=0; (i<users.length || i<20); i++){
							users[i]['qtde'] = users[i].posts.length;
							$scope.results.push(users[i]);
						}
					},
					//Erro
					function (res){
					}
				);
			}else{

			}
		}


	});
})();