const Sequlize = require('sequelize');

class Hashtag extends Sequlize.Model {
	static initiate ( sequelize ) {
		Hashtag.init({
			title : {
				type : Sequlize.STRING(15),
				allowNull : false,
				unique : true,
			}
		}, {
			sequelize,
			timestamps : true,
			underscored : false,
			paranoid : false,
			modelName : 'Hashtag',
			tableName : 'hashtags',
			charset : 'utf8mb4',
			collate : 'utf8mb4_general_ci'
		});
	}

	static associate ( db ) { // 관계
		db.Hashtag.belongsToMany(db.Post, {through: 'PostHashtag'});
	}
}

module.exports = Hashtag;