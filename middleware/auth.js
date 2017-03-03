export default function ({ store, redirect, error }) {
  // if user not connected, redirect to /
  if (!store.state.authUser) {
    // return redirect('/')
    error({
      message: 'Sie sind nicht angemeldet',
      statusCode: 403
    })
  }
}
