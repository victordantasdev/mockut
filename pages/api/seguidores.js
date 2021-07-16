export default async function DadosSeguidores(req, res) {
  const headers = {
    Authorization: `Token ${process.env.GITHUB_TOKEN}`,
  }; // API GitHub Followers

  console.log(req);

  await fetch(
    `https://api.github.com/users/${req.body.userName}/followers?&per_page=100`,
    {
      method: 'GET',
      headers: headers,
    }
  )
    .then(response => {
      if (response.ok) {
        return response.json();
      }

      throw new Error(response.status);
    })
    .then(seguidores => res.json({ seguidores }))
    .catch(err => console.error(err));
}
