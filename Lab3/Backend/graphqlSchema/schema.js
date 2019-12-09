const graphql = require('graphql');
var usermodal = require('../models/userschema');
var sectionmodal = require('../models/section_schema');
var itemmodal = require('../models/item_schema');
const sha1 = require('sha1');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLInt,
    GraphQLBoolean,
    GraphQLList
} = graphql;

const signupResult = new GraphQLObjectType({
    name: 'signupResult',
    fields: () => ({
        responseMessage: { type: GraphQLString }
    })
});
const loggedInUserData = new GraphQLObjectType({
    name: 'loggedInUserData',
    fields: () => ({
        isValidUser: { type: GraphQLBoolean },
        cookie1: { type: GraphQLString },
        cookie2: { type: GraphQLString },
        cookie3: { type: GraphQLString },
        cookie4: { type: GraphQLString }
    })
});
const ProfileType = new GraphQLObjectType({
    name: 'ProfileType',
    fields: () => ({
        _id: {
            type: GraphQLString
        },
        firstname: {
            type: GraphQLString
        },
        lastname: {
            type: GraphQLString
        },
        email: {
            type: GraphQLString
        },
        password: {
            type: GraphQLString
        },
        usertype: {
            type: GraphQLString
        },
        phoneNumber: {
            type: GraphQLString
        },
        Address: {
            type: GraphQLString
        },
        restaurant: {
            type: GraphQLString
        },
        cuisine: {
            type: GraphQLString
        }

    })
});
const SectionType=new GraphQLObjectType({
    name: 'SectionType',
    fields: () => ({
      sectionname: {
            type: GraphQLString
        },
        _id:{
            type: GraphQLString
        },
        restaurantname: {
            type: GraphQLString
        },
        Items:{
            type : new GraphQLList(ItemType),
            async resolve(parent, args) {
                console.log('Getting Item details, section id is', parent._id);
                var itemdata = {};
                await itemmodal.find({sectionid: parent._id}
                    , (err, item) => {
                        if (err) {
                            console.log("Error while querying Item info:", err);
                        }
                        else {
                            console.log('Item details: ', item);
                            itemdata = item;
                        }
                    });
            return itemdata;
            }
        }
    })
})

const ItemType=new GraphQLObjectType({
    name: 'ItemType',
    fields: () => ({
        name: {
            type: GraphQLString
        },
        description: {
            type: GraphQLString
        },
        price: {
            type: GraphQLString
        },
        restaurantname: {
            type: GraphQLString
        },
        sectionid: {
            type: GraphQLString
        },
        sectionname: {
            type: GraphQLString
        }

    })
})


