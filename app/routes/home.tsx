import type { Route } from "./+types/home";
import Navbar from "~/components/Navbar";

import {callback} from "fdir/dist/api/async";
import ResumeCard from "~/components/ResumeCard";
import {usePuterStore} from "~/lib/puter";
import {Link, useNavigate} from "react-router";
import {useEffect, useState} from "react";
import resume from "~/routes/resume";


export function meta({}: Route.MetaArgs) {
  return [
    { title: "Resumind" },
    { name: "description", content: "maybe you are not the problem but your Resume is" },
  ];
}

export default function Home() {
    const {auth , kv } = usePuterStore();

    const navigate = useNavigate();
    const [resumes, setResumes] = useState<Resume[]>([]);
    const [loadingResumes, setLoadingResumes] = useState(false);

    useEffect(() => {
        const loadResumes=async ()=> {
            setLoadingResumes(true);

            const resumes = (await kv.list('resume:*', true)) as KVItem[];
            const parsedResumes= resumes?.map(resume=> (
                JSON.parse(resume.value) as Resume
            ))
            console.log("parsedReusmes",parsedResumes);
            setResumes(parsedResumes || []);
            setLoadingResumes(false);
        }
        loadResumes();

    }, []);
    useEffect(()=>{
        if(!auth.isAuthenticated) navigate('auth?next=/');

    }, [auth.isAuthenticated]);
  return <main className="bg-[url('/images/bg-main.svg')] bg-cover">
      <Navbar></Navbar>
<section className="main-section ">
    <div className="page-heading py-10">
        <h1>track your Resume & get lovely feedback</h1>
        {!loadingResumes && resumes?.length === 0 ? ( <h2>no Resume found , Upload your first Resume to get feedback.</h2>): (
            <h2>Review ur Submissions and check AI-powered feedback</h2>
        )}
    </div>
    {loadingResumes && (
        <div className="flex flex-col items-center justify-center">
            <img src="/images/resume-scan-2.gif" className="w-[200px]"/>
        </div>
    )}

      {!loadingResumes && resumes.length > 0 &&(
          <div className="resumes-section px-10">
              {resumes.map((resume) => (
                  <ResumeCard key={resume.id} resume={resume}></ResumeCard>
              ))}
          </div>
      )}

    {!loadingResumes && resumes?.length === 0 && (
        <div className="flex flex-col items-center justify-center mt-10 gap-4">
            <Link to="/upload" className="primary-button w-fit text-xl font-semibold">
                Upload Resume
            </Link>
        </div>
    )}
</section>
  </main>

}
