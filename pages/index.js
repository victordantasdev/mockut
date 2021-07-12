import Box from '../src/components/Box';
import MainGrid from '../src/components/MainGrid';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';
import {
  AlurakutMenu,
  OrkutNostalgicIconSet,
} from '../src/lib/AlurakutCommons';

function ProfileSideBar({ githubUser }) {
  return (
    <Box>
      <img
        src={`https://github.com/${githubUser}.png`}
        alt='Foto de perfil'
        style={{ borderRadius: '8px' }}
      />
    </Box>
  );
}

export default function Home() {
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

  return (
    <>
      <AlurakutMenu githubUser={userName} />
      <MainGrid>
        <div className='profileArea' style={{ gridArea: 'profileArea' }}>
          <ProfileSideBar githubUser={userName} />
        </div>

        <div className='welcomeArea' style={{ gridArea: 'welcomeArea' }}>
          <Box>
            <h1 className='title'>Bem Vindo (a) {userName}</h1>
            <OrkutNostalgicIconSet />
          </Box>
        </div>

        <div
          className='profileRealationsArea'
          style={{ gridArea: 'profileRealationsArea' }}
        >
          <ProfileRelationsBoxWrapper>
            <h2 className='smallTitle'>
              Pessoas da comunidade ({pessoasFavoritas.length})
            </h2>
            <ul>
              {pessoasFavoritas.map((pessoa, i) => {
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
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
          <Box>Comunidades</Box>
        </div>
      </MainGrid>
    </>
  );
}
