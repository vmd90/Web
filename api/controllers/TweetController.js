/**
 * TweetController
 *
 * @description :: Server-side logic for managing tweets
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	
	add_tweet: function (req, res) {
		var tweet = {
			'user': req.param('id'),
			'tittle': req.param('title'),
			'text': req.param('text')
		};
		
		Tweet.create(tweet).exec( function callback(error, tweet_created){
			if(error){
				console.log('Error: add_tweet(): erro na inserção');
			}

			console.log('Tweet adicionado com sucesso');

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
	}

};

