import { useEffect, useRef } from 'react';
import { getMarkdownText } from '~/api';
import parse from '~/utils/parser';

import './about.css';

let loading = false;

export function About() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (ref.current && !loading && ref.current.childElementCount === 0) {
      loading = true;
      getMarkdownText().then((markdown) => {
        if (markdown) ref.current!.append(parse(markdown));
      });
    }
  }, []);

  return <section className="about" ref={ref} />;
}
