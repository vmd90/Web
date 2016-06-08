/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
  	id: {
		type: 'integer',
		primaryKey: true
	},
	name: {
		type: 'string',
		required: true,
		notNull: true,
		unique: false
	},
	email: {
		type: 'string',
		required: true,
		notNull: true,
		unique: true
	},
	password: {
		type: 'string',
		required: true,
		notNull: true,
		unique: false
	},
	birthday: {
		type: 'timestamp',
		required: true,
		notNull: true,
		unique: false
	},
	bio: {
		type: 'text',
		required: true,
		notNull: true,
		unique: false
	},
	photo: {
		type: 'text'
	},
	follows: {
		collection: 'user',
		via: 'follower'
	},
	follower: {
		collection: 'user',
		via: 'follows'
	},
	groups_owner: {
		collection: 'group',
		via: 'owner'
	},
	groups: {
		collection: 'group',
		via: 'list'
	},
	tweets: {
		collection: 'tweet',
		via: 'user'
	},
	shared: {
		collection: 'tweet',
		via: 'shared'
	},
	reactions: {
		collection: 'tweet',
		via: 'reacted'
	}
  }
};