const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: () => ({
        profile: {
            type: ProfileType,
            args: {
                id: {
                    type: GraphQLString
                }
            },
            async resolve(parent, args) {
                console.log('in get profile data args: ', args);
                var profileData = {};
                await usermodal.findById(args.id
                    , (err, user) => {
                        if (err) {
                            console.log("Error while querying user info:", err);
                        }
                        else {
                            console.log('User details: ', user);
                            profileData = user;
                        }
                    });

                return profileData;
            }
        },
        menu:{
            type: new GraphQLList(SectionType),
            args:{
               restaurantname:{
                type: GraphQLString
                }
            },
            async resolve(parent, args) {
                console.log('in  menu,...args are', args);
                var menu = [];
                await sectionmodal.find( { restaurantname : args.restaurantname} 
                    , (err, section) => {
                        if (err) {
                            console.log("Error while querying section info:", err);
                        }
                        else {
                            console.log('Menu details are  ', section);
                            menu = section;
                        }
                    });

                return menu;
            }
        }
    })
})
const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: () => ({
        signup: {
            type: signupResult,
            args: {
                firstname: {
                    type: GraphQLString
                },
                lastname: {
                    type: GraphQLString
                },
                email: {
                    type: GraphQLString
                },
                password: {
                    type: GraphQLString
                },
                restaurant: {
                    type: GraphQLString
                },
                cuisine: {
                    type: GraphQLString
                },
                usertype: {
                    type: GraphQLString
                }
            },
            resolve: (parent, args) => {
                return new Promise(async (resolve, reject) => {
                    console.log("Inside Signup Mutation");
                    await usermodal.findOne({
                        "email": args.email
                    }, (err, user) => {
                        if (err) {
                            console.log("Error while querying user info:", err);
                        }
                        else {
                            if (user) {
                                console.log('User Exists!', user);
                                var resultData = {
                                    responseMessage: 'User Already exists!'
                                }
                                resolve(resultData);
                            }
                            else {
                                var user = new usermodal({
                                    email: args.email,
                                    password: sha1(args.password),
                                    firstname: args.firstname,
                                    lastname: args.lastname,
                                    restaurant: args.restaurant,
                                    cuisine: args.cuisine,
                                    usertype: args.usertype

                                });
                                console.log('User saving..');
                                user.save().then((doc) => {
                                    console.log("User saved successfully.", doc);
                                    console.log('EOF');
                                    var resultData = {
                                        responseMessage: 'Successfully Added!'
                                    }
                                    resolve(resultData);
                                });
                            }

                        }
                    });
                });
            }
        },
        login: {
            type: loggedInUserData,
            args: {
                email: {
                    type: GraphQLString
                },
                password: {
                    type: GraphQLString
                },
                usertype: {
                    type: GraphQLString
                }
            },
            resolve: (parent, args) => {
                return new Promise(async (resolve, reject) => {
                    console.log("Inside Login Mutation");
                    await usermodal.findOne({
                        "email": args.email,
                        "password": sha1(args.password),
                        "usertype": args.usertype
                    }, (err, user) => {
                        if (err) {
                            console.log("Error while querying user info:", err);
                        }
                        else {
                            if (user) {
                                console.log('User details: ', user);
                                //let cookies = {"cookie1": user.role, "cookie2": user._id, "cookie3": user.firstname+" "+user.lastname, "cookie4": user.email };
                                userData = {
                                    isValidUser: true,
                                    cookie1: user.usertype,
                                    cookie2: user._id,
                                    cookie3: user.restaurant,
                                    cookie4: user.email
                                };
                            }
                        }
                    });

                    resolve(userData);
                });

            }
        },
        updateProfile: {
            type: signupResult,
            args: {
                id: { type: GraphQLString },
                email: { type: GraphQLString },
                firstname: { type: GraphQLString },
                lastname: { type: GraphQLString },
                phoneNumber: { type: GraphQLString },
                Address: { type: GraphQLString },
                restaurant: { type: GraphQLString },
                cuisine: { type: GraphQLString }

            },
            resolve: (parent, args) => {
                return new Promise(async (resolve, reject) => {

                    await usermodal.findByIdAndUpdate(args.id, {
                        $set:
                        {
                            "email": args.email,
                            "firstname": args.firstname,
                            "lastname": args.lastname,
                            "phoneNumber": args.phoneNumber,
                            "Address": args.Address,
                            "restaurant": args.restaurant,
                            "cuisine": args.cuisine
                        }
                    }, (err, user) => {
                        if (err) {
                            console.log("Error while querying user info:", err);
                            resultData = {
                                responseMessage: 'Error: ' + err
                            };
                            resolve(resultData);
                        }
                        else {
                            if (user) {
                                console.log('User details: ', user);
                                //let cookies = {"cookie1": user.role, "cookie2": user._id, "cookie3": user.firstname+" "+user.lastname, "cookie4": user.email };
                                resultData = {
                                    responseMessage: 'Successfully updated!'
                                };
                            }
                            resolve(resultData);
                        }
                    });


                });

            }

        },
        createsection: {
            type: signupResult,
            args: {
                sectioname: {
                    type: GraphQLString
                },
                restaurantname: {
                    type: GraphQLString
                }

            },
            resolve: (parent, args) => {
                return new Promise(async (resolve, reject) => {
                    console.log("Inside create section Mutation");

                    var section = new sectionmodal({
                        sectionname: args.sectioname,
                        restaurantname: args.restaurantname,


                    });
                    console.log('section saving..');
                    section.save().then((doc) => {
                        console.log("Section created successfully.", doc);
                        console.log('EOF');
                        var resultData = {
                            responseMessage: 'Section created successfully!!'
                        }
                        resolve(resultData);
                    });
                })

            }
        },
        createitem: {
            type: signupResult,
            args: {
                name: {
                    type: GraphQLString
                },
                description: {
                    type: GraphQLString
                },
                price: {
                    type: GraphQLString
                },
                restaurantname: {
                    type: GraphQLString
                },
                sectionid: {
                    type: GraphQLString
                },
                sectionname: {
                    type: GraphQLString
                }

            },
            resolve: (parent, args) => {
                return new Promise(async (resolve, reject) => {
                    console.log("Inside create item Mutation");

                    var item = new itemmodal({
                        name: args.name,
                        description: args.description,
                        price: args.price,
                        restaurantname: args.restaurantname,
                        sectionid: args.sectionid,
                        sectionname: args.sectioname
                     });
                    console.log('Item saving..');
                    item.save().then((doc) => {
                        console.log("Item created successfully.", doc);
                        var resultData = {
                            responseMessage: 'Item created successfully!!'
                        }
                        resolve(resultData);
                    });
                })

            }
        }

    })
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});