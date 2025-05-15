// import React from 'react';
// import {
//   GoogleSignin,
//   GoogleSigninButton,
//   statusCodes,
// } from '@react-native-google-signin/google-signin';
// import { supabase } from '../lib/supabase';

// GoogleSignin.configure({
//   scopes: ['https://www.googleapis.com/auth/drive.readonly'],
//   webClientId: '421743968486-gt77tp839euv1e24909da95ctt17vvno.apps.googleusercontent.com',
//   offlineAccess: true,
// });

// export default function GoogleSignInComponent() {
//   const handleSignIn = async () => {
//     try {
//       await GoogleSignin.hasPlayServices();
//       const response = await GoogleSignin.signIn();

//       const idToken = response.user.idToken; // ✅ Access it correctly here

//       if (idToken) {
//         const { data, error } = await supabase.auth.signInWithIdToken({
//           provider: 'google',
//           token: idToken,
//         });

//         if (error) {
//           console.error('Supabase sign-in error:', error);
//         } else {
//           console.log('Supabase user:', data);
//         }
//       } else {
//         throw new Error('No ID token returned from Google');
//       }
//     } catch (error: any) {
//       if (error.code === statusCodes.SIGN_IN_CANCELLED) {
//         console.log('User cancelled sign-in');
//       } else if (error.code === statusCodes.IN_PROGRESS) {
//         console.log('Sign-in already in progress');
//       } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
//         console.log('Google Play Services not available');
//       } else {
//         console.error('Google Sign-In error:', error.message);
//       }
//     }
//   };

//   return (
//     <GoogleSigninButton
//       size={GoogleSigninButton.Size.Wide}
//       color={GoogleSigninButton.Color.Dark}
//       onPress={handleSignIn}
//     />
//   );
// }
