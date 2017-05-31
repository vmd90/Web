/**
 * PostController
 *
 * @description :: Server-side logic for managing posts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	add_post: function (req, res) {

		var post = req.param('post');
		var t = {
			'tittle': post.tittle,
			'text': post.text,
			'user': post.user
		}

		Post.create(t).exec(function (error, post_created){
			if(error){ console.log('Errorr creating post');}

			//Para cada user/group adiciona Post
			var users = post.users;
			users.forEach( function(user, index){
				//Tenta procurar nos Usuarios
				User.findOne({'name': user})
				.populate('shared')
				.exec( function (error, user_found){
					if(error){
						console.log('Error: add_post.find_user');
					}
					if (user_found){//Se usuario encontrado
						//console.log(user_found.name);
						user_found.shared.add(post_created.id);

						user_found.save(function (error){
							if(error) {console.log(error);}
						});
					}
				});

				//Tenta procurar nos grupos
				Group.findOne({'name': user})
				.populate('posts')
				.exec( function (error, group_found){
					if(error){
						console.log('Error: add_post.find_group');
					}
					if (group_found){//Se usuario encontrado
						//console.log(u.id);
						group_found.posts.add(post_created.id);

						group_found.save(function (error){
							if(error) {console.log(error);}
						});
					}
				});
			}); //FIM ADD USERS

			//Add themes do post
//			var themes = post.themes;
//			themes.forEach( function (theme, index){//

//				//Verifica se theme existe
//				Theme.findOne({'theme': theme})
//				.populate('posts')
//				.exec( function outer_callback(error, theme_found){
//					if(error){console.log(error);}

//					if (theme_found){//Se theme encontrado
//						//console.log(u.id);
//						theme_found.posts.add(post_created.id);

//						theme_found.save(function inner_callback(error){
//							if(error) {console.log(error);}
//						});
//					}else{
//						//Recupera post
//						Post.findOne({'id': post_created.id})
//						.populate('themes')
//						.exec( function outer_callback(error, post_found2){
//							var th = {'theme': theme}
//							post_found2.themes.add(th);
//							post_found2.save(function inner_callback(error){
//								if(error) {console.log(error);}
//							});
//						});

//					}
//				});
//			});
			return res.json(post_created);
		});
	},

	remove_post: function(req, res) {
		var id = req.param('id');

		Post.destroy(id).exec(function (err){
			if(err){ console.log('Error ao remover post');}
			return res.json();
		});
	},

	get_posts_follows: function (req, res){

		var id = req.param('id');
		var posts = [];

		//Recupera IDs de quem usuario segue
		User.find({id: id})
		.populate('follower').exec( function (error, follower){
			if(error){
				console.log(error);
			}

			follower[0].follower.push({'id': id});
			//Para cada usuario seguindo recupera seus posts
			follower[0].follower.forEach(function(follow, index){
				Post.find({user: follow.id}).exec( function (error, user_posts){
					if(error){
						console.log(error);
					}

					user_posts.forEach(function(t, index){
						posts.push(t);
					});
					if(index == follower[0].follower.length-1){
						return res.json(posts);
					}
				});

			});
		});
	},

	get_posts: function (req, res) {
		var user_id = req.param('id');
		Post.find({'user': user_id}).exec(function(error, posts) {
			if (error) {
				console.log(error);
				return;
			}
			return res.json(posts);
		});
	},

	update_post: function(req, res) {
		var id = req.param('id');
		var updated_post = req.param('updated_post');

		Post.update(id, updated_post).exec(function(err, updated) {
            if (err) {
                console.log(err);
                return;
            }

            return res.json(updated);
        });
	},

	get_top20: function(req, res){
		var posts = [];
		var postAtual = "";
		Post.query('select T.tittle, count(TS.post_shared)*2 influence, TR.user_reactions reaction,' +
			' count(TR.user_reactions) from post T join post_reacted__user_reactions TR on T.id = TR.post_reacted' +
			' join post_shared__user_shared TS on T.id = TS.post_shared group by T.tittle, TR.user_reactions order by T.tittle',
			function(error, list){
			if(error){
				console.log(error);
				return;
			}
			list.rows.forEach(function(row){
				if(postAtual != row.tittle){
					postAtual = row.tittle;
					if(row.reaction == 1)
						var influence = 2;
					else if(row.reaction == 0)
						var influence = 1;
					else
						var influence = 0;
					influence += parseInt(row.influence);
					posts.push({"tittle": postAtual, "influence": influence});
				}
				else{
					var influence = posts[posts.length-1].influence;
					if(row.reaction == 1)
						influence += 2;
					else if(row.reaction == 0)
						influence++;
					influence += parseInt(row.influence);
					posts.pop();
					posts.push({"tittle": postAtual, "influence": influence});
				}
			});
			var orderPosts = posts.slice(0);
			orderPosts.sort(function(a,b) {
				return b.influence - a.influence;
			});
			return res.json(orderPosts);
		});
	}
};

