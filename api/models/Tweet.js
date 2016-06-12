/**
 * Tweet.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
	user: {
		type: 'integer',
		required: true,
		notNull: true,
		unique: false
	},
  	title: {
		type: 'string',
		required: true,
		notNull: true,
		unique: true
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

