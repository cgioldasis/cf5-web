const mongoose = require('mongoose');
const request = require('supertest');

const app = require('../app');
const helper = require('../helpers/product.helper');

require('dotenv').config();

beforeEach(async () => {
  await mongoose.connect(process.env.MONGODB_URI)
    .then(
      () => { console.log("Connection to MOngoDB established")},
      err => { console.log("Failed to connect to MongoDB", err)}
    )
});

afterEach(async ()=>{
  await mongoose.connection.close();
})

describe("Request GET /api/products", () => {
    it("Returns all products", async () => {
        const res = await request(app).get('/api/products');
        expect(res.statusCode).toBe(200);
        expect(res.body.data.length).toBeGreaterThan(0)
    }, 10000)
});

describe('Request GET /api/products/:product', () =>{
    it('Returns a product', async ()=>{
        const result = await helper.findLastInsertedProduct();
        const res = await request(app).get('/api/products/' + result.product);
        expect(res.statusCode).toBe(200);
        expect(res.body.data.product).toBe(result.product);
    }, 10000)
});

describe('Request POST /api/products', () => {
    it('Creates a product', async () => {
        const res = await request(app)
            .post('/api/products')
            .send({
                product: "test",
                cost: 100,
                description: "test product",
                quantity: 10
            })
        expect(res.statusCode).toBe(200);
        expect(res.body.data).toBeTruthy();
    }, 10000);
    it('Create a product testing cost', async () => {
        const res = await request(app)
            .post('/api/products')
            .send({
                product: "test",
                cost: -100,
                description: "test product",
                quantity: 10
            })
        expect(res.statusCode).toBe(400);
    }, 10000);
    it('Create a product testing quantity', async () => {
        const res = await request(app)
            .post('/api/products')
            .send({
                product: "test",
                cost: 100,
                description: "test product",
                quantity: -10
            })
        expect(res.statusCode).toBe(400);
    }, 10000);
});

describe('Request PATCH /api/products/:product', () => {
    it('Update a product', async () => {
        const result = await helper.findLastInsertedProduct();
        const res = await request(app)
            .patch('/api/products/' + result.product)
            .send({
                product: {
                    _id: result._id,
                    quantity: 20
                }
            })
        expect(res.statusCode).toBe(200);
        expect(res.body.data).toBeTruthy();
    }, 10000);
});

describe('Request DELETE /api/products/:product', () => {
    it('Delete a product', async () => {
        const result = await helper.findLastInsertedProduct();
        const res = await request(app)
            .delete('/api/products/' + result.product)
        expect(res.statusCode).toBe(200);
        expect(res.body.data).toBeTruthy();
    }, 10000);
});