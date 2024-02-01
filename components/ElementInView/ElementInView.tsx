"use client";

import { ReactNode } from "react";
import { useInView } from "react-intersection-observer";

interface IElementInView {
  text?: string;
  children?: ReactNode;
}

const ElementInView = ({ text, children }: IElementInView) => {
  const { ref, inView } = useInView({ triggerOnce: true });

  return (
    <span ref={ref} className={`ElementInView ${inView ? "is-visible" : ""}`}>
      {/* Can only set one of `children` or `props.dangerouslySetInnerHTML`. */}
      {text && <span className="ElementInView__item" dangerouslySetInnerHTML={{ __html: text }} />}
      {children && <span className="ElementInView__item">{children}</span>}
    </span>
  );
};

export default ElementInView;
