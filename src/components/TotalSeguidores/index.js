import { useEffect, useState } from 'react';

export default function TotalSeguidores({ userName }) {
  const [totalSeguidores, setTotalSeguidores] = useState([]);

  useEffect(_ => {
    fetch(`https://api.github.com/users/${userName}/followers?&per_page=100`)
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        throw new Error(res.status);
      })
      .then(respostaCompleta => setTotalSeguidores(respostaCompleta))
      .catch(err => console.error(err));
  }, []);

  return totalSeguidores.length;
}
