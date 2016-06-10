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
		console.log(tweet);
		Tweet.create(tweet).exec( function callback(error, tweet_created){
			if(error){
				console.log('Error: add_tweet(): erro na inserção');
			}

			console.log('Tweet adicionado com sucesso');

			return res.json(tweet_created);
		});
	}

};

