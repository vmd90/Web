/**
 * GroupController
 *
 * @description :: Server-side logic for managing groups
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	
	get_groups_owner: function(req, res){
		var id = req.param('id');
		User.findOne(id)
		.populate('groups_owner').exec( function callback (erro, groups){
			if(erro){
				console.log('Erro ao recuperar grupos do usuario');
			}
			return res.json(groups.groups_owner);
		});
	},

	get_group_users: function(req, res){
		var id = req.param('id');
		Group.findOne(id)
		.populate('users').exec( function callback (erro, users){
			if(erro){
				console.log('Erro ao recuperar usuarios do grupo');
			}
			return res.json(users);
		});
	},

	get_group_tweets: function (req, res){
		var group_id = req.param('id');
		Group.findOne(group_id)
		.populate('tweets').exec(function callback (erro, tweets){
			if(erro){
				console.log('Erro ao recuperar tweets do grupo');	
			}
			return res.json(tweets.tweets);
		});
	},

	add_group: function (req, res){
		var group = req.param('group');
		Group.create(group).exec( function callback (erro, group_created){
			if(erro){ console.log('Erro ao criar grupo');}
			group_created.users.add(group.owner);
			group_created.save(function (erro){return res.json(group_created);});
		});
	},

	add_user_group: function (req, res){
		var dados = req.param('dados');
		Group.findOne(dados.group_id).exec( function callback (erro, group){
			if(erro) console.log('Erro ao procurar grupo');
			group.users.add(dados.user);
			group.save(function (erro){});
		});
		return res.json();
	},

	remove_user_group: function (req, res){
		var dados = req.param('dados');
		Group.findOne(dados.group_id).exec( function callback (erro, group){
			if(erro) {console.log('Erro ao procurar grupo');}
			group.users.remove(dados.user);
			group.save(function (erro){});
		});
		return res.json();
	},

	remove_group: function (req, res){
		var id = req.param('id');
		Group.destroy(id).exec( function callback (erro){
			if(erro) {console.log('Erro ao remover grupo');}
			return res.json();
		});
	}
};

