import { useRef } from "react";
import { useDateSegment } from "react-aria";
import type { DateFieldState, DateSegment as DST } from "react-stately";

interface ComponentProps {
  segment: DST;
  state: DateFieldState;
}

function DateSegment({ segment, state }: ComponentProps) {
  let ref = useRef(null);
  let { segmentProps } = useDateSegment(segment, state, ref);

  return (
    <div
      {...segmentProps}
      ref={ref}
      style={{
        ...segmentProps.style,
        minWidth:
          segment.maxValue != null
            ? String(segment.maxValue).length + "ch"
            : undefined,
      }}
      className={`group box-content rounded-sm px-0.5 text-right tabular-nums outline-none focus:bg-primary-500 focus:text-white ${
        !segment.isEditable ? "text-gray-500" : "text-gray-800"
      }`}
    >
      {/* Always reserve space for the placeholder, to prevent layout shift when editing. */}
      <span
        aria-hidden="true"
        className="block w-full text-center italic text-gray-500 group-focus:text-white"
        style={{
          visibility: segment.isPlaceholder ? undefined : "hidden",
          height: segment.isPlaceholder ? "" : 0,
          pointerEvents: "none",
        }}
      >
        {segment.placeholder}
      </span>
      {segment.isPlaceholder ? "" : segment.text}
    </div>
  );
}

export default DateSegment;
