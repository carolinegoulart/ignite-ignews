import { NextApiRequest, NextApiResponse } from 'next';

// arrow function
export default (request: NextApiRequest, response: NextApiResponse) => {
  const users = [
    { id: 1, name: 'Diego' },
    { id: 2, name: 'Dani' },
    { id: 3, name: 'Rafa' }
  ]

  return response.json(users);
}