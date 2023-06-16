import React from 'react';
import { RootSiblingParent } from 'react-native-root-siblings';
import { MoeslandNavigation } from './src/navigation';

export default function App() {
  return (
    <RootSiblingParent>
      <MoeslandNavigation/>
    </RootSiblingParent>
  );
}
