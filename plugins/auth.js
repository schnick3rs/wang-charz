// plugins/auth-login.js
export default function ({ app }) {
  app.$auth.onError((error, name, endpoint) => {
    console.error(` errorName ${name}`, error);

    if (name === 'TokenExpiredError') {
      console.info('token expired, logging out');
    }
  });
}
