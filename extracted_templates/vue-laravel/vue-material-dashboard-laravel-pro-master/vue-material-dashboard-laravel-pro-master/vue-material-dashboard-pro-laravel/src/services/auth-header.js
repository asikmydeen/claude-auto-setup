export default function authHeader() {
  let user = JSON.parse(localStorage.getItem('user'));
  if (user) {
    return { Authorization: 'Bearer ' + user, 
              'Accept' : 'application/vnd.api+json',
            'Content-Type': 'application/vnd.api+json'};
  } else {
    return {};
  }
}