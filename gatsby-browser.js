/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/browser-apis/
 */

// You can delete this file if you're not using it

import "firebase/auth";
import "firebase/messaging";
import React from 'react';
// import AuthProvider from "./src/context/auth";

// export const wrapRootElement = ({element}) => (
//     <AuthProvider>{element}</AuthProvider>
// )

export { default as wrapRootElement } from './src/state/ReduxWrapper';
