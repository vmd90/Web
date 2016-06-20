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

	find_user: function(req, res) {
		var id = req.param('id');
		User.findOne({'id': id}).exec(function callback(error, u){
			if(error){
				console.log('Erro durante a consulta de usuario');
			}

			return res.json(u);
		});
	},

	find_user_name: function(req, res) {
		var name = req.param('name');
		User.findOne({'name': name}).exec(function callback(error, u){
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
	},

	update: function(req, res) {
		var old_info = req.param('old_info');
		var updated_info = req.param('updated_info');
		//console.log(old_info);
		//console.log(updated_info);
		User.update(old_info, updated_info).exec(function(err, updated) {
            if (err) {
                console.log(err);
                return;
            }

            return res.json(updated);
        });
	},

	//Funcao para deixar de seguir alguem
	unfollow: function(req, res){
		var user_id = req.param('data').user;
		var follow_id = req.param('data').id;
		User.findOne(user_id).exec(function callback(erro, user){
			if(erro) { console.log('Erro ao recuperar user na funcao unfollow');}
			user.follower.remove(follow_id);
			user.save(function (erro){});
		});
		return res.json();
	},

	//Funcao para seguir alguem
	follow: function(req, res){
		var user_id = req.param('data').user;
		var follow_id = req.param('data').id;
		User.findOne(user_id).exec(function callback(erro, user){
			if(erro) { console.log('Erro ao recuperar user na funcao unfollow');}
			user.follower.add(follow_id);
			user.save(function (erro){});
		});
		return res.json();	
	},

	//Get top20
	get_top20: function(req, res){
		//console.log(req.param('ini'));
		//console.log(req.param('fim'));
		var ini = req.param('ini');
		var fim = req.param('fim');

		User.find()
		.populate('tweets', {
			where: {
				createdAt: { '>': ini},
				createdAt: { '<': fim}
			}
		}).exec( function callback(erro, users){
			users.sort(function(a, b){
				return b.tweets.length - a.tweets.length;
			});
			return res.json(users);
		});
	}


};

