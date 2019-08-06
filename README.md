# groupsテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false, index: true|



### Associatio
has_many :messages
has_many :users, through: :members
has_many :members 

## messagesテーブル

|Column|Type|Options|
|------|----|-------|
|text|text||
|image|string|
|user|references|null: false, foreign_key: true|
|group|references|null: false, foreign_key: true|

### Association
belongs_to :user
belongs_to :group


## usersテーブル
|Column|Type|Options|
|------|----|-------|
|nickname|string|null: false, index: true|
|password|string|null: false, index: true|

### Association
has_many :messages
has_many :groups, through: :members
has_many :members

## membersテーブル
|Column|Type|Options|
|------|----|-------|
|user|references|null: false, foreign_key: true|
|group|references|null: false, foreign_key: true|


### Association
belongs_to :group
belongs_to :user

