import React from 'react';
import Question from './Question';

import { action } from '@storybook/addon-actions';

export default {
  title: 'Question',
  component: Question,
};

export const Empty = () => <Question></Question>

export const WithLabel = () => <Question label="What is the question label?"></Question>

export const InvalidWithMessage = () => <Question label="Is this invalid?" invalidFeedback="Oops, try again." defaultErrorState={false}></Question>

export const ValidWithMessage = () => <Question label="Should be valid" defaultValue="Some value" validFeedback="All good!" defaultErrorState={false}></Question>
