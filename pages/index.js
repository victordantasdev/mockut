import { useEffect, useState } from 'react';
import Box from '../src/components/Box';
import MainGrid from '../src/components/MainGrid';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';
import {
  AlurakutMenu,
  AlurakutProfileSidebarMenuDefault,
  OrkutNostalgicIconSet,
} from '../src/lib/AlurakutCommons';
import TotalSeguidores from '../src/components/TotalSeguidores';
import TotalSeguindo from '../src/components/TotalSeguindo';

function ProfileSideBar({ githubUser }) {
  return (
    <Box as='aside'>
      <img
        src={`https://github.com/${githubUser}.png`}
        alt={`Foto de perfil de ${githubUser}`}
        style={{ borderRadius: '8px' }}
      />
      <hr />
      <p>
        <a
          className='boxLink'
          href={`https://github.com/${githubUser}`}
          target='_blank'
        >
          @{githubUser}
        </a>
      </p>
      <hr />
      <AlurakutProfileSidebarMenuDefault />
    </Box>
  );
}

function ProfileRelationsBox(props) {
  return (
    <ProfileRelationsBoxWrapper>
      <h2 className='smallTitle'>
        {props.title}{' '}
        <span style={{ color: '#2E7BB4' }}>({props.children})</span>
      </h2>
      <ul>
        {props.items.map((item, index) => {
          if (index < 6) {
            return (
              <li key={`key-${index}-${item}`}>
                <a href={`https://github.com/${item.login}`} target='_blank'>
                  <img
                    src={`https://github.com/${item.login}.png`}
                    alt={`Foto de perfil de ${item.login}`}
                  />
                  <span>
                    {item.login} (<TotalSeguidores userName={item.login} />)
                  </span>
                </a>
              </li>
            );
          }

          return;
        })}
      </ul>
      <hr />
      <a
        href='#'
        style={{
          color: '#2E7BB4',
          textDecoration: 'none',
          fontWeight: 'bold',
        }}
      >
        <span>Ver todos</span>
      </a>
    </ProfileRelationsBoxWrapper>
  );
}

export default function Home(props) {
  const [comunidades, setComunidades] = useState([]);
  const userName = 'joaovictordantasj';

  // Pegar seguidores do github
  const [seguidores, setSeguidores] = useState([]);
  const [seguindo, setSeguindo] = useState([]);
  const headers = {
    Authorization: `Token ${props.tokens.github_token}`,
  };
  useEffect(_ => {
    // API GitHub Followers
    fetch(`https://api.github.com/users/${userName}/followers?&per_page=100`, {
      method: 'GET',
      headers: headers,
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        throw new Error(res.status);
      })
      .then(respostaCompleta => setSeguidores(respostaCompleta))
      .catch(err => console.error(err));

    // API GitHub Following
    fetch(`https://api.github.com/users/${userName}/following?&per_page=100`, {
      method: 'GET',
      headers: headers,
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        throw new Error(res.status);
      })
      .then(respostaCompleta => {
        setSeguindo(respostaCompleta);
      })
      .catch(err => console.error(err));

    // API GraphQl
    fetch('https://graphql.datocms.com/', {
      method: 'POST',
      headers: {
        Authorization: props.tokens.dato_cms_token,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        query: `query {
          allCommunities {
            id,
            title,
            imageUrl,
            creatorSlug
          }
        }`,
      }),
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        throw new Error(`${res.status} - Deu Ruim`);
      })
      .then(respostaCompleta => {
        const comunidadesData = respostaCompleta.data.allCommunities;
        setComunidades(...comunidades, comunidadesData);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <>
      <AlurakutMenu toggleTheme={props.toggleTheme} githubUser={userName} />
      <MainGrid>
        <div className='profileArea' style={{ gridArea: 'profileArea' }}>
          <ProfileSideBar githubUser={userName} />
        </div>

        <div className='welcomeArea' style={{ gridArea: 'welcomeArea' }}>
          <Box>
            <h1 className='title'>Bem Vindo (a), {userName}</h1>
            <OrkutNostalgicIconSet userName={userName} />
          </Box>

          <Box>
            <h2 className='subTitle'>O que você deseja fazer?</h2>
            <form
              onSubmit={e => {
                e.preventDefault();
                const dadosDoForm = new FormData(e.target);

                const comunidade = {
                  title: dadosDoForm.get('title'),
                  imageUrl: dadosDoForm.get('image'),
                  creatorSlug: userName,
                };

                fetch('/api/comunidades', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(comunidade),
                }).then(async res => {
                  const dados = await res.json();
                  const comunidade = dados.registroCriado;
                  setComunidades([...comunidades, comunidade]);
                });
              }}
            >
              <div>
                <input
                  type='text'
                  placeholder='Qual vai ser o nome da sua comunidade?'
                  name='title'
                  aria-label='Qual vai ser o nome da sua comunidade?'
                  required
                />
              </div>

              <div>
                <input
                  type='text'
                  placeholder='Coloque uma URL para usarmos de capa'
                  name='image'
                  aria-label='Coloque uma URL para usarmos de capa'
                  required
                />
              </div>

              <button>Criar comunidade</button>
            </form>
          </Box>
        </div>

        <div
          className='profileRealationsArea'
          style={{ gridArea: 'profileRealationsArea' }}
        >
          <ProfileRelationsBox title={'Fãs'} items={seguidores}>
            <TotalSeguidores userName={userName} />
          </ProfileRelationsBox>

          <ProfileRelationsBox title={'Pessoas da comunidade'} items={seguindo}>
            <TotalSeguindo userName={userName} />
          </ProfileRelationsBox>

          <ProfileRelationsBoxWrapper>
            <h2 className='smallTitle'>
              Comunidades{' '}
              <span style={{ color: '#2E7BB4' }}>({comunidades.length})</span>
            </h2>
            <ul>
              {comunidades.map((comunidade, i) => {
                if (i < 6) {
                  return (
                    <li key={`key-${i}-${comunidade.id}`}>
                      <a href={comunidade.imageUrl} target='_blank'>
                        <img
                          src={comunidade.imageUrl}
                          alt={`Foto de perfil da comunidade ${comunidade.title}`}
                        />
                        <span>{comunidade.title}</span>
                      </a>
                    </li>
                  );
                }

                return;
              })}
            </ul>
            <hr />
            <a
              href='#'
              style={{
                color: '#2E7BB4',
                textDecoration: 'none',
                fontWeight: 'bold',
              }}
            >
              <span>Ver todos</span>
            </a>
          </ProfileRelationsBoxWrapper>
        </div>
      </MainGrid>
    </>
  );
}

export async function getServerSideProps(context) {
  const tokens = {
    github_token: process.env.GITHUB_TOKEN,
    dato_cms_token: process.env.DATO_CMS_TOKEN,
  };

  return {
    props: {
      tokens,
    },
  };
}
