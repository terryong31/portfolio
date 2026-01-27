import { Timeline } from "@/components/ui/timeline";
import qiu1 from './assets/qiu/1.jpg';
import qiu2 from './assets/qiu/2.jpg';
import qiu3 from './assets/qiu/3.jpg';
import texchem1 from './assets/texchem/1.jpeg';
import hack1 from './assets/hackathons/1.jpg';
import hack2 from './assets/hackathons/2.jpg';
import hack3 from './assets/hackathons/3.jpg';
import hack4 from './assets/hackathons/4.jpeg';
import paynet1 from './assets/paynet/1.jpg';
import paynet2 from './assets/paynet/2.jpg';
import paynet3 from './assets/paynet/3.jpg';
import gtbot1 from './assets/gt-bot/1.png';
import gtbot2 from './assets/gt-bot/2.png';
import gtbot3 from './assets/gt-bot/3.png';
import negolah1 from './assets/negolah/1.png';
import negolah2 from './assets/negolah/2.png';
import negolah3 from './assets/negolah/3.png';
import negolah4 from './assets/negolah/4.png';

export function TimelineDemo() {
    const data = [
        {
            title: "2022",
            content: (
                <div>
                    <p className="mb-8 text-xs font-normal text-neutral-200 md:text-sm">
                        Started my journey as a CS student at Quest International University
                    </p>
                    <p className="mb-8 text-xs font-normal text-neutral-200 md:text-sm">
                        I was the jr. advisor for music club, performing as the lead guitarist & bassist
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                        <img
                            src={qiu1.src}
                            alt="University orientation"
                            width={500}
                            height={500}
                            className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
                        />
                        <img
                            src={qiu2.src}
                            alt="University event"
                            width={500}
                            height={500}
                            className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
                        />
                        <img
                            src={qiu3.src}
                            alt="Music club performance"
                            width={500}
                            height={500}
                            className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
                        />
                    </div>
                </div>
            ),
        },
        {
            title: "2025",
            content: (
                <div>
                    <p className="mb-8 text-xs font-normal text-neutral-200 md:text-sm">
                        I started my internship journey at <a href="https://texchemgroup.com" target="_blank"><u>Texchem</u></a> as an IT infrastructure intern
                    </p>
                    <p className="mb-8 text-xs font-normal text-neutral-200 md:text-sm">
                        I learned how MNC handles their ERP system for over 5 thousand employees, disaster recovery, networking and cloud infrastructure
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                        <img
                            src={texchem1.src}
                            alt="Internship workspace"
                            width={500}
                            height={500}
                            className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
                        />
                    </div>
                    <div className="mb-16"></div>
                    <p className="mb-8 text-xs font-normal text-neutral-200 md:text-sm">
                        I created <a href="https://nego-lah.terryong.me" target="_blank"><u>Nego-lah</u></a>. An AI-powered e-commerce platform to sell your items without hassles
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                        <img
                            src={negolah1.src}
                            alt="Nego-lah landing page"
                            width={500}
                            height={500}
                            className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
                        />
                        <img
                            src={negolah2.src}
                            alt="Nego-lah item page"
                            width={500}
                            height={500}
                            className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
                        />
                        <img
                            src={negolah3.src}
                            alt="Nego-lah chat page"
                            width={500}
                            height={500}
                            className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
                        />
                        <img
                            src={negolah4.src}
                            alt="Nego-lah chat page"
                            width={500}
                            height={500}
                            className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
                        />
                    </div>

                    <div className="mb-16"></div>

                    <p className="mb-8 text-xs font-normal text-neutral-200 md:text-sm">
                        I also created <a href="https://gt-bot.terryong.me" target="_blank"><u>GT-Bot</u></a>. An AI-powered telegram bot to handle your Google workspace tasks with a single prompt
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                        <img
                            src={gtbot1.src}
                            alt="GT-Bot landing page"
                            width={500}
                            height={500}
                            className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
                        />
                        <img
                            src={gtbot2.src}
                            alt="GT-Bot telegram page"
                            width={500}
                            height={500}
                            className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
                        />
                        <img
                            src={gtbot3.src}
                            alt="GT-Bot chatting example"
                            width={500}
                            height={500}
                            className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
                        />
                    </div>
                    <div className="mb-16"></div>

                    <p className="mb-4 text-xs font-normal text-neutral-200 md:text-sm">
                        I was one of the participants of the PayNet Program AKAR
                    </p>
                    <p className="mb-8 text-xs font-normal text-neutral-200 md:text-sm">
                        I learned valuable skills like Azure AI in FinTech, anti-corruption policies, and even participated in an ideathon where we brainstorm on ideas to bring FinTech into rural areas
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                        <img
                            src={paynet1.src}
                            alt="Paynet 1"
                            width={500}
                            height={500}
                            className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
                        />
                        <img
                            src={paynet2.src}
                            alt="Paynet 2"
                            width={500}
                            height={500}
                            className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
                        />
                        <img
                            src={paynet3.src}
                            alt="Paynet 3"
                            width={500}
                            height={500}
                            className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
                        />
                    </div>

                    <div className="mb-8"></div>
                    <div>
                        <p className="mb-4 text-xs font-normal text-neutral-200 md:text-sm">
                            Hackathons I&apos;ve attended:
                        </p>
                        <div className="mb-8">
                            <div className="flex items-center gap-2 text-xs text-neutral-300 md:text-sm">
                                Student Winner - ASEAN AI Malaysia Summit 2025 Code Fest
                            </div>
                            <div className="flex items-center gap-2 text-xs text-neutral-300 md:text-sm">
                                1st Runner Up - CIMB x Microsoft Data Science & Gen AI Hackathon 2025
                            </div>
                            <div className="flex items-center gap-2 text-xs text-neutral-300 md:text-sm">
                                Finalist - InnoJam Gen AI Hackathon 2025
                            </div>
                            <div className="flex items-center gap-2 text-xs text-neutral-300 md:text-sm">
                                Participant - Great Malaysia AI Hackathon 2025
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <img
                                src={hack1.src}
                                alt="Hackathon event 1"
                                width={500}
                                height={500}
                                className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
                            />
                            <img
                                src={hack2.src}
                                alt="Hackathon event 2"
                                width={500}
                                height={500}
                                className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
                            />
                            <img
                                src={hack3.src}
                                alt="Hackathon event 3"
                                width={500}
                                height={500}
                                className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
                            />
                            <img
                                src={hack4.src}
                                alt="Hackathon event 4"
                                width={500}
                                height={500}
                                className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
                            />
                        </div>
                    </div>
                </div >

            ),
        },
    ];
    return (
        <div className="relative w-full overflow-clip">
            <Timeline data={data} />
        </div>
    );
}
