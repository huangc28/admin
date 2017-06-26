/* eslint-disable */

import * as actions from './purchaseOrder'

describe('Purchase order action creator', () => {
	test('Fetch Purchase Orders output matches flux action standard', () => {
		console.log('BRYAN', actions.fetchPurchaseOrders({
			page: 1,
			perpage: 10,
			status: 0
		}))
	})
})