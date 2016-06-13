/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	add_user: function(req, res) {
		var user = {
			'name': req.param('name'),
			'email': req.param('email'),
			'password': req.param('password'),
			'birthday': req.param('birthday'),
			'bio': req.param('bio'),
			'photo': req.param('photo')
		};
		User.create(user).exec( function callback(error, created_user){
			if(error){
				console.log('Erro durante inserção de usuario. (UserController.js)');
			}
			console.log('Usuario inserido com sucesso');
			return res.json(created_user);
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
	},

	login: function(req, res){
		var email = req.param('email');
		var password = req.param('password');
		User.findOne({
			'email': email,
			'password': password
		}).exec( function callback(error, u){
			if(error){
				console.log('Email ou senha invalidos');
			}

			return res.json(u);
		});
	},

	get_follows: function(req, res){
		var id = req.param('id');

		User.find({id: id})
		.populate('follower').exec( function (erro, respon){
			if(erro){
				console.log('Erro na consulta de seguindo');
			}
			return res.json(respon[0].follower);
		});
	},
	
	get_groups: function (req, res){
		
		var user = req.param('id');
		
		User.find({id: user})
		.populate('groups').exec( function (erro, respon){
			if(erro){
				console.log('Erro na consulta de grupos do usuario (GroupController)');
			}
			return res.json(respon[0].groups);
		});

	}
};

