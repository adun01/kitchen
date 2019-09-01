import React from 'react';
import {Link} from 'react-router-dom';

export const KtnNotFound = () => {
    return (
        <div className="row">
            <h1 className="text-black-50">404</h1>
            <div className="card w-100">
                <div className="card-header">
                    Страницы не существует
                </div>
                <div className="card-body">
                    <Link to="/" className="btn btn-primary btn-lg">Вернуться на главную</Link>
                </div>
            </div>
        </div>
    )
};
