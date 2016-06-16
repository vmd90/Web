/**
 * Theme.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
	theme: {
		type: 'string',
		required: true,
		notNull: true,
		unique: false
	},
	tweets: {
		collection: 'tweet',
		via: 'themes'
	}
  }
};

