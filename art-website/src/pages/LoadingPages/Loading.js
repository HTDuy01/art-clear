import React, { useState, useEffect } from 'react';
import { css } from '@emotion/react';
import { RingLoader } from 'react-spinners';

function Loading() {
    // const [isLoading, setIsLoading] = useState(true);

    return (

        <RingLoader color="#36D7B7" css={override} size={150} />

    );
}

const override = css`
  display: block;
  margin: 0 auto;
`;

export default Loading;
