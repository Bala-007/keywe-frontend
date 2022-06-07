import React from 'react';
import LoadingOverlay from "react-loading-overlay";
import styled, { css } from "styled-components";

const DarkBackground = styled.div`
  display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 999; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */

  ${props =>
    props.disappear &&
    css`
      display: block; /* show */
    `}
`;

export default function Loader() {
    return (
        // <div class="divLoader">
        //     <svg class="svgLoader" viewBox="0 0 100 100" width="10em" height="10em">
        //         <path stroke="none" d="M10 50A40 40 0 0 0 90 50A40 42 0 0 1 10 50" fill="#51CACC" transform="rotate(179.719 50 51)"><animateTransform attributeName="transform" type="rotate" calcMode="linear" values="0 50 51;360 50 51" keyTimes="0;1" dur="1s" begin="0s" repeatCount="indefinite"></animateTransform></path>
        //     </svg>
        // </div>
        <div>
            <DarkBackground disappear={true}>
                
                <LoadingOverlay
                active={true}
                // spinner={<BounceLoader />}
                spinner={true}
                text="Loading"
                >
             
                </LoadingOverlay>
            </DarkBackground>
        </div>
    )
}
