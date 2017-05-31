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
		User.create(user).exec( function (error, created_user){
			if(error){
				console.log(error);
				return;
			}
			console.log('Usuario inserido com sucesso');
			return res.json(created_user);
		});
	},

	find_user: function(req, res) {
		var id = req.param('id');
		User.findOne({'id': id}).exec(function (error, u){
			if(error){
				console.log(error);
				return;
			}

			return res.json(u);
		});
	},

	find_user_name: function(req, res) {
		var name = req.param('name');
		User.findOne({'name': name}).exec(function callback(error, u){
			if(error){
				console.log(error);
				return;
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
				console.log(error);
				return;
			}

			return res.json(u);
		});
	},

	get_follows: function(req, res){
		var id = req.param('id');

		User.find({id: id})
		.populate('follower').exec( function (error, respon){
			if(error){
				console.log(error);
				return;
			}
			return res.json(respon[0].follower);
		});
	},

	get_groups: function (req, res){

		var user = req.param('id');

		User.find({id: user})
		.populate('groups').exec( function (error, respon){
			if(error){
				console.log(error);
				return;
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
		User.findOne(user_id).exec(function callback(error, user){
			if(error) {
				console.log(error);
				return;
			}
			user.follower.remove(follow_id);
			user.save(function (error){});
		});
		return res.json();
	},

	//Funcao para seguir alguem
	follow: function(req, res){
		var user_id = req.param('data').user;
		var follow_id = req.param('data').id;
		User.findOne(user_id).exec(function callback(error, user){
			if(error) {
				console.log(error);
				return;
			}
			user.follower.add(follow_id);
			user.save(function (error){});
		});
		return res.json();
	},

	//Get top20
	get_top20: function(req, res){
		var users = [];
		var userAtual = "";
		User.query(
			'select U.name, TR.user_reactions reaction, TS.post_shared,COUNT(TR.user_reactions),' +
			' COUNT(TS.user_shared)*2 Influence from "user" U join post T on U.id = T.user ' +
			' join post_reacted__user_reactions TR on T.id = TR.post_reacted ' +
			' join post_shared__user_shared TS on T.id = TS.post_shared ' +
			' group by U.name, TR.user_reactions, TS.post_shared order by U.name', function(error, list) {
			if(error){
				console.log(error);
				return;
			}
			list.rows.forEach(function(row){
				if(userAtual != row.name){
					userAtual = row.name;
					if(row.reaction == 1)
						var influence = 1;
					else if(row.reaction == 0)
						var influence = -1;
					else
						var influence = 0;
					influence += parseInt(row.influence);
					users.push({"name": userAtual, "influence": influence});
				}
				else{
					var influence = users[users.length-1].influence;
					if(row.reaction == 1)
						influence++;
					else if(row.reaction == 0)
						influence--;
					influence += parseInt(row.influence);
					users.pop();
					users.push({"name": userAtual, "influence": influence});
				}
			});
			var orderUsers = users.slice(0);
			orderUsers.sort(function(a,b) {
				return b.influence - a.influence;
			});
			return res.json(orderUsers);
		});
	}
};

