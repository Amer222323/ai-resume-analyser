import type { Route } from "./+types/home";
import Navbar from "~/components/Navbar";
import {resumes} from "../../constants";
import {callback} from "fdir/dist/api/async";
import ResumeCard from "~/components/ResumeCard";
import {usePuterStore} from "~/lib/puter";
import {useLocation, useNavigate} from "react-router";
import {useEffect} from "react";


export function meta({}: Route.MetaArgs) {
  return [
    { title: "Resumind" },
    { name: "description", content: "maybe you are not the problem but your Resume is" },
  ];
}

export default function Home() {
    const {auth } = usePuterStore();
    const location = useLocation();

    const navigate = useNavigate();
    useEffect(()=>{
        if(!auth.isAuthenticated) navigate('auth?next=/');

    }, [auth.isAuthenticated]);
  return <main className="bg-[url('/images/bg-main.svg')] bg-cover">
      <Navbar></Navbar>
<section className="main-section ">
    <div className="page-heading py-10">
        <h1>track your Resume & get lovely feedback</h1>
        <h2>the software is build so you know how good or bad ur Resume is, maybe u r not the problem!! ;)</h2>
    </div>

      {resumes.length > 0 &&(
          <div className="resumes-section px-10">
              {resumes.map((resume) => (
                  <ResumeCard key={resume.id} resume={resume}></ResumeCard>
              ))}
          </div>
      )}
</section>
  </main>

}
