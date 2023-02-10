const Sequelize = require('sequelize');
const User = require('./user');
const config = require('../config/config.json')['test']
const sequelize = new Sequelize(
	config.database, config.username, config.password, config
)

// test coverage를 위한 테스트 -> 큰 의미가 없다
describe('User Model', () => {
	test('static intiate 메서드 호출', () => {
		//toBe(undefined) => 리턴이 없기때문
		expect(User.initiate(sequelize)).toBe(undefined);
	});

	test('static associate 메서드 호출', ()=> {
		const db ={
			User:{
				hasMany : jest.fn(),
				belongsToMany: jest.fn()
			},
			Post:{}
		}
		User.associate(db);
		expect(db.User.hasMany).toHaveBeenCalledWith(db.Post);
		expect(db.User.belongsToMany).toHaveBeenCalledTimes(2)
	})


});
