function Header() {
  return (
    <header className="site-header">
      <div className="container header__inner">
        <a className="brand" href="#" aria-label="Стрижки экспресс - на главную">
          <span className="brand__mark" aria-hidden="true">СЭ</span>
          <span className="brand__text">
            <span className="brand__name">Стрижки экспресс</span>
            <span className="brand__note">Салон красоты</span>
          </span>
        </a>
        <nav className="nav" aria-label="Основная навигация">
          <a href="#">Услуги</a>
          <a href="#">Мастера</a>
          <a href="#">Отзывы</a>
          <a href="#contacts">Контакты</a>
        </nav>
      </div>
    </header>
  );
}

export default Header;
