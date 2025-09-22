import React, {useEffect, useState} from 'react';
import {Link} from "react-router";
import {resumes} from "../../constants";
import ScoreCircle from "~/components/ScoreCircle";
import {usePuterStore} from "~/lib/puter";

const ResumeCard = ({resume :{id,companyName,jobTitle,feedback,imagePath}}:{resume : Resume}) => {
    const [resumeUrl, setResumeUrl] = useState("");
    const { fs } = usePuterStore();
    useEffect(() => {
        const loadResume=async ()=>{
            const blob= await fs.read(imagePath);
            if (!blob) return;
            let url=URL.createObjectURL(blob);
            setResumeUrl(url);
        }
        loadResume();
    }, [imagePath]);
  return <Link to={`resume/${id}`} className="resume-card animate-in fade-in duration-2500">
      <div className="resume-card-header px-8">
      <div className="flex flex-col gap-2">
          {companyName && <h2 className=" font-bold break-words text-gradient !text-pretty">
              {companyName}
          </h2> }
          {jobTitle && <h3 className="text-lg break-words text-gray-500">
              {jobTitle}
          </h3>}
          {!companyName && jobTitle && <h2 className="!text-black font-bold">Resume</h2>}
      </div>
      <div className="flex-shrink-0">
          <ScoreCircle score={feedback.overallScore}></ScoreCircle>
      </div>
  </div>
      {resumeUrl && (<div className="gradient-border animate-in fade-in duration-1000">
          <div className="w-full h-full">
              <img
                  src={resumeUrl}
                  alt={"Resume"}
                  className="w-full h-[350px] max-sm:h-[225 px] object-cover object-top border-8"
              />
          </div>
      </div>
          )}

  </Link>
};

export default ResumeCard;
