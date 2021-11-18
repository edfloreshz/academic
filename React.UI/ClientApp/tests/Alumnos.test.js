import React from 'react';
import renderer from 'react-test-renderer';

import Alumnos from '../src/component/Alumnos.js';

describe('<Alumnos />', () => {
    it('should match the snapshot', () => {
      const component = renderer.create(<Alumnos />).toJSON();
      expect(component).toMatchSnapshot();
    });
  });