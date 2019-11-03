let chai=require('chai');
let should = require('chai').should();
let chaiHttp = require('chai-http');
chai.use(chaiHttp);
let  expect = chai.expect;
let assert = require('assert');


describe('GRUBHUB testing using Mocha and Chai', ()=> {
//Login Buyer
    it("Test case 1-Login Buyer  ", (done)=>
    {
        let logindata = {
            Type : "Buyer",
            Email : "manjula@gmail.com",
            Password: "manjula",
        }
        chai.request('http://localhost:5000')
        .post('/buyerLogin')
        .send(logindata)
        .end(function (err, res) {
            expect(err).to.be.null;
            res.should.have.status(200);
            res.body.should.have.property('validUser').equal(true);
        done();
        });
})
//Owner Profile
it("Test case 2- Profile of Owner",(done)=>
{
    let data = {
        "Email": "admin@gmail.com",
        "UserType": "Owner"
    }
    chai.request('http://localhost:5000')
    .post('/getProfileDetails')
    .send(data)
    .end(function (err, res) {
        expect(err).to.be.null;
        res.status.should.be.equal(200);
        res.body.should.be.a('object');
        expect(res.body.RestName).to.equal("NithyaTable");    
    done();
    });
})
//Signup Buyer
it("Test case 3- Signup Buyer",(done)=>
{
    let Userdata = {
        Type : "Buyer",
        UserName: "Pallavi",
        Email : "pallavi@gmail.com",
        Password: "pallavi",
    }
    chai.request('http://localhost:5000')
    .post('/Buyersignup')
    .send(Userdata)
    .end(function (err, res) {
        expect(err).to.be.null;
        res.status.should.be.equal(200);
        res.body.should.have.property('responseMessage').equal('User already exists'); 
    done();
    });
})
//Get RestaurantName based on Item Search
it("Test case 4- Get Restaurant Name based on item search",(done)=>
{
    let item={
        "NameOfItem":"Biryani"
    }
    chai.request('http://localhost:5000')
    .post('/getRestaurantNames')
    .send(item)
    .end(function (err, res) {
        expect(err).to.be.null;
        res.status.should.be.equal(200);
        res.should.be.json;
        var obj = JSON.parse(res.text)
        expect(obj[0].RestaurantName).to.equal("Bawarchi");
        
    done();
    });
})
//Update Profile Name of Owner
it("Test case 5- Update Profile Name",(done)=>
{
    let data = {
        Name: "Queen",
        UserID: 24
    }
    chai.request('http://localhost:5000')
    .post('/updateUserName')
    .send(data)
    .end(function (err, res) {
        expect(err).to.be.null;
        res.status.should.be.equal(200);
        res.body.should.have.property('responseMessage').equal('Successfully Updated'); 
    done();
    });
})
})
