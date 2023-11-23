import { faker } from "@faker-js/faker";

export const generateRandomUser = (): User => {
  return {
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    username: faker.internet.userName(),
    verified: Math.random() >= 0.5,
    photo: faker.image.avatar(),
    bio: faker.person.bio(),
    link: faker.internet.url(),
  };
};
