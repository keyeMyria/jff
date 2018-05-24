import React from 'react';

const Loading = () => (
    <div className='loading' style={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%'}}>
        <h2>loading...</h2>
    </div>
);

const LazyLoadComponent = ({isLoading, error}) => {
    if (isLoading) {
        return <Loading/>;
    } else if (error) {
        return (
            <div>
                <h1>Sorry, there was a problem loading the page.</h1>
                <div>{error.message}</div>
            </div>
        );
    } else {
        return null;
    }
};
export default LazyLoadComponent;