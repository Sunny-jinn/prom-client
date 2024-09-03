import { wait } from '@/feature/parser/utils';
import { User } from '@/store/User';

const refreshAPI = async () => {
  const user: User = {
    email        : 'euiwang0323@gmail.com',
    nickname     : '의왕',
    profile_image: 'https://i.ibb.co/dMVY15S/image.png',
    role         : 'ARTIST',
    status       : 0,
  };
  const result = await wait(user);
  console.log(result);
  // throw new Error('error')
  return result

};

export {
  refreshAPI,
};
