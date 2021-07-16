export async function getData(userName) {
  const response = await fetch(`https://api.github.com/users/${userName}`);
  const isAuthenticated = await response.ok;
  return isAuthenticated;
}

export default async function handler(req, res) {
  const isAuthenticated = await getData();
  res.status(200).json({ isAuthenticated });
}
