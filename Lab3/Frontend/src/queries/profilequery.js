import { gql } from 'apollo-boost';

const profilequery = gql`
query profile($id:String!){
    profile(id:$id){
      _id,
      firstname,
      lastname,
      email,
      password,
      phoneNumber,
      Address,
      restaurant,
      cuisine
    }
  }
`

const menuquery = gql`
query menu($restaurantname:String!){
    menu(restaurantname:$restaurantname){
      sectionname,
      _id,
     Items{
       name,
       description,
       price
     }
    }
  }
`
export {profilequery,menuquery};
