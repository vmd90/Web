/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	add_user: function(req, res) {
		var u = {
					'id': 1,
					'name': 'Vitor',
					'email': 'vitor@usp.br', 
					'password': 'vitor',
					'birthday': '08//04//1992',
					'bio': 'Estudante de BCC na USP',
					'photo': 'perfil1.jpg'
				};

		User.create(u).exec(function callback(error, user_created){
			if(error){
				console.log('Erro durante inserção de usuario');
			}

			console.log('Usuario adicionado com sucesso');

			return res.json(user_created);
		});
	},

	get_user: function(req, res) {
		var id = req.param('id');
		User.findOne({'id': id}).exec(function callback(error, u){
			if(error){
				console.log('Erro durante a consulta de usuario');
			}

			return res.json(u);
		});
	}
	
};

