import React from "react";

import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import NavigationsItem from "./NavigationsItem";
import NavigationItem from "./NavigationItem/NavigationItem";

configure({ adapter: new Adapter() });

describe("<NavigationsItem />", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<NavigationsItem />);
  });

  it("should render two Navigation Items if not authenticated", () => {
    expect(wrapper.find(NavigationItem)).toHaveLength(2);
  });

  it("should render three Navigation Items if authenticated", () => {
    // wrapper = shallow(<NavigationsItem isAuthenticated />);
    wrapper.setProps({ isAuthenticated: true });
    expect(wrapper.find(NavigationItem)).toHaveLength(3);
  });

  it("should an exact logout button", () => {
    // wrapper = shallow(<NavigationsItem isAuthenticated />);
    wrapper.setProps({ isAuthenticated: true });
    expect(
      wrapper.contains(<NavigationItem link="/logout">Logout</NavigationItem>)
    ).toEqual(true);
  });
});
