/**
 * @format
 */

import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import CreateListModal from '../src/stubs/CreateListModal';

test('renders correctly', () => {
  const tree = renderer.create(<CreateListModal />).toJSON();
  expect(tree).toMatchSnapshot();
});
