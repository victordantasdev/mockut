import { useState } from 'react';
import { setCookie, parseCookies } from 'nookies';
import Box from '../src/components/Box';
import MainGrid from '../src/components/MainGrid';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';
import {
  AlurakutMenu,
  AlurakutProfileSidebarMenuDefault,
  OrkutNostalgicIconSet,
} from '../src/lib/AlurakutCommons';

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

export default function Home(props) {
  const [comunidades, setComunidades] = useState(
    props.arrComunidades.length == 0 ? [] : props.arrComunidades
  );
  const userName = 'joaovictordantasj';
  const pessoasFavoritas = [
    'juunegreiros',
    'omariosouto',
    'peas',
    'devmozao',
    'rafaballerini',
    'marcobrunodev',
    'felipefialho',
  ];

  setCookie(null, 'COMUNIDADES', JSON.stringify(comunidades), {
    maxAge: 86400 * 7,
    path: '/',
  });

  return (
    <>
      <AlurakutMenu githubUser={userName} />
      <MainGrid>
        <div className='profileArea' style={{ gridArea: 'profileArea' }}>
          <ProfileSideBar githubUser={userName} />
        </div>

        <div className='welcomeArea' style={{ gridArea: 'welcomeArea' }}>
          <Box>
            <h1 className='title'>Bem Vindo (a), {userName}</h1>
            <OrkutNostalgicIconSet />
          </Box>

          <Box>
            <h2 className='subTitle'>O que você deseja fazer?</h2>
            <form
              onSubmit={e => {
                e.preventDefault();
                const dadosDoForm = new FormData(e.target);

                const comunidade = {
                  id: new Date().toISOString,
                  title: dadosDoForm.get('title'),
                  image: dadosDoForm.get('image'),
                };

                setComunidades([...comunidades, comunidade]);
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
          <ProfileRelationsBoxWrapper>
            <h2 className='smallTitle'>
              Pessoas da comunidade{' '}
              <span style={{ color: '#2E7BB4' }}>
                ({pessoasFavoritas.length})
              </span>
            </h2>
            <ul>
              {pessoasFavoritas.map((pessoa, i) => {
                if (i < 6) {
                  return (
                    <li key={`key-${i}-${pessoa}`}>
                      <a href={`https://github.com/${pessoa}`} target='_blank'>
                        <img
                          src={`https://github.com/${pessoa}.png`}
                          alt={`Foto de perfil de ${pessoa}`}
                        />
                        <span>{pessoa}</span>
                      </a>
                    </li>
                  );
                }

                return;
              })}
            </ul>
            <hr />
          </ProfileRelationsBoxWrapper>

          <ProfileRelationsBoxWrapper>
            <h2 className='smallTitle'>
              Comunidades{' '}
              <span style={{ color: '#2E7BB4' }}>({comunidades.length})</span>
            </h2>
            <ul>
              {comunidades.map((comunidade, i) => {
                if (i < 7) {
                  return (
                    <li key={`key-${i}-${comunidade.id}`}>
                      <a href={comunidade.image} target='_blank'>
                        <img
                          src={comunidade.image}
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
          </ProfileRelationsBoxWrapper>
        </div>
      </MainGrid>
    </>
  );
}

export async function getServerSideProps(context) {
  const cookies = parseCookies(context);
  const arrComunidades =
    Object.keys(cookies).length === 0 && cookies.constructor === Object
      ? []
      : JSON.parse(cookies.COMUNIDADES);

  return {
    props: {
      arrComunidades,
    },
  };
}
