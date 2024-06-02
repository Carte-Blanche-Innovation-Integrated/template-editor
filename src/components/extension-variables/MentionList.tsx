import clsx from 'clsx';
import {forwardRef, useEffect, useImperativeHandle, useState} from 'react';

import {VariableIcon} from '@heroicons/react/20/solid';
import type {SuggestionKeyDownProps, SuggestionProps} from '@tiptap/suggestion';

export interface MentionListRef {
  onKeyDown: (props: SuggestionKeyDownProps) => boolean;
}

export default forwardRef<MentionListRef, SuggestionProps>(function MentionList(props, ref) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const selectItem = (index: number) => {
    const item = props.items[index];

    if (item) {
      props.command({id: item});
    }
  };

  const upHandler = () => {
    setSelectedIndex((selectedIndex + props.items.length - 1) % props.items.length);
  };

  const downHandler = () => {
    setSelectedIndex((selectedIndex + 1) % props.items.length);
  };

  const enterHandler = () => {
    selectItem(selectedIndex);
  };

  useEffect(() => setSelectedIndex(0), [props.items]);

  useImperativeHandle(ref, () => ({
    onKeyDown: ({event}) => {
      if (event.key === 'ArrowUp') {
        upHandler();
        return true;
      }

      if (event.key === 'ArrowDown') {
        downHandler();
        return true;
      }

      if (event.key === 'Enter') {
        enterHandler();
        return true;
      }

      return false;
    },
  }));

  return (
    <div className="max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
      {props.items.length ? (
        props.items.map((item, index) => (
          <button
            className={clsx(
              `flex w-full cursor-default select-none items-center gap-x-2 px-4 py-2`,
              index === selectedIndex ? 'bg-gray-200' : 'text-gray-900'
            )}
            key={index}
            onClick={() => selectItem(index)}
          >
            <VariableIcon className="h-4 w-4 flex-shrink-0" />
            <span className="font-['IBM_Plex_Mono'] text-xs font-medium">{item}</span>
          </button>
        ))
      ) : (
        <div className="item">No result</div>
      )}
    </div>
  );
});
