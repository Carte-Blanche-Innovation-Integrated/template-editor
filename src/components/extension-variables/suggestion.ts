import {PluginKey} from '@tiptap/pm/state';
import {ReactRenderer} from '@tiptap/react';
import {type SuggestionOptions} from '@tiptap/suggestion';
import tippy, {GetReferenceClientRect, Instance} from 'tippy.js';

import MentionList, {MentionListRef} from './MentionList.tsx';

const VariablesPluginKey = new PluginKey('Variables');

export default {
  char: '$',
  pluginKey: VariablesPluginKey,
  items: ({query}) => {
    return [
      'candidate_name',
      'candidate_first_name',
      'candidate_last_name',
      'job_title',
      'application_date',
      'next_step',
      'current_step',
      'company_name',
      'company_email',
      'sender_name',
      'sender_email',
    ]
      .filter((item) => item.toLowerCase().startsWith(query.toLowerCase()))
      .slice(0, 5);
  },
  render: () => {
    let component: ReactRenderer<MentionListRef>;
    let popup: Instance[];

    return {
      onStart: (props) => {
        component = new ReactRenderer(MentionList, {
          props,
          editor: props.editor,
        });

        if (!props.clientRect) {
          return;
        }

        popup = tippy('body', {
          getReferenceClientRect: () => props?.clientRect?.() as DOMRect,
          appendTo: () => document.body,
          content: component.element,
          showOnCreate: true,
          interactive: true,
          trigger: 'manual',
          placement: 'bottom-start',
        });
      },

      onUpdate(props) {
        component.updateProps(props);

        if (!props.clientRect) {
          return;
        }

        popup[0].setProps({
          getReferenceClientRect: props.clientRect as GetReferenceClientRect,
        });
      },

      onKeyDown(props) {
        if (props.event.key === 'Escape') {
          popup[0].hide();

          return true;
        }

        return component.ref?.onKeyDown(props) ?? false;
      },

      onExit() {
        popup[0].destroy();
        component.destroy();
      },
    };
  },
} satisfies Omit<SuggestionOptions, 'editor'>;
