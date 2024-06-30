import { UploadButton } from "./UploadButton";
import { VideoCardsHorizontal, VideoCardsUpload } from "./VideoCards";

export interface Column {
    header: string;
    accessor: keyof Data; 
  }
  
  export interface Data {
    [key: string]: string | number | any; 
  }

  function formatDate(dateString:string) {
    const date = new Date(dateString);
  
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options as any);
  }
  

  
  

export function Table({ videosInfo, onClickEdit, onClickDelete }:{ videosInfo:any, onClickEdit:(key:string)=>void, onClickDelete:(key:string)=>void }) {
    
    const columns: Column[] = [
        { header: 'Video', accessor: 'video' },
        { header: 'Date', accessor: 'date' },
        { header: 'Views', accessor: 'views' },
        { header: 'Likes vs dislikes', accessor: 'likes_vs_dislikes' },
      ];
      console.log(videosInfo)
      const data: Data[] = [];

      videosInfo?.map((video:any)=>{
        data.push({ video: <VideoCardsUpload videoId={video.id} videoTitle={video.title} videoDescription={video.description} thumbnail={video.thumbnailUrl} onClickEdit={onClickEdit} onClickDelete={onClickDelete} />, date: formatDate(video.createdAt), views: video.views, likes_vs_dislikes: `${video.likeCount} / ${video.dislikeCount}` })
      })
      return (
        <>
        {data.length > 0 ? 
        
        <div className="relative overflow-x-auto shadow-sm sm:rounded-lg">
          <table className="w-full text-sm text-left">
            <thead className="text-sm font-thin">
              <tr>
                {columns.map((column) => (
                  <th
                    key={column.accessor as string}
                    className={`px-2 py-2 sm:px-4 sm:py-3 ${column.accessor === 'video' ? 'w-7/12' : 'w-auto'}`}
                  >
                    {column.header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, rowIndex) => (
                <tr key={rowIndex} className="bg-white border-b hover:bg-gray-50">
                  {columns.map((column) => (
                    <td
                      key={column.accessor as string}
                      className="px-2 py-2 sm:px-4 sm:py-4"
                    >
                      {row[column.accessor]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          
        </div>
    : 
    <div className="items-center justify-center flex h-screen">
        <UploadButton />
    </div>
    
    
    }
    </>
      );
};

