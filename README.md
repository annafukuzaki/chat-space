# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...
#Chat Space DB設計
##usersテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false｜
|email|string|null: false, add_index :email, unipue: true|
|password|string|null: false, add_index :password, unipue: true|
###Association
 -has_many :messages
 -has_many :groups,through::groups_users
 -has_many :groups_users
##messagesテーブル
|Column|Type|Options|
|------|----|-------|
|body|text|
|image|string|null: false|
|group_id|integer|null: false,foreign_key: true|
|user_id|integer|null: false,foreign_key: true|
###Association
 -belongs_to :user
 -belongs_to :group
##groupsテーブル
|Column|Type|Options|
|------|----|-------|
|name|null: false,add_index :name,unique: true|
###Association
 -has_many :messages
 -has_many :groups_users
 -has_many :users,through: :groups_users
 ##groups_usersテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false,foreign_key: true|
|groups_id|integer|null: false,foreign_key: true|
###Association
 -belongs_to :user
 -belongs_to :group