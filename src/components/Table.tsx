import { UploadButton } from "./UploadButton";
import { VideoCardsHorizontal, VideoCardsUpload } from "./VideoCards";

export interface Column {
    header: string;
    accessor: keyof Data; 
  }
  
  export interface Data {
    [key: string]: string | number | any; 
  }
  

export function Table() {
    
    const columns: Column[] = [
        { header: 'Video', accessor: 'video' },
        { header: 'Date', accessor: 'date' },
        { header: 'Views', accessor: 'views' },
        { header: 'Likes vs dislikes', accessor: 'likes_vs_dislikes' },
      ];
    
      const data: Data[] = [
        { video: <VideoCardsUpload />, date: "May 26, 2024", views: '2', likes_vs_dislikes: "-" },
        { video: <VideoCardsUpload />, date: "May 26, 2024", views: '2', likes_vs_dislikes: "-" },
        { video: <VideoCardsUpload />, date: "May 26, 2024", views: '2', likes_vs_dislikes: "10 / 2" },
      ];
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

