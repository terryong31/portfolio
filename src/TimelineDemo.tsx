import { Timeline } from "@/components/ui/timeline";
import qiu1 from '@/assets/qiu/1.JPG';
import qiu2 from '@/assets/qiu/2.JPG';
import qiu3 from '@/assets/qiu/3.JPG';
import texchem1 from '@/assets/texchem/1.jpeg';
import hack1 from '@/assets/hackathons/1.jpg';
import hack2 from '@/assets/hackathons/2.jpg';
import hack3 from '@/assets/hackathons/3.JPG';
import hack4 from '@/assets/hackathons/4.jpeg';

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
                            src={qiu1}
                            alt="University orientation"
                            width={500}
                            height={500}
                            className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
                        />
                        <img
                            src={qiu2}
                            alt="University event"
                            width={500}
                            height={500}
                            className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
                        />
                        <img
                            src={qiu3}
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
                        I started my internship journey at <a href="https://texchem.com">Texchem</a> as an IT infrastructure intern
                    </p>
                    <p className="mb-8 text-xs font-normal text-neutral-200 md:text-sm">
                        I learned how MNC handles their ERP system for over 5 thousand employees, disaster recovery, networking and cloud infrastructure
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                        <img
                            src={texchem1}
                            alt="Internship workspace"
                            width={500}
                            height={500}
                            className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
                        />
                    </div>
                </div>
            ),
        },
        {
            title: "End of 2025",
            content: (
                <div>
                    <p className="mb-4 text-xs font-normal text-neutral-200 md:text-sm">
                        List of hackathons I&apos;ve attended:
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
                            src={hack1}
                            alt="Hackathon event 1"
                            width={500}
                            height={500}
                            className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
                        />
                        <img
                            src={hack2}
                            alt="Hackathon event 2"
                            width={500}
                            height={500}
                            className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
                        />
                        <img
                            src={hack3}
                            alt="Hackathon event 3"
                            width={500}
                            height={500}
                            className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
                        />
                        <img
                            src={hack4}
                            alt="Hackathon event 4"
                            width={500}
                            height={500}
                            className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
                        />
                    </div>
                </div>
            ),
        },
    ];
    return (
        <div className="relative w-full overflow-clip">
            <Timeline data={data} />
        </div>
    );
}
