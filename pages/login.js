import React, { useState } from 'react';
import { useRouter } from 'next/router';
import nookies from 'nookies';
import { getData } from './api/auth';

export default function LoginScreen() {
  const [userName, setUserName] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  return (
    <main
      style={{
        display: 'flex',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* {console.log(userName)} */}
      <div className='loginScreen'>
        <section className='logoArea'>
          <img src='https://alurakut.vercel.app/logo.svg' />

          <p>
            <strong>Conecte-se</strong> aos seus amigos e familiares usando
            recados e mensagens instantâneas
          </p>
          <p>
            <strong>Conheça</strong> novas pessoas através de amigos de seus
            amigos e comunidades
          </p>
          <p>
            <strong>Compartilhe</strong> seus vídeos, fotos e paixões em um só
            lugar
          </p>
        </section>

        <section className='formArea'>
          <form
            className='box'
            onSubmit={async e => {
              e.preventDefault();

              const isAuthenticated = await getData(userName);
              console.log(isAuthenticated);

              if (!isAuthenticated) {
                return setError(
                  'Esse usuário não existe na base de dados do GitHub, por favor verifique o nome digitado e tente novamente!'
                );
              }

              return fetch('https://alurakut.vercel.app/api/login', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ githubUser: userName }),
              }).then(async res => {
                const resData = await res.json();
                const token = resData.token;
                nookies.set(null, 'USER_TOKEN', token, {
                  path: '/',
                  maxAge: 86400 * 7,
                });
                router.push('/');
              });
            }}
          >
            <p>
              Acesse agora mesmo com seu usuário do <strong>GitHub</strong>!
            </p>
            <input
              placeholder='Usuário'
              value={userName}
              onChange={e => setUserName(e.target.value)}
              required
            />
            <button type='submit'>Login</button>
            <p style={{ color: '#ff5555', marginTop: '10px' }}>{error}</p>
          </form>

          <footer className='box'>
            <p>
              Ainda não é membro? <br />
              <a href='/login'>
                <strong>ENTRAR JÁ</strong>
              </a>
            </p>
          </footer>
        </section>

        <footer className='footerArea'>
          <p>
            © 2021 alura.com.br - <a href='/'>Sobre o Orkut.br</a> -{' '}
            <a href='/'>Centro de segurança</a> - <a href='/'>Privacidade</a> -{' '}
            <a href='/'>Termos</a> - <a href='/'>Contato</a>
          </p>
        </footer>
      </div>
    </main>
  );
}
