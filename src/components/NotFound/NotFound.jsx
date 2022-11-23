import './NotFound.css';

function NotFound() {
    return(
        <div className="not-found">
            <div className="not-found__container">
                <h2 className="not-found__title">404</h2>
                <p className="not-found__subtitle">Страница не найдена</p>
                <button className="auth__link not-found__button">Назад</button>
            </div>
        </div>
    );
}

export default NotFound;