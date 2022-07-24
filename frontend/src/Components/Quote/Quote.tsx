import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import './Quote.less'

function Quote (props: any) {
    const [isLoading, setIsLoading] = useState(false);

    // useEffect(() => {
    //   this
    // }, []);

    if (!isLoading) {
        return (
            <div className="notes-view-quotes-container">
                <div className="notes-view-quotes-header">
                    <h3>Quote of the Day</h3>
                </div>
                <div dangerouslySetInnerHTML={{ __html: props.quote }} />
            </div>
        );
    } else {
        return (<div/>);
    }
}

Quote.propTypes = {
    quote: PropTypes.string
};

export default Quote;
