import { useForm, ValidationError } from "@formspree/react";
import GlassSurface from "./GlassSurface";

export function ContactForm() {
    const [state, handleSubmit] = useForm("mwvownjz");

    if (state.succeeded) {
        return (
            <GlassSurface
                width="100%"
                height={400}
                borderRadius={20}
                displace={0.5}
                distortionScale={-180}
                redOffset={0}
                greenOffset={10}
                blueOffset={20}
                brightness={50}
                opacity={0.93}
                mixBlendMode="screen"
                simple
                className="w-full max-w-md"
            >
                <div className="text-center p-8">
                    <p className="text-2xl font-bold text-white mb-2">Thank you!</p>
                    <p className="text-neutral-300">I'll get back to you soon.</p>
                </div>
            </GlassSurface>
        );
    }

    return (
        <GlassSurface
            width="100%"
            height="auto"
            borderRadius={20}
            displace={0.5}
            distortionScale={-180}
            redOffset={0}
            greenOffset={10}
            blueOffset={20}
            brightness={50}
            opacity={0.93}
            mixBlendMode="screen"
            className="w-full max-w-md"
            simple={true}
        >
            <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3 md:gap-4 p-5 md:p-8">
                <h2 className="text-lg md:text-2xl font-bold text-white mb-2 text-center md:text-left">Contact Me</h2>
                <div className="flex flex-col gap-y-2">
                    <label
                        className="block font-sans leading-5 text-white font-medium"
                        htmlFor="name"
                    >
                        Your Name
                    </label>
                    <input
                        className="h-10 appearance-none rounded-lg border-0 px-4 bg-white/10 text-white outline-none ring-1 ring-inset ring-neutral-700 placeholder:text-neutral-400 focus-visible:ring-white transition-all"
                        id="name"
                        name="name"
                        required
                        placeholder="John Doe"
                    />
                </div>
                <div className="flex flex-col gap-y-2">
                    <label
                        className="block font-sans leading-5 text-white font-medium"
                        htmlFor="email"
                    >
                        Email
                    </label>
                    <input
                        className="h-10 appearance-none rounded-lg border-0 px-4 bg-white/10 text-white outline-none ring-1 ring-inset ring-neutral-700 placeholder:text-neutral-400 focus-visible:ring-white transition-all"
                        id="email"
                        type="email"
                        name="email"
                        required
                        placeholder="john@example.com"
                    />
                    <ValidationError prefix="Email" field="email" errors={state.errors} />
                    <p className="block leading-4 text-xs text-neutral-400">
                        This will help me respond to your query via an email.
                    </p>
                </div>
                <div className="flex flex-col gap-y-2">
                    <label
                        className="block font-sans leading-5 text-white font-medium"
                        htmlFor="message"
                    >
                        Message
                    </label>
                    <textarea
                        className="resize-y min-h-[100px] appearance-none rounded-lg border-0 px-3 py-2 bg-white/10 text-white outline-none ring-1 ring-inset ring-neutral-700 placeholder:text-neutral-400 focus-visible:ring-white transition-all"
                        id="message"
                        name="message"
                        required
                        placeholder="What would you like to discuss?"
                    />
                    <ValidationError prefix="Message" field="message" errors={state.errors} />
                </div>
                <div className="flex flex-row-reverse pt-2">
                    <button
                        className="cursor-pointer rounded-full bg-white px-8 py-2 text-base font-semibold text-black transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                        type="submit"
                        disabled={state.submitting}
                    >
                        Submit
                    </button>
                </div>
            </form>
        </GlassSurface >
    );
}
