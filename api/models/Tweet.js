/**
 * Tweet.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
  	tittle: {
		type: 'string',
		required: true,
		notNull: true
	},
	text: {
		type: 'text',
		required: true,
		notNull: true,
		unique: false
	},
	user: {
		model: 'user',
		required: true,
		notNull: true
	},
	shared: {
		collection: 'user',
		via: 'shared'
	},
	groups: {
		collection: 'group',
		via: 'tweets'
	},
	reacted: {
		collection: 'user',
		via: 'reactions'
	},
	themes: {
		collection: 'theme',
		via: 'tweets'
	}
  }
};

