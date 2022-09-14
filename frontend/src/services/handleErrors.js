import { ERROR_MESSAGES } from 'configs/AppConfig';
import React from 'react';

const handleErrors = (errors = []) => {

    return (
        <>
            {
                <>
                    {errors.constructor === Array ? (
                        <>
                        {
                            errors?.length > 0 ? (
                                <ul className='error-display-parent'>
                                {errors.map((error) => (
                                    <li className='error-display-child' key={error}>{error}</li>
                                ))}
                                </ul>
                            ): (
                                <li className='error-display-child'>{ERROR_MESSAGES.NETWORK_CONNECTIVITY}</li>
                            )
                        }
                        </>
                    ) : (
                        <ul className='error-display-parent'>
                            <li className='error-display-child'>{errors}</li>
                        </ul>
                    )}
                </>
            }
        </>
    );
}
export default handleErrors;