# 1. About

:building_construction: The repository is under development, it's not finalized or optimized for performance in it`s current state.

[LED Matrix Mapper](https://led-matrix-mapper.vercel.app) is a web application created for personal use and for demonstration purposes, utilizing the latest Front-End technologies in web development.<br/>

The application is designed to control a unique device with a focus on creating animations portrayed by an LED matrix using an interactive interface. See one of the [inspirations](https://youtu.be/64X5sJJ4YKM?si=_vRgQX4lwe8lhrCd&t=170) that started the project.<br/>
A user is able to create, edit, play, and manage different animations associated with an account, so progress can be saved.
The created animations can be used with any device that is capable of driving an LED strip, mainly in a matrix grid configuration, via downloading the raw data or accessing it from the database. The data conversion must be made by the user, so it accommodates the specific LED driver library, like [FastLED](https://fastled.io).

# 2. Software </br>

## 2.1. Framework

The app is based on the [Next.js 14 App Router](https://nextjs.org/docs/app) framework, deployed and managed by the [Vercel](https://vercel.com/) platform.

## 2.2. User Management

Authentication and user management actions are handled by the [MongoDB Atlas Device SDK for the Web](https://www.mongodb.com/docs/atlas/device-sdks/web/), previously known as Realm Web SDK, through [Atlas App Services](https://www.mongodb.com/products/platform/atlas-app-services).<br/> Actions in the signed out state are available through the [AppProvider](https://github.com/extra-salty/ledMatrixMapper/blob/25094f2bb12f9bbc122cad2c4c7cec10b9018369/client/src/providers/AppProvider/AppProvider.tsx) context, and in signed in state through the
[UserProvider](https://github.com/extra-salty/ledMatrixMapper/blob/25094f2bb12f9bbc122cad2c4c7cec10b9018369/client/src/providers/UserProvider/UserProvider.tsx) context. User sessions handled with access and refresh tokens.

#### Available Authentication Providers:

- [Email/Password](https://www.mongodb.com/docs/atlas/device-sdks/web/manage-email-password-users/): A user account associated with an email/password combination. New user email confirmation and password reset actions are handled with the built-in email confirmation method with unique token query parameters for identification.
  - [Registration](https://github.com/extra-salty/ledMatrixMapper/blob/25094f2bb12f9bbc122cad2c4c7cec10b9018369/client/src/components/user/forms/RegisterForm/RegisterForm.tsx)
  - [Email confirmation](https://github.com/extra-salty/ledMatrixMapper/blob/25094f2bb12f9bbc122cad2c4c7cec10b9018369/client/src/components/user/ConfirmResult/ConfirmResult.tsx)
  - [Login](https://github.com/extra-salty/ledMatrixMapper/blob/25094f2bb12f9bbc122cad2c4c7cec10b9018369/client/src/components/user/login/InternalLoginProvider/InternalLoginProvider.tsx)
  - [Password reset](https://github.com/extra-salty/ledMatrixMapper/blob/25094f2bb12f9bbc122cad2c4c7cec10b9018369/client/src/components/user/forms/PasswordResetForm/PasswordResetForm.tsx)
  - [New password confirmation](https://github.com/extra-salty/ledMatrixMapper/blob/25094f2bb12f9bbc122cad2c4c7cec10b9018369/client/src/components/user/forms/NewPasswordForm/NewPasswordForm.tsx)
- [Google](https://www.mongodb.com/docs/atlas/device-sdks/web/authenticate/#google-authentication): A user is able to link their Google Account to the app and use it for authentication with the [Google One Tap](https://developers.google.com/identity/gsi/web/guides/display-google-one-tap) library through the [GoogleLoginProvider](https://github.com/extra-salty/ledMatrixMapper/blob/25094f2bb12f9bbc122cad2c4c7cec10b9018369/client/src/components/user/login/GoogleLoginProvider/GoogleLoginProvider.tsx).

## 2.3 State Management

- ### Local State:

  - Synchronous logic is handled by React built in state hooks.
  - Asynchronous logic with loading and error state is handled by [SWR](https://swr.vercel.app/):
    - actions that are called on render are using the useSWR hook, [example](https://github.com/extra-salty/ledMatrixMapper/blob/1a9be8b062271d1276f506a154f777aa4d3673fb/client/src/components/user/ConfirmResult/ConfirmResult.tsx).
    - actions that are called on user interaction are using the useSWRMutation hook, [example](https://github.com/extra-salty/ledMatrixMapper/blob/1a9be8b062271d1276f506a154f777aa4d3673fb/client/src/components/user/forms/RegisterForm/RegisterForm.tsx).

- ### Global State:

  [Global State](https://github.com/extra-salty/ledMatrixMapper/tree/25094f2bb12f9bbc122cad2c4c7cec10b9018369/client/src/libs/redux) is handled by [Redux Toolkit](https://redux-toolkit.js.org/) and available through the [StateProvider](https://github.com/extra-salty/ledMatrixMapper/blob/25094f2bb12f9bbc122cad2c4c7cec10b9018369/client/src/providers/StateProvider/StateProvider.tsx) context.

  - Synchronous logic is handled with the reducer functions generated by the individual [slices](https://github.com/extra-salty/ledMatrixMapper/tree/25094f2bb12f9bbc122cad2c4c7cec10b9018369/client/src/libs/redux/features).
  - Asynchronous logic with loading and error state are handled by [Async Thunk](https://redux-toolkit.js.org/usage/usage-guide#async-requests-with-createasyncthunk) action creators:
    - a reference to the [DatabaseProvider](#database) is passed down as an [extra argument](https://github.com/extra-salty/ledMatrixMapper/blob/25094f2bb12f9bbc122cad2c4c7cec10b9018369/client/src/libs/redux/store.ts#L18C1-L18C34) to the Thunk middleware, resulting in maintanable dataflow between the database and the global state.
    - RTK Query is not present because requests are made with the database own SDK wrapped inside a custom API helper, integrating it makes no benefits.

- ### State Persistence:

  The [global state](https://github.com/extra-salty/ledMatrixMapper/blob/25094f2bb12f9bbc122cad2c4c7cec10b9018369/client/src/libs/redux/reducers.ts) represents the user progress made within the app. Because of this, it's persisted in its entirety, so it can be recovered if the page refreshes or reopens when visited again.<br/>
  The state persistence is handled by [Redux-Persist](https://www.npmjs.com/package/redux-persist), and it's stored within the browser`s [local storage](https://github.com/extra-salty/ledMatrixMapper/blob/25094f2bb12f9bbc122cad2c4c7cec10b9018369/client/src/libs/redux/storage.ts).
  The persisted state is cleared from the storage if the user signs out, so it wouldn't interfere if a different user signs in.

- ### State Synchronization
  The persisted state is synchronized across browser tabs, enabling multiple monitor set-up, handled by [Redux-State-Sync](https://www.npmjs.com/package/redux-state-sync).

## 2.4 Database

User data is stored with the [MongoDB Atlas Database](https://www.mongodb.com/products/platform/atlas-database) in a serverless noSQL architecture. Data can be accessed through the Atlas Web SDK's MongoDB client. Request calls are made with the [QueryAPI](https://www.mongodb.com/docs/atlas/device-sdks/web/mongodb/) through the [DatabaseProvider](https://github.com/extra-salty/ledMatrixMapper/blob/25094f2bb12f9bbc122cad2c4c7cec10b9018369/client/src/providers/DatabaseProvider/DatabaseProvider.tsx) context.

## 2.5 User Interface and Libraries

- The UI and its interactivity are made with the **React 18** library.
- The components are mostly based on [MUI v5](https://mui.com/) in combination with custom components following the Material Design.
- The tables are created with [Material React Table](https://www.material-react-table.com/), [example](https://github.com/extra-salty/ledMatrixMapper/blob/25094f2bb12f9bbc122cad2c4c7cec10b9018369/client/src/components/home/Playlist/Playlist.tsx).
- The draggable and droppable components are made with [dnd kit](https://dndkit.com/) for React, [example](https://github.com/extra-salty/ledMatrixMapper/blob/25094f2bb12f9bbc122cad2c4c7cec10b9018369/client/src/components/home/Effect/FrameGridWrapper/FrameGridWrapper.tsx).

## 2.6 Structure

### Routes, Layouts, Context providers

- [root/](https://github.com/extra-salty/ledMatrixMapper/blob/25094f2bb12f9bbc122cad2c4c7cec10b9018369/client/src/app/layout.tsx) - Global route layout
  - [ThemeProvider](https://github.com/extra-salty/ledMatrixMapper/blob/25094f2bb12f9bbc122cad2c4c7cec10b9018369/client/src/providers/ThemeProvider/ThemeProvider.tsx) - Applies a [MUI Theme](https://github.com/extra-salty/ledMatrixMapper/blob/25094f2bb12f9bbc122cad2c4c7cec10b9018369/client/src/providers/ThemeProvider/useTheme.tsx) to the user interface.
    - [user/](https://github.com/extra-salty/ledMatrixMapper/blob/25094f2bb12f9bbc122cad2c4c7cec10b9018369/client/src/app/user/layout.tsx) - Signed out route layout with multi-page configuration:
      - [AppProvider](https://github.com/extra-salty/ledMatrixMapper/blob/25094f2bb12f9bbc122cad2c4c7cec10b9018369/client/src/providers/AppProvider/AppProvider.tsx) - Provides signed out user management actions.
        - [GoogleLoginProvider](https://github.com/extra-salty/ledMatrixMapper/blob/25094f2bb12f9bbc122cad2c4c7cec10b9018369/client/src/components/user/login/GoogleLoginProvider/GoogleLoginProvider.tsx) - Provides access to the Google One Tap authentication.
    - [home/](https://github.com/extra-salty/ledMatrixMapper/blob/25094f2bb12f9bbc122cad2c4c7cec10b9018369/client/src/app/home/layout.tsx) - Signed in route layout with single-page configuration:
      - [UserProvider](https://github.com/extra-salty/ledMatrixMapper/blob/25094f2bb12f9bbc122cad2c4c7cec10b9018369/client/src/providers/UserProvider/UserProvider.tsx) - Provides signed in user management actions and session.
        - [DatabaseProvider](https://github.com/extra-salty/ledMatrixMapper/blob/25094f2bb12f9bbc122cad2c4c7cec10b9018369/client/src/providers/DatabaseProvider/DatabaseProvider.tsx) - Provides access and CRUD operations to the database
          - [LocalizationProvider](https://mui.com/x/api/date-pickers/localization-provider/) - Localication based on the user's locale for components that handle dates and times.
            - [StateProvider](https://github.com/extra-salty/ledMatrixMapper/blob/25094f2bb12f9bbc122cad2c4c7cec10b9018369/client/src/providers/StateProvider/StateProvider.tsx) - Provides the global state.
              - [ThemeProviderWrapper](https://github.com/extra-salty/ledMatrixMapper/blob/25094f2bb12f9bbc122cad2c4c7cec10b9018369/client/src/providers/ThemeProvider/ThemeProviderWrapper.tsx) - Acquires the theme mode selected by the user.
                - [ThemeProvider](https://github.com/extra-salty/ledMatrixMapper/blob/25094f2bb12f9bbc122cad2c4c7cec10b9018369/client/src/providers/ThemeProvider/ThemeProvider.tsx) - Reapplies the theme selected by the user.

### Misc. routes:

- [error](https://github.com/extra-salty/ledMatrixMapper/blob/25094f2bb12f9bbc122cad2c4c7cec10b9018369/client/src/app/error.tsx): Error window that handles unexpected runtime errors. Options to refresh the page or clear the cache to solve the error.
- [loading](https://github.com/extra-salty/ledMatrixMapper/blob/25094f2bb12f9bbc122cad2c4c7cec10b9018369/client/src/app/loading.tsx): Displays a loading indictor to the user that some data is being fetched or some operation is being performed, and they need to wait.
- [not-found](https://github.com/extra-salty/ledMatrixMapper/blob/25094f2bb12f9bbc122cad2c4c7cec10b9018369/client/src/app/not-found.tsx): Not-found window is displayed when the server doesn't find a matching route for the requested URL. Option to reroute to home/login route.

# 3. Hardware

- The 'brain' of the device is an ESP32 microcontroller. Its role includes controlling several other modules of the device and establishing a connection with the web app through WI-FI, using HTTP and WebSocket protocol.
- The device CAD is constructed with Onshape and 3D printed using a Creality Ender 3 V2 printer.
  The 3D representation can be seen here: [Onshape](https://cad.onshape.com/documents/4604ff47bb3fefabcff9ad3e/w/4bb2ac810232bce12ef560a2/e/d9e19047e28542bd3fb74dc6)

## Inspired by:

- https://www.youtube.com/watch?v=64X5sJJ4YKM&ab_channel=Cine-Lights
- https://www.youtube.com/watch?v=_3DFLblpgec&ab_channel=ExcitingCreations
- https://www.youtube.com/watch?v=PfRFWxaPOLY&ab_channel=3DMakerNoob
