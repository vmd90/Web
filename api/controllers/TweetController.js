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
			'title': req.param('title'),
			'text': req.param('text')
		};
		console.log(tweet);
		Tweet.create(tweet).exec( function callback(error, tweet_created){
			if(error){
				console.log('Error: add_tweet(): erro na inserção');
				return;
			}

			console.log('Tweet adicionado com sucesso');

			return res.json(tweet_created);
		});
	},
	
	get_tweets: function (req, res) {
		var user_id = req.param('user_id');
		Tweet.find({'user': user_id}).exec(function(error, tweets) {
			if (error) {
				console.log("Erro: get_tweet()");
				return;
			}
			console.log("Sucesso em buscar tweets");
			return res.json(tweets);
		});
	},

	update_tweet: function(req, res) {
		var old_tweet = req.param('old_tweet');
		var updated_tweet = req.param('updated_tweet');

		Tweet.update(old_tweet, updated_tweet).exec(function(err, updated) {
            if (err) {
                console.log(err);
                return;
            }

            return res.json(updated);
        });
	}

};

