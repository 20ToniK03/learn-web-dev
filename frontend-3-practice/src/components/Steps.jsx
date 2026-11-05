function Steps() {
  return (
    <div className="steps">
      <div className="container">
        <ol className="steps__list" aria-label="Шаги записи">
          <li className="steps__item steps__item--done">
            <span className="steps__dot">1</span>
            <span className="steps__line"></span>
            <span className="steps__tick"></span>
          </li>
          <li className="steps__item steps__item--done">
            <span className="steps__dot">2</span>
            <span className="steps__line"></span>
            <span className="steps__tick"></span>
          </li>
          <li className="steps__item steps__item--current" aria-current="step">
            <span className="steps__dot">3</span>
            <span className="steps__line"></span>
            <span className="steps__tick"></span>
          </li>
          <li className="steps__item">
            <span className="steps__dot">4</span>
            <span className="steps__line"></span>
            <span className="steps__tick"></span>
          </li>
          <li className="steps__item">
            <span className="steps__dot">5</span>
            <span className="steps__line"></span>
            <span className="steps__tick"></span>
          </li>
        </ol>
      </div>
    </div>
  );
}

export default Steps;
