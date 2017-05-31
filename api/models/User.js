/**
 * User.js
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
		type: 'string',
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
		via: 'users'
	},
	posts: {
		collection: 'post',
		via: 'user'
	},
	shared: {
		collection: 'post',
		via: 'shared'
	},
	reactions: {
		collection: 'post',
		via: 'reacted'
	}
  }
};

