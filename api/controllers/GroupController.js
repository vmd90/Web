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
	}
};

