import wAxios from './wrapper';

const axios = wAxios('worktime');

export async function load()
{
  const { data } = await axios('list').get('/dashboard/worktime');
  return data;
}

export async function update(data)
{
  await axios('update').post('/dashboard/worktime', data);
}