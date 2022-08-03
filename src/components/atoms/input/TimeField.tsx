import { useRef } from "react";
import { useLocale, useTimeField } from "react-aria";
import type { TimeFieldStateOptions } from "react-stately";
import { useTimeFieldState } from "react-stately";
import DateSegment from "./DateAndTime/DateSegment";

function TimeField(props: TimeFieldStateOptions) {
  let { locale } = useLocale();
  let state = useTimeFieldState({
    ...props,
    locale,
  });

  let ref = useRef(null);
  let { labelProps, fieldProps } = useTimeField(props, state, ref);

  return (
    <div className="flex flex-col items-start">
      <span {...labelProps} className="hidden text-sm text-gray-800">
        {props.label}
      </span>
      <div
        {...fieldProps}
        ref={ref}
        className="flex rounded-lg border border-gray-200 bg-white px-3 py-2  text-sm transition-colors focus-within:border-gray-200 focus-within:ring-2 focus-within:ring-primary-500
        hover:border-gray-400 focus-within:hover:border-transparent"
      >
        {state.segments.map((segment, i) => (
          <DateSegment key={i} segment={segment} state={state} />
        ))}
      </div>
    </div>
  );
}

export default TimeField;
