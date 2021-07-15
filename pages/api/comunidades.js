import { SiteClient } from 'datocms-client';

export default async function recebedorDeRequests(req, res) {
  if (req.method == 'POST') {
    const client = new SiteClient(process.env.DATO_CMS_TOKEN);

    const registroCriado = await client.items.create({
      itemType: '966374',
      ...req.body,
      // title: 'Comunidade Teste',
      // imageUrl: 'http://github.com/peas.png',
      // creatorSlug: 'joaovictordantasj',
    });

    res.json({
      registroCriado: registroCriado,
    });

    return;
  }

  res.status(404).json({
    message: 'Ainda não temos nada no GET!',
  });
}
