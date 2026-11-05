function Footer() {
  return (
    <footer className="site-footer" id="contacts">
      <div className="container footer__grid">
        <div className="footer__brand">
          <a className="brand" href="#" aria-label="Стрижки экспресс - на главную">
            <span className="brand__mark brand__mark--light" aria-hidden="true">СЭ</span>
            <span className="brand__text">
              <span className="brand__name">Стрижки экспресс</span>
              <span className="brand__note">Салон красоты</span>
            </span>
          </a>
          <address className="footer__address">Рыбинск, ул. Плеханова 34</address>
          <p className="footer__text"><a href="tel:+74951234567">+7 (495) 123-45-67</a></p>
          <p className="footer__text">Ежедневно 10:00-21:00</p>
        </div>

        <div className="footer__col">
          <h2>Контакты</h2>
          <ul className="footer__list">
            <li>
              <a className="footer__link" href="tel:+74951234567">
                <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                  <path d="M6.6 3.5 9 3.2a1 1 0 0 1 1.1.8l.8 3.2a1 1 0 0 1-.5 1.1l-1.5.9a13.6 13.6 0 0 0 6.9 6.9l.9-1.5a1 1 0 0 1 1.1-.5l3.2.8a1 1 0 0 1 .8 1.1l-.3 2.4a1.5 1.5 0 0 1-1.6 1.3A17.7 17.7 0 0 1 5.3 5.1a1.5 1.5 0 0 1 1.3-1.6Z"></path>
                </svg>
                +7 (495) 123-45-67
              </a>
            </li>
            <li>
              <a className="footer__link" href="mailto:str@expr.ru">
                <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                  <rect x="3" y="5" width="18" height="14" rx="2"></rect>
                  <path d="m3.5 6.5 8.5 6 8.5-6"></path>
                </svg>
                str@expr.ru
              </a>
            </li>
          </ul>
        </div>

        <div className="footer__col">
          <h2>Социальные сети</h2>
          <ul className="footer__list">
            <li><a className="footer__link footer__link--plain" href="#">Instagram</a></li>
            <li><a className="footer__link footer__link--plain" href="#">TikTok</a></li>
          </ul>
        </div>
      </div>

      <div className="container footer__bottom">
        <p>© 2026 Салон красоты «Стрижки экспресс»</p>
        <a href="#">Политика конфиденциальности</a>
      </div>
    </footer>
  );
}

export default Footer;
