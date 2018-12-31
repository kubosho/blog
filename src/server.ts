import * as contentful from 'contentful';

const client = contentful.createClient({
  space: '',
  accessToken: '',
});

client
  .getEntries()
  .then(res => console.log(res.items))
  .catch(err => console.log(err));
