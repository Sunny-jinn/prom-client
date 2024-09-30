import { Server } from '@/feature/api/index';
import { PostPick } from '../types/Post.type';

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

export type ArtworkResponse = {
  id: number;
  feedImageList: FeedImagesResponse[];
  imageUrl: string;
  name: string;
  shortFormList: PostPick[];
  userId: number;
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

const getArtworkDetail = async (artwork_id: string) => {
  const result = await Server.get(`artworks/${artwork_id}`);
  const data: ArtworkResponse = result.data.data;
  return data;
};

const deleteArtwork = async (artwork_id: string) => {
  const result = await Server.delete(`artworks/${artwork_id}`);

  return result;
};

export { getFeedsImages, postArtwork, getArtworkDetail, deleteArtwork };
