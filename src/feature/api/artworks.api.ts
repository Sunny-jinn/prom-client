import { Server } from '@/feature/api/index';

export type FeedImagesResponse = {
  feedImageId: number;
  imageUrl: string;
};

export type PostArtworkRequest = {
  name: string;
  shortFormIdList: number[];
  feedImageIdList: number[];
  imageUrl: string;
};

const getFeedsImages = async () => {
  const result = await Server.get(`posts/feeds/images/my`);
  const data: FeedImagesResponse[] = result.data.data;
  console.log(data);

  return data;
};

const postArtwork = async ({
  name,
  shortFormIdList,
  feedImageIdList,
  imageUrl,
}: PostArtworkRequest) => {
  const result = Server.post(`artworks`, {
    name,
    shortFormIdList,
    feedImageIdList,
    imageUrl,
  });
  console.log(result);
};

export { getFeedsImages, postArtwork };
