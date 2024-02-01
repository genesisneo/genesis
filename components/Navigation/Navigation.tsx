"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const Navigation = () => {
  const [drawer, setDrawser] = useState<boolean>(false);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && drawer) {
        setDrawser(false);
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [drawer]);

  return (
    <>
      <nav className="Navigation">
        <a className="Navigation__brand" href="/">
          Genesis
          <br />
          Mallorca
          <br />
          Obtera
        </a>
        <a
          className="Navigation__menu"
          onClick={(event: React.MouseEvent) => {
            event.preventDefault();
            setDrawser(!drawer);
          }}
        >
          {drawer ? "✕" : "≡"}
        </a>
      </nav>

      {drawer && (
        <dialog open className="Drawer">
          <ul className="Drawer__menu">
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/profile">Profile</a>
            </li>
            <li>
              <a href="/projects">Projects</a>
            </li>
            <li>
              <a href="#contact" onClick={() => setDrawser(!drawer)}>
                Contacts
              </a>
            </li>
          </ul>
          <div className="Drawer__social">
            <a href="https://linkedin.com/in/genesisobtera" target="_blank" rel="noreferrer" title="LinkedIn">
              <Image src="/images/icon-linkedin.svg" alt="LinkedIn" width={40} height={40} />
            </a>
            <a href="https://github.com/genesisneo" target="_blank" rel="noreferrer" title="GitHub">
              <Image src="/images/icon-github.svg" alt="GitHub" width={40} height={40} />
            </a>
            <a href="https://dribbble.com/genesis_neo" target="_blank" rel="noreferrer" title="Dribbble">
              <Image src="/images/icon-dribbble.svg" alt="Dribbble" width={40} height={40} />
            </a>
            <a href="https://www.behance.net/genesis_neo" target="_blank" rel="noreferrer" title="Behance">
              <Image src="/images/icon-behance.svg" alt="Behance" width={40} height={40} />
            </a>
          </div>
        </dialog>
      )}
    </>
  );
};

export default Navigation;
