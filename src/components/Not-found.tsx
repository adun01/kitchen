import {Switch, Route, Link} from 'react-router-dom'

export default function NotFound() {
    return (
        <div className="row">
            <div className="col-lg-12">
                <div className="page-header">
                    <h1 id="containers">404</h1>
                </div>
                <div className="bs-component">
                    <div className="jumbotron">
                        <p className="lead">Страницы не существует</p>
                        <hr className="my-4"></hr>
                        <p className="lead">
                            <Link to="/" className="btn btn-primary btn-lg">Вернуться на главную</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
};
