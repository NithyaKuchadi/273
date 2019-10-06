import React from 'react';
import renderer from 'react-test-renderer';
import ProfileOfBuyer from '../components/Profile/ProfileOfBuyer';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow } from 'enzyme';
configure({ adapter: new Adapter() });

describe('when edit button is clicked for profileImage..Original_ProfileImage is changed to false',() =>{
    test('renders list-items', () => {
        const wrapper = shallow(<ProfileOfBuyer />);

        wrapper.find('p[className="testing"]').simulate('click');
        expect(wrapper.state('Original_ProfileImage')).toEqual(false);
        expect(wrapper.state('update_ProfileImage')).toEqual(true);
      })
    });
