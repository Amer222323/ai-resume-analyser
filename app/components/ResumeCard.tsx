import React from 'react';
import {Link} from "react-router";
import {resumes} from "../../constants";
import ScoreCircle from "~/components/ScoreCircle";

const ResumeCard = ({resume :{id,companyName,jobTitle,feedback,imagePath}}:{resume : Resume}) => {
  return <Link to={`resume/${id}`} className="resume-card animate-in fade-in duration-2500">
      <div className="resume-card-header px-8">
      <div className="flex flex-col gap-2">
          <h2 className=" font-bold break-words text-gradient !text-pretty">
              {companyName}
          </h2>
          <h3 className="text-lg break-words text-gray-500">
              {jobTitle}
          </h3>
      </div>
      <div className="flex-shrink-0">
          <ScoreCircle score={feedback.overallScore}></ScoreCircle>
      </div>
  </div>
      <div className="gradient-border animate-in fade-in duration-1000">
          <div className="w-full h-full">
              <img
                  src={imagePath}
                  alt={"Resume"}
                  className="w-full h-[350px] max-sm:h-[225 px] object-cover object-top border-8"
              />
          </div>
      </div>
  </Link>
};

export default ResumeCard;
