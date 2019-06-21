import React from 'react';
import './NotFound.scss';

function NotFound() {
  return (
    <div className="NotFound">
      <img
        className="NotFound__image"
        alt="Error"
        title="Error"
        src="/images/error.svg"
        loading="eager"
      />
      <p className="NotFound__paragraph">
        The page you are looking for might have been removed,
        <br />
        had it&apos;s name changed, or is temporary unavailable.
      </p>
      <a
        className="NotFound__button"
        href="/"
      >
        HOME
      </a>
    </div>
  );
}

export default NotFound;
