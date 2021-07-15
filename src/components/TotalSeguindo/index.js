import { useEffect, useState } from 'react';

export default function TotalSeguindo({ userName }) {
  const [totalSeguidores, setTotalSeguidores] = useState([]);

  useEffect(_ => {
    fetch(`https://api.github.com/users/${userName}`)
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        throw new Error(res.status);
      })
      .then(respostaCompleta => setTotalSeguidores(respostaCompleta.following))
      .catch(err => console.error(err));
  }, []);

  return new Intl.NumberFormat('pt-BR', { maximumSignificantDigits: 3 }).format(
    totalSeguidores
  );
}
