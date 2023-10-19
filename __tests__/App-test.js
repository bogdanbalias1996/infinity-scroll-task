/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../src/components/App';

import renderer from 'react-test-renderer';
jest.mock('react-native-gesture-handler', () => {});

it('renders correctly', () => {
  renderer.create(<App />);
});
