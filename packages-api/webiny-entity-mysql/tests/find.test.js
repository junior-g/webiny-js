import {assert} from 'chai';

const sinon = require('sinon');
const SimpleEntity = require('./entities/simpleEntity');

describe('find test', function () {
	it('find - should find entities and total count', async () => {
		sinon.stub(SimpleEntity.getDriver().getConnection(), 'query').callsFake((query, callback) => {
			callback(null, [
				{
					"id": 1,
					"name": "This is a test",
					"slug": "thisIsATest",
					"enabled": 1
				},
				{
					"id": 2,
					"name": "This is a test 222",
					"slug": "thisIsATest222",
					"enabled": 0
				}
			], null);
		});

		sinon.stub(SimpleEntity.getDriver().getConnection(), 'end').callsFake(() => {});

		const entities = await SimpleEntity.find();
		SimpleEntity.getDriver().getConnection().query.restore();
		SimpleEntity.getDriver().getConnection().end.restore();

		assert.isArray(entities);
		assert.lengthOf(entities, 2);

		assert.equal(entities[0].id, 1);
		assert.equal(entities[0].name, 'This is a test');
		assert.equal(entities[0].slug, 'thisIsATest');
		assert.isTrue(entities[0].enabled);

		assert.equal(entities[1].id, 2);
		assert.equal(entities[1].name, 'This is a test 222');
		assert.equal(entities[1].slug, 'thisIsATest222');
		assert.isFalse(entities[1].enabled);
	});
});