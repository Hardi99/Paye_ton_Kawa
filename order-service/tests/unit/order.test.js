// order-service/tests/unit/orderController.test.js
const Order = require('../../src/Order');
const orderController = require('../../src/orderController');

jest.mock('../../src/Order');

describe('Order Controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a new order', async () => {
    const req = { body: { userId: '123', items: ['item1', 'item2'] } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    Order.mockImplementation(() => ({
      save: jest.fn().mockResolvedValue(req.body)
    }));

    await orderController.createOrder(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(req.body);
  });

  it('should get orders by user ID', async () => {
    const req = { params: { userId: '123' } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    Order.find = jest.fn().mockResolvedValue([{ userId: '123', items: ['item1'] }]);

    await orderController.getOrdersByUserId(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([{ userId: '123', items: ['item1'] }]);
  });
});
