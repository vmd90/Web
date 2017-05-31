/**
 * Group.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
  	name: {
		type: 'string',
		required: true,
		notNull: true,
		unique: false
	},
	bio: {
		type: 'text'
	},
	owner: {
		model: 'user',
		required: true,
		notNull: true
	},
	users: {
		collection: 'user',
		via: 'groups'
	},
	posts:{
		collection: 'post',
		via: 'groups'
	}
  }
};

