// import {configureStore} from '@reduxjs/toolkit';
// import counterReducer from './features/counter/counterSlice'

// export default configureStore({
//     reducer: {
//         // posts: postsReducer,
//         // comments: commentsReducer,
//         // users: usersReducer,
//         counter: counterReducer,
//     },
// })

// export type RootState = ReturnType<typeof store.getState>
// export type AppDispatch = typeof StorageEvent.dispatch

import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './features/counter/counterSlice'

const store = configureStore({
  reducer: {
    // posts: postsReducer,
    // comments: commentsReducer,
    // users: usersReducer,
    counter: counterReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store;