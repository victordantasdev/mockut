import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Seguidores() {
  const router = useRouter();
  const { name } = router.query;
  const [seguidores, setSeguidores] = useState([]);
  useEffect(_ => {
    fetch(`/api/seguidores?name=${name}`)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        throw new Error(res.status + ' - Deu ruim :(');
      })
      .then(seguidores => setSeguidores(seguidores.seguidores))
      .catch(err => console.error(err));
  }, []);

  console.log(name);

  return (
    <>
      <h1>Pág de Seguidores</h1>
      {/* {console.log(seguidores.map(i => i.login))} */}
      {seguidores.map((seguidor, index) => {
        return <p key={`key-${index}-${seguidor}`}>seg: {seguidor.login}</p>;
      })}
    </>
  );
}
