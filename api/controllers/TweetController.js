/**
 * TweetController
 *
 * @description :: Server-side logic for managing tweets
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	
	add_tweet: function (req, res) {
		
		var tweet = req.param('tweet');
		var t = {
			'tittle': tweet.tittle,
			'text': tweet.text,
			'user': tweet.user
		}
		
		//Cria tweet
		Tweet.create(t).exec(function callback(error, tweet_created){
			if(error){ console.log('Erro ao crair tweet');}

			//Para cada user/group adiciona Tweet
			var users = tweet.users;
			users.forEach( function(user, index){
				//Tenta procurar nos Usuarios
				User.findOne({'name': user})
				.populate('shared')
				.exec( function outer_callback (erro, user_found){
					if(erro){
						console.log('Erro: add_tweet.find_user');
					}
					if (user_found){//Se usuario encontrado
						//console.log(user_found.name);
						user_found.shared.add(tweet_created.id);

						user_found.save(function inner_callback(error){
							if(error) {console.log(error);}
						});
					}
				});

				//Tenta procurar nos grupos
				Group.findOne({'name': user})
				.populate('tweets')
				.exec( function outer_callback(erro, group_found){
					if(erro){
						console.log('Erro: add_tweet.find_group');
					}
					if (group_found){//Se usuario encontrado
						//console.log(u.id);
						group_found.tweets.add(tweet_created.id);

						group_found.save(function inner_callback(error){
							if(error) {console.log(error);}
						});
					}
				});
			}); //FIM ADD USERS

			//Add themes do tweet
			var themes = tweet.themes;
			themes.forEach( function (theme, index){

				//Verifica se theme existe
				Theme.findOne({'theme': theme})
				.populate('tweets')
				.exec( function outer_callback(erro, theme_found){
					if(erro){console.log(erro);}
					
					if (theme_found){//Se theme encontrado
						//console.log(u.id);
						theme_found.tweets.add(tweet_created.id);

						theme_found.save(function inner_callback(error){
							if(error) {console.log(error);}
						});
					}else{
						//Recupera tweet
						Tweet.findOne({'id': tweet_created.id})
						.populate('themes')
						.exec( function outer_callback(error, tweet_found2){
							var th = {'theme': theme}
							tweet_found2.themes.add(th);
							tweet_found2.save(function inner_callback(erro){
								if(erro) {console.log(erro);}
							});
						});

					}
				});
			});
			return res.json(tweet_created);
		});	
	},

	get_tweets_follows: function (req, res){
		
		var id = req.param('id');
		var tweets = [];
		
		//Recupera IDs de quem usuario segue
		User.find({id: id})
		.populate('follower').exec( function callback (erro, follower){
			if(erro){
				console.log('Erro recuperando IDs dos seguidos');
			}

			follower[0].follower.push({'id': id});
			//Para cada usuario seguindo recupera seus tweets
			follower[0].follower.forEach(function(follow, index){
				Tweet.find({user: follow.id}).exec( function callback (erro, user_tweets){
					if(erro){
						console.log('Erro ao consultar tweets do usuario ' + follow.id);
					}
					
					user_tweets.forEach(function(t, index){
						tweets.push(t);					
					});
					if(index == follower[0].follower.length-1){		
						return res.json(tweets);
					}
				});
				
			});
			
		});
	},
	
	get_tweets: function (req, res) {
		var user_id = req.param('id');
		Tweet.find({'user': user_id}).exec(function(error, tweets) {
			if (error) {
				console.log("Erro: get_tweet()");
				return;
			}
			return res.json(tweets);
		});
	},

	update_tweet: function(req, res) {
		var id = req.param('id');
		var updated_tweet = req.param('updated_tweet');

		Tweet.update(id, updated_tweet).exec(function(err, updated) {
            if (err) {
                console.log(err);
                return;
            }

            return res.json(updated);
        });
	}

};

