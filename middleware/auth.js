export default function ({ store, redirect, error }) {
  // if user not connected, redirect to /
  if (!store.state.auth.authUser) {
    // return redirect('/')
    error({
      message: 'Sie sind nicht angemeldet', // TODO: in English please!
      statusCode: 403
    })
  }
}
