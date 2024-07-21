export interface VideoInfo {
    id: string;
    title: string;
    description: string;
    thumbnailUrl: string;
    createdAt: string;
    views: number;
    likeCount: number;
    dislikeCount: number;
    published: boolean;
    videoQueue: any
  }

  export interface Video {
    channelId: string;
    createdAt: string;
    description: string;
    id: string;
    playlistPath: string;
    thumbnailUrl: string;
    channel: any;
    title: string;
    updatedAt: string;
    videoPath: string;
    views: number;
    likeCount: number;
    dislikeCount: number;
}

export interface LikeDisLike {
    videoId?: string | undefined;
    likeCount: number;
    dislikeCount: number;
}

export interface LikeStatus {
    videoId: string;
    likeStatus: string;
    likeCount: number;
    dislikeCount: number;
}