'use client';
import { useEffect, useRef } from 'react';
import { animate, scroll, spring } from 'motion';
import { ReactLenis } from 'lenis/react';
import { TextAnimate } from '@/components/ui/text-animate';
import { TypingAnimation } from "@/components/ui/typing-animation";
import { Meteors } from "@/components/ui/meteors";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";

import { useRouter } from 'next/navigation';

export default function HorizontalScroll() {
  const ulRef = useRef();
 
  const navigate = useRouter();

  useEffect(() => {
    const items = document.querySelectorAll('li');

    if (ulRef.current) {
      const controls = animate(
        ulRef.current,
        {
          transform: ['none', `translateX(-${items.length - 1}00vw)`],
        },
        { easing: spring() }
      );
      scroll(controls, { target: document.querySelector('section') });
    }

    const segmentLength = 1 / items.length;
    items.forEach((item, i) => {
      const header = item.querySelector('h2');

      scroll(animate([header], { x: [800, -800] }), {
        target: document.querySelector('section'),
        offset: [
          [i * segmentLength, 1],
          [(i + 1) * segmentLength, 0],
        ],
      });
    });
  }, []);

  return (
    <ReactLenis root>
      <main>
        <article>
         
          <header className="text-white relative w-full bg-slate-950 grid place-content-center h-[100vh]">
          <Meteors number={50} />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
            <h1 className="text-5xl font-bold text-center tracking-tight">
              <TypingAnimation>
              CodeQuest: Your Ultimate Coding Adventure
              </TypingAnimation>
            </h1> 
          </header>
          <section className="h-[500vh] w-[500vw] relative">
            <ul ref={ulRef} className="flex sticky top-0">
              <li className="h-screen w-screen bg-gradient-to-r from-green-400 to-blue-500 flex flex-col justify-center items-center">
                <h2 className="text-[10vw] font-semibold text-white">
                  <span className="text-black">LEARN</span>
                </h2>
                <p className="text-lg mt-4 text-white text-center max-w-lg">
                  Begin your journey with challenges that teach foundational concepts. 
                  Build confidence with hands-on learning and detailed explanations.
                </p>
              </li>
              <li className="h-screen w-screen bg-gradient-to-r from-purple-400 to-pink-500 flex flex-col justify-center items-center">
                <h2 className="text-[10vw] font-semibold text-white">
                  <span className="text-black">SOLVE</span>
                </h2>
                <p className="text-lg mt-4 text-white text-center max-w-lg">
                  Unlock new coding problems as you solve each challenge. Progress step by step, mastering one skill at a time.
                </p>
              </li>
              <li className="h-screen w-screen bg-gradient-to-r from-yellow-400 to-orange-500 flex flex-col justify-center items-center">
                <h2 className="text-[10vw] font-semibold text-white">
                  <span className="text-black">CONNECT</span>
                </h2>
                <p className="text-lg mt-4 text-white text-center max-w-lg">
                  Join a community of coders just like you. Share solutions, discuss problems, and grow together.
                </p>
              </li>
              <li className="h-screen w-screen bg-gradient-to-r from-teal-400 to-cyan-500 flex flex-col justify-center items-center">
                <h2 className="text-[10vw] font-semibold text-white">
                  <span className="text-black">ACHIEVE</span>
                </h2>
                <p className="text-lg mt-4 text-white text-center max-w-lg">
                  Track your progress and celebrate milestones as you conquer coding challenges and level up your skills.
                </p>
              </li>
              <li className="h-screen w-[103vw]  bg-gradient-to-r from-gray-800 to-gray-900 flex flex-col justify-center items-center">
                <h2 className="text-[5vw] font-semibold text-white">
                  <span className="text-blue-400">
                    <TextAnimate animation="blurInUp" by="character">
                    WELCOME TO CODEQUEST
                    </TextAnimate>
                    </span>
                </h2>
                <span className="text-lg mt-4 text-white text-center max-w-lg">
                  <TextAnimate animation="blurInUp" by="character">
                  Your journey has just begun. Explore, learn, and grow with CodeQuest – where every problem is an adventure.
                  </TextAnimate>
                </span>
                <button className="mt-6 px-6 py-3 bg-blue-600 text-white text-lg rounded-lg shadow-lg hover:bg-blue-700" onClick={() => navigate.push('/problemset')}>
                  Get Started Now
                </button>
              </li>
            </ul>
          </section>
        </article>
        <div className="progress fixed left-0 right-0 h-2 rounded-full bg-[#0c0c29] bottom-[50px] scale-x-0"></div>
      </main>
    </ReactLenis>
  );
}



{/* <TextAnimate animation="blurInUp" by="character">
Unlock Your Coding Potential 
</TextAnimate>
<TextAnimate animation="blurInUp" by="character">
Start Your Journey with CodeQuest
</TextAnimate> */}