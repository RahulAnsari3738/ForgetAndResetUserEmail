const request=require('supertest')
const app=require('../app')
const userModel=require('../models/user.Schema')

beforeEach(async()=>{
    await userModel.deleteMany({})
})

describe('user register and login',()=>{
    test('user sign up ',async ()=>{
        await request(app).post('/users/register').send({
            firstName:'test',
            lastName:'jest',
        emailID:'lestTest@gamil.com',
        password:'12345678'
        }).expect(200)
    })
    
    test('user should be login ',async ()=>{
        await request(app).post('/users/register').send({
        emailID:'lestTest@gamil.com',
        password:'12345678'
        })
    })
})

