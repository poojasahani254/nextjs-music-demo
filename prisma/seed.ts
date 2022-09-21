import { PrismaClient } from "@prisma/client";
import Bcrypt from "bcrypt";
import { artistsData } from "./artistsData";

const prisma = new PrismaClient();

const run = async () => {
  await Promise.all(
    artistsData.map(async (artist) => {
      return prisma.artist.upsert({
        where: { name: artist.name },
        update: {},
        create: {
          name: artist.name,
          photo: artist.photo,
          songs: {
            create: artist.songs.map((song) => ({
              name: song.name,
              duration: song.duration,
              url: song.url,
            })),
          },
        },
      });
    })
  );

  const salt = Bcrypt.genSaltSync();
  const password = Bcrypt.hashSync("password", salt);
  const user = await prisma.user.upsert({
    where: { email: "test@gmail.com" },
    update: {},
    create: {
      email: "test@gmail.com",
      password: password,
      firstName: "test",
      lastName: "test",
    },
  });

  // const songs = await prisma.songs.findMany({});
  // await Promise.all(
  //   new Array(10).fill(1).map(async (_, i) => {
  //     return prisma.playlist.create({
  //       data: {
  //         name: `Playlist #${i + 1}`,
  //         user: {
  //           connect: { id: user.id },
  //         },
  //         songs: {
  //           connect: songs.map((song) => ({
  //             id: song.id,
  //           })),
  //         },
  //       },
  //     });
  //   })
  // );
};

run()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
