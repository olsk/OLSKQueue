const { throws, rejects, deepEqual } = require('assert');

const mod = require('./main.js');

describe('OLSKQueueAPI', function test_OLSKQueueAPI() {

	const _OLSKQueueAPI = function (inputData) {
		return Object.assign(Object.assign({}, mod), {
			_DataFoilQueue: (function () {}),
		}, inputData).OLSKQueueAPI(inputData.params);
	};

	it('returns object', function() {
		deepEqual(typeof mod.OLSKQueueAPI(), 'object');
	});

	context('_OLSKQueueObject', function () {
		
		it('calls _DataFoilQueue', function () {
			deepEqual(_OLSKQueueAPI({
				_DataFoilQueue: (function () {
					return [...arguments];
				}),
			})._OLSKQueueObject, [mod._DataQueueConfig()]);
		});

		it('throws if not object', function () {
			throws(function () {
				mod.OLSKQueueAPI(null);
			}, /OLSKErrorInputNotValid/);
		});

		it('passes inputData', function () {
			const item = {
				[Math.random().toString()]: Math.random().toString(),
			};
			deepEqual(_OLSKQueueAPI({
				_DataFoilQueue: (function () {
					return [...arguments];
				}),
				params: Object.assign({}, item),
			})._OLSKQueueObject, [Object.assign(mod._DataQueueConfig(), item)]);
		});
	
	});

	context('OLSKQueueAdd', function () {

		it('throws if not function', function () {
			throws(function () {
				mod.OLSKQueueAPI().OLSKQueueAdd(null);
			}, /OLSKErrorInputNotValid/);
		});

		it('resolves outputData', async function () {
			const item = Math.random().toString();

			deepEqual(await mod.OLSKQueueAPI().OLSKQueueAdd(function () {
				return item;
			}), item);
		});

		it('rejects if not object', async function () {
			const item = Math.random().toString();
			await rejects(mod.OLSKQueueAPI().OLSKQueueAdd(function () {
				throw new Error(item);
			}), new RegExp(item));
		});
	
	});

});

describe('_DataQueueConfig', function test__DataQueueConfig() {

	it('returns object', function() {
		deepEqual(mod._DataQueueConfig(), {
			concurrency: 1,
			autostart: true,
		});
	});

});
