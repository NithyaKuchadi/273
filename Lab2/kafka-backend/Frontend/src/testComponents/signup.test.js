import React from 'react';
import renderer from 'react-test-renderer';
import BuyerSignUp from '../components/Signup/BuyerSignUp'
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow } from 'enzyme';
configure({ adapter: new Adapter() });


describe('ProfileOfBuyer', () => {
    it('should render correctly', () => {
      const component = shallow(<BuyerSignUp />);
    
      expect(component).toMatchSnapshot();
    });
  });
