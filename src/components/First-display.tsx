import React from 'react';

/**
 * Displaing first display in Main page
 */
export default () =>
    <div id="first-display"
         className="position-relative d-flex align-items-center justify-content-center"
         style={{
             height: '350px',
             backgroundImage: "url('./images/first-display.jpg')"
         }}>
        <h3 className="col-6 position-relative"
            style={{
                zIndex: 2
            }}>
            Как выбрать что покушать? &mdash;&nbsp;очень просто, введите название блюда и&nbsp;скорректируйте
            содержимое по&nbsp;своему желанию.
        </h3>
    </div>
