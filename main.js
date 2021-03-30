const mod = {

	OLSKQueueAPI (inputData = {}) {
		if (typeof inputData !== 'undefined') {
			if (typeof inputData !== 'object' || inputData === null) {
				throw new Error('OLSKErrorInputNotValid');
			}
		}

		return {

			OLSKQueueAdd (inputData) {
				if (typeof inputData !== 'function') {
					throw new Error('OLSKErrorInputNotValid');
				}

				const _this = this;

				return new Promise(function (res, rej) {
					_this._OLSKQueueObject.push(async function (_queue_callback) {
						try {
							return _queue_callback(null, res(await inputData()));
						} catch (error) {
							return rej(error);
						}
					});
				});
			},
			
			_OLSKQueueObject: this._DataFoilQueue(Object.assign(mod._DataQueueConfig(), inputData)),
		};
	},

	// DATA

	_DataFoilQueue: require('queue'),

	_DataQueueConfig () {
		return {
			concurrency: 1,
			autostart: true,
		};
	},

};

Object.assign(exports, mod);
