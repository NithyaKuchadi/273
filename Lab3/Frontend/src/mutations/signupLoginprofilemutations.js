import { gql } from 'apollo-boost';

const signupmutation = gql`
mutation signup(
    $email: String!,
    $firstname: String!,
    $lastname: String!,
    $password: String!,
    $restaurant:String!,
    $cuisine:String!,
    $usertype:String!) {
    signup(
        email: $email,
        firstname: $firstname,
        lastname: $lastname,
        password: $password,
        restaurant: $restaurant,
        cuisine:$cuisine,
        usertype:$usertype) {
        responseMessage
    }
}
`;


const loginmutation = gql`
mutation login(
    $email: String!,
    $password: String!,
    $usertype: String!) {
    login(
        email: $email,
        password: $password,
        usertype: $usertype) {
        isValidUser,
        cookie1,
        cookie2,
        cookie3,
        cookie4
    }
}
`;

const updateprofilemutation = gql`
mutation updateProfile(
        $id:String!,
        $firstname:String!,
        $lastname:String!,
        $phoneNumber:String!,
        $Address:String!, 
        $email: String!,
        $restaurant: String!,
        $cuisine:String!
  )
  {
    updateProfile(
        id: $id,
        firstname: $firstname,
        lastname: $lastname,
        phoneNumber: $phoneNumber,
        Address: $Address, 
        email: $email,
        restaurant: $restaurant,
        cuisine:$cuisine
        ){
            responseMessage
        }
    }
`;
const sectionmutation = gql`
mutation createsection(
    $sectioname: String!,
    $restaurantname: String!) {
        createsection(
        sectioname: $sectioname,
        restaurantname: $restaurantname) {
        responseMessage
    }
}
`;


const itemmutation = gql`
mutation item(
    $name: String!,
    $description: String!,
    $price: String!,
    $restaurantname: String!,
    $sectionid:String!,
    $sectionname:String!) {
    item(
        name: $name,
        description: $description,
        price: $price,
        restaurantname: $restaurantname,
        sectionid: $sectionid,
        sectionname:$sectionname) {
        responseMessage
    }
}
`;


export { signupmutation, loginmutation, updateprofilemutation,sectionmutation, itemmutation};
