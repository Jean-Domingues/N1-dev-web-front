export function getCookie(name) {
  const cookieString = document.cookie;
  const cookies = cookieString.split('; ');

  for (let i = 0; i < cookies.length; i++) {
    const [cookieName, cookieValue] = cookies[i].split('=');

    if (cookieName === name) {
      return decodeURIComponent(cookieValue);
    }
  }

  return null;
}