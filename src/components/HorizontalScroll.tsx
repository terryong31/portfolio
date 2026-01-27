"use client";
import { useEffect, useRef } from 'react';
import cert1 from '@/assets/certs/1.jpg';
import cert2 from '@/assets/certs/2.jpg';
import cert3 from '@/assets/certs/3.jpg';
import cert4 from '@/assets/certs/4.jpg';
import cert5 from '@/assets/certs/5.jpg';
import cert6 from '@/assets/certs/6.jpg';
import cert7 from '@/assets/certs/7.png';
import cert8 from '@/assets/certs/8.png';
import cert9 from '@/assets/certs/9.jpg';
import cert10 from '@/assets/certs/10.jpg';
import cert11 from '@/assets/certs/11.png';

const certs = [cert1, cert2, cert3, cert4, cert5, cert6, cert7, cert8, cert9, cert10, cert11];

const HorizontalScroll = () => {
    // Duplicate images sufficient times to cover wide screens and allow seamless looping
    // 3 sets is usually safe: [set1][set2][set3] - we scroll through set1 and jump back to start of set2 (which looks same as start of set1)
    const displayImages = [...certs, ...certs, ...certs];
    const scrollRef = useRef<HTMLUListElement>(null);

    const isInitializedRef = useRef(false);

    useEffect(() => {
        const scrollContainer = scrollRef.current;
        if (!scrollContainer) return;

        let animationFrameId: number;

        // Disable scroll snap for smooth auto-scroll
        scrollContainer.style.scrollSnapType = 'none';

        const scroll = () => {
            if (!scrollContainer) return;

            // Increment scroll position
            scrollContainer.scrollLeft += 1; // Adjust speed here (pixels per frame)

            // Calculate the width of one set of images using offsetLeft difference
            // We measure the distance from the first item of the first set (index 0)
            // to the first item of the second set (index images.length)
            const firstItem = scrollContainer.children[0] as HTMLElement;
            const secondSetFirstItem = scrollContainer.children[certs.length] as HTMLElement;

            if (firstItem && secondSetFirstItem) {
                const oneSetWidth = secondSetFirstItem.offsetLeft - firstItem.offsetLeft;

                // Initialize scroll position to the start of the second set
                if (!isInitializedRef.current && oneSetWidth > 0) {
                    scrollContainer.scrollLeft = oneSetWidth;
                    isInitializedRef.current = true;
                    // Skip the rest of this frame to avoid double increment
                    animationFrameId = requestAnimationFrame(scroll);
                    return;
                }

                // Reset scroll position when we've scrolled past the second set (into the third)
                if (scrollContainer.scrollLeft >= 2 * oneSetWidth) {
                    scrollContainer.scrollLeft -= oneSetWidth;
                }
                // Bidirectional safety: If we scroll back into the first set, jump forward to the second set
                else if (scrollContainer.scrollLeft < oneSetWidth) {
                    scrollContainer.scrollLeft += oneSetWidth;
                }
            }

            animationFrameId = requestAnimationFrame(scroll);
        };

        animationFrameId = requestAnimationFrame(scroll);

        return () => {
            cancelAnimationFrame(animationFrameId);
            // Optional: Re-enable snap on cleanup if needed, but not necessary for unmount
        };
    }, []);

    return (
        <div className="w-full flex justify-center py-24 bg-transparent">
            <div className="track-wrapper">
                <ul className="track" ref={scrollRef}>
                    {displayImages.map((src, index) => (
                        <li className="track__item" key={index}>
                            <img src={src.src} alt={`Horizontal Scroll ${index + 1}`} width="300" height="300" className="object-cover" />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default HorizontalScroll;
