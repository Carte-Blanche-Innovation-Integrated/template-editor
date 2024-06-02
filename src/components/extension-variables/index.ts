import {Mention} from '@tiptap/extension-mention';

import variablesSuggestion from './suggestion';

const VariableNode = Mention.extend({
  name: 'variable',
}).configure({
  suggestion: variablesSuggestion,
});

export default VariableNode;
