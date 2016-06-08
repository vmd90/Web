/**
 * PostController
 *
 * @description :: Server-side logic for managing posts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	
	add_post: function(req, res) {
		var p = {'nome': 'Rafael', 'titulo': 'Post 2', 'texto': 'Texto do Post 2'};
		
		Post.create(p).exec(function callback(error, post_created){
			if(error){
				console.log('Erro durante inserção de post.');
			}

			console.log('Post adicionado com sucesso');

			return res.json(post_created);
		});
	},

	show_posts: function(req, res) {
		Post.findOne({'nome':'Rafael'}).exec(function callback(error, p){
			if(error){
				console.log('Erro durante a consulta.');
			}

			return res.json(p);
		});
	}
};

