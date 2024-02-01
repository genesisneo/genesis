import ElementInView from "../ElementInView/ElementInView";

const Footer = () => (
  <footer id="contact" className="Footer">
    <div className="Footer__content">
      <div className="Footer__content-left">
        <h4 className="Footer__content-subtitle">
          <ElementInView text="Get in touch" />
        </h4>
        <h2 className="Footer__content-title">
          <ElementInView text={`Let’s turn your <br /> <u>ideas</u> into reality.`} />
        </h2>
        <p className="Footer__content-description">
          <ElementInView text="Feel free to reach out if you wanna collaborate with me, or simply have a chat." />
        </p>
        <ElementInView>
          <a
            className="Footer__content-button button"
            href="mailto:genesis@obtera.com?subject=Get in touch"
            target="_blank"
            rel="noreferrer"
          >
            Let&apos;s talk
          </a>
        </ElementInView>
      </div>
      <div className="Footer__content-right">
        <div className="Footer__content-social">
          <small>
            <ElementInView text="Email" />
          </small>
          <ElementInView>
            <a href="mailto:genesis@obtera.com?subject=Get in touch" target="_blank" rel="noreferrer">
              genesis@obtera.com
            </a>
          </ElementInView>
        </div>
        <div className="Footer__content-social">
          <small>
            <ElementInView text="Phone" />
          </small>
          <ElementInView>
            <a href="tel:+14317883420" target="_blank" rel="noreferrer">
              +1 (431) 788 3420
            </a>
          </ElementInView>
        </div>
        <div className="Footer__content-social">
          <small>
            <ElementInView text="Social" />
          </small>
          <div className="Footer__content-social-table">
            <div className="Footer__content-social-table-left">
              <a href="https://linkedin.com/in/genesisobtera" target="_blank" rel="noreferrer">
                <ElementInView text="LinkedIn" />
              </a>
              <a href="https://www.facebook.com/genesis.obtera/" target="_blank" rel="noreferrer">
                <ElementInView text="Facebook" />
              </a>
              <a href="https://instagram.com/genesis_neo" target="_blank" rel="noreferrer">
                <ElementInView text="Instagram" />
              </a>
              <a href="https://twitter.com/genesis_neo" target="_blank" rel="noreferrer">
                <ElementInView text="Twitter" />
              </a>
              <a href="https://youtube.com/genesisobtera" target="_blank" rel="noreferrer">
                <ElementInView text="YouTube" />
              </a>
            </div>
            <div className="Footer__content-social-table-right">
              <a href="https://github.com/genesisneo" target="_blank" rel="noreferrer">
                <ElementInView text="GitHub" />
              </a>
              <a href="https://dribbble.com/genesis_neo" target="_blank" rel="noreferrer">
                <ElementInView text="Dribbble" />
              </a>
              <a href="https://www.behance.net/genesis_neo" target="_blank" rel="noreferrer">
                <ElementInView text="Behance" />
              </a>
              <a href="https://stackoverflow.com/users/7702792/neo-genesis" target="_blank" rel="noreferrer">
                <ElementInView text="Stackoverflow" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="Footer__copyright">
      <ElementInView>Copyright © {new Date().getFullYear()}. All rights reserved.</ElementInView>
    </div>
    <a className="Footer__arrow" href="#main" title="Back to top" />
  </footer>
);

export default Footer;
