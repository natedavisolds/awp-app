import React from 'react';
import ConditionalButton from './ConditionalButton';

import { action } from '@storybook/addon-actions';

export default {
  title: 'ConditionalButton',
  component: ConditionalButton,
};

export const Invalid = () => <ConditionalButton valid={false} onClick={action('invalid click')}>Invalid Button</ConditionalButton>

export const Valid = () => <ConditionalButton valid={true} onClick={action('value click')}>Valid Button</ConditionalButton>
