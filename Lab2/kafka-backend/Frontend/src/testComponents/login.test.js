import BuyerLogin from '../components/Login/BuyerLogin';
import React from 'react';
import { configure } from 'enzyme';
import {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe("Testing Components",()=>{
    let wrapper;
it('login test',()=>
{
    wrapper = shallow(<BuyerLogin/>);
    wrapper.find('input[type="email"]').simulate('change', {target: {name: 'Email', value: 'srinish@gmail.com'}});
    expect(wrapper.state('Email')).toEqual('srinish@gmail.com');
})
});