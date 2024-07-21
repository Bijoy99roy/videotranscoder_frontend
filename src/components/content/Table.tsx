import { SpinLoader } from "../loaders/SpinLoader";
import { VideoInfo } from "../Model/videoModel";
import { VideoCardsUpload } from "./VideoCards";



interface TableProps {
  videosInfo: VideoInfo[] | undefined;
  onClickEdit: (key: string) => void;
  onClickDelete: (key: string) => void;
  loading: boolean
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('en-US', options as any);
}


function setQueueStatusData(videosData: VideoInfo ){
      if (videosData.videoQueue){
        return videosData.videoQueue.status
      } else {
        return ""
      }
}
export function Table({ videosInfo, onClickEdit, onClickDelete, loading=false }: TableProps) {

  // const [queueStatus, setQueueStatus] = useState<string>()

  if (!videosInfo && loading) {
    return (
      <SpinLoader />
    );
  }


  return (
    <div className="overflow-x-auto shadow-sm sm:rounded-lg">
      <table className="w-full text-sm text-left">
        <thead className="text-sm font-thin">
          <tr>
            <th className="px-2 py-2 sm:px-4 sm:py-3 w-7/12">Video</th>
            <th className="px-2 py-2 sm:px-4 sm:py-3 w-auto">Date</th>
            <th className="px-2 py-2 sm:px-4 sm:py-3 w-auto">Visibility</th>
            <th className="px-2 py-2 sm:px-4 sm:py-3 w-auto">Views</th>
            <th className="px-2 py-2 sm:px-4 sm:py-3 w-auto">Likes vs Dislikes</th>
          </tr>
        </thead>
        <tbody>
          {videosInfo && videosInfo.map((video, idx) =>{
            const queueStatus = setQueueStatusData(video)
            return (
            
              <tr key={idx} className="bg-white border-b hover:bg-gray-50">
                <td className="px-2 py-2 sm:px-4 sm:py-4">
                  <VideoCardsUpload
                    videoId={video.id}
                    videoTitle={video.title}
                    videoDescription={video.description}
                    thumbnail={video.thumbnailUrl}
                    queueStatus={queueStatus}
                    onClickEdit={onClickEdit}
                    onClickDelete={onClickDelete}
                  />
                </td>
                <td className="px-2 py-2 sm:px-4 sm:py-4">{formatDate(video.createdAt)}</td>
                <td className="px-2 py-2 sm:px-4 sm:py-4">{video.published ? "Public" : "Unlisted"}</td>
                <td className="px-2 py-2 sm:px-4 sm:py-4">{video.views}</td>
                <td className="px-2 py-2 sm:px-4 sm:py-4">{`${video.likeCount} / ${video.dislikeCount}`}</td>
              </tr>
            )
          } )}
        </tbody>
      </table>
    </div>
  );
}
