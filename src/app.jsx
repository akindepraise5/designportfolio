import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
        import { createRoot } from 'react-dom/client';

        // --- Components ---

        // ============================================================
        // ICONS — Phosphor (phosphoricons.com), MIT licensed.
        //
        // Inlined from @phosphor-icons/core rather than imported from a CDN:
        // sixteen icons are a couple of KB, and this removes an entire
        // blocking module request from first render. The props match what the
        // call sites already used (size, className), so nothing else changes.
        // ============================================================
        const PhIcon = ({ size = 24, className = '', children, ...rest }) => (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 256 256"
                width={size}
                height={size}
                fill="currentColor"
                className={className}
                aria-hidden="true"
                focusable="false"
                {...rest}
            >
                {children}
            </svg>
        );

        const ArrowUpRight = (props) => <PhIcon {...props}><path d="M200,64V168a8,8,0,0,1-16,0V83.31L69.66,197.66a8,8,0,0,1-11.32-11.32L172.69,72H88a8,8,0,0,1,0-16H192A8,8,0,0,1,200,64Z"/></PhIcon>;
        const ArrowDownRight = (props) => <PhIcon {...props}><path d="M200,88V192a8,8,0,0,1-8,8H88a8,8,0,0,1,0-16h84.69L58.34,69.66A8,8,0,0,1,69.66,58.34L184,172.69V88a8,8,0,0,1,16,0Z"/></PhIcon>;
        const ArrowRight = (props) => <PhIcon {...props}><path d="M221.66,133.66l-72,72a8,8,0,0,1-11.32-11.32L196.69,136H40a8,8,0,0,1,0-16H196.69L138.34,61.66a8,8,0,0,1,11.32-11.32l72,72A8,8,0,0,1,221.66,133.66Z"/></PhIcon>;
        const ArrowLeft = (props) => <PhIcon {...props}><path d="M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z"/></PhIcon>;
        const ArrowsLeftRight = (props) => <PhIcon {...props}><path d="M213.66,181.66l-32,32a8,8,0,0,1-11.32-11.32L188.69,184H48a8,8,0,0,1,0-16H188.69l-18.35-18.34a8,8,0,0,1,11.32-11.32l32,32A8,8,0,0,1,213.66,181.66Zm-139.32-64a8,8,0,0,0,11.32-11.32L67.31,88H208a8,8,0,0,0,0-16H67.31L85.66,53.66A8,8,0,0,0,74.34,42.34l-32,32a8,8,0,0,0,0,11.32Z"/></PhIcon>;
        const List = (props) => <PhIcon {...props}><path d="M224,128a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128ZM40,72H216a8,8,0,0,0,0-16H40a8,8,0,0,0,0,16ZM216,184H40a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16Z"/></PhIcon>;
        const X = (props) => <PhIcon {...props}><path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"/></PhIcon>;
        const Globe = (props) => <PhIcon {...props}><path d="M128,24h0A104,104,0,1,0,232,128,104.12,104.12,0,0,0,128,24Zm88,104a87.61,87.61,0,0,1-3.33,24H174.16a157.44,157.44,0,0,0,0-48h38.51A87.61,87.61,0,0,1,216,128ZM102,168H154a115.11,115.11,0,0,1-26,45A115.27,115.27,0,0,1,102,168Zm-3.9-16a140.84,140.84,0,0,1,0-48h59.88a140.84,140.84,0,0,1,0,48ZM40,128a87.61,87.61,0,0,1,3.33-24H81.84a157.44,157.44,0,0,0,0,48H43.33A87.61,87.61,0,0,1,40,128ZM154,88H102a115.11,115.11,0,0,1,26-45A115.27,115.27,0,0,1,154,88Zm52.33,0H170.71a135.28,135.28,0,0,0-22.3-45.6A88.29,88.29,0,0,1,206.37,88ZM107.59,42.4A135.28,135.28,0,0,0,85.29,88H49.63A88.29,88.29,0,0,1,107.59,42.4ZM49.63,168H85.29a135.28,135.28,0,0,0,22.3,45.6A88.29,88.29,0,0,1,49.63,168Zm98.78,45.6a135.28,135.28,0,0,0,22.3-45.6h35.66A88.29,88.29,0,0,1,148.41,213.6Z"/></PhIcon>;
        const DownloadSimple = (props) => <PhIcon {...props}><path d="M224,144v64a8,8,0,0,1-8,8H40a8,8,0,0,1-8-8V144a8,8,0,0,1,16,0v56H208V144a8,8,0,0,1,16,0Zm-101.66,5.66a8,8,0,0,0,11.32,0l40-40a8,8,0,0,0-11.32-11.32L136,124.69V32a8,8,0,0,0-16,0v92.69L93.66,98.34a8,8,0,0,0-11.32,11.32Z"/></PhIcon>;
        const Play = (props) => <PhIcon {...props}><path d="M240,128a15.74,15.74,0,0,1-7.6,13.51L88.32,229.65a16,16,0,0,1-16.2.3A15.86,15.86,0,0,1,64,216.13V39.87a15.86,15.86,0,0,1,8.12-13.82,16,16,0,0,1,16.2.3L232.4,114.49A15.74,15.74,0,0,1,240,128Z"/></PhIcon>;
        const Pause = (props) => <PhIcon {...props}><path d="M216,48V208a16,16,0,0,1-16,16H160a16,16,0,0,1-16-16V48a16,16,0,0,1,16-16h40A16,16,0,0,1,216,48ZM96,32H56A16,16,0,0,0,40,48V208a16,16,0,0,0,16,16H96a16,16,0,0,0,16-16V48A16,16,0,0,0,96,32Z"/></PhIcon>;
        const LinkedinLogo = (props) => <PhIcon {...props}><path d="M216,24H40A16,16,0,0,0,24,40V216a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V40A16,16,0,0,0,216,24ZM96,176a8,8,0,0,1-16,0V112a8,8,0,0,1,16,0ZM88,96a12,12,0,1,1,12-12A12,12,0,0,1,88,96Zm96,80a8,8,0,0,1-16,0V140a20,20,0,0,0-40,0v36a8,8,0,0,1-16,0V112a8,8,0,0,1,15.79-1.78A36,36,0,0,1,184,140Z"/></PhIcon>;
        const XLogo = (props) => <PhIcon {...props}><path d="M215,219.85a8,8,0,0,1-7,4.15H160a8,8,0,0,1-6.75-3.71l-40.49-63.63L53.92,221.38a8,8,0,0,1-11.84-10.76l61.77-68L41.25,44.3A8,8,0,0,1,48,32H96a8,8,0,0,1,6.75,3.71l40.49,63.63,58.84-64.72a8,8,0,0,1,11.84,10.76l-61.77,67.95,62.6,98.38A8,8,0,0,1,215,219.85Z"/></PhIcon>;
        const BehanceLogo = (props) => <PhIcon {...props}><path d="M92,120H64V96H92a12,12,0,0,1,0,24Zm4,16H64v32H96a16,16,0,0,0,0-32Zm80-16a24,24,0,0,0-22.62,16h45.24A24,24,0,0,0,176,120Zm64-64V200a16,16,0,0,1-16,16H32a16,16,0,0,1-16-16V56A16,16,0,0,1,32,40H224A16,16,0,0,1,240,56ZM144,88a8,8,0,0,0,8,8h48a8,8,0,0,0,0-16H152A8,8,0,0,0,144,88Zm-16,64a32,32,0,0,0-14.13-26.53A28,28,0,0,0,92,80H56a8,8,0,0,0-8,8v88a8,8,0,0,0,8,8H96A32,32,0,0,0,128,152Zm88-8a40,40,0,1,0-13.54,30,8,8,0,0,0-10.59-12,24,24,0,0,1-38.49-10H208A8,8,0,0,0,216,144Z"/></PhIcon>;
        const DribbbleLogo = (props) => <PhIcon {...props}><path d="M93.27,36.86a4,4,0,0,1,.82-7.19,103.94,103.94,0,0,1,88.66,9.95,4,4,0,0,1,1,5.87,153.32,153.32,0,0,1-41.89,37A169.43,169.43,0,0,0,93.27,36.86ZM127.58,90a153,153,0,0,0-56-46.91,3.94,3.94,0,0,0-4,.33,104.41,104.41,0,0,0-38.34,52,4,4,0,0,0,3,5.16A152.34,152.34,0,0,0,64,104,151,151,0,0,0,127.58,90Zm103.8,26.69A103.81,103.81,0,0,0,202.19,55.2a4,4,0,0,0-6,.34,169.15,169.15,0,0,1-45.69,40.4,167.73,167.73,0,0,1,13.55,29.9A167.64,167.64,0,0,1,208,120,169.35,169.35,0,0,1,227,121.07,4,4,0,0,0,231.38,116.72Zm-62.91,24.5a167.7,167.7,0,0,1,4.45,38.47,168,168,0,0,1-4.11,36.85A4,4,0,0,0,174.5,221a104.25,104.25,0,0,0,56.57-79.25,4,4,0,0,0-3.49-4.49,152.44,152.44,0,0,0-59.11,4Zm-19.64-10.45a151.76,151.76,0,0,0-12.39-27.21A167,167,0,0,1,64,120a168.4,168.4,0,0,1-34.88-3.65,4,4,0,0,0-4.81,3.56q-.31,4-.32,8.09a103.72,103.72,0,0,0,33,75.91,4,4,0,0,0,6.15-.92A169,169,0,0,1,148.83,130.77ZM75.69,213.25a4,4,0,0,0,1.52,5.48,103.88,103.88,0,0,0,68.85,11.69,3.93,3.93,0,0,0,3.06-2.65,152.6,152.6,0,0,0,7.8-48.08,151.3,151.3,0,0,0-3.74-33.46A152.94,152.94,0,0,0,75.69,213.25Z"/></PhIcon>;
        const TiktokLogo = (props) => <PhIcon {...props}><path d="M232,80v40a8,8,0,0,1-8,8,103.25,103.25,0,0,1-48-11.71V156a76,76,0,0,1-152,0c0-36.9,26.91-69.52,62.6-75.88A8,8,0,0,1,96,88v42.69a8,8,0,0,1-4.57,7.23A20,20,0,1,0,120,156V24a8,8,0,0,1,8-8h40a8,8,0,0,1,8,8,48.05,48.05,0,0,0,48,48A8,8,0,0,1,232,80Z" /></PhIcon>;
        const TelegramLogo = (props) => <PhIcon {...props}><path d="M228.88,26.19a9,9,0,0,0-9.16-1.57L17.06,103.93a14.22,14.22,0,0,0,2.43,27.21L72,141.45V200a15.92,15.92,0,0,0,10,14.83,15.91,15.91,0,0,0,17.51-3.73l25.32-26.26L165,220a15.88,15.88,0,0,0,10.51,4,16.3,16.3,0,0,0,5-.79,15.85,15.85,0,0,0,10.67-11.63L231.77,35A9,9,0,0,0,228.88,26.19ZM175.53,208,92.85,135.5l119-85.29Z"/></PhIcon>;


        const HOVERABLE = 'a, button, input, textarea, .group, .cursor-pointer';

        const CustomCursor = () => {
            const cursorRef = useRef(null);

            useEffect(() => {
                // Two delegated listeners instead of a pair on every hoverable
                // element plus a MutationObserver that re-queried the whole
                // document on each DOM change. On a case study with two dozen
                // sections that re-scan ran constantly while the page built
                // itself, competing with first paint.
                let frame = null;
                let x = 0;
                let y = 0;

                const paint = () => {
                    frame = null;
                    const el = cursorRef.current;
                    if (el) {
                        el.style.left = `${x}px`;
                        el.style.top = `${y}px`;
                    }
                };

                const onMove = (event) => {
                    x = event.clientX;
                    y = event.clientY;
                    if (frame === null) frame = requestAnimationFrame(paint);
                };

                const onOver = (event) => {
                    const target = event.target;
                    if (target && target.closest && target.closest(HOVERABLE)) {
                        cursorRef.current?.classList.add('hovered');
                    }
                };

                const onOut = (event) => {
                    const next = event.relatedTarget;
                    if (!next || !next.closest || !next.closest(HOVERABLE)) {
                        cursorRef.current?.classList.remove('hovered');
                    }
                };

                window.addEventListener('mousemove', onMove, { passive: true });
                document.addEventListener('mouseover', onOver, { passive: true });
                document.addEventListener('mouseout', onOut, { passive: true });

                return () => {
                    window.removeEventListener('mousemove', onMove);
                    document.removeEventListener('mouseover', onOver);
                    document.removeEventListener('mouseout', onOut);
                    if (frame !== null) cancelAnimationFrame(frame);
                };
            }, []);

            return <div ref={cursorRef} className="custom-cursor hidden md:block"></div>;
        };

        // Scroll-reveal, shared by Reveal / Rise / Masked.
        //
        // The important part is the synchronous viewport test in
        // useLayoutEffect: anything already on screen when the component
        // mounts renders visible on the very first paint, with no transition
        // and no waiting for an IntersectionObserver callback. Previously
        // every element started at opacity-0 and faded for a full second even
        // when it was the first thing on the page, so the masthead text
        // arrived long after the layout did.
        //
        // Only content that is genuinely below the fold animates.
        // One layout watcher shared by every reveal on the page, rather than a
        // ResizeObserver each. A case study mounts around eighty of them, and
        // they all care about the same question: has the page reflowed?
        // Tailwind's runtime stylesheet, the webfonts and late images all move
        // things after React has measured.
        //
        // It lives in the head script now so the scroll engine can share the
        // same observer and use it before React exists.
        const watchLayout = window.__layout.watch;

        const useReveal = () => {
            const ref = useRef(null);
            // Starts VISIBLE, and only hides itself once measurement has
            // confirmed it is genuinely below the fold.
            //
            // The order matters, and getting it backwards is what made
            // mastheads render blank. Tailwind here is a *runtime*
            // dependency: it generates its CSS after React has already put
            // the DOM in place. useLayoutEffect therefore measures against a
            // half-styled layout, and elements sitting in plain view can
            // measure as "below the fold". Starting hidden meant that a bad
            // measurement left real content invisible until some later event
            // happened to re-trigger it, which is why scrolling down and back
            // up "fixed" it.
            //
            // Starting visible inverts the failure: the worst a wrong
            // measurement can now do is skip an animation. It can never hide
            // the page. useLayoutEffect runs before paint, so genuinely
            // below-fold content still hides without flashing first.
            //
            // 'instant' -> painted now | 'pending' -> below the fold, hidden
            // | 'animate' -> came into view, play the transition
            const [phase, setPhase] = useState('instant');

            useLayoutEffect(() => {
                const el = ref.current;
                if (!el) return;
                if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

                const top = () => el.getBoundingClientRect().top;

                // Only content comfortably past the fold is ever hidden.
                //
                // This is the safeguard that matters. Measuring here happens
                // before Tailwind's runtime stylesheet and the webfonts have
                // settled, so the number can be wrong — and a masthead that
                // measures wrong used to end up hidden with nothing to bring
                // it back until the reader scrolled away and returned. With a
                // full viewport of margin, everything a visitor sees on
                // arrival is painted no matter what the measurement says. The
                // cost is that a little below-fold content skips its
                // animation; the benefit is that the page is never blank.
                if (top() <= window.innerHeight * 1.2) return;

                setPhase('pending');

                let settled = false;
                const show = () => {
                    if (settled) return;
                    settled = true;
                    setPhase('animate');
                    observer.disconnect();
                };

                const observer = new IntersectionObserver(([entry]) => {
                    if (entry.isIntersecting) show();
                }, { threshold: 0, rootMargin: '0px 0px -60px 0px' });
                observer.observe(el);

                // Anything that has since risen into view gets shown rather
                // than waiting for a scroll that may never come.
                const recheck = () => { if (top() < window.innerHeight) show(); };
                const frame = requestAnimationFrame(recheck);
                const timers = [setTimeout(recheck, 300), setTimeout(recheck, 1200)];
                window.addEventListener('load', recheck);
                const stopWatching = watchLayout(recheck);
                if (document.fonts && document.fonts.ready) {
                    document.fonts.ready.then(recheck).catch(() => { });
                }

                return () => {
                    observer.disconnect();
                    cancelAnimationFrame(frame);
                    timers.forEach(clearTimeout);
                    window.removeEventListener('load', recheck);
                    stopWatching();
                };
            }, []);

            return [ref, phase];
        };

        // Stagger is a garnish, not a queue. Call sites pass values up to
        // 320ms; capping keeps the last item in a group from arriving a third
        // of a second after the first.
        const staggerMs = (delay) => Math.min(delay, 160);

        const Reveal = ({ children, delay = 0 }) => {
            const [ref, phase] = useReveal();
            const shown = phase !== 'pending';
            const animated = phase === 'animate';

            return (
                <div
                    ref={ref}
                    className={`transform ${animated ? 'transition-all duration-500' : ''} ${shown ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                    style={animated ? { transitionDelay: `${staggerMs(delay)}ms` } : undefined}
                >
                    {children}
                </div>
            );
        };

        // ============================================================
        // ABOUT — "Praise, Unfiltered"
        // A chaptered visual essay. Shares the site's type, palette,
        // borders and grayscale-to-colour photography; the only thing
        // that changes chapter to chapter is the composition.
        // ============================================================

        const usePrefersReducedMotion = () => {
            const [reduced, setReduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
            useEffect(() => {
                const query = window.matchMedia('(prefers-reduced-motion: reduce)');
                const sync = () => setReduced(query.matches);
                query.addEventListener('change', sync);
                return () => query.removeEventListener('change', sync);
            }, []);
            return reduced;
        };

        const useInView = (threshold = 0.15) => {
            const ref = useRef(null);
            const [inView, setInView] = useState(false);
            useEffect(() => {
                const el = ref.current;
                if (!el) return;
                const observer = new IntersectionObserver(([entry]) => {
                    if (entry.isIntersecting) {
                        setInView(true);
                        observer.unobserve(entry.target);
                    }
                }, { threshold });
                observer.observe(el);
                return () => observer.disconnect();
            }, [threshold]);
            return [ref, inView];
        };

        // Very small parallax: a plate drifts at most `strength/2` px either side
        // of its layout position. Desktop only — on a phone it just costs battery.
        const useDrift = (strength = 0) => {
            const ref = useRef(null);
            const reduced = usePrefersReducedMotion();

            useEffect(() => {
                const el = ref.current;
                if (!el || !strength || reduced) return;
                if (!window.matchMedia('(min-width: 1024px)').matches) return;

                let frame = null;
                const apply = () => {
                    frame = null;
                    const rect = el.getBoundingClientRect();
                    const progress = (rect.top + rect.height / 2 - window.innerHeight / 2) / window.innerHeight;
                    const offset = Math.max(-1, Math.min(1, progress)) * -strength;
                    el.style.transform = `translate3d(0, ${offset.toFixed(2)}px, 0)`;
                };
                const onScroll = () => { if (frame === null) frame = requestAnimationFrame(apply); };

                apply();
                window.addEventListener('scroll', onScroll, { passive: true });
                window.addEventListener('resize', onScroll);
                return () => {
                    window.removeEventListener('scroll', onScroll);
                    window.removeEventListener('resize', onScroll);
                    if (frame !== null) cancelAnimationFrame(frame);
                    el.style.transform = '';
                };
            }, [strength, reduced]);

            return ref;
        };

        const EASE = 'ease-[cubic-bezier(0.16,1,0.3,1)]';

        const Rise = ({ children, delay = 0, from = 'up', className = '' }) => {
            const [ref, phase] = useReveal();
            const shown = phase !== 'pending';
            const animated = phase === 'animate';
            const resting = from === 'left' ? '-translate-x-8 opacity-0'
                : from === 'right' ? 'translate-x-8 opacity-0'
                    : 'translate-y-10 opacity-0';

            return (
                <div
                    ref={ref}
                    className={`${className} ${animated ? `transition-all duration-[600ms] ${EASE}` : ''} ${shown ? 'translate-x-0 translate-y-0 opacity-100' : resting}`}
                    style={animated ? { transitionDelay: `${staggerMs(delay)}ms` } : undefined}
                >
                    {children}
                </div>
            );
        };

        // Headline reveal: the line slides up from behind its own edge. On a
        // headline that is already on screen there is nothing to reveal, so it
        // simply paints in place.
        const Masked = ({ children, delay = 0, className = '' }) => {
            const [ref, phase] = useReveal();
            const shown = phase !== 'pending';
            const animated = phase === 'animate';

            return (
                <div ref={ref} className={`story-mask ${className}`}>
                    <div
                        className={`${animated ? `transition-transform duration-[650ms] ${EASE}` : ''} ${shown ? 'translate-y-0' : 'translate-y-full'}`}
                        style={animated ? { transitionDelay: `${staggerMs(delay)}ms` } : undefined}
                    >
                        {children}
                    </div>
                </div>
            );
        };

        // --- The photographs -------------------------------------------------
        // Pre-cropped to the aspect ratio they're shown at, so nothing is
        // re-cropped in the browser and no face is ever cut off. Two widths of
        // each; `-sm` is the 800px file phones actually download.
        const STORY_PHOTOS = {
            // The keys are positions, not filenames: the studio portrait opens
            // the page and the informal one closes it, so the two files are
            // swapped relative to how they were originally exported.
            introPortrait: { file: 'story-closing-portrait', w: 1325, h: 1752, alt: 'Studio portrait of Praise Akinde.' },
            peopleHero: { file: 'story-people-hero', w: 1600, h: 1202, alt: 'Praise Akinde and two friends sitting on campus steps in white shirts covered in signatures.' },
            peopleUni: { file: 'story-people-uni', w: 1600, h: 1600, alt: 'Praise Akinde and six fellow students crowded into a selfie outside a university building.' },
            peopleWork: { file: 'story-people-work', w: 1600, h: 1067, alt: 'Praise Akinde with two teammates in matching team shirts, standing by a roadside.' },
            peopleBuilding: { file: 'story-people-building', w: 1600, h: 1067, alt: 'Three people working side by side at laptops in a studio.' },
            teachClassOne: { file: 'story-teach-class-01', w: 1600, h: 1200, alt: 'Praise Akinde teaching a room of school pupils at laptops, code showing on the screen behind him.' },
            teachStudents: { file: 'story-teach-students', w: 1600, h: 2133, alt: 'Praise Akinde standing outdoors with a group of school pupils in uniform.' },
            teachClassTwo: { file: 'story-teach-class-02', w: 1600, h: 1067, alt: 'A wider view of the same classroom while the session is being set up.' },
            teachSpeaking: { file: 'story-teach-speaking', w: 1024, h: 1280, alt: 'Praise Akinde speaking on stage beside a lectern, microphone in hand.' },
            desk: { file: 'story-desk', w: 1280, h: 960, alt: 'Praise Akinde at his desk with headphones in, working on a design across a monitor and a laptop.' },
            deskMono: { file: 'story-desk-mono', w: 720, h: 960, alt: 'A second frame of the same working session, in black and white.' },
            lifeFriends: { file: 'story-life-friends', w: 1600, h: 2133, alt: 'Praise Akinde and a friend laughing with their arms around each other on a lawn.' },
            lifeGraduation: { file: 'story-life-graduation', w: 1600, h: 900, alt: 'Praise Akinde and three friends in signature-covered shirts on a campus road.' },
            lifeField: { file: 'story-life-field', w: 1600, h: 1200, alt: 'Praise Akinde and friends sitting out on a field.' },
            lifeCar: { file: 'story-life-car', w: 1600, h: 900, alt: 'Praise Akinde and two friends standing beside a car.' },
            closingPortrait: { file: 'story-intro-portrait', w: 1600, h: 2000, alt: 'Praise Akinde seated in front of a whiteboard, looking straight at the camera.' }
        };

        const Plate = ({
            photo, note, index, delay = 0, drift = 0, tilt = 0, lifted = false, eager = false,
            sizes = '100vw', className = '', noteClassName = ''
        }) => {
            const shot = STORY_PHOTOS[photo];
            const driftRef = useDrift(drift);
            const base = `/assets/about/${shot.file}`;

            return (
                // Tilt sits on the figure so the caption stays square to its own
                // photograph; the shadow sits on the frame so a layered plate reads
                // as a photograph on top of a photograph, never as a card.
                <figure
                    className={`story-plate group relative m-0 ${className}`}
                    style={tilt ? { transform: `rotate(${tilt}deg)` } : undefined}
                >
                    <div ref={driftRef}>
                        <Rise delay={delay}>
                            <div
                                className={`story-frame ${lifted ? 'shadow-[0_30px_70px_-28px_rgba(0,0,0,0.55)]' : ''}`}
                                style={{ aspectRatio: `${shot.w} / ${shot.h}` }}
                            >
                                <img
                                    className="story-photo"
                                    src={`${base}.jpg`}
                                    srcSet={shot.w > 800 ? `${base}-sm.jpg 800w, ${base}.jpg ${shot.w}w` : undefined}
                                    sizes={sizes}
                                    width={shot.w}
                                    height={shot.h}
                                    alt={shot.alt}
                                    loading={eager ? 'eager' : 'lazy'}
                                    decoding="async"
                                />
                            </div>
                            {note && (
                                <figcaption className={`story-note flex items-baseline gap-3 pt-3 font-mono text-[10px] uppercase tracking-[0.18em] text-neutral-500 ${noteClassName}`}>
                                    {index && <span className="shrink-0">{index}</span>}
                                    <span>{note}</span>
                                </figcaption>
                            )}
                        </Rise>
                    </div>
                </figure>
            );
        };

        // The one repeated element on the page: a hairline and two mono marks
        // that keep five very different chapters reading as one story.
        const ChapterMark = ({ n, title, className = '' }) => (
            <Rise className={className}>
                <div className="flex items-baseline justify-between gap-6 border-t border-[#111] pt-4">
                    <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#111]">{n}</span>
                    <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-neutral-500">{title}</span>
                </div>
            </Rise>
        );

        const Body = ({ children, className = '' }) => (
            <p className={`text-base md:text-lg text-neutral-600 leading-relaxed ${className}`}>{children}</p>
        );

        // --- About Component ---
        // No scroll-to-top effect here: the route effect in <Portfolio> is the
        // single owner of scroll on navigation, and a mount-time scrollTo would
        // override the reload restore.
        const AboutPage = ({ onBack }) => {

            return (
                <div className="min-h-screen bg-[#F4F4F2] overflow-x-clip">

                    {/* ==================================================
                        INTRODUCTION
                        Entry point. Deliberately short: a name, four words,
                        two paragraphs, one portrait holding the right edge.
                       ================================================== */}
                    <header className="bg-white border-b border-[#D4D4D0] px-8 md:px-12 lg:px-20 pt-8 md:pt-10 lg:pt-12 pb-16 md:pb-20 lg:pb-24">
                        <button
                            onClick={onBack}
                            className="group flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-neutral-500 mb-10 md:mb-14 hover:text-black transition-colors"
                        >
                            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                            Back to Home
                        </button>

                        <div className="flex items-baseline justify-between gap-6 border-t border-[#111] pt-4 mb-10 md:mb-16">
                            <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#111]">About</span>
                            <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-neutral-500">Praise, Unfiltered</span>
                        </div>

                        <div className="grid grid-cols-12 gap-x-4 md:gap-x-6 lg:gap-x-8">
                            <div className="col-span-12 lg:col-span-7">
                                <Masked>
                                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[1.05] text-[#111]">
                                        Hi, I’m Praise.
                                    </h1>
                                </Masked>

                                <Rise delay={150}>
                                    <div className="mt-8 md:mt-10 text-2xl md:text-3xl font-medium tracking-tight leading-[1.35]">
                                        <span className="block text-[#111]">Designer.</span>
                                        <span className="block text-[#111]">Builder.</span>
                                        <span className="block text-[#111]">Teacher.</span>
                                        <span className="block text-neutral-500">Perpetually curious.</span>
                                    </div>
                                </Rise>
                            </div>

                            {/* Portrait spans both rows of the left column, so it sets the
                                height of the masthead instead of being stacked into it. */}
                            <div className="col-span-9 col-start-3 mt-12 sm:col-span-7 sm:col-start-5 lg:col-span-4 lg:col-start-9 lg:row-span-2 lg:mt-0 lg:self-stretch">
                                <Plate
                                    photo="introPortrait"
                                    eager
                                    index="Fig. 00"
                                    note="Portrait"
                                    sizes="(min-width: 1024px) 30vw, 60vw"
                                />
                            </div>

                            <div className="col-span-12 lg:col-span-6 mt-12 lg:mt-14 space-y-5">
                                <Rise delay={100}>
                                    <Body>
                                        I like making things, learning things, and being around people who are trying to make
                                        something meaningful. My journey hasn’t really been a straight line, and I don’t think
                                        I would want it to be.
                                    </Body>
                                </Rise>
                                <Rise delay={180}>
                                    <Body>
                                        A lot of who I am today has come from the people I’ve met, the things I’ve tried, and
                                        the experiences that pushed me outside what I already knew.
                                    </Body>
                                </Rise>
                            </div>
                        </div>
                    </header>

                    {/* ==================================================
                        01 — PEOPLE
                        Collage. Energetic, asymmetric, one deliberate overlap.
                       ================================================== */}
                    <section className="px-8 md:px-12 lg:px-20 py-20 md:py-28 lg:py-32 border-b border-[#D4D4D0]">
                        <ChapterMark n="01" title="People" className="mb-12 md:mb-16" />

                        <div className="grid grid-cols-12 gap-x-4 md:gap-x-6 lg:gap-x-8">
                            <div className="col-span-12 lg:col-span-8">
                                <Masked>
                                    <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-[1.05] text-[#111]">
                                        I didn’t get here alone.
                                    </h2>
                                </Masked>
                            </div>

                            <div className="col-span-8 col-start-5 mt-12 lg:col-span-3 lg:col-start-10 lg:mt-0 lg:-mt-4">
                                <Plate
                                    photo="peopleUni"
                                    note="University"
                                    delay={120}
                                    drift={26}
                                    sizes="(min-width: 1024px) 22vw, 55vw"
                                />
                            </div>
                        </div>

                        {/* Dominant frame, pushed out to the left margin, with the
                            work frame layered over its bottom-right corner. */}
                        <div className="grid grid-cols-12 gap-x-4 md:gap-x-6 lg:gap-x-8 mt-14 lg:mt-12">
                            <div className="col-span-12 lg:col-span-9 lg:-ml-20">
                                <Plate
                                    photo="peopleHero"
                                    sizes="(min-width: 1024px) 66vw, 100vw"
                                />
                            </div>

                            <div className="hidden lg:block lg:col-span-3 lg:col-start-10 lg:pl-2">
                                <Rise delay={200}>
                                    <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-neutral-500 leading-loose">
                                        Good people<br />
                                        The journey
                                    </p>
                                </Rise>
                            </div>

                            <div className="col-span-9 col-start-4 -mt-10 z-10 sm:col-span-7 sm:col-start-6 lg:col-span-4 lg:col-start-8 lg:-mt-40">
                                <Plate
                                    photo="peopleWork"
                                    note="Work"
                                    tilt={-1.2}
                                    lifted
                                    drift={-18}
                                    sizes="(min-width: 1024px) 30vw, 60vw"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-12 gap-x-4 md:gap-x-6 lg:gap-x-8 mt-16 lg:mt-24">
                            <div className="col-span-12 lg:col-span-5 space-y-5">
                                <Rise>
                                    <Body>
                                        A lot of who I am today has been shaped by the people I’ve met along the way. Friends
                                        I started with, people I’ve worked with, people I’ve learned from, and people I’ve had
                                        the privilege of building alongside.
                                    </Body>
                                </Rise>
                                <Rise delay={90}>
                                    <Body>
                                        I’ve always enjoyed being part of something bigger than myself. Some of the best things
                                        I’ve experienced started with a group of people simply deciding to figure something out
                                        together.
                                    </Body>
                                </Rise>
                                <Rise delay={180}>
                                    <Body>
                                        We’ve grown, changed, struggled, laughed, started things, abandoned things, and kept
                                        going. Looking back, I’m probably just as proud of the people I’ve shared the journey
                                        with as I am of anything I’ve built myself.
                                    </Body>
                                </Rise>
                            </div>

                            <div className="col-span-12 mt-12 lg:col-span-6 lg:col-start-7 lg:mt-14">
                                <Plate
                                    photo="peopleBuilding"
                                    note="Building alongside"
                                    drift={22}
                                    sizes="(min-width: 1024px) 44vw, 100vw"
                                />
                            </div>
                        </div>
                    </section>

                    {/* ==================================================
                        02 — TEACHING
                        Documentary. Plates in sequence, structured, calm.
                       ================================================== */}
                    <section className="bg-white border-b border-[#D4D4D0] px-8 md:px-12 lg:px-20 py-20 md:py-28 lg:py-32">
                        <ChapterMark n="02" title="Teaching" className="mb-12 md:mb-16" />

                        <div className="lg:-mx-20">
                            <Plate
                                photo="teachClassOne"
                                index="Pl. 01"
                                note="Giving back to kids"
                                eager={false}
                                sizes="100vw"
                                noteClassName="px-8 md:px-12 lg:px-20"
                            />
                        </div>

                        <div className="grid grid-cols-12 gap-x-4 md:gap-x-6 lg:gap-x-8 mt-16 lg:mt-24">
                            {/* Headline and the second plate share a column, so the
                                sequence keeps moving while the copy runs alongside. */}
                            <div className="col-span-12 lg:col-span-5">
                                <Masked>
                                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter leading-[1.05] text-[#111]">
                                        What I learn, I like to pass on.
                                    </h2>
                                </Masked>

                                <div className="mt-12 lg:mt-20">
                                    <Plate
                                        photo="teachClassTwo"
                                        index="Pl. 02"
                                        note="Before the room fills up"
                                        drift={18}
                                        sizes="(min-width: 1024px) 38vw, 100vw"
                                    />
                                </div>
                            </div>

                            <div className="col-span-12 lg:col-span-6 lg:col-start-7 mt-12 lg:mt-2 space-y-5">
                                <Rise>
                                    <Body>Somewhere along the way, I realised I really enjoy teaching.</Body>
                                </Rise>
                                <Rise delay={80}>
                                    <Body>
                                        I’ve had the opportunity to teach and mentor people in design, break down things that
                                        once felt complicated, review people’s work, answer the same question five different
                                        ways, and watch someone finally have that “ohhh, I get it now” moment.
                                    </Body>
                                </Rise>
                                <Rise delay={160}>
                                    <Body>
                                        But teaching has never felt like me simply giving knowledge away. It has made me a
                                        better designer, communicator and listener. Explaining something clearly forces you to
                                        understand it properly, and working with different people teaches you that everyone
                                        sees and solves problems differently.
                                    </Body>
                                </Rise>
                                <Rise delay={240}>
                                    <Body>I think that’s one of the reasons I enjoy building with people so much.</Body>
                                </Rise>

                                <Rise delay={320}>
                                    <p className="pt-6 font-mono text-[10px] uppercase tracking-[0.18em] text-neutral-500 leading-loose">
                                        Explaining it clearly<br />
                                        is the real test
                                    </p>
                                </Rise>
                            </div>
                        </div>

                        {/* Two portraits in step, offset like frames on a contact sheet. */}
                        <div className="grid grid-cols-12 gap-x-4 md:gap-x-6 lg:gap-x-8 mt-16 lg:mt-28">
                            <div className="col-span-9 sm:col-span-6 lg:col-span-4 lg:col-start-2">
                                <Plate
                                    photo="teachStudents"
                                    index="Pl. 03"
                                    note="They ask better questions"
                                    drift={22}
                                    sizes="(min-width: 1024px) 30vw, 60vw"
                                />
                            </div>
                            <div className="col-span-9 col-start-4 mt-12 sm:col-span-5 sm:col-start-8 sm:mt-20 lg:col-span-4 lg:col-start-8 lg:mt-32">
                                <Plate
                                    photo="teachSpeaking"
                                    index="Pl. 04"
                                    note="In front of a room"
                                    delay={120}
                                    drift={-20}
                                    sizes="(min-width: 1024px) 30vw, 55vw"
                                />
                            </div>
                        </div>
                    </section>

                    {/* ==================================================
                        03 — CURIOSITY
                        Editorial and quiet. Mostly typography and air.
                       ================================================== */}
                    <section className="px-8 md:px-12 lg:px-20 py-20 md:py-28 lg:py-32 border-b border-[#D4D4D0]">
                        <ChapterMark n="03" title="Curiosity" className="mb-12 md:mb-16" />

                        <div className="max-w-5xl">
                            <Masked>
                                <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-[1.05] text-[#111]">
                                    I don’t really know how to leave things alone.
                                </h2>
                            </Masked>
                        </div>

                        <Rise delay={120}>
                            <div className="mt-12 lg:mt-16 max-w-4xl lg:columns-2 lg:gap-14 [&>p]:mb-5 [&>p:last-child]:mb-0">
                                <Body>I’m naturally curious, sometimes to my own disadvantage.</Body>
                                <Body>
                                    If I see something interesting, I want to understand how it works. If I don’t know how to
                                    do something, I usually want to try figuring it out before deciding that I can’t.
                                </Body>
                                <Body>
                                    That’s taken me through a lot of different corners of design and technology. I’ve gone from
                                    printing physical materials to graphic design to branding to product design, from designing
                                    interfaces to learning how to build them, and from simply using tools to becoming interested
                                    in how the tools themselves work.
                                </Body>
                                <Body>
                                    I like being a beginner at things. There’s something exciting about opening a door and
                                    realising you have absolutely no idea what’s on the other side.
                                </Body>
                                <Body>I’m still learning constantly. And honestly, I hope that never stops.</Body>
                            </div>
                        </Rise>

                        {/* Two frames from the same working session — one colour, one
                            mono — layered the way you'd lay them on a desk. */}
                        <div className="relative grid grid-cols-12 gap-x-4 md:gap-x-6 lg:gap-x-8 mt-20 lg:mt-32">
                            <div className="col-span-12 lg:col-span-7 lg:col-start-5">
                                <Plate
                                    photo="desk"
                                    sizes="(min-width: 1024px) 52vw, 100vw"
                                />
                            </div>
                            {/* Only a kiss of overlap on small screens — enough to read
                                as layered without hiding the subject of the frame below. */}
                            <div className="col-span-5 col-start-1 -mt-8 z-10 sm:col-span-4 sm:-mt-16 lg:col-span-3 lg:col-start-3 lg:-mt-32">
                                <Plate
                                    photo="deskMono"
                                    note="Same desk, same problem"
                                    delay={140}
                                    lifted
                                    tilt={-1}
                                    drift={-16}
                                    sizes="(min-width: 1024px) 22vw, 45vw"
                                />
                            </div>
                        </div>

                        {/* The quiet statement. Same two-tone treatment as the
                            homepage headline — held, not shouted. */}
                        <div className="mt-28 lg:mt-48 border-t border-[#D4D4D0] pt-12 lg:pt-20">
                            <div className="max-w-5xl">
                                <Masked>
                                    <p className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[1.02] text-[#111]">
                                        I don’t know yet.
                                    </p>
                                </Masked>
                                <Masked delay={200}>
                                    <p className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[1.02] text-neutral-400">
                                        But I am figuringit out.
                                    </p>
                                </Masked>
                            </div>
                        </div>
                    </section>

                    {/* ==================================================
                        04 — LIFE
                        The loosest chapter. Memories placed across the page
                        with room around them.
                       ================================================== */}
                    <section className="bg-[#EAEAE5]/40 border-b border-[#D4D4D0] px-8 md:px-12 lg:px-20 py-20 md:py-28 lg:py-32">
                        <ChapterMark n="04" title="Life" className="mb-12 md:mb-16" />

                        <div className="grid grid-cols-12 gap-x-4 md:gap-x-6 lg:gap-x-8">
                            <div className="col-span-12 lg:col-span-7">
                                <Masked>
                                    <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-[1.05] text-[#111]">
                                        I’m also trying to remember to live.
                                    </h2>
                                </Masked>
                            </div>
                        </div>

                        <div className="grid grid-cols-12 gap-x-4 md:gap-x-6 lg:gap-x-8 mt-14 lg:mt-20">
                            <div className="col-span-9 sm:col-span-6 lg:col-span-4">
                                <Plate
                                    photo="lifeFriends"
                                    note="Somewhere outside"
                                    drift={30}
                                    sizes="(min-width: 1024px) 30vw, 60vw"
                                />
                            </div>

                            <div className="col-span-12 mt-12 lg:col-span-6 lg:col-start-7 lg:mt-24 space-y-5">
                                <Rise>
                                    <Body>
                                        It’s easy to get caught up in the next project, the next skill, the next opportunity,
                                        the next thing I need to figure out.
                                    </Body>
                                </Rise>
                                <Rise delay={90}>
                                    <Body>But some of the moments I value most have nothing to do with work.</Body>
                                </Rise>
                                <Rise delay={180}>
                                    <Body>
                                        Being outside. Laughing with friends. Random university memories. Celebrating
                                        milestones. Taking pictures that weren’t meant for a portfolio. Having conversations
                                        that go nowhere. Just being present.
                                    </Body>
                                </Rise>
                            </div>
                        </div>

                        <div className="grid grid-cols-12 gap-x-4 md:gap-x-6 lg:gap-x-8 mt-16 lg:mt-4">
                            <div className="col-span-12 lg:col-span-8 lg:col-start-5 lg:-mr-20">
                                <Plate
                                    photo="lifeGraduation"
                                    note="Graduation"
                                    tilt={0.8}
                                    sizes="(min-width: 1024px) 62vw, 100vw"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-12 gap-x-4 md:gap-x-6 lg:gap-x-8 mt-16 lg:mt-28">
                            <div className="col-span-10 sm:col-span-6 lg:col-span-5">
                                <Plate
                                    photo="lifeField"
                                    note="Just one of those days"
                                    drift={18}
                                    sizes="(min-width: 1024px) 38vw, 70vw"
                                />
                            </div>
                            <div className="col-span-10 col-start-3 mt-12 sm:col-span-6 sm:col-start-7 sm:mt-20 lg:col-span-5 lg:col-start-8 lg:mt-40">
                                <Plate
                                    photo="lifeCar"
                                    note="No particular reason"
                                    delay={120}
                                    drift={-20}
                                    sizes="(min-width: 1024px) 38vw, 70vw"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-12 gap-x-4 md:gap-x-6 lg:gap-x-8 mt-16 lg:mt-24">
                            <div className="col-span-12 lg:col-span-6 lg:col-start-4 space-y-5">
                                <Rise>
                                    <Body>
                                        I’m ambitious about what I want to build, but I don’t want the pursuit of it to become
                                        the whole of my life.
                                    </Body>
                                </Rise>
                                <Rise delay={90}>
                                    <Body>
                                        There should still be room for good people, good memories, spontaneous plans and days
                                        that don’t need to produce anything.
                                    </Body>
                                </Rise>
                            </div>
                        </div>
                    </section>

                    {/* ==================================================
                        05 — STILL BECOMING
                        After all that, near silence.
                       ================================================== */}
                    <section className="bg-white px-8 md:px-12 lg:px-20 pt-24 md:pt-32 lg:pt-48 pb-20 md:pb-28 lg:pb-32">
                        <ChapterMark n="05" title="Still Becoming" className="mb-16 md:mb-24 lg:mb-32" />

                        <div className="grid grid-cols-12 gap-x-4 md:gap-x-6 lg:gap-x-8">
                            <div className="col-span-12 lg:col-span-7">
                                <Masked>
                                    <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[1.02] text-[#111]">
                                        Still becoming.
                                    </h2>
                                </Masked>

                                <div className="mt-12 lg:mt-20 max-w-md space-y-5">
                                    <Rise delay={100}>
                                        <Body>I don’t have everything figured out. I’m improving and learning every day.</Body>
                                    </Rise>
                                    <Rise delay={180}>
                                        <Body>There’s still a lot I want to learn, build, experience and become.</Body>
                                    </Rise>
                                    <Rise delay={260}>
                                        <Body>For now, I’m enjoying the process.</Body>
                                    </Rise>
                                </div>
                            </div>

                            <div className="col-span-7 col-start-6 mt-16 sm:col-span-5 sm:col-start-8 lg:col-span-3 lg:col-start-10 lg:mt-0">
                                <Plate
                                    photo="closingPortrait"
                                    drift={24}
                                    sizes="(min-width: 1024px) 22vw, 50vw"
                                />
                            </div>
                        </div>

                        <Rise>
                            <div className="mt-24 lg:mt-40 border-t border-[#D4D4D0] pt-6 flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2">
                                <span className="text-lg font-bold tracking-tight text-[#111]">Praise Akinde</span>
                                <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-neutral-500">
                                    Designer / Builder / Human
                                </span>
                            </div>
                        </Rise>
                    </section>

                    {/* Hands back to the site: same dark closing block the Resume
                        and case study pages end on. */}
                    <div className="p-8 md:p-12 lg:p-20 bg-[#111] text-white">
                        <div className="max-w-4xl">
                            <span className="font-mono text-xs text-neutral-500 uppercase tracking-widest mb-6 block">// Thanks for reading</span>
                            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter leading-tight mb-10">
                                Ready to build something <span className="text-neutral-600">clear, useful, and quietly intelligent?</span>
                            </h2>
                            <div className="flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-10">
                                <a
                                    href="mailto:Akindepraise5@gmail.com"
                                    className="text-xl md:text-2xl font-bold hover:text-neutral-400 transition-colors inline-flex items-center gap-2"
                                >
                                    Akindepraise5@gmail.com <ArrowUpRight size={20} />
                                </a>
                                <button
                                    onClick={onBack}
                                    className="group font-mono text-xs uppercase tracking-widest text-neutral-400 hover:text-white transition-colors inline-flex items-center gap-2 self-start"
                                >
                                    <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                                    Back to Home
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            );
        };

        // --- Resume Component ---
        // Scroll on navigation is owned by the route effect in <Portfolio>.
        const Resume = ({ onBack }) => {

            const experiences = [
                {
                    company: "Ewave Finance",
                    role: "Founding Product Designer",
                    period: "Jul 2025 - Present",
                    points: [
                        "Lead end-to-end product design for a stablecoin-powered neobank, partnering directly with the founder from discovery through beta launch.",
                        "Designed the responsive landing page, web application, mobile application, and scalable design system from the ground up.",
                        "Created secure user experiences for onboarding, wallet management, transfers, bill payments, and cross-border transactions.",
                        "Contributed to a beta platform that has processed over ₦50M in transactions."
                    ]
                },
                {
                    company: "TES Digital",
                    role: "Product Designer",
                    period: "Feb 2024 - Oct 2025",
                    note: "Digital Product Agency",
                    points: [
                        "Designed digital products for startups across fintech, SaaS, healthcare, logistics, education, and e-commerce.",
                        "Led UX improvements for multiple client products, including a Canadian fintech redesign and the Prestock website redesign.",
                        "Collaborated with founders, developers, and product teams to deliver responsive, user-centered web and mobile experiences."
                    ]
                },
                {
                    company: "TechCrush",
                    role: "UI/UX Design Lead Tutor",
                    period: "Oct 2024 - Present",
                    points: [
                        "Mentored 3,000+ aspiring product designers across multiple UI/UX bootcamp cohorts.",
                        "Led curriculum delivery and reviewed thousands of student capstone projects.",
                        "Coached students in product thinking, UX strategy, and portfolio development."
                    ]
                },
                {
                    company: "Swift Connect",
                    role: "Contract Product Designer",
                    period: "Aug 2024 - Dec 2024",
                    points: [
                        "Led the design of the mobile app, web application, website, and admin dashboard.",
                        "Worked closely with founders and developers to deliver intuitive fintech experiences."
                    ]
                },
                {
                    company: "Renitrust",
                    role: "Product Designer",
                    period: "Aug 2022 - May 2023",
                    points: [
                        "Redesigned key web and mobile fintech experiences through UX research and interface improvements.",
                        "Collaborated with cross-functional teams to improve usability and customer experience."
                    ]
                }
            ];

            const skillGroups = [
                {
                    label: "Product",
                    items: ["Product Strategy", "Product Discovery", "UX Design", "User Research", "Information Architecture", "User Flows", "Wireframing", "Prototyping", "Design Systems", "Usability Testing"]
                },
                {
                    label: "Tools",
                    items: ["Figma", "FigJam", "Adobe Illustrator", "Adobe Photoshop"]
                },
                {
                    label: "AI & Technical",
                    items: ["AI-assisted Product Development (Vibe Coding)", "HTML", "CSS", "JavaScript"]
                }
            ];

            return (
                <div className="min-h-screen bg-[#F4F4F2]">
                    {/* Header */}
                    <div className="p-8 md:p-12 lg:p-20 border-b border-[#D4D4D0] bg-white">
                        <button
                            onClick={onBack}
                            className="group flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-neutral-500 mb-8 hover:text-black transition-colors"
                        >
                            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                            Back to Home
                        </button>

                        <Reveal>
                            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-4">Resume</h1>
                            <p className="font-mono text-xs text-neutral-500 uppercase tracking-widest mb-8">
                                // Product Designer • Fintech • AI • Web3
                            </p>
                            <p className="text-xl md:text-2xl text-neutral-600 max-w-3xl leading-relaxed">
                                Product Designer with 4+ years of experience designing fintech, AI, SaaS, and Web3 products from concept to launch. I partner with founders and engineers to transform complex ideas into intuitive digital experiences across web and mobile, with expertise in product strategy, UX design, design systems, and AI-assisted product development.
                            </p>
                        </Reveal>
                    </div>

                    <section className="p-8 md:p-12 lg:p-20 border-b border-[#D4D4D0]">
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
                            <div className="md:col-span-4">
                                <Reveal>
                                    <h3 className="text-2xl font-bold mb-6">Experience</h3>
                                </Reveal>
                            </div>
                            <div className="md:col-span-8 space-y-16">
                                {experiences.map((exp, i) => (
                                    <Reveal key={i} delay={i * 50}>
                                        <div>
                                            <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-2">
                                                <h4 className="text-2xl font-bold">{exp.company}</h4>
                                                <span className="font-mono text-sm text-neutral-500">{exp.period}</span>
                                            </div>
                                            <div className="flex justify-between items-center mb-4">
                                                <p className="font-mono text-xs text-[#111] uppercase tracking-wide">// {exp.role}</p>
                                                {exp.note && <span className="font-mono text-xs text-neutral-400">{exp.note}</span>}
                                            </div>
                                            <ul className="space-y-3 max-w-2xl">
                                                {exp.points.map((point, p) => (
                                                    <li key={p} className="flex items-start gap-3 text-lg text-neutral-600 leading-relaxed">
                                                        <div className="w-1.5 h-1.5 bg-[#111] rounded-full mt-3 shrink-0"></div>
                                                        <span>{point}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </Reveal>
                                ))}
                            </div>
                        </div>
                    </section>

                    <section className="p-8 md:p-12 lg:p-20 border-b border-[#D4D4D0] bg-white">
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
                            <div className="md:col-span-4">
                                <Reveal>
                                    <h3 className="text-2xl font-bold mb-6">Skills</h3>
                                </Reveal>
                            </div>
                            <div className="md:col-span-8 space-y-8">
                                {skillGroups.map((group, i) => (
                                    <Reveal key={group.label} delay={i * 50}>
                                        <div>
                                            <h4 className="font-mono text-xs text-[#111] uppercase tracking-wide mb-3">// {group.label}</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {group.items.map((skill) => (
                                                    <span key={skill} className="px-3 py-1 bg-[#F4F4F2] border border-[#D4D4D0] text-sm text-neutral-600 rounded-full">{skill}</span>
                                                ))}
                                            </div>
                                        </div>
                                    </Reveal>
                                ))}
                            </div>
                        </div>
                    </section>

                    <section className="p-8 md:p-12 lg:p-20 border-b border-[#D4D4D0]">
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
                            <div className="md:col-span-4">
                                <Reveal>
                                    <h3 className="text-2xl font-bold mb-6">Education</h3>
                                </Reveal>
                            </div>
                            <div className="md:col-span-8">
                                <Reveal>
                                    <h4 className="text-2xl font-bold mb-2">Caleb University</h4>
                                    <p className="font-mono text-xs text-[#111] uppercase tracking-wide">// B.Sc. Computer Science</p>
                                </Reveal>
                            </div>
                        </div>
                    </section>

                    <div className="p-20 bg-[#111] text-white">
                        <div className="flex flex-col items-center justify-center text-center">
                            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-8">Want a PDF version?</h2>
                            <a href="/assets/Praise%20Akinde%20Resume.pdf" download="Praise_Akinde_Resume.pdf" className="bg-white text-black px-8 py-4 font-bold text-sm tracking-widest uppercase hover:bg-neutral-200 transition-colors inline-flex items-center gap-2">
                                <DownloadSimple size={16} /> Download Resume
                            </a>
                        </div>
                    </div>
                </div>
            );
        };

        // --- Case Study Component ---
        // Scroll on navigation is owned by the route effect in <Portfolio>.
        // Removing the mount-time scrollTo that used to live here also fixes a
        // conditional-hook violation: it was declared after the early return
        // below, so hook order changed whenever `project` was missing.
        const CaseStudy = ({ project, onBack, onNext }) => {
            const [activeTab, setActiveTab] = useState(0);

            if (!project) return null;

            return (
                <div className="min-h-screen bg-[#F4F4F2]">
                    {/* Navigation Bar (Sticky for Case Study) */}
                    <div className="sticky top-0 z-40 bg-[#F4F4F2]/90 backdrop-blur border-b border-[#D4D4D0] px-6 py-4 flex justify-between items-center">
                        <button
                            onClick={onBack}
                            className="group flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-neutral-500 hover:text-black transition-colors"
                        >
                            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                            Back to Works
                        </button>
                        <span className="font-bold text-sm tracking-tight hidden md:block">{project.title}</span>
                        <div className="w-10"></div> {/* Spacer for balance */}
                    </div>

                    {/* Header Section (Redesigned for Left Alignment & Integrated Meta) */}
                    <div className="px-6 py-20 md:py-24 max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
                            {/* Title & Desc Column */}
                            <div className="md:col-span-8">
                                <Reveal>
                                    <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-8 text-[#111] leading-[0.9]">
                                        {project.title}
                                    </h1>
                                    <p className="text-xl md:text-2xl text-neutral-600 leading-relaxed max-w-2xl">
                                        {project.desc}
                                    </p>
                                    {project.prototypeLink && (
                                        <a
                                            href={project.prototypeLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 mt-8 px-8 py-4 bg-[#111] text-white font-bold text-sm tracking-widest uppercase hover:bg-neutral-800 transition-colors"
                                        >
                                            {project.linkLabel || "View Prototype"} <ArrowUpRight size={16} />
                                        </a>
                                    )}
                                </Reveal>
                            </div>
                        </div>

                        {/* Meta Data Row */}
                        <div className="mt-16 border-t border-b border-[#D4D4D0] py-8">
                            <Reveal delay={100}>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                                    <div>
                                        <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-500 block mb-2">Role</span>
                                        <span className="font-medium text-sm md:text-base">{project.role}</span>
                                    </div>
                                    <div>
                                        <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-500 block mb-2">Year</span>
                                        <span className="font-medium text-sm md:text-base">{project.year}</span>
                                    </div>
                                    <div>
                                        <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-500 block mb-2">Client</span>
                                        <span className="font-medium text-sm md:text-base">{project.client}</span>
                                    </div>
                                    <div>
                                        <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-500 block mb-2">Timeline</span>
                                        <span className="font-medium text-sm md:text-base">{project.timeline}</span>
                                    </div>
                                </div>
                            </Reveal>
                        </div>
                    </div>

                    {/* Hero Image */}
                    <Reveal delay={200}>
                        <div className="w-full px-6 md:px-12 mb-24">
                            <div className="w-full max-w-5xl mx-auto aspect-video rounded-xl overflow-hidden shadow-sm border border-[#D4D4D0]">
                                <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                            </div>
                        </div>
                    </Reveal>

                    {/* Content Section: Overview */}
                    <section className="px-6 mb-24">
                        <div className="max-w-3xl mx-auto">
                            <Reveal>
                                <span className="font-mono text-xs text-neutral-500 uppercase tracking-widest mb-4 block">// Overview</span>
                                <h3 className="text-3xl font-bold mb-8 text-[#111]">The Context</h3>
                                <p className="text-lg md:text-xl text-neutral-700 leading-relaxed">
                                    {project.longDesc}
                                </p>
                            </Reveal>
                        </div>
                    </section>

                    {/* Content Section: Challenge */}
                    <section className="px-6 mb-24 bg-white py-24 border-y border-[#D4D4D0]">
                        <div className="max-w-3xl mx-auto">
                            <Reveal>
                                <span className="font-mono text-xs text-neutral-500 uppercase tracking-widest mb-4 block">// The Challenge</span>
                                <h3 className="text-3xl font-bold mb-8 text-[#111]">Defining the Problem</h3>
                                <p className="text-lg md:text-xl text-neutral-700 leading-relaxed">
                                    {project.challenge}
                                </p>
                            </Reveal>
                        </div>
                    </section>

                    {/* Content Section: Solution */}
                    <section className="px-6 mb-24">
                        <div className="max-w-3xl mx-auto">
                            <Reveal>
                                <span className="font-mono text-xs text-neutral-500 uppercase tracking-widest mb-4 block">// The Solution</span>
                                <h3 className="text-3xl font-bold mb-8 text-[#111]">Crafting the Experience</h3>
                                <p className="text-lg md:text-xl text-neutral-700 leading-relaxed mb-8">
                                    {project.solution}
                                </p>
                                {/* Only real points. This used to fall back to three
                                    generic bullets when a project had none, which
                                    invented claims the work never made, including a
                                    WCAG conformance level. */}
                                {project.solutionPoints && project.solutionPoints.length > 0 && (
                                    <ul className="space-y-4">
                                        {project.solutionPoints.map((point, index) => (
                                            <li key={index} className="flex items-start gap-3 text-neutral-700">
                                                <div className="w-1.5 h-1.5 bg-[#111] rounded-full mt-2.5"></div>
                                                <span>{point}</span>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </Reveal>
                        </div>
                    </section>

                    {/* NEW: Product Surfaces Tabbed Section */}
                    {project.surfaces && (
                        <section className="px-6 md:px-12 mb-24">
                            <Reveal>
                                <div className="max-w-5xl mx-auto">
                                    <span className="font-mono text-xs text-neutral-500 uppercase tracking-widest mb-8 block text-center">// Product Surfaces</span>

                                    {/* Tabs */}
                                    <div className="flex flex-wrap justify-center gap-4 mb-12">
                                        {project.surfaces.map((surface, index) => (
                                            <button
                                                key={surface.id}
                                                onClick={() => setActiveTab(index)}
                                                className={`px-6 py-3 rounded-full text-sm font-bold tracking-wide transition-all ${activeTab === index
                                                    ? 'bg-[#111] text-white shadow-md'
                                                    : 'bg-white text-neutral-500 border border-[#D4D4D0] hover:border-[#111] hover:text-[#111]'
                                                    }`}
                                            >
                                                {surface.label}
                                            </button>
                                        ))}
                                    </div>

                                    {/* Tab Content */}
                                    <div className="bg-white p-8 md:p-12 border border-[#D4D4D0] rounded-xl shadow-sm">
                                        <div className="mb-8 text-center max-w-2xl mx-auto">
                                            <h4 className="text-2xl font-bold mb-4">{project.surfaces[activeTab].label}</h4>
                                            <p className="text-neutral-600 leading-relaxed">
                                                {project.surfaces[activeTab].summary}
                                            </p>
                                        </div>

                                        <div className="grid grid-cols-1 gap-8">
                                            {project.surfaces[activeTab].images.map((imgUrl, i) => (
                                                <div key={i} className="w-full rounded-lg overflow-hidden border border-[#D4D4D0] shadow-sm">
                                                    <img src={imgUrl} alt={`${project.surfaces[activeTab].label} view ${i + 1}`} className="w-full h-auto" />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </Reveal>
                        </section>
                    )}

                    {/* Standard Gallery (Fallback if no surfaces) */}
                    {!project.surfaces && (
                        <section className="px-6 md:px-12 mb-32">
                            <Reveal delay={200}>
                                <div className="max-w-6xl mx-auto grid grid-cols-1 gap-8">
                                    {project.gallery.map((img, i) => (
                                        <div key={i}>
                                            <img src={img} alt={`${project.title} design showcase - view ${i + 1}`} className="w-full h-auto rounded-lg shadow-sm border border-[#D4D4D0]" />
                                            <p className="text-center font-mono text-xs text-neutral-500 mt-4">Fig {i + 1}. Design output.</p>
                                        </div>
                                    ))}
                                </div>
                            </Reveal>
                        </section>
                    )}

                    {/* Impact / Outcomes - Only shown if available */}
                    {/* Impact / Outcomes - Only shown if available */}
                    {project.impact && (
                        <section className="px-6 mb-24">
                            <div className="max-w-3xl mx-auto">
                                <Reveal>
                                    <span className="font-mono text-xs text-neutral-500 uppercase tracking-widest mb-4 block">// Outcome</span>
                                    <h3 className="text-3xl font-bold mb-8 text-[#111]">Design Impact</h3>
                                    <p className="text-lg md:text-xl text-neutral-700 leading-relaxed">
                                        {project.impact}
                                    </p>
                                </Reveal>
                            </div>
                        </section>
                    )}

                    {/* Next Project Footer */}
                    <button
                        onClick={onNext}
                        className="w-full text-left p-12 md:p-20 bg-[#111] text-white group hover:bg-black transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-white"
                    >
                        <span className="font-mono text-xs text-neutral-500 uppercase tracking-widest mb-4 block group-hover:text-white transition-colors">Next Project</span>
                        <div className="flex items-center justify-between">
                            <span className="block text-4xl md:text-6xl font-bold tracking-tighter">View Next Case</span>
                            <ArrowRight size={32} className="transform group-hover:translate-x-4 transition-transform" />
                        </div>
                    </button>
                </div>
            );
        };

        // ============================================================
        // LONG-FORM CASE STUDIES — shared primitives
        // The generic <CaseStudy> renders one shape: overview, challenge,
        // solution, gallery. Ewave and MindWell need status labels, metric
        // grids, decision sections and image slots, so each gets its own
        // page — the same precedent the About page sets. These Study*
        // components are what keep the two reading as one system. Every
        // colour, rule and type step is borrowed from the existing design
        // language; nothing new is introduced.
        // ============================================================

        const StudyStatus = ({ kind }) => {
            const styles = {
                live: 'bg-[#111] text-white border-[#111]',
                designed: 'bg-transparent text-[#111] border-[#111]',
                building: 'bg-transparent text-neutral-500 border-[#D4D4D0]',
                future: 'bg-transparent text-neutral-400 border-[#D4D4D0] border-dashed'
            };
            const labels = {
                live: 'Live',
                designed: 'Designed',
                building: 'In development',
                future: 'Future'
            };
            return (
                <span className={`shrink-0 border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.16em] ${styles[kind]}`}>
                    {labels[kind]}
                </span>
            );
        };

        // Every image slot on the page. Dashed edge so a placeholder is never
        // mistaken for a finished frame; the art direction stays on screen so
        // there's no separate list to cross-reference while shooting.
        const StudySlot = ({ id, title, note, ratio = '16 / 9', className = '' }) => (
            <Reveal>
                <figure className={`m-0 ${className}`}>
                    <div
                        className="w-full bg-[#EAEAE5] border border-dashed border-[#B4B4AC] flex items-center justify-center"
                        style={{ aspectRatio: ratio }}
                    >
                        <div className="text-center px-6 py-8 max-w-md">
                            <span className="block font-mono text-[10px] uppercase tracking-[0.3em] text-neutral-500 mb-3">{id}</span>
                            <span className="block text-lg md:text-xl font-bold tracking-tight text-[#111] mb-2">{title}</span>
                            {note && <span className="block font-mono text-[11px] leading-relaxed text-neutral-500">{note}</span>}
                        </div>
                    </div>
                </figure>
            </Reveal>
        );

        // Renders a real button once the URL exists, and an honest placeholder
        // until then.
        const StudyLink = ({ href, label, hint }) => {
            if (!href) {
                return (
                    <div className="inline-flex flex-col gap-1 border border-dashed border-[#B4B4AC] bg-[#EAEAE5] px-6 py-4">
                        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-500">Link: add URL in EWAVE_LINKS</span>
                        <span className="text-sm font-bold tracking-tight text-[#111]">{label}</span>
                    </div>
                );
            }
            return (
                <div className="inline-flex flex-col gap-2">
                    <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-[#111] text-white px-8 py-4 font-bold text-sm tracking-widest uppercase hover:bg-neutral-800 transition-colors"
                    >
                        {label} <ArrowUpRight size={16} />
                    </a>
                    {hint && <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-neutral-500">{hint}</span>}
                </div>
            );
        };

        const StudyP = ({ children, className = '' }) => (
            <p className={`text-lg md:text-xl text-neutral-700 leading-relaxed ${className}`}>{children}</p>
        );

        // Status chips double as navigation: the page is long, and a reader
        // who wants the live beta shouldn't have to scroll past everything
        // else to reach it. A button, not a div, so it's keyboard-reachable
        // and announces itself correctly. ArrowDownRight is the same mark the
        // sidebar uses for "jumps somewhere on this page".
        const StudyJump = ({ to, children }) => {
            const jump = () => {
                const el = document.getElementById(to);
                if (!el) return;
                const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
                el.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
            };

            return (
                <button
                    onClick={jump}
                    className="group inline-flex items-center gap-1.5 border border-[#D4D4D0] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-neutral-500 hover:border-[#111] hover:text-[#111] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111] transition-colors"
                >
                    {children}
                    <ArrowDownRight size={11} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
            );
        };

        // The page's raised voice. Same two-tone treatment as the homepage
        // headline, used only where the writing genuinely lands a principle.
        const StudyStatement = ({ children, className = '' }) => (
            <Reveal>
                <p className={`text-2xl md:text-4xl font-bold tracking-tighter leading-[1.15] text-[#111] ${className}`}>
                    {children}
                </p>
            </Reveal>
        );

        const StudyBullets = ({ items }) => (
            <ul className="space-y-4">
                {items.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-lg text-neutral-700 leading-relaxed">
                        <div className="w-1.5 h-1.5 bg-[#111] rounded-full mt-3 shrink-0"></div>
                        <span>{item}</span>
                    </li>
                ))}
            </ul>
        );

        const StudyMetrics = ({ items, className = '' }) => (
            <Reveal>
                {/* Four metrics sit 4-across so the row never ends in an orphan;
                    anything else falls back to thirds. */}
                <div className={`grid grid-cols-2 ${items.length % 4 === 0 ? 'md:grid-cols-4' : 'md:grid-cols-3'} border-t border-l border-[#D4D4D0] ${className}`}>
                    {items.map((m) => (
                        <div key={m.label} className="border-r border-b border-[#D4D4D0] p-5 md:p-6">
                            <div className="text-2xl md:text-4xl font-bold tracking-tighter text-[#111] tabular-nums">{m.val}</div>
                            <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-neutral-500 mt-2">{m.label}</div>
                            {m.note && <div className="font-mono text-[10px] text-neutral-400 mt-1">{m.note}</div>}
                        </div>
                    ))}
                </div>
            </Reveal>
        );

        // ============================================================
        // EWAVE — one case study, two lengths
        // /work/ewave       short, image-led, complete on its own
        // /work/ewave/full  the reasoning behind each decision
        //
        // Both read from EWAVE below. Numbers, status and links live in
        // exactly one place so the two versions can never disagree.
        // ============================================================

        const EWAVE = {
            standfirst: 'Sole Product Designer. I rebuilt a stablecoin product from the ground up and shipped it to real users.',
            role: 'Sole Product Designer',
            period: 'Mid-2025 to now',
            team: 'Lean founding team',
            disciplines: 'Product strategy · UX/UI · Brand application · Design system · Website · Web app · Mobile',

            links: {
                website: 'https://www.useewave.com/',
                beta: 'https://beta.useewave.com/'
            },

            // The four the short version leads with.
            headline: [
                { val: '1,000+', label: 'Transactions' },
                { val: '200+', label: 'Users' },
                { val: '85%', label: 'Returning' },
                { val: '₦50M+', label: 'Processed', note: '$40k+' }
            ],

            // The full table the long version shows.
            metrics: [
                { val: '1,000+', label: 'Transactions' },
                { val: '200+', label: 'Users' },
                { val: '2-3 mo', label: 'Since launch' },
                { val: '₦50M+', label: 'Processed', note: '$40k+' },
                { val: '85%', label: 'Returning users' },
                { val: '<30s', label: 'To a completed transaction' }
            ],

            status: {
                live: ['Website', 'Beta'],
                building: ['Web app', 'Mobile app', 'Risk based verification', 'Beneficiaries', 'Tiered KYC'],
                future: ['Multi currency fiat wallets', 'Cards', 'Yield']
            },

            // Image manifest. `file` is a base path with no extension: the
            // component asks for .webp first and falls back to .jpg. Leave it
            // null and a labelled placeholder renders at the right aspect
            // ratio, so dropping files in later shifts nothing on the page.
            images: {
                hero: {
                    file: '/assets/ewave/hero', ratio: '3 / 2', title: 'Hero',
                    alt: 'Ewave shown across its surfaces: the beta, the mobile app and the website.'
                },
                betaMain: {
                    file: '/assets/ewave/beta-main', ratio: '1448 / 1086', title: 'The beta, full width',
                    alt: 'The Ewave beta on a laptop and a phone: a headline reading “Exchange your stablecoins to fiat in 10 seconds with zero hassle”, above a you-send and you-receive form with token and currency pickers.'
                },
                lockedRate: {
                    file: '/assets/ewave/locked-rate', ratio: '1536 / 1024', title: 'Locked rate',
                    alt: 'The beta exchange screen with an amount entered, showing the locked naira rate and the countdown timer before it refreshes.'
                },
                bankSelection: {
                    file: '/assets/ewave/bank-selection', ratio: '1536 / 1024', title: 'Bank selection',
                    alt: 'The bank picker in the Ewave beta, and the account number field resolving to the recipient’s name before anything is sent.'
                },
                receipt: {
                    file: '/assets/ewave/receipt', ratio: '1536 / 1024', title: 'Receipt',
                    alt: 'A completed Ewave transaction receipt showing amount sent, amount received, address, recipient, reference, status and time to arrive.'
                },
                tokenNetwork: {
                    kind: 'carousel', ratio: '320 / 227', title: 'Token and network',
                    alt: 'The Ewave token and network picker, one frame per supported chain',
                    slides: [1, 2, 3, 4, 5].map((n) => `/assets/ewave/token-network-${n}`)
                },
                processing: {
                    file: '/assets/ewave/processing', ratio: '3 / 2', title: 'Processing state',
                    alt: 'The Ewave beta waiting screen while a transaction is being processed.'
                },
                // Image 09 is <EwaveImpact>, set in the page, so it has no slot here.
                dashboard: {
                    file: '/assets/ewave/dashboard', ratio: '1536 / 1024', title: 'Dashboard, full width',
                    alt: 'The Ewave web app dashboard: total balance in dollars with the naira equivalent beneath, quick actions, wallets and recent transactions.'
                },
                // Animated. sharp writes an animated WebP; the JPG fallback is
                // the first frame, so the story still reads if WebP fails.
                verification: {
                    file: '/assets/ewave/verification', ratio: '3706 / 2160', title: 'Verification',
                    alt: 'The Ewave KYC sequence playing through, with Skip for now available at each step and the verification prompt remaining on the dashboard afterwards.'
                },
                bills: {
                    file: '/assets/ewave/bills', ratio: '3706 / 2160', title: 'Bills',
                    alt: 'Paying a bill in Ewave: choosing a service, entering a naira amount, reviewing it with both the naira and dollar figures shown, then confirming with a PIN.'
                },
                paymentLinks: {
                    kind: 'carousel', ratio: '169 / 120', title: 'Payment links',
                    clips: [1, 2, 3].map((n) => ({ file: `/assets/ewave/payment-links-${n}` }))
                },
                mobileHome: {
                    file: '/assets/ewave/mobile-home', ratio: '1536 / 1024', title: 'Mobile home, large',
                    alt: 'Three Ewave phone screens: receiving USDC with the network stated above the QR code, the home screen with a dual currency balance and send, receive, pay and transfer actions, and the wallets list.'
                },
                onboarding: {
                    kind: 'video', file: '/assets/ewave/onboarding',
                    poster: '/assets/ewave/onboarding-poster',
                    ratio: '36 / 19', title: 'Onboarding'
                },
                // Typographic, not a screenshot: the three stages set as three
                // columns of type, ink weight falling left to right so the
                // progression from shipped to planned is visible at a glance.
                currentState: {
                    file: '/assets/ewave/current-state', ratio: '1600 / 820', title: 'Current state',
                    alt: 'Three columns of type. Live: website and beta. In development: web app, mobile app, risk based verification, beneficiaries and tiered KYC. Future: multi currency fiat wallets, cards and yield.'
                },
                // Composites. Both versions use these: three phone screens in one
                // frame says what three separate slots used to.
                sendAndInternational: {
                    file: '/assets/ewave/send-international', ratio: '1448 / 1086', title: 'Send and international transfer',
                    alt: 'Three Ewave phone screens: choosing between sending to an Ewave user, a crypto wallet, your own wallet or internationally; transferring between wallets; and an international transfer with destination country and purpose of transfer.'
                },
                networkAndReview: {
                    file: '/assets/ewave/network-review', ratio: '1448 / 1086', title: 'Network selection and review',
                    alt: 'Three Ewave phone screens: choosing asset and network before the address and amount with a warning that the wrong network means lost funds, the review transfer screen restating the network, and the send money screen.'
                }
            }
        };

        // The labelled dashed box every media slot falls back to: no file yet,
        // or the file failed to load. Keeps the art direction on screen.
        const StudySlotFallback = ({ label, note }) => (
            <div className="w-full h-full flex items-center justify-center">
                <div className="text-center px-6 py-8 max-w-md">
                    <span className="block font-mono text-[10px] uppercase tracking-[0.3em] text-neutral-500 mb-3">{label}</span>
                    {note && <span className="block font-mono text-[11px] leading-relaxed text-neutral-500">{note}</span>}
                </div>
            </div>
        );

        const StudyPicture = ({ file, alt, eager, onError, className = 'w-full h-full object-cover' }) => (
            <picture>
                <source srcSet={`${file}.webp`} type="image/webp" />
                <img
                    src={`${file}.jpg`}
                    alt={alt}
                    loading={eager ? 'eager' : 'lazy'}
                    decoding="async"
                    onError={onError}
                    className={className}
                />
            </picture>
        );

        // A slideshow, not a scroll region: one frame at a time so each screen
        // gets full width. Prev/next and the dots are real buttons; arrow keys
        // work when the strip has focus; the count is announced politely rather
        // than on every keystroke. Only the current frame and its neighbours
        // load, so a six-frame carousel doesn't cost six images up front.
        // Slides are either stills (`slides`, an array of base paths) or clips
        // (`clips`, an array of { file, poster }). Clips keep preload="none",
        // so an unvisited frame costs nothing.
        const StudyCarousel = ({ slides, clips, label, alt, ratio, eager }) => {
            const items = clips || slides;
            const [i, setI] = useState(0);
            const [failed, setFailed] = useState({});
            const count = items.length;

            const go = (next) => setI((prev) => (next + count) % count);

            const onKeyDown = (event) => {
                if (event.key === 'ArrowLeft') { event.preventDefault(); go(i - 1); }
                if (event.key === 'ArrowRight') { event.preventDefault(); go(i + 1); }
            };

            return (
                <div
                    role="group"
                    aria-roledescription="carousel"
                    aria-label={label}
                    onKeyDown={onKeyDown}
                    className="focus-within:outline focus-within:outline-2 focus-within:outline-offset-4 focus-within:outline-[#111]"
                >
                    <div
                        className="w-full overflow-hidden bg-[#EAEAE5] border border-[#D4D4D0] relative"
                        style={{ aspectRatio: ratio }}
                    >
                        <div
                            className="flex h-full transition-transform duration-500 ease-out motion-reduce:transition-none"
                            style={{ transform: `translateX(-${i * 100}%)` }}
                        >
                            {items.map((item, n) => {
                                const key = clips ? item.file : item;
                                return (
                                    <div key={key} className="w-full h-full shrink-0" aria-hidden={n !== i}>
                                        {clips ? (
                                            // Only the visible clip is mounted: a paused
                                            // <video> off-screen still holds a decoder.
                                            n === i ? (
                                                <StudyVideo
                                                    file={item.file}
                                                    poster={item.poster || item.file + '-poster'}
                                                    label={`${label}, ${n + 1} of ${count}`}
                                                    ratio={ratio}
                                                />
                                            ) : null
                                        ) : (
                                            /* Neighbours only: the rest stay empty until reached. */
                                            Math.abs(n - i) <= 1 && !failed[key] ? (
                                                <StudyPicture
                                                    file={key}
                                                    alt={`${alt}, ${n + 1} of ${count}`}
                                                    eager={eager && n === 0}
                                                    onError={() => setFailed((f) => ({ ...f, [key]: true }))}
                                                />
                                            ) : null
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className="flex items-center justify-between gap-6 pt-4">
                        <div className="flex items-center gap-3">
                            <button
                                type="button"
                                onClick={() => go(i - 1)}
                                aria-label={`Previous, ${label}`}
                                className="w-10 h-10 border border-[#D4D4D0] flex items-center justify-center text-[#111] hover:bg-[#111] hover:text-white transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111]"
                            >
                                <ArrowLeft size={16} />
                            </button>
                            <button
                                type="button"
                                onClick={() => go(i + 1)}
                                aria-label={`Next, ${label}`}
                                className="w-10 h-10 border border-[#D4D4D0] flex items-center justify-center text-[#111] hover:bg-[#111] hover:text-white transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111]"
                            >
                                <ArrowRight size={16} />
                            </button>
                            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-neutral-500 tabular-nums ml-1" aria-live="polite">
                                {String(i + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
                            </span>
                        </div>

                        <div className="flex items-center gap-2">
                            {items.map((item, n) => (
                                <button
                                    key={clips ? item.file : item}
                                    type="button"
                                    onClick={() => setI(n)}
                                    aria-label={`Go to ${n + 1} of ${count}`}
                                    aria-current={n === i}
                                    className={`h-[3px] w-7 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#111] ${n === i ? 'bg-[#111]' : 'bg-[#D4D4D0] hover:bg-neutral-400'}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            );
        };

        const PlayGlyph = () => <Play size={11} />;
        const PauseGlyph = () => <Pause size={11} />;

        // Click is the primary control, hover is an enhancement on top.
        //
        // The frame is a real <button>, so it works by tap, click, Enter and
        // Space alike, and a phone gets the same behaviour as a desktop rather
        // than a dead hover affordance. Hover preview is only wired up where
        // the device actually has a pointer: `(hover: hover)` is false on
        // touch, where a "hover" is really a stray tap.
        //
        // preload="none" means the file costs nothing until someone asks for
        // it, which is what keeps a page of videos from being heavy.
        const StudyVideo = ({ file, poster, label, ratio }) => {
            const ref = useRef(null);
            const [playing, setPlaying] = useState(false);
            const [pinned, setPinned] = useState(false);
            const [failed, setFailed] = useState(false);

            // Devices with a real pointer get hover preview; touch gets tap.
            const [canHover, setCanHover] = useState(
                () => typeof window !== 'undefined' &&
                    window.matchMedia('(hover: hover) and (pointer: fine)').matches
            );

            useEffect(() => {
                const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
                const onChange = () => setCanHover(mq.matches);
                if (mq.addEventListener) mq.addEventListener('change', onChange);
                else if (mq.addListener) mq.addListener(onChange);
                return () => {
                    if (mq.removeEventListener) mq.removeEventListener('change', onChange);
                    else if (mq.removeListener) mq.removeListener(onChange);
                };
            }, []);

            const reduced = () =>
                typeof window !== 'undefined' &&
                window.matchMedia('(prefers-reduced-motion: reduce)').matches;

            const play = () => {
                const el = ref.current;
                if (!el) return;
                const attempt = el.play();
                // Autoplay can still be refused; a rejected promise is not an error.
                if (attempt && attempt.catch) attempt.catch(() => { });
            };

            // Hover is a preview; a click is a commitment. So the click
            // toggles the *pinned* state, not raw playback: clicking something
            // that is only hover-previewing keeps it running rather than
            // stopping it, which is what happens if you toggle on `paused`.
            // Reaching for a video to play it and having it stop is the bug
            // this avoids. Clicking something genuinely pinned pauses it.
            const toggle = () => {
                const el = ref.current;
                if (!el) return;
                if (pinned) { el.pause(); setPinned(false); }
                else { play(); setPinned(true); }
            };

            const onEnter = () => { if (canHover && !reduced() && !pinned) play(); };
            const onLeave = () => {
                const el = ref.current;
                if (canHover && !pinned && el) el.pause();
            };

            if (failed) {
                return (
                    <div
                        className="w-full overflow-hidden bg-[#EAEAE5] border border-dashed border-[#B4B4AC]"
                        style={{ aspectRatio: ratio }}
                    >
                        <StudySlotFallback label={label} note="Video could not be loaded." />
                    </div>
                );
            }

            const hint = playing
                ? (canHover ? 'Pause' : 'Tap to pause')
                : (canHover ? 'Hover or click to play' : 'Tap to play');

            return (
                <button
                    type="button"
                    onClick={toggle}
                    onMouseEnter={onEnter}
                    onMouseLeave={onLeave}
                    onFocus={onEnter}
                    onBlur={onLeave}
                    aria-label={`${playing ? 'Pause' : 'Play'} ${label}`}
                    className="block w-full relative overflow-hidden bg-[#EAEAE5] border border-[#D4D4D0] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#111]"
                    style={{ aspectRatio: ratio }}
                >
                    <video
                        ref={ref}
                        muted
                        loop
                        playsInline
                        preload="none"
                        poster={`${poster}.jpg`}
                        onPlay={() => setPlaying(true)}
                        onPause={() => setPlaying(false)}
                        onError={() => setFailed(true)}
                        className="w-full h-full object-cover"
                    >
                        <source src={`${file}.mp4`} type="video/mp4" />
                    </video>

                    {/* Centre affordance while paused. Big enough to read as a
                        tap target on a phone, gone once it's running. */}
                    <span
                        aria-hidden="true"
                        className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${playing ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
                    >
                        <span className="flex items-center gap-3 bg-white/90 backdrop-blur px-5 py-3 text-[10px] font-mono uppercase tracking-[0.24em] text-[#111] shadow-sm">
                            <PlayGlyph />
                            {canHover ? 'Hover or click to play' : 'Tap to play'}
                        </span>
                    </span>

                    {/* Once running, a persistent way to stop it. */}
                    <span
                        aria-hidden="true"
                        className={`absolute bottom-3 right-3 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.2em] px-2.5 py-1.5 bg-white/90 text-[#111] transition-opacity duration-300 ${playing ? 'opacity-100' : 'opacity-0'}`}
                    >
                        <PauseGlyph />
                        {hint}
                    </span>
                </button>
            );
        };

        const CompareGlyph = () => <ArrowsLeftRight size={18} />;

        // Before / after comparison.
        //
        // Both screenshots sit in the same box at the same scale, so the only
        // thing that changes is how much of the old one is revealed. Neither
        // image is transformed, filtered or cropped: the container carries the
        // assets' own aspect ratio, and the reveal is a clip-path, so what you
        // see is pixel-accurate to the source.
        //
        // The new UI is the base layer and the old one is clipped over it,
        // occupying the left. Dragging right therefore moves forward in time,
        // which is the story this is here to tell.
        //
        // Pointer events cover mouse, touch and pen through one path, and
        // touch-action: pan-y keeps vertical page scrolling working on a phone
        // while still giving us the horizontal drag.
        const StudyCompare = ({ before, after, beforeAlt, afterAlt, beforeLabel = 'Old', afterLabel = 'New', label, ratio }) => {
            const frameRef = useRef(null);
            const [pos, setPos] = useState(50);
            const [dragging, setDragging] = useState(false);

            const setFromClientX = (clientX) => {
                const el = frameRef.current;
                if (!el) return;
                const rect = el.getBoundingClientRect();
                if (!rect.width) return;
                setPos(Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100)));
            };

            const onPointerDown = (event) => {
                if (event.button !== undefined && event.button > 0) return;   // primary button only
                setDragging(true);
                if (event.currentTarget.setPointerCapture && event.pointerId != null) {
                    try { event.currentTarget.setPointerCapture(event.pointerId); } catch (e) { /* not fatal */ }
                }
                setFromClientX(event.clientX);
            };

            const onPointerMove = (event) => { if (dragging) setFromClientX(event.clientX); };

            const endDrag = () => setDragging(false);

            const nudge = (event) => {
                const step = event.shiftKey ? 10 : 2;
                if (event.key === 'ArrowLeft') { event.preventDefault(); setPos((p) => Math.max(0, p - step)); }
                else if (event.key === 'ArrowRight') { event.preventDefault(); setPos((p) => Math.min(100, p + step)); }
                else if (event.key === 'Home') { event.preventDefault(); setPos(0); }
                else if (event.key === 'End') { event.preventDefault(); setPos(100); }
            };

            const rounded = Math.round(pos);

            return (
                <div
                    ref={frameRef}
                    onPointerDown={onPointerDown}
                    onPointerMove={onPointerMove}
                    onPointerUp={endDrag}
                    onPointerCancel={endDrag}
                    className="relative w-full overflow-hidden bg-[#EAEAE5] border border-[#D4D4D0] select-none"
                    style={{
                        aspectRatio: ratio,
                        touchAction: 'pan-y',
                        cursor: dragging ? 'grabbing' : 'ew-resize'
                    }}
                >
                    {/* Base layer: the redesign. */}
                    <picture>
                        <source srcSet={`${after}.webp`} type="image/webp" />
                        <img
                            src={`${after}.jpg`}
                            alt={afterAlt || `${label}, redesigned`}
                            draggable="false"
                            loading="lazy"
                            decoding="async"
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                    </picture>

                    {/* The original, clipped to the left of the divider. */}
                    <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
                        <picture>
                            <source srcSet={`${before}.webp`} type="image/webp" />
                            <img
                                src={`${before}.jpg`}
                                alt={beforeAlt || `${label}, original`}
                                draggable="false"
                                loading="lazy"
                                decoding="async"
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                        </picture>
                    </div>

                    {/* Labels fade out as their side runs out of room. */}
                    <span
                        aria-hidden="true"
                        className="absolute top-3 left-3 font-mono text-[9px] uppercase tracking-[0.24em] px-2 py-1 bg-white/90 text-[#111] transition-opacity duration-200 pointer-events-none"
                        style={{ opacity: pos > 12 ? 1 : 0 }}
                    >
                        {beforeLabel}
                    </span>
                    <span
                        aria-hidden="true"
                        className="absolute top-3 right-3 font-mono text-[9px] uppercase tracking-[0.24em] px-2 py-1 bg-white/90 text-[#111] transition-opacity duration-200 pointer-events-none"
                        style={{ opacity: pos < 88 ? 1 : 0 }}
                    >
                        {afterLabel}
                    </span>

                    <div
                        aria-hidden="true"
                        className="absolute inset-y-0 w-[2px] bg-white pointer-events-none"
                        style={{ left: `${pos}%`, transform: 'translateX(-1px)', boxShadow: '0 0 0 1px rgba(17,17,17,0.12)' }}
                    />

                    <button
                        type="button"
                        role="slider"
                        aria-label={`Compare ${label}: drag to reveal the redesign`}
                        aria-orientation="horizontal"
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-valuenow={rounded}
                        aria-valuetext={`${rounded}% original, ${100 - rounded}% redesigned`}
                        onKeyDown={nudge}
                        className="absolute top-1/2 w-11 h-11 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white border border-[#D4D4D0] shadow-sm flex items-center justify-center text-[#111] cursor-ew-resize focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111]"
                        style={{ left: `${pos}%` }}
                    >
                        <CompareGlyph />
                    </button>
                </div>
            );
        };

        // One media slot bound to a case study's manifest. Explicit aspect ratio
        // on every container means the layout is final before anything loads, so
        // nothing shifts. An entry is a still by default, or `kind: 'carousel'`
        // / `kind: 'video'`. A missing or broken source falls back to the
        // labelled placeholder rather than a broken-image icon.
        //
        // `caption` is copy, not alt text: it carries the argument in the short
        // versions, so it renders whether or not the media exists yet.
        const makeStudyMedia = (manifest) => ({ name, index, eager = false, caption, className = '' }) => {
            const shot = manifest[name];
            const [failed, setFailed] = useState(false);
            if (!shot) return null;

            const kind = shot.kind || 'image';
            const hasMedia =
                (kind === 'image' && shot.file && !failed) ||
                (kind === 'carousel' && ((shot.slides && shot.slides.length) || (shot.clips && shot.clips.length))) ||
                (kind === 'video' && shot.file) ||
                (kind === 'compare' && shot.before && shot.after);

            // The affordance belongs with the label rather than as extra chrome
            // stacked around the frame.
            const hint = hasMedia && kind === 'compare' ? ' · Drag to compare' : '';
            const label = `Image ${String(index).padStart(2, '0')}: ${shot.title}${hint}`;

            return (
                <Reveal>
                    <figure className={`m-0 ${className}`}>
                        {kind === 'carousel' && hasMedia ? (
                            <StudyCarousel
                                slides={shot.slides}
                                clips={shot.clips}
                                label={shot.title}
                                alt={shot.alt || shot.title}
                                ratio={shot.ratio}
                                eager={eager}
                            />
                        ) : kind === 'compare' && hasMedia ? (
                            <StudyCompare
                                before={shot.before}
                                after={shot.after}
                                beforeAlt={shot.beforeAlt}
                                afterAlt={shot.afterAlt}
                                beforeLabel={shot.beforeLabel}
                                afterLabel={shot.afterLabel}
                                label={shot.title}
                                ratio={shot.ratio}
                            />
                        ) : kind === 'video' && hasMedia ? (
                            <StudyVideo
                                file={shot.file}
                                poster={shot.poster || shot.file + '-poster'}
                                label={shot.title}
                                ratio={shot.ratio}
                            />
                        ) : (
                            <div
                                className={`w-full overflow-hidden bg-[#EAEAE5] ${hasMedia ? 'border border-[#D4D4D0]' : 'border border-dashed border-[#B4B4AC]'}`}
                                style={{ aspectRatio: shot.ratio }}
                            >
                                {hasMedia ? (
                                    <StudyPicture
                                        file={shot.file}
                                        alt={shot.alt || shot.title}
                                        eager={eager}
                                        onError={() => setFailed(true)}
                                    />
                                ) : (
                                    <StudySlotFallback label={label} note={shot.note} />
                                )}
                            </div>
                        )}

                        {(caption || hasMedia) && (
                            <figcaption className="pt-4">
                                {caption && (
                                    <span className="block text-base md:text-lg text-[#111] leading-relaxed max-w-2xl">
                                        {caption}
                                    </span>
                                )}
                                {hasMedia && (
                                    <span className={`block font-mono text-[10px] uppercase tracking-[0.18em] text-neutral-500 ${caption ? 'mt-3' : ''}`}>
                                        {label}
                                    </span>
                                )}
                            </figcaption>
                        )}
                    </figure>
                </Reveal>
            );
        };

        const EwaveImage = makeStudyMedia(EWAVE.images);

        // Image 09. The brief asks for typography only, big numbers, and a
        // deliberate pause in the scroll — so this is set in the page rather
        // than exported as a graphic, and inverted to #111. That ink is
        // already the site's second ground (contact, next project), so the
        // slab reads as part of the system rather than a new idea, and it is
        // the one moment in a long light page where the scroll stops.
        //
        // Hierarchy is the argument: the money figure is the headline, the
        // supporting numbers sit under a hairline grid, and the ratio gets the
        // last word because it is the only one that proves retention.
        const EwaveImpact = () => {
            const lead = EWAVE.metrics.find((m) => m.label === 'Processed');
            const since = EWAVE.metrics.find((m) => m.label === 'Since launch');
            const rest = EWAVE.metrics.filter((m) => m !== lead && m !== since);

            return (
                <Reveal>
                    <figure className="m-0">
                        <div className="bg-[#111] text-white px-6 py-14 md:px-14 md:py-20">
                            <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-neutral-800 pb-6">
                                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-neutral-500">// Impact</span>
                                <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-neutral-500">
                                    Live beta · {since.val}
                                </span>
                            </div>

                            {/* The headline figure. */}
                            <div className="pt-12 md:pt-16">
                                <Masked>
                                    <span className="block text-7xl md:text-[9rem] font-bold tracking-tighter leading-[0.82] tabular-nums">
                                        {lead.val}
                                    </span>
                                </Masked>
                                <div className="mt-6 flex flex-wrap items-baseline gap-x-5 gap-y-1">
                                    <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-neutral-400">{lead.label}</span>
                                    <span className="font-mono text-[11px] text-neutral-600">{lead.note}</span>
                                </div>
                            </div>

                            {/* Everything else, subordinate but not small. */}
                            <div className="mt-14 md:mt-20 grid grid-cols-2 md:grid-cols-4 border-t border-l border-neutral-800">
                                {rest.map((m) => (
                                    <div key={m.label} className="border-r border-b border-neutral-800 px-5 py-7 md:px-6 md:py-9">
                                        <span className="block text-3xl md:text-5xl font-bold tracking-tighter tabular-nums leading-none">
                                            {m.val}
                                        </span>
                                        <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-500 mt-4 leading-relaxed">
                                            {m.label}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <p className="mt-14 md:mt-16 text-xl md:text-3xl font-bold tracking-tighter leading-[1.2] max-w-2xl">
                                Roughly five transactions per user.{' '}
                                <span className="text-neutral-500">People are not trying it once.</span>
                            </p>
                        </div>
                        <figcaption className="pt-4 font-mono text-[10px] uppercase tracking-[0.18em] text-neutral-500">
                            Image 08: Impact
                        </figcaption>
                    </figure>
                </Reveal>
            );
        };

        // Persistent in the sticky header, so the way back from the full
        // version never requires scrolling. Real anchors, so middle-click and
        // "copy link address" behave.
        const EwaveVersionSwitch = ({ variant, variantHref, onSwitch }) => (
            <div className="flex items-center border border-[#D4D4D0] bg-white" role="group" aria-label="Case study length">
                {[['short', 'Short'], ['full', 'Full']].map(([value, label]) => {
                    const active = variant === value;
                    return (
                        <a
                            key={value}
                            href={variantHref(value)}
                            aria-current={active ? 'page' : undefined}
                            onClick={(event) => {
                                if (event.metaKey || event.ctrlKey || event.shiftKey || event.button === 1) return;
                                event.preventDefault();
                                if (!active) onSwitch(value);
                            }}
                            className={`px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111] ${active ? 'bg-[#111] text-white' : 'text-neutral-500 hover:text-[#111]'}`}
                        >
                            {label}
                        </a>
                    );
                })}
            </div>
        );

        const EwaveStatusRow = ({ items, kind }) => (
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                <StudyStatus kind={kind} />
                <span className="text-base md:text-lg text-neutral-700">{items.join(' · ')}</span>
            </div>
        );

        // ---------------------------------------------------------------
        // SHORT — the landing state. Complete on its own, image-led.
        // ---------------------------------------------------------------
        const EwaveShort = ({ onReadFull, fullHref }) => (
            <div>
                <header className="px-6 md:px-12 py-16 md:py-24">
                    <div className="max-w-5xl mx-auto">
                        <div className="max-w-3xl">
                            <Masked>
                                <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-8 text-[#111] leading-[0.9]">
                                    Ewave
                                </h1>
                            </Masked>
                            <Reveal delay={100}>
                                <p className="text-xl md:text-2xl text-neutral-600 leading-relaxed">
                                    {EWAVE.standfirst}
                                </p>
                            </Reveal>
                        </div>

                        <Reveal delay={150}>
                            <p className="mt-10 font-mono text-[11px] uppercase tracking-[0.18em] text-neutral-500">
                                {EWAVE.role} · {EWAVE.period} · {EWAVE.team}
                            </p>
                            <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.18em] text-neutral-500 leading-loose max-w-3xl">
                                {EWAVE.disciplines}
                            </p>
                        </Reveal>
                    </div>
                </header>

                <div className="px-6 md:px-12 mb-16 md:mb-24">
                    <div className="max-w-5xl mx-auto">
                        <EwaveImage name="hero" index={1} eager />
                    </div>
                </div>

                {/* The numbers, before anything else asks for attention. */}
                <section className="px-6 md:px-12 pb-16 md:pb-24 border-b border-[#D4D4D0]">
                    <div className="max-w-5xl mx-auto">
                        <StudyMetrics items={EWAVE.headline} />
                        <Reveal>
                            <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.18em] text-neutral-500">
                                Over 2-3 months of live beta. Roughly five transactions per user.
                            </p>
                        </Reveal>
                    </div>
                </section>

                <section className="px-6 md:px-12 py-16 md:py-24 bg-white border-b border-[#D4D4D0]">
                    <div className="max-w-5xl mx-auto">
                        <ChapterMark n="·" title="What I did" className="mb-10" />
                        <div className="max-w-3xl space-y-6">
                            <Reveal>
                                <StudyP>
                                    Ewave helps Africans turn stablecoins into money they can actually use. I joined as the only
                                    designer and rebuilt the product end to end: flows, interaction design, design system, and all
                                    three surfaces.
                                </StudyP>
                            </Reveal>
                            <Reveal delay={80}>
                                <StudyP>The beta shipped first, and it is live now.</StudyP>
                            </Reveal>
                        </div>
                    </div>
                </section>

                {/* --- The beta --- */}
                <section data-section="beta" className="study-anchor px-6 md:px-12 py-16 md:py-24 border-b border-[#D4D4D0]">
                    <div className="max-w-5xl mx-auto">
                        <Reveal>
                            <div className="flex flex-wrap items-baseline justify-between gap-4 border-t border-[#111] pt-6 mb-8">
                                <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-[#111]">
                                    The beta asks for nothing
                                </h2>
                                <StudyStatus kind="live" />
                            </div>
                        </Reveal>

                        <div className="max-w-3xl space-y-6">
                            <Reveal>
                                <StudyP>
                                    No account. No signup. No KYC under the stated limit. Pick your token and network, enter an
                                    amount, choose your bank, send from the wallet you already have. The naira lands in about ten
                                    seconds.
                                </StudyP>
                            </Reveal>
                            <Reveal delay={80}>
                                <StudyP>
                                    I cut the four steps every off-ramp normally requires, because each one is a place people leave.
                                </StudyP>
                            </Reveal>
                        </div>

                        <div className="mt-12">
                            <EwaveImage name="betaMain" index={2} />
                        </div>

                        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12">
                            <div>
                                <Reveal>
                                    <p className="text-lg md:text-xl text-[#111] font-semibold tracking-tight mb-3">
                                        The rate locks, and you can watch the timer.
                                    </p>
                                    <StudyP>No estimate that drifts while you find your account number.</StudyP>
                                </Reveal>
                                <div className="mt-6">
                                    <EwaveImage name="lockedRate" index={3} />
                                </div>
                            </div>
                            <div>
                                <Reveal>
                                    <p className="text-lg md:text-xl text-[#111] font-semibold tracking-tight mb-3">
                                        The bank account resolves to a name.
                                    </p>
                                    <StudyP>The last thing you check is a person, not digits.</StudyP>
                                </Reveal>
                                <div className="mt-6">
                                    <EwaveImage name="bankSelection" index={4} />
                                </div>
                            </div>
                        </div>

                        <div className="mt-16 max-w-3xl">
                            <Reveal>
                                <p className="text-lg md:text-xl text-[#111] font-semibold tracking-tight mb-3">
                                    The receipt is the record.
                                </p>
                                <StudyP>Complete and downloadable, because there is no account to store history in.</StudyP>
                            </Reveal>
                        </div>
                        <div className="mt-8">
                            <EwaveImage name="receipt" index={5} />
                        </div>

                        <div className="mt-10">
                            <StudyLink href={EWAVE.links.beta} label="Open the live beta" hint="No account needed." />
                        </div>
                    </div>
                </section>

                {/* --- The account product --- */}
                <section data-section="account" className="study-anchor px-6 md:px-12 py-16 md:py-24 bg-white border-b border-[#D4D4D0]">
                    <div className="max-w-5xl mx-auto">
                        <Reveal>
                            <div className="flex flex-wrap items-baseline justify-between gap-4 border-t border-[#111] pt-6 mb-8">
                                <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-[#111]">
                                    Then the product it becomes
                                </h2>
                                <StudyStatus kind="building" />
                            </div>
                        </Reveal>

                        <div className="max-w-3xl">
                            <Reveal>
                                <StudyP>
                                    An account, a balance, bills, payment links, transfers across Africa. To offer that I had to ask
                                    for identity, credentials and custody, which are exactly the things the beta was built to avoid.
                                </StudyP>
                            </Reveal>
                        </div>

                        <div className="mt-12 space-y-10">
                            <EwaveImage name="dashboard" index={6} />
                            <EwaveImage name="mobileHome" index={7} />
                        </div>

                        <div className="mt-16 max-w-3xl">
                            <Reveal>
                                <p className="text-lg md:text-xl text-[#111] font-semibold tracking-tight mb-3">
                                    Verification you can start without.
                                </p>
                                <StudyP>
                                    An unverified account cannot move money, by law. But people reach that step without their
                                    documents to hand. I added Skip for now, so you get the account and finish verifying when you can.
                                </StudyP>
                            </Reveal>
                        </div>
                        <div className="mt-8">
                            <EwaveImage name="verification" index={8} />
                        </div>

                        <div className="mt-16 max-w-3xl">
                            <Reveal>
                                <p className="text-lg md:text-xl text-[#111] font-semibold tracking-tight mb-3">
                                    Bills priced in naira, paid from a dollar balance.
                                </p>
                                <StudyP>
                                    ₦2,000 of airtime should not require selling dollars first, waiting, then buying. The conversion
                                    happens underneath. Both figures show before you confirm.
                                </StudyP>
                            </Reveal>
                        </div>
                        <div className="mt-8">
                            <EwaveImage name="bills" index={9} />
                        </div>

                        <div data-section="mobile" className="study-anchor mt-16 max-w-3xl">
                            <Reveal>
                                <p className="text-lg md:text-xl text-[#111] font-semibold tracking-tight mb-3">
                                    Mobile designed independently, not shrunk from desktop.
                                </p>
                                <StudyP>
                                    It is the primary surface here, so I rebuilt the hierarchy around how often people do things
                                    rather than inheriting a layout built for a laptop.
                                </StudyP>
                            </Reveal>
                        </div>
                        <div className="mt-8">
                            <EwaveImage name="sendAndInternational" index={10} />
                        </div>
                    </div>
                </section>

                {/* --- Network selection --- */}
                <section data-section="network" className="study-anchor px-6 md:px-12 py-16 md:py-24 border-b border-[#D4D4D0]">
                    <div className="max-w-5xl mx-auto">
                        <Reveal>
                            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-[#111] border-t border-[#111] pt-6 mb-8">
                                Where I deliberately made it harder
                            </h2>
                        </Reveal>

                        <div className="max-w-3xl space-y-6">
                            <Reveal>
                                <StudyP>
                                    Send USDC on the wrong network and the money is gone. No reversal, no recovery.
                                </StudyP>
                            </Reveal>
                            <Reveal delay={80}>
                                <StudyP>
                                    That is the one place simplifying is a liability. So asset and network come before the address and
                                    amount, and the network is repeated on the review screen instead of being treated as settled. If
                                    someone catches their own mistake, it happens there.
                                </StudyP>
                            </Reveal>
                        </div>

                        <div className="mt-12">
                            <EwaveImage name="networkAndReview" index={11} />
                        </div>

                        <div className="mt-14 max-w-4xl border-t border-[#111] pt-10">
                            <StudyStatement>
                                Absorb every complexity{' '}
                                <span className="text-neutral-400">except the ones a user cannot recover from.</span>
                            </StudyStatement>
                        </div>
                    </div>
                </section>

                {/* --- Status --- */}
                <section data-section="status" className="study-anchor px-6 md:px-12 py-16 md:py-24 bg-white border-b border-[#D4D4D0]">
                    <div className="max-w-5xl mx-auto">
                        <ChapterMark n="·" title="Status" className="mb-10" />
                        <div className="space-y-5 max-w-3xl">
                            <Reveal><EwaveStatusRow kind="live" items={EWAVE.status.live} /></Reveal>
                            <Reveal delay={80}><EwaveStatusRow kind="building" items={EWAVE.status.building} /></Reveal>
                            <Reveal delay={160}><EwaveStatusRow kind="future" items={EWAVE.status.future} /></Reveal>
                        </div>

                        <div className="mt-12">
                            <EwaveImage name="currentState" index={12} />
                        </div>

                        <Reveal>
                            <div className="mt-12 flex flex-col sm:flex-row gap-6">
                                <StudyLink href={EWAVE.links.website} label="Visit the live website" />
                                <StudyLink href={EWAVE.links.beta} label="Open the live beta" />
                            </div>
                        </Reveal>
                    </div>
                </section>

                {/* The doorway to the long version. */}
                <section className="px-6 md:px-12 py-16 md:py-24 border-b border-[#D4D4D0]">
                    <div className="max-w-5xl mx-auto">
                        <a
                            href={fullHref}
                            onClick={(event) => {
                                if (event.metaKey || event.ctrlKey || event.shiftKey || event.button === 1) return;
                                event.preventDefault();
                                onReadFull();
                            }}
                            className="group block border-t border-[#111] pt-8 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#111]"
                        >
                            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-neutral-500 block mb-5">
                                // Keep reading
                            </span>
                            <div className="flex items-start justify-between gap-8">
                                <div className="max-w-2xl">
                                    <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-[#111] mb-4 group-hover:text-neutral-600 transition-colors">
                                        Read the full case study
                                    </h2>
                                    <p className="text-lg text-neutral-600 leading-relaxed">
                                        The reasoning behind each decision, what the beta taught us, and how the three surfaces hold
                                        together.
                                    </p>
                                </div>
                                <div className="w-12 h-12 shrink-0 border border-[#D4D4D0] flex items-center justify-center group-hover:bg-[#111] group-hover:text-white transition-colors">
                                    <ArrowRight size={20} />
                                </div>
                            </div>
                        </a>
                    </div>
                </section>
            </div>
        );

        // ---------------------------------------------------------------
        // FULL — the reasoning. Same data, same visual language.
        // ---------------------------------------------------------------
        const EwaveFull = ({ onReadShort, shortHref }) => (
            <div>
                <header className="px-6 md:px-12 py-16 md:py-24">
                    <div className="max-w-5xl mx-auto">
                        <div className="max-w-3xl">
                            <Masked>
                                <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-8 text-[#111] leading-[0.9]">
                                    Ewave
                                </h1>
                            </Masked>
                            <Reveal delay={100}>
                                <p className="text-xl md:text-2xl text-neutral-600 leading-relaxed">{EWAVE.standfirst}</p>
                            </Reveal>
                        </div>

                        <div className="mt-16 border-t border-b border-[#D4D4D0] py-8">
                            <Reveal delay={100}>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                                    <div>
                                        <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-500 block mb-2">Role</span>
                                        <span className="font-medium text-sm md:text-base">{EWAVE.role}</span>
                                    </div>
                                    <div>
                                        <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-500 block mb-2">Period</span>
                                        <span className="font-medium text-sm md:text-base">{EWAVE.period}</span>
                                    </div>
                                    <div>
                                        <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-500 block mb-2">Client</span>
                                        <span className="font-medium text-sm md:text-base">Ewave Finance</span>
                                    </div>
                                    <div>
                                        <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-500 block mb-2">Team</span>
                                        <span className="font-medium text-sm md:text-base">{EWAVE.team}</span>
                                    </div>
                                </div>
                            </Reveal>
                        </div>

                        <Reveal delay={150}>
                            <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.18em] text-neutral-500 leading-loose max-w-3xl">
                                {EWAVE.disciplines}
                            </p>
                        </Reveal>

                        <StudyMetrics items={EWAVE.metrics} className="mt-12" />

                        <Reveal delay={100}>
                            <div className="mt-14 border-t border-[#111] pt-8 max-w-3xl">
                                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-neutral-500 block mb-5">// The short version</span>
                                <p className="text-xl md:text-2xl text-[#111] leading-relaxed">
                                    I joined Ewave in mid-2025 as the only designer. I designed a beta that asks for nothing: no
                                    account, no signup, no KYC under the stated limit. It shipped, and in under three months 200+
                                    users ran more than 1,000 transactions through it. Then I designed the product it becomes.
                                </p>
                            </div>
                        </Reveal>
                    </div>
                </header>

                <div className="px-6 md:px-12 mb-16 md:mb-24">
                    <div className="max-w-5xl mx-auto">
                        <EwaveImage name="hero" index={1} eager />
                    </div>
                </div>

                <section className="px-6 md:px-12 pb-16 md:pb-24 border-b border-[#D4D4D0]">
                    <div className="max-w-3xl mx-auto">
                        <Reveal>
                            <div className="border border-[#D4D4D0] bg-white p-6 md:p-8">
                                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-500 block mb-3">On status</span>
                                <p className="text-base md:text-lg text-neutral-700 leading-relaxed">
                                    This covers work at four stages. Everything is labelled:{' '}
                                    <strong className="text-[#111] font-semibold">Live</strong>,{' '}
                                    <strong className="text-[#111] font-semibold">Designed</strong>,{' '}
                                    <strong className="text-[#111] font-semibold">In development</strong>,{' '}
                                    <strong className="text-[#111] font-semibold">Future</strong>.
                                </p>
                            </div>
                        </Reveal>
                    </div>
                </section>

                {/* 01 */}
                <section className="px-6 md:px-12 py-16 md:py-24 bg-white border-b border-[#D4D4D0]">
                    <div className="max-w-5xl mx-auto">
                        <ChapterMark n="01" title="The problem I was designing for" className="mb-12" />
                        <div className="max-w-3xl space-y-6">
                            <Reveal>
                                <StudyP>
                                    Stablecoins solved storage for a lot of Africans. If you get paid from abroad, or you want to
                                    protect savings from a moving naira, you can hold dollars without a dollar account.
                                </StudyP>
                            </Reveal>
                            <Reveal delay={80}>
                                <StudyP>
                                    Spending is the hard part. The dollars sit in a wallet. Getting them into a bank account, or into
                                    airtime, or to family in Nairobi, takes long enough that most people never bother.
                                </StudyP>
                            </Reveal>
                            <Reveal delay={160}>
                                <StudyP>
                                    I was designing the bridge. Everything that makes crypto work (networks, addresses, tokens,
                                    irreversibility) is invisible to that goal and dangerous to the user. But hiding all of it is not
                                    an option either, because financial products earn trust by being readable.
                                </StudyP>
                            </Reveal>
                        </div>

                        <div className="mt-14 max-w-4xl border-t border-[#111] pt-10">
                            <StudyStatement>
                                How much of the machinery does someone need to see to trust the outcome,{' '}
                                <span className="text-neutral-400">and how much is just in the way?</span>
                            </StudyStatement>
                        </div>
                    </div>
                </section>

                {/* 02 */}
                <section className="px-6 md:px-12 py-16 md:py-24 border-b border-[#D4D4D0]">
                    <div className="max-w-5xl mx-auto">
                        <ChapterMark n="02" title="What I owned" className="mb-12" />
                        <div className="max-w-3xl space-y-6">
                            <Reveal>
                                <StudyP>
                                    Sole Product Designer. I worked directly with the founder, a frontend developer and a backend
                                    developer.
                                </StudyP>
                            </Reveal>
                            <Reveal delay={80}>
                                <StudyP>
                                    I owned the product end to end: structure, flows, interaction design, edge cases, the design
                                    system, and all three surfaces. The logo came from a graphic designer. Everything after that was
                                    mine, including colour, typography, hierarchy, and how the identity behaves under real numbers. I
                                    also worked with the frontend developer through implementation of the live website.
                                </StudyP>
                            </Reveal>
                        </div>
                    </div>
                </section>

                {/* 03 */}
                <section data-section="beta" className="study-anchor px-6 md:px-12 py-16 md:py-24 bg-white border-b border-[#D4D4D0]">
                    <div className="max-w-5xl mx-auto">
                        <ChapterMark n="03" title="What I designed first: a product that asks for nothing" className="mb-8" />
                        <Reveal>
                            <div className="mb-10"><StudyStatus kind="live" /></div>
                        </Reveal>

                        <div className="max-w-3xl space-y-6">
                            <Reveal>
                                <StudyP>
                                    The normal way to build an off-ramp is: create an account, verify your identity, fund a balance,
                                    withdraw. That is four commitments before a single naira moves. Every one of them is a place people
                                    leave.
                                </StudyP>
                            </Reveal>
                            <Reveal delay={80}>
                                <StudyP>I cut all four.</StudyP>
                            </Reveal>
                            <Reveal delay={160}>
                                <StudyP>
                                    The beta is one screen. What you send on top, what you receive below, your bank underneath. It is
                                    non-custodial, so you send from your own wallet and Ewave never holds your money. Under the stated
                                    limit there is no identity check at all.
                                </StudyP>
                            </Reveal>
                        </div>

                        <div className="mt-12">
                            <EwaveImage name="betaMain" index={2} />
                        </div>

                        <div className="mt-16 max-w-3xl">
                            <Reveal>
                                <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-[#111] mb-8">
                                    Three decisions carry that screen
                                </h3>
                            </Reveal>
                        </div>

                        <div className="max-w-3xl space-y-6">
                            <Reveal>
                                <StudyP>
                                    <strong className="text-[#111] font-semibold">I locked the rate and made the countdown visible.</strong>{' '}
                                    The naira figure is not an estimate that drifts while you find your account number. It holds, and
                                    you can see for how long. Rate ambiguity is the biggest source of doubt in any exchange product. A
                                    visible timer turns a worry into something you can watch.
                                </StudyP>
                            </Reveal>
                        </div>
                        <div className="mt-8">
                            <EwaveImage name="lockedRate" index={3} />
                        </div>

                        <div className="mt-14 max-w-3xl">
                            <Reveal>
                                <StudyP>
                                    <strong className="text-[#111] font-semibold">I made the bank account resolve to a name.</strong>{' '}
                                    You pick a bank, type the number, and the recipient's name appears before anything is sent. The
                                    last thing you check is a person, not a string of digits.
                                </StudyP>
                            </Reveal>
                        </div>
                        <div className="mt-8">
                            <EwaveImage name="bankSelection" index={4} />
                        </div>

                        <div className="mt-14 max-w-3xl">
                            <Reveal>
                                <StudyP>
                                    <strong className="text-[#111] font-semibold">I made the receipt complete.</strong> Sent, received,
                                    address, recipient, reference, status, time to arrive, downloadable. In a product with no account
                                    and no history, the receipt is the only record a user gets.
                                </StudyP>
                            </Reveal>
                        </div>
                        <div className="mt-8 space-y-10">
                            <EwaveImage name="receipt" index={5} />
                            <EwaveImage name="tokenNetwork" index={6} />
                            <EwaveImage name="processing" index={7} />
                        </div>

                        <div className="mt-12">
                            <StudyLink href={EWAVE.links.beta} label="Open the live beta" hint="Genuinely open. No account needed." />
                        </div>
                    </div>
                </section>

                {/* 04 */}
                <section className="px-6 md:px-12 py-16 md:py-24 border-b border-[#D4D4D0]">
                    <div className="max-w-5xl mx-auto">
                        <ChapterMark n="04" title="What it proved" className="mb-12" />

                        <StudyMetrics items={EWAVE.metrics} />

                        <div className="max-w-3xl mt-14 space-y-6">
                            <Reveal>
                                <StudyP>
                                    The ratio matters more than the totals. That is roughly five transactions per user. People are not
                                    trying it once.
                                </StudyP>
                            </Reveal>
                            <Reveal delay={80}>
                                <StudyP>
                                    The speed figure also means something different here. There is no onboarding to be fast at. The
                                    first transaction is the first action.
                                </StudyP>
                            </Reveal>
                            <Reveal delay={160}>
                                <StudyP>
                                    Our beta users are not anonymous traffic. They are a community on WhatsApp and social channels that
                                    the team talks to directly. They report problems, ask for features, and are waiting on the next
                                    version. That is not formal research and I will not dress it up as research. But it is a tighter
                                    feedback loop than most products get, and it is what I am designing the account product against.
                                </StudyP>
                            </Reveal>
                        </div>

                        <div className="mt-14">
                            <EwaveImpact />
                        </div>
                    </div>
                </section>

                {/* 05 */}
                <section data-section="account" className="study-anchor px-6 md:px-12 py-16 md:py-24 bg-white border-b border-[#D4D4D0]">
                    <div className="max-w-5xl mx-auto">
                        <ChapterMark n="05" title="What I designed next: earning the right to ask for more" className="mb-8" />
                        <Reveal>
                            <div className="mb-10"><StudyStatus kind="building" /></div>
                        </Reveal>

                        <div className="max-w-3xl space-y-6">
                            <Reveal>
                                <StudyP>
                                    The beta is small on purpose. One action, one direction, one country. It forgets you when you close
                                    the tab.
                                </StudyP>
                            </Reveal>
                            <Reveal delay={80}>
                                <StudyP>
                                    The web app is a different proposition. An account, a balance, history, bill payment, payment links,
                                    send and receive. To offer that, I had to ask for the three things the beta was built to avoid:
                                    identity, credentials, and custody.
                                </StudyP>
                            </Reveal>
                        </div>

                        <div className="mt-12 max-w-4xl border-t border-[#111] pt-10">
                            <StudyStatement>
                                Not how to add features.{' '}
                                <span className="text-neutral-400">
                                    How to ask for commitment from people who chose us because we asked for none.
                                </span>
                            </StudyStatement>
                        </div>

                        <div className="mt-14">
                            <EwaveImage name="dashboard" index={9} />
                        </div>

                        <div className="mt-16 max-w-3xl">
                            <Reveal>
                                <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-[#111] mb-6">
                                    Verification you can start without
                                </h3>
                            </Reveal>
                            <div className="space-y-6">
                                <Reveal>
                                    <StudyP>
                                        Nigerian law is clear. An unverified account cannot move money. That is not our rule and it is
                                        not negotiable.
                                    </StudyP>
                                </Reveal>
                                <Reveal delay={80}>
                                    <StudyP>
                                        But people often reach verification at the exact moment they cannot complete it. The BVN is not
                                        to hand. The ID is on another phone. Blocking account creation there does not produce a verified
                                        user. It produces someone who leaves.
                                    </StudyP>
                                </Reveal>
                                <Reveal delay={160}>
                                    <StudyP>
                                        So I put <strong className="text-[#111] font-semibold">Skip for now</strong> on it. You get an
                                        account and a dashboard that is yours. You just cannot move money until you finish, and the
                                        product tells you so instead of letting you find out at the worst moment. Verification is
                                        progressive, and the prompt stays on your dashboard until it is done.
                                    </StudyP>
                                </Reveal>
                                <Reveal delay={240}>
                                    <StudyP>
                                        The friction I removed was not the compliance. It was the abandonment.
                                    </StudyP>
                                </Reveal>
                            </div>
                        </div>
                        <div className="mt-8">
                            <EwaveImage name="verification" index={10} />
                        </div>

                        <div className="mt-16 max-w-3xl">
                            <Reveal>
                                <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-[#111] mb-6">
                                    Trust through familiarity, not explanation
                                </h3>
                            </Reveal>
                            <div className="space-y-6">
                                <Reveal>
                                    <StudyP>
                                        Custody was the bigger change. The beta never touches user funds. The account product holds a
                                        balance.
                                    </StudyP>
                                </Reveal>
                                <Reveal delay={80}>
                                    <StudyP>
                                        I chose not to invent an answer to that. Ewave is not the first fintech in this market and our
                                        users are not new to the category. They have used Nigerian fintech apps. They know what a
                                        transaction PIN is for. They know why KYC exists. And Ewave works through established licensed
                                        partners rather than holding funds itself.
                                    </StudyP>
                                </Reveal>
                                <Reveal delay={160}>
                                    <StudyP>
                                        So I designed the interface to behave the way their existing financial apps behave. A PIN
                                        authorises anything that moves value. Security settings sit where you expect them. The dashboard
                                        reads like a banking dashboard. Trust carries over from products people already use.
                                    </StudyP>
                                </Reveal>
                                <Reveal delay={240}>
                                    <StudyP>
                                        That restraint was deliberate. The instinct in a regulated market is to over-explain: long
                                        reassurance copy, security badges, a tour of your compliance posture. All of that signals
                                        novelty, which is the opposite of what a financial product wants to signal.
                                    </StudyP>
                                </Reveal>
                            </div>
                        </div>

                        <div className="mt-16 max-w-3xl">
                            <Reveal>
                                <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-[#111] mb-6">
                                    The smallest feature, and the point of the whole product
                                </h3>
                            </Reveal>
                            <div className="space-y-6">
                                <Reveal>
                                    <StudyP>
                                        Someone holding stablecoin who wants ₦2,000 of airtime should not have to sell dollars, wait for
                                        naira, then go buy airtime. That is three products and a delay for something that should be one
                                        tap.
                                    </StudyP>
                                </Reveal>
                                <Reveal delay={80}>
                                    <StudyP>
                                        So I priced bills in naira. Airtime, data, electricity, cable. The conversion happens underneath.
                                        The user pays a naira amount, the balance stays in dollars, and both figures are visible before
                                        the PIN. They never perform an exchange. They just pay their bill.
                                    </StudyP>
                                </Reveal>
                                <Reveal delay={160}>
                                    <StudyP>
                                        This is the beta's idea applied to daily life. The beta removed the account so people could get
                                        their money out fast. Bills removes the exchange so they do not have to get it out at all.
                                    </StudyP>
                                </Reveal>
                            </div>
                        </div>

                        <div className="mt-8 space-y-10">
                            <EwaveImage name="bills" index={11} />
                            <EwaveImage name="paymentLinks" index={12} />
                        </div>
                    </div>
                </section>

                {/* 06 */}
                <section data-section="mobile" className="study-anchor px-6 md:px-12 py-16 md:py-24 border-b border-[#D4D4D0]">
                    <div className="max-w-5xl mx-auto">
                        <ChapterMark n="06" title="How I designed mobile" className="mb-8" />
                        <Reveal>
                            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-neutral-500 mb-10">
                                In design, approaching implementation
                            </p>
                        </Reveal>

                        <div className="max-w-3xl space-y-6">
                            <Reveal>
                                <StudyP>The obvious move was to shrink the web app onto a phone. I did not do that.</StudyP>
                            </Reveal>
                            <Reveal delay={80}>
                                <StudyP>
                                    Mobile is expected to be the primary surface here, not the secondary one. A design that comes down
                                    from desktop inherits a hierarchy built for someone sitting at a laptop reviewing their finances.
                                    That is not someone standing in a queue trying to send money.
                                </StudyP>
                            </Reveal>
                            <Reveal delay={160}>
                                <StudyP>
                                    So I rebuilt the information architecture around how often people do things. Send, receive, pay and
                                    wallets sit on the home screen. The balance leads in dollars with the naira value directly beneath
                                    it, because that is the dual currency people actually think in.
                                </StudyP>
                            </Reveal>
                        </div>

                        <div className="mt-12">
                            <EwaveImage name="mobileHome" index={13} />
                        </div>

                        <div className="mt-16 max-w-3xl space-y-6">
                            <Reveal>
                                <StudyP>
                                    <strong className="text-[#111] font-semibold">I put the transaction PIN in onboarding</strong>,
                                    before there is any money in the account. It is the last step of signup rather than an interruption
                                    the first time someone tries to send. Security setup is cheapest at the moment of lowest stakes, and
                                    it means the PIN prompt is recognised later rather than met for the first time.
                                </StudyP>
                            </Reveal>
                            <Reveal delay={80}>
                                <StudyP>
                                    <strong className="text-[#111] font-semibold">I created the Ewave ID at signup too.</strong> Sending
                                    to another user is a username, not an account number. That removes the most error-prone field in
                                    peer to peer transfer, at least for the transfers where we control both ends.
                                </StudyP>
                            </Reveal>
                        </div>

                        <div className="mt-8">
                            <EwaveImage name="onboarding" index={14} />
                        </div>

                        <div className="mt-16 max-w-3xl">
                            <Reveal>
                                <StudyP>
                                    Mobile is also where the product becomes borderless. International transfer covers the continent:
                                    recipient country, amount, purpose of transfer. I collected the compliance data as an ordinary form
                                    field next to the recipient's name rather than as a checkpoint. Multi-currency fiat wallets appear
                                    in the app labelled <em>coming soon</em>, which is the same status honesty this case study uses,
                                    applied inside the product.
                                </StudyP>
                            </Reveal>
                        </div>

                        <div className="mt-12">
                            <EwaveImage name="sendAndInternational" index={15} />
                        </div>
                    </div>
                </section>

                {/* 07 */}
                <section data-section="network" className="study-anchor px-6 md:px-12 py-16 md:py-24 bg-white border-b border-[#D4D4D0]">
                    <div className="max-w-5xl mx-auto">
                        <ChapterMark n="07" title="Where I broke my own rule" className="mb-8" />
                        <Reveal>
                            <div className="mb-10"><StudyStatus kind="designed" /></div>
                        </Reveal>

                        <div className="max-w-3xl space-y-6">
                            <Reveal>
                                <StudyP>
                                    Everything above is one argument. Absorb the complexity. Ask for as little as possible. Let
                                    familiarity do the explaining.
                                </StudyP>
                            </Reveal>
                            <Reveal delay={80}>
                                <StudyP>Network selection is where I stopped.</StudyP>
                            </Reveal>
                            <Reveal delay={160}>
                                <StudyP>
                                    Send USDC on a chain the destination wallet does not support and the money is gone. No reversal. No
                                    recovery. No support ticket that helps. It is also meaningless to someone who came here to hold
                                    dollars and has no reason to know what Solana is.
                                </StudyP>
                            </Reveal>
                            <Reveal delay={240}>
                                <StudyP>
                                    This is the one place where simplifying is a liability rather than a kindness. So I designed the
                                    opposite way, for comprehension instead of speed.
                                </StudyP>
                            </Reveal>
                        </div>

                        <div className="mt-14 max-w-3xl space-y-10">
                            <Reveal>
                                <div>
                                    <h4 className="font-mono text-xs uppercase tracking-[0.18em] text-[#111] mb-4">// In the send flow</h4>
                                    <StudyP>
                                        Asset and network come before the address and amount. The ordering is the decision. Someone who
                                        has already pasted an address and typed an amount is committed, and a network selector arriving
                                        then reads as an obstacle to dismiss rather than a choice to make. The step carries a plain
                                        warning written as consequence, not policy: verify the network matches your destination wallet,
                                        wrong network means lost funds.
                                    </StudyP>
                                </div>
                            </Reveal>
                            <Reveal>
                                <div>
                                    <h4 className="font-mono text-xs uppercase tracking-[0.18em] text-[#111] mb-4">// Then I repeated the network</h4>
                                    <StudyP>
                                        Recipient, amount, network, total, restated before confirmation. That repetition is the actual
                                        safeguard. The convenient pattern is to collect the network once and treat it as settled. But the
                                        one irreversible variable in the transaction is exactly the one that should still be visible at
                                        the moment of commitment. If someone catches their own mistake, it happens here.
                                    </StudyP>
                                </div>
                            </Reveal>
                            <Reveal>
                                <div>
                                    <h4 className="font-mono text-xs uppercase tracking-[0.18em] text-[#111] mb-4">// Receiving has the same problem in reverse</h4>
                                    <StudyP>
                                        An address generated for the wrong network is just as lossy. So the user picks a network first,
                                        sees it on the address screen, is warned to send only that asset on that chain, and only then
                                        gets the QR and address.
                                    </StudyP>
                                </div>
                            </Reveal>
                        </div>

                        <div className="mt-14">
                            <EwaveImage name="networkAndReview" index={16} />
                        </div>
                    </div>
                </section>

                {/* 08 */}
                <section data-section="status" className="study-anchor px-6 md:px-12 py-16 md:py-24 border-b border-[#D4D4D0]">
                    <div className="max-w-5xl mx-auto">
                        <ChapterMark n="08" title="The system holding it together" className="mb-12" />

                        <div className="max-w-4xl">
                            <StudyStatement>
                                Website: understand it. Web app: manage it.{' '}
                                <span className="text-neutral-400">Mobile: live in it.</span>
                            </StudyStatement>
                        </div>

                        <div className="max-w-3xl mt-12">
                            <Reveal>
                                <StudyP>
                                    Three surfaces with three different architectures only read as one product if what sits underneath
                                    is shared. Components, transaction states, confirmation patterns, the way numbers behave under
                                    pressure. That is what let me rebuild mobile from scratch without it feeling like a different
                                    company made it.
                                </StudyP>
                            </Reveal>
                        </div>

                        <div className="mt-16 space-y-5 max-w-3xl">
                            <Reveal><EwaveStatusRow kind="live" items={EWAVE.status.live} /></Reveal>
                            <Reveal delay={80}><EwaveStatusRow kind="building" items={EWAVE.status.building} /></Reveal>
                            <Reveal delay={160}><EwaveStatusRow kind="future" items={EWAVE.status.future} /></Reveal>
                        </div>

                        <div className="max-w-3xl mt-12">
                            <Reveal>
                                <StudyP>
                                    The beta answered whether the idea works, not how well. Next I would instrument step level drop off,
                                    verification completion by tier, repeat frequency by cohort, and abandonment at network selection
                                    specifically. That last one has the highest theoretical drop off and no data behind it yet.
                                </StudyP>
                            </Reveal>
                        </div>

                        <div className="mt-12">
                            <EwaveImage name="currentState" index={17} />
                        </div>
                    </div>
                </section>

                {/* In short */}
                <section className="px-6 md:px-12 py-16 md:py-24 bg-white border-b border-[#D4D4D0]">
                    <div className="max-w-5xl mx-auto">
                        <ChapterMark n="·" title="In short" className="mb-12" />
                        <div className="max-w-3xl space-y-6">
                            <Reveal>
                                <StudyP>
                                    I joined a lean team with an existing product and one designer's worth of everything. Strategy, UX,
                                    visual language, design system, three surfaces, and the engineering conversations that turned them
                                    into code.
                                </StudyP>
                            </Reveal>
                            <Reveal delay={80}>
                                <StudyP>
                                    I shipped a beta that asks nothing of anyone, and people came back roughly five times each. The
                                    product I am designing now asks them for a lot more. Most of my work is making sure it is worth it.
                                </StudyP>
                            </Reveal>
                        </div>

                        <Reveal>
                            <div className="mt-12 flex flex-col sm:flex-row gap-6">
                                <StudyLink href={EWAVE.links.website} label="Visit the live website" />
                                <StudyLink href={EWAVE.links.beta} label="Open the live beta" />
                            </div>
                        </Reveal>
                    </div>
                </section>

                {/* Back to the short version, for readers who reached the end. */}
                <section className="px-6 md:px-12 py-16 md:py-24 border-b border-[#D4D4D0]">
                    <div className="max-w-5xl mx-auto">
                        <a
                            href={shortHref}
                            onClick={(event) => {
                                if (event.metaKey || event.ctrlKey || event.shiftKey || event.button === 1) return;
                                event.preventDefault();
                                onReadShort();
                            }}
                            className="group block border-t border-[#111] pt-8 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#111]"
                        >
                            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-neutral-500 block mb-5">
                                // Shorter
                            </span>
                            <div className="flex items-start justify-between gap-8">
                                <div className="max-w-2xl">
                                    <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-[#111] mb-4 group-hover:text-neutral-600 transition-colors">
                                        Back to the short version
                                    </h2>
                                    <p className="text-lg text-neutral-600 leading-relaxed">
                                        The same story, image-led, in about two minutes.
                                    </p>
                                </div>
                                <div className="w-12 h-12 shrink-0 border border-[#D4D4D0] flex items-center justify-center group-hover:bg-[#111] group-hover:text-white transition-colors">
                                    <ArrowLeft size={20} />
                                </div>
                            </div>
                        </a>
                    </div>
                </section>
            </div>
        );

        // Shared chrome: sticky bar with the persistent version switch, and
        // the next-project footer both versions end on.
        const EwaveCaseStudy = ({ variant = 'short', onBack, onNext, onSwitchVariant, variantHref }) => {
            const isFull = variant === 'full';

            return (
                <div className="min-h-screen bg-[#F4F4F2]">
                    <div className="sticky top-0 z-40 bg-[#F4F4F2]/90 backdrop-blur border-b border-[#D4D4D0] px-4 sm:px-6 py-3 flex justify-between items-center gap-4">
                        <button
                            onClick={onBack}
                            className="group flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-neutral-500 hover:text-black transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111]"
                        >
                            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                            <span className="hidden sm:inline">Back to Works</span>
                            <span className="sm:hidden">Back</span>
                        </button>

                        <span className="font-bold text-sm tracking-tight hidden md:block">Ewave</span>

                        <EwaveVersionSwitch
                            variant={variant}
                            variantHref={variantHref}
                            onSwitch={onSwitchVariant}
                        />
                    </div>

                    {isFull ? (
                        <EwaveFull
                            shortHref={variantHref('short')}
                            onReadShort={() => onSwitchVariant('short')}
                        />
                    ) : (
                        <EwaveShort
                            fullHref={variantHref('full')}
                            onReadFull={() => onSwitchVariant('full')}
                        />
                    )}

                    <button
                        onClick={onNext}
                        className="w-full text-left p-12 md:p-20 bg-[#111] text-white group hover:bg-black transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-white"
                    >
                        <span className="font-mono text-xs text-neutral-500 uppercase tracking-widest mb-4 block group-hover:text-white transition-colors">Next Project</span>
                        <div className="flex items-center justify-between">
                            <span className="block text-4xl md:text-6xl font-bold tracking-tighter">View Next Case</span>
                            <ArrowRight size={32} className="transform group-hover:translate-x-4 transition-transform" />
                        </div>
                    </button>
                </div>
            );
        };

        // ============================================================
        // MINDWELL — one case study, two lengths
        // /work/mindwell       short, 60 to 90 seconds, six visual moments
        // /work/mindwell/full  the research, the rebuild, the model change
        //
        // Every visual is either a real product screenshot or typography set
        // in the page. Nothing illustrated, no diagrams, no infographics.
        // Numbers, status and links live in MINDWELL below.
        // ============================================================

        const MINDWELL = {
            shortStandfirst: 'A private AI wellness companion for university students. Designed, built and tested solo.',
            fullStandfirst: 'A private AI wellness companion for university students. I built the wrong version first.',
            role: 'Product Designer · UX Researcher · AI-assisted Developer',
            team: 'Solo',
            platform: 'Deployed and working',
            scope: 'Research · Product strategy · UX/UI · Frontend · Backend · AI behaviour · Testing',
            stack: 'Claude Code · Claude · ChatGPT · React · Node/Express · Supabase · Vercel',

            links: {
                app: 'https://mindwell-jet.vercel.app/'
            },

            metrics: [
                { val: '87.7', label: 'SUS score', note: 'out of 100' },
                { val: '87.7%', label: 'Task completion' },
                { val: '11', label: 'Research participants' },
                { val: '10', label: 'UAT participants' }
            ],

            // What research overturned, in the reader's reading order.
            reframe: [
                { label: 'What I thought', items: 'Mood tracking · Reminders · Resources · Mental health support', tone: 'was' },
                { label: 'What I learned', items: 'Privacy · Reflection · Existing coping mechanisms · Personalised support · Broader student stress', tone: 'now' },
                { label: 'What changed', items: 'Private reflection · Personalisation · AI when wanted · Mood Memory · Low-pressure support', tone: 'now' }
            ],

            findings: [
                'Privacy was the condition for opening up, not a preference',
                'Students already had informal coping mechanisms',
                'Stress extended well beyond academics',
                'Mood tracking alone wasn’t a reason to open the app',
                'Personalisation mattered more than feature count'
            ],

            // Ratios match the delivered files exactly, so every container is
            // the right shape before the bytes arrive.
            images: {
                hero: {
                    file: '/assets/mindwell/hero', ratio: '3 / 2', title: 'Final product hero',
                    alt: 'MindWell running in a browser: My Space, Let It Out and Mood Memory'
                },
                rebuilt: {
                    kind: 'carousel', ratio: '320 / 227', title: 'The rebuilt product',
                    alt: 'The rebuilt MindWell product',
                    slides: [1, 2, 3, 4, 5, 6].map((n) => `/assets/mindwell/rebuilt-${n}`)
                },
                claudeCode: {
                    kind: 'carousel', ratio: '320 / 227', title: 'Claude Code',
                    alt: 'Building MindWell in Claude Code',
                    slides: [1, 2, 3].map((n) => `/assets/mindwell/claude-code-${n}`)
                },
                journalMode: {
                    kind: 'video', file: '/assets/mindwell/journal-mode',
                    poster: '/assets/mindwell/journal-mode-poster',
                    ratio: '16 / 9', title: 'The Journal Mode decision'
                },
                mindwellAi: {
                    kind: 'video', file: '/assets/mindwell/mindwell-ai',
                    poster: '/assets/mindwell/mindwell-ai-poster',
                    ratio: '16 / 9', title: 'MindWell AI'
                },
                showcase: {
                    kind: 'video', file: '/assets/mindwell/showcase',
                    poster: '/assets/mindwell/showcase-poster',
                    ratio: '16 / 9', title: 'Final product showcase'
                },

                v1: {
                    kind: 'carousel', ratio: '320 / 227', title: 'V1, the first product',
                    alt: 'MindWell V1, built before user research',
                    slides: [1, 2, 3, 4].map((n) => `/assets/mindwell/v1-${n}`)
                },
                // Same file as the first V1 frame, so it costs nothing extra.
                v1Small: { file: '/assets/mindwell/v1-1', ratio: '320 / 227', title: 'V1', alt: 'MindWell V1, built before user research' },
                rebuiltSmall: { file: '/assets/mindwell/rebuilt-1', ratio: '320 / 227', title: 'Rebuild', alt: 'The rebuilt MindWell product' },
                oneIteration: {
                    kind: 'compare', ratio: '320 / 227', title: 'One real iteration',
                    before: '/assets/mindwell/iteration-old',
                    after: '/assets/mindwell/iteration-new',
                    beforeAlt: 'My Space before the redesign',
                    afterAlt: 'My Space after the redesign'
                },
                // The short version closes on the same comparison: different
                // readers, and it is the single clearest picture of the change.
                v1ToFinal: {
                    kind: 'compare', ratio: '320 / 227', title: 'V1 to final',
                    before: '/assets/mindwell/iteration-old',
                    after: '/assets/mindwell/iteration-new',
                    beforeAlt: 'MindWell before the research-driven rebuild',
                    afterAlt: 'MindWell after the research-driven rebuild'
                },
                // Same footage as the closing showcase, deliberately: it walks
                // the whole product, which is exactly what this section needs.
                // Pointing at the same file costs no extra bytes.
                productJourney: {
                    kind: 'video', file: '/assets/mindwell/showcase',
                    poster: '/assets/mindwell/showcase-poster',
                    ratio: '16 / 9', title: 'The product journey'
                }
            }
        };

        const MindWellImage = makeStudyMedia(MINDWELL.images);

        const MINDWELL_TASKS = [
            { task: 'Register and log in', pct: '100%' },
            { task: 'Complete onboarding', pct: '90.9%' },
            { task: 'Record a mood check-in', pct: '100%' },
            { task: 'Write a journal reflection', pct: '90%' },
            { task: 'Hold a MindWell AI conversation', pct: '100%' },
            { task: 'View Mood Memory insights', pct: '100%' },
            { task: 'Find a resource in Gentle Support', pct: '63.6%', weak: true },
            { task: 'Update profile / preferences', pct: '72.7%', weak: true }
        ];

        // A plain table, deliberately. The two rows that failed are the reason
        // it is here, so they carry the weight; everything else stays quiet.
        const MindWellTaskTable = () => (
            <Reveal>
                <table className="w-full border-collapse text-left">
                    <thead>
                        <tr className="border-b border-[#111]">
                            <th className="font-mono text-[10px] uppercase tracking-[0.18em] text-neutral-500 font-normal pb-3">Task</th>
                            <th className="font-mono text-[10px] uppercase tracking-[0.18em] text-neutral-500 font-normal pb-3 text-right">Completion</th>
                        </tr>
                    </thead>
                    <tbody>
                        {MINDWELL_TASKS.map((row) => (
                            <tr key={row.task} className="border-b border-[#D4D4D0]">
                                <td className={`py-4 pr-6 text-base md:text-lg ${row.weak ? 'text-[#111] font-bold' : 'text-neutral-700'}`}>
                                    {row.task}
                                </td>
                                <td className={`py-4 text-right tabular-nums text-base md:text-lg ${row.weak ? 'text-[#111] font-bold' : 'text-neutral-700'}`}>
                                    {row.pct}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Reveal>
        );

        // "What I thought / learned / changed", set in the page rather than
        // exported as a graphic. Ink rises as the thinking sharpens.
        const MindWellReframe = () => (
            <div className="border-t border-[#111]">
                {MINDWELL.reframe.map((block, i) => (
                    <Reveal key={block.label} delay={i * 80}>
                        <div className="border-b border-[#D4D4D0] py-8 md:py-10">
                            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-neutral-500 block mb-4">
                                {block.label}
                            </span>
                            <p className={`text-xl md:text-3xl tracking-tight leading-[1.3] ${block.tone === 'was' ? 'text-neutral-400 font-medium' : 'text-[#111] font-semibold'}`}>
                                {block.items}
                            </p>
                        </div>
                    </Reveal>
                ))}
            </div>
        );

        // ---------------------------------------------------------------
        // SHORT — 60 to 90 seconds. Six visual moments, all real product.
        // ---------------------------------------------------------------
        const MindWellShort = ({ onReadFull, fullHref }) => (
            <div>
                <header className="px-6 md:px-12 py-16 md:py-20">
                    <div className="max-w-5xl mx-auto">
                        <div className="max-w-3xl">
                            <Masked>
                                <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-8 text-[#111] leading-[0.9]">
                                    MindWell
                                </h1>
                            </Masked>
                            <Reveal delay={100}>
                                <p className="text-xl md:text-2xl text-neutral-600 leading-relaxed">
                                    {MINDWELL.shortStandfirst}
                                </p>
                            </Reveal>
                        </div>

                        <Reveal delay={150}>
                            <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.18em] text-neutral-500 leading-loose max-w-3xl">
                                {MINDWELL.role} · Solo<br />
                                React · Node/Express · Supabase · Claude Code · {MINDWELL.platform}
                            </p>
                        </Reveal>

                        {/* Leaves the site. Deliberately a filled button, so it never
                            reads as the same kind of control as "Read the full story",
                            which expands the reading instead. */}
                        <div className="mt-8">
                            <StudyLink href={MINDWELL.links.app} label="Try MindWell" hint="Live product. Opens in a new tab." />
                        </div>

                        <StudyMetrics items={MINDWELL.metrics} className="mt-12" />
                    </div>
                </header>

                <div className="px-6 md:px-12 mb-16 md:mb-20">
                    <div className="max-w-5xl mx-auto">
                        <MindWellImage name="hero" index={1} eager />
                    </div>
                </div>

                {/* --- V1 --- */}
                <section data-section="v1" className="study-anchor px-6 md:px-12 py-16 md:py-20 bg-white border-b border-[#D4D4D0]">
                    <div className="max-w-5xl mx-auto">
                        <div className="max-w-3xl">
                            <Reveal>
                                <StudyP>
                                    <strong className="text-[#111] font-semibold">I built the wrong product first.</strong> I designed
                                    V1 from my own assumptions about what students needed, without talking to any of them.
                                </StudyP>
                            </Reveal>
                        </div>
                        <div className="mt-12">
                            <MindWellImage
                                name="v1"
                                index={2}
                                caption="V1 — the product I built before talking to users."
                            />
                        </div>
                    </div>
                </section>

                {/* --- Research --- */}
                <section data-section="research" className="study-anchor px-6 md:px-12 py-16 md:py-20 border-b border-[#D4D4D0]">
                    <div className="max-w-5xl mx-auto">
                        <div className="max-w-3xl mb-12">
                            <Reveal>
                                <StudyP>
                                    So I stopped, and spoke to 11 students across three Nigerian universities. The real problem wasn’t
                                    tracking. It was that students had nowhere private enough to say anything at all.
                                </StudyP>
                            </Reveal>
                        </div>

                        {/* Visual moment 3: typography in the page, not an export. */}
                        <MindWellReframe />

                        <div className="max-w-3xl mt-14">
                            <Reveal>
                                <StudyP>
                                    I rebuilt the product around one continuous experience: check in, let it out, get support,
                                    understand yourself, keep going.
                                </StudyP>
                            </Reveal>
                        </div>

                        <div className="mt-12">
                            <MindWellImage
                                name="rebuilt"
                                index={4}
                                caption="The product after the rebuild. Compare it against V1 above: research changed the product, not the palette."
                            />
                        </div>
                    </div>
                </section>

                {/* --- Built in front of users --- */}
                <section data-section="users" className="study-anchor px-6 md:px-12 py-16 md:py-20 bg-white border-b border-[#D4D4D0]">
                    <div className="max-w-5xl mx-auto">
                        <Reveal>
                            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-[#111] border-t border-[#111] pt-6 mb-8">
                                Then I built it in front of users
                            </h2>
                        </Reveal>

                        <div className="max-w-3xl space-y-6">
                            <Reveal>
                                <StudyP>
                                    I didn’t test once at the end. I put working versions in front of students continuously, on calls,
                                    watching them use it, fixing things while they talked. Two of those conversations changed the
                                    product substantially.
                                </StudyP>
                            </Reveal>
                            <Reveal delay={80}>
                                <StudyP>
                                    <strong className="text-[#111] font-semibold">A student told me they didn’t always want to chat
                                    with an AI. Sometimes they just wanted to write.</strong> That became Journal Mode: write privately,
                                    no AI response. MindWell AI stayed as the other option, chosen deliberately. The choice comes before
                                    the writing.
                                </StudyP>
                            </Reveal>
                            <Reveal delay={160}>
                                <StudyP>Journal Mode came from a user, not from my plan.</StudyP>
                            </Reveal>
                        </div>

                        <div className="mt-12">
                            <MindWellImage
                                name="journalMode"
                                index={5}
                                caption="The choice sits before the first word, so the privacy guarantee is in place before the vulnerable act, not after it."
                            />
                        </div>

                        <div className="max-w-3xl mt-14">
                            <Reveal>
                                <StudyP>
                                    <strong className="text-[#111] font-semibold">And the AI didn’t sound right.</strong> The early
                                    responses were generic, correct wellness language that meant nothing to a Nigerian student
                                    describing a Nigerian problem. So I changed the model twice, from the initial integration to Groq to
                                    DeepSeek, until the responses actually landed.
                                </StudyP>
                            </Reveal>
                        </div>

                        <div className="mt-10 max-w-4xl border-t border-[#111] pt-10">
                            <StudyStatement>
                                “The AI works” and “the AI is right for these users”{' '}
                                <span className="text-neutral-400">are different tests.</span>
                            </StudyStatement>
                        </div>
                    </div>
                </section>

                {/* --- Built it --- */}
                <section data-section="build" className="study-anchor px-6 md:px-12 py-16 md:py-20 border-b border-[#D4D4D0]">
                    <div className="max-w-5xl mx-auto">
                        <Reveal>
                            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-[#111] border-t border-[#111] pt-6 mb-8">
                                I designed it, then built it
                            </h2>
                        </Reveal>

                        <div className="max-w-3xl">
                            <Reveal>
                                <StudyP>
                                    No handoff. I vibecoded MindWell myself in Claude Code. React, Node/Express, Supabase, JWT auth,
                                    deployed on Vercel. Not a prototype: a working application students used.
                                </StudyP>
                            </Reveal>
                        </div>

                        <div className="mt-12 max-w-4xl border-t border-[#111] pt-10">
                            <StudyStatement>
                                AI made it cheap to build the wrong thing.{' '}
                                <span className="text-neutral-400">It didn’t make it cheap to know what to build.</span>
                            </StudyStatement>
                        </div>
                    </div>
                </section>

                {/* --- Testing --- */}
                <section data-section="testing" className="study-anchor px-6 md:px-12 py-16 md:py-20 bg-white border-b border-[#D4D4D0]">
                    <div className="max-w-5xl mx-auto">
                        <Reveal>
                            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-[#111] border-t border-[#111] pt-6 mb-8">
                                What testing showed
                            </h2>
                        </Reveal>

                        <Reveal>
                            <div className="flex flex-wrap items-baseline gap-x-10 gap-y-4 mb-10">
                                <span className="text-5xl md:text-7xl font-bold tracking-tighter text-[#111] tabular-nums">87.7</span>
                                <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-neutral-500">SUS · out of 100</span>
                                <span className="text-5xl md:text-7xl font-bold tracking-tighter text-[#111] tabular-nums">87.7%</span>
                                <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-neutral-500">Task completion · 10 students</span>
                            </div>
                        </Reveal>

                        <div className="max-w-3xl space-y-6">
                            <Reveal>
                                <StudyP>
                                    Every task in the core reflection loop cleared 90%. Both failures sat outside it: finding a resource
                                    at 63.6%, and updating preferences at 72.7%. The parts I’d iterated with students constantly were
                                    the parts that worked.
                                </StudyP>
                            </Reveal>
                        </div>

                        <div className="mt-12">
                            <MindWellImage
                                name="v1ToFinal"
                                index={6}
                                caption="V1 on the left, the version students shaped on the right. Where I started, and what I shipped."
                            />
                        </div>
                    </div>
                </section>

                {/* Two controls, deliberately different: one leaves the site, one
                    continues the reading. */}
                <section className="px-6 md:px-12 py-16 md:py-24 border-b border-[#D4D4D0]">
                    <div className="max-w-5xl mx-auto">
                        <div className="mb-12">
                            <StudyLink href={MINDWELL.links.app} label="Try MindWell" hint="It’s live." />
                        </div>

                        <a
                            href={fullHref}
                            onClick={(event) => {
                                if (event.metaKey || event.ctrlKey || event.shiftKey || event.button === 1) return;
                                event.preventDefault();
                                onReadFull();
                            }}
                            className="group block border-t border-[#111] pt-8 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#111]"
                        >
                            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-neutral-500 block mb-5">
                                // Keep reading · about 7 minutes
                            </span>
                            <div className="flex items-start justify-between gap-8">
                                <div className="max-w-2xl">
                                    <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-[#111] mb-4 group-hover:text-neutral-600 transition-colors">
                                        Read the full story
                                    </h2>
                                    <p className="text-lg text-neutral-600 leading-relaxed">
                                        The research, the rebuild, the AI model change, the privacy architecture, the build in Claude
                                        Code, and what I’d fix next.
                                    </p>
                                </div>
                                <div className="w-12 h-12 shrink-0 border border-[#D4D4D0] flex items-center justify-center group-hover:bg-[#111] group-hover:text-white transition-colors">
                                    <ArrowRight size={20} />
                                </div>
                            </div>
                        </a>
                    </div>
                </section>
            </div>
        );

        // ---------------------------------------------------------------
        // FULL — the research, the rebuild, the model change.
        // ---------------------------------------------------------------
        const MindWellFull = ({ onReadShort, shortHref }) => {
            const changes = [
                { name: 'Journal Mode', desc: 'The entire reflection experience split in two, from one conversation.' },
                { name: 'The AI provider', desc: 'Changed twice, because the responses didn’t land with Nigerian students.' },
                { name: 'My Space', desc: 'Too busy, so I simplified the dashboard. A calm entry point that feels crowded isn’t calm.' },
                { name: 'Conversation history', desc: 'Made persistent so students could return to earlier reflections instead of starting over.' },
                { name: 'Mood Memory', desc: 'Reworked to read as reflection rather than as a data display.' },
                { name: 'Interface edge cases', desc: 'States and flows I never hit myself, found by watching students use it.' },
                { name: 'Gentle Support', desc: 'The weakest result and the clearest instruction. A resource library nobody can find doesn’t exist.' }
            ];

            const next = [
                { title: 'Resource discovery', desc: 'The 63.6%. I’d fix where support surfaces in the journey, not the library page.' },
                { title: 'The support alert', desc: 'Designed, not built.' },
                { title: 'Making the privacy boundary visible', desc: 'In the interface, not just true in the backend.' },
                { title: 'Offline journaling', desc: 'Connectivity across Nigerian campuses is unreliable.' },
                { title: 'Cross-device continuity and voice transcription', desc: 'Voice recording exists, speech-to-text doesn’t.' },
                { title: 'Wider research', desc: '11 students in research, 10 in testing, mostly from one university. Enough to redirect the product. Not enough to generalise it.' }
            ];

            return (
                <div>
                    <header className="px-6 md:px-12 py-16 md:py-24">
                        <div className="max-w-5xl mx-auto">
                            <div className="max-w-3xl">
                                <Masked>
                                    <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-8 text-[#111] leading-[0.9]">
                                        MindWell
                                    </h1>
                                </Masked>
                                <Reveal delay={100}>
                                    <p className="text-xl md:text-2xl text-neutral-600 leading-relaxed">
                                        {MINDWELL.fullStandfirst}
                                    </p>
                                </Reveal>
                            </div>

                            <div className="mt-16 border-t border-b border-[#D4D4D0] py-8">
                                <Reveal delay={100}>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                                        <div>
                                            <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-500 block mb-2">Role</span>
                                            <span className="font-medium text-sm md:text-base">{MINDWELL.role}</span>
                                        </div>
                                        <div>
                                            <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-500 block mb-2">Team</span>
                                            <span className="font-medium text-sm md:text-base">{MINDWELL.team}</span>
                                        </div>
                                        <div>
                                            <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-500 block mb-2">Status</span>
                                            <span className="font-medium text-sm md:text-base">{MINDWELL.platform}</span>
                                        </div>
                                        <div>
                                            <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-500 block mb-2">Stack</span>
                                            <span className="font-medium text-sm md:text-base">React · Node/Express · Supabase · Vercel</span>
                                        </div>
                                    </div>
                                </Reveal>
                            </div>

                            <Reveal delay={150}>
                                <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.18em] text-neutral-500 leading-loose max-w-3xl">
                                    {MINDWELL.scope}
                                </p>
                            </Reveal>

                            <div className="mt-8">
                                <StudyLink href={MINDWELL.links.app} label="Live product" hint="Opens in a new tab." />
                            </div>

                            <StudyMetrics items={MINDWELL.metrics} className="mt-12" />
                        </div>
                    </header>

                    <div className="px-6 md:px-12 mb-16 md:mb-24">
                        <div className="max-w-5xl mx-auto">
                            <MindWellImage name="hero" index={1} eager />
                        </div>
                    </div>

                    {/* --- I built the wrong product first --- */}
                    <section data-section="v1" className="study-anchor px-6 md:px-12 py-16 md:py-24 bg-white border-b border-[#D4D4D0]">
                        <div className="max-w-5xl mx-auto">
                            <ChapterMark n="·" title="I built the wrong product first" className="mb-12" />

                            <div className="max-w-3xl space-y-6">
                                <Reveal>
                                    <StudyP>I didn’t start MindWell with research. I started building.</StudyP>
                                </Reveal>
                                <Reveal delay={80}>
                                    <StudyP>
                                        I had an idea of what a student wellness product should be, mood tracking, reminders, resources,
                                        some form of support, so I built it.
                                    </StudyP>
                                </Reveal>
                                <Reveal delay={160}>
                                    <StudyP>The first version wasn’t good.</StudyP>
                                </Reveal>
                                <Reveal delay={240}>
                                    <StudyP>
                                        Not because the UI was bad, though it was. Because I’d built the whole thing on what I{' '}
                                        <em>thought</em> students needed without asking a single one.
                                    </StudyP>
                                </Reveal>
                            </div>

                            <div className="mt-14">
                                <MindWellImage
                                    name="v1"
                                    index={2}
                                    caption="V1 — built from my assumptions, before user research."
                                />
                            </div>

                            <div className="max-w-3xl mt-14">
                                <Reveal>
                                    <StudyP>So I stopped polishing V1 and went to talk to students.</StudyP>
                                </Reveal>
                            </div>
                        </div>
                    </section>

                    {/* --- 01 Research --- */}
                    <section data-section="research" className="study-anchor px-6 md:px-12 py-16 md:py-24 border-b border-[#D4D4D0]">
                        <div className="max-w-5xl mx-auto">
                            <ChapterMark n="01" title="11 students changed the product" className="mb-12" />

                            <div className="max-w-3xl space-y-6">
                                <Reveal>
                                    <StudyP>
                                        Their stress wasn’t mainly academic. It was finances, relationships, hostel life, family
                                        responsibilities, social pressure, routine, all of it at once.
                                    </StudyP>
                                </Reveal>
                                <Reveal delay={80}>
                                    <StudyP>
                                        They already had ways of coping. Friends, family, prayer, sleep, entertainment, exercise, or
                                        keeping it to themselves. I wasn’t designing into a gap. I was designing into a life that
                                        already had a system.
                                    </StudyP>
                                </Reveal>
                                <Reveal delay={160}>
                                    <StudyP>
                                        And privacy came up constantly, judgement, confidentiality, who might see what they shared. Not
                                        as a feature request. As the condition for using anything like this at all.
                                    </StudyP>
                                </Reveal>
                            </div>

                            {/* Visual moment 3: the evidence, set in the page. */}
                            <div className="mt-16">
                                <Reveal>
                                    <div className="border-t border-[#111] pt-8">
                                        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-neutral-500 block mb-6">
                                            // Who I spoke to
                                        </span>
                                        <p className="text-2xl md:text-4xl font-bold tracking-tighter text-[#111] leading-[1.15] max-w-3xl">
                                            11 students · 9 Caleb University · 1 Obafemi Awolowo University · 1 University of Ibadan
                                        </p>
                                    </div>
                                </Reveal>

                                <div className="mt-12 border-t border-[#D4D4D0] max-w-4xl">
                                    {MINDWELL.findings.map((finding, i) => (
                                        <Reveal key={finding} delay={i * 60}>
                                            <div className="flex items-baseline gap-6 border-b border-[#D4D4D0] py-5">
                                                <span className="font-mono text-[10px] tabular-nums text-neutral-500 shrink-0">
                                                    {String(i + 1).padStart(2, '0')}
                                                </span>
                                                <span className="text-lg md:text-xl text-[#111] leading-relaxed">{finding}</span>
                                            </div>
                                        </Reveal>
                                    ))}
                                </div>
                            </div>

                            <div className="mt-16 max-w-4xl border-t border-[#111] pt-10">
                                <Reveal>
                                    <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-neutral-500 block mb-5">// I started out thinking</span>
                                    <p className="text-2xl md:text-3xl font-bold tracking-tight leading-[1.25] text-neutral-400">
                                        Students need a better way to track their mental wellbeing.
                                    </p>
                                </Reveal>
                                <Reveal delay={150}>
                                    <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-neutral-500 block mb-5 mt-12">// I ended up understanding</span>
                                    <p className="text-2xl md:text-4xl font-bold tracking-tighter leading-[1.15] text-[#111]">
                                        Students need a private, trusted space where they can reflect and access support on their own
                                        terms.
                                    </p>
                                </Reveal>
                            </div>

                            {/* Visual moment 4: three stages, anchored by real screens. */}
                            <div className="mt-20 border-t border-[#111] pt-10">
                                <Reveal>
                                    <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-neutral-500 block mb-10">
                                        // V1 → Research → Rebuild
                                    </span>
                                </Reveal>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 items-start">
                                    <div>
                                        <MindWellImage name="v1Small" index={4} />
                                        <Reveal>
                                            <p className="mt-4 text-base text-neutral-600 leading-relaxed">
                                                What I thought students needed.
                                            </p>
                                        </Reveal>
                                    </div>
                                    <div className="flex flex-col justify-center h-full">
                                        <Reveal>
                                            <span className="block text-7xl md:text-8xl font-bold tracking-tighter text-[#111] tabular-nums leading-none">
                                                11
                                            </span>
                                            <span className="block font-mono text-[10px] uppercase tracking-[0.24em] text-neutral-500 mt-4">
                                                Students
                                            </span>
                                            <p className="mt-4 text-base text-neutral-600 leading-relaxed">
                                                What they actually told me.
                                            </p>
                                        </Reveal>
                                    </div>
                                    <div>
                                        <MindWellImage name="rebuiltSmall" index={4} />
                                        <Reveal>
                                            <p className="mt-4 text-base text-neutral-600 leading-relaxed">
                                                Private reflection, personalised support, AI when wanted.
                                            </p>
                                        </Reveal>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* --- 02 Rebuild --- */}
                    <section className="px-6 md:px-12 py-16 md:py-24 bg-white border-b border-[#D4D4D0]">
                        <div className="max-w-5xl mx-auto">
                            <ChapterMark n="02" title="I rebuilt it around what I’d learned" className="mb-12" />

                            <div className="max-w-3xl">
                                <Reveal>
                                    <StudyP>V1 was a pile of features. The rebuild had to be one continuous experience:</StudyP>
                                </Reveal>
                            </div>

                            <Reveal delay={80}>
                                <div className="mt-10 border-l-2 border-[#111] pl-6 py-1 max-w-3xl">
                                    <p className="font-mono text-sm md:text-base text-[#111] leading-loose">
                                        Check in → Let it out → Get support → Understand yourself → Keep going
                                    </p>
                                </div>
                            </Reveal>

                            <div className="max-w-3xl mt-10 space-y-6">
                                <Reveal>
                                    <StudyP>
                                        That gave me <strong className="text-[#111] font-semibold">My Space</strong> for checking in,{' '}
                                        <strong className="text-[#111] font-semibold">Let It Out</strong> for reflection,{' '}
                                        <strong className="text-[#111] font-semibold">MindWell AI</strong> and{' '}
                                        <strong className="text-[#111] font-semibold">Gentle Support</strong> for support,{' '}
                                        <strong className="text-[#111] font-semibold">Mood Memory</strong> for patterns over time, and
                                        personalised reminders to keep it going.
                                    </StudyP>
                                </Reveal>
                                <Reveal delay={80}>
                                    <StudyP>
                                        The question stopped being <em>“what else should I add?”</em> and became{' '}
                                        <em>“does this help the student move through the experience?”</em> Anything that couldn’t answer
                                        that got cut.
                                    </StudyP>
                                </Reveal>
                            </div>

                            <div className="mt-16">
                                <MindWellImage name="productJourney" index={5} />
                            </div>
                        </div>
                    </section>

                    {/* --- 03 Built it --- */}
                    <section data-section="build" className="study-anchor px-6 md:px-12 py-16 md:py-24 border-b border-[#D4D4D0]">
                        <div className="max-w-5xl mx-auto">
                            <ChapterMark n="03" title="I didn’t hand it off. I built it." className="mb-12" />

                            <div className="max-w-3xl space-y-6">
                                <Reveal>
                                    <StudyP>
                                        There was no developer. I designed MindWell and then{' '}
                                        <strong className="text-[#111] font-semibold">vibecoded it directly in Claude Code</strong>,
                                        working with Claude and ChatGPT throughout.
                                    </StudyP>
                                </Reveal>
                                <Reveal delay={80}>
                                    <StudyP>
                                        I used AI to reason through problems, explore implementation approaches, write and modify code,
                                        debug and iterate. Then I ran the product and judged the result myself.
                                    </StudyP>
                                </Reveal>
                                <Reveal delay={160}>
                                    <StudyP>
                                        AI wasn’t deciding what MindWell should be.{' '}
                                        <strong className="text-[#111] font-semibold">I was.</strong> What it did was collapse the
                                        distance between a product decision and a working version I could actually test.
                                    </StudyP>
                                </Reveal>
                                <Reveal delay={240}>
                                    <StudyP>
                                        Which brings up the uncomfortable part. I could build fast, and the first thing I built fast was
                                        wrong.
                                    </StudyP>
                                </Reveal>
                            </div>

                            <div className="mt-14 max-w-4xl border-t border-[#111] pt-10">
                                <StudyStatement>
                                    AI made it cheap to build the wrong thing.{' '}
                                    <span className="text-neutral-400">It didn’t make it cheap to know what to build.</span>
                                </StudyStatement>
                            </div>

                            <div className="max-w-3xl mt-12">
                                <Reveal>
                                    <StudyP>Speed only helps after you’ve picked the right problem.</StudyP>
                                </Reveal>
                            </div>

                            <div className="mt-16">
                                <MindWellImage name="claudeCode" index={6} />
                            </div>
                        </div>
                    </section>

                    {/* --- 04 In front of users --- */}
                    <section data-section="users" className="study-anchor px-6 md:px-12 py-16 md:py-24 bg-white border-b border-[#D4D4D0]">
                        <div className="max-w-5xl mx-auto">
                            <ChapterMark n="04" title="I built it in front of users" className="mb-12" />

                            <div className="max-w-3xl space-y-6">
                                <Reveal>
                                    <StudyP>
                                        The rebuild wasn’t a phase that finished before testing started.{' '}
                                        <strong className="text-[#111] font-semibold">They happened at the same time.</strong>
                                    </StudyP>
                                </Reveal>
                                <Reveal delay={80}>
                                    <StudyP>
                                        I put working versions in front of students continuously, not one round of usability testing at
                                        the end, but back-to-back conversations while the product was still moving. I was on calls
                                        watching students use it, and fixing things during the call as they talked.
                                    </StudyP>
                                </Reveal>
                                <Reveal delay={160}>
                                    <StudyP>
                                        That loop is why building fast actually mattered. A student’s feedback could become a working
                                        change before the conversation ended, and I could put it straight back in front of them.
                                    </StudyP>
                                </Reveal>
                                <Reveal delay={240}>
                                    <StudyP>
                                        It surfaced things I’d never have found alone: edge cases I hadn’t considered, states I’d never
                                        tested, places where the interface made sense to me because I’d built it and to nobody else.
                                    </StudyP>
                                </Reveal>
                                <Reveal delay={320}>
                                    <StudyP>Two of those conversations changed the product substantially.</StudyP>
                                </Reveal>
                            </div>

                            {/* Journal Mode */}
                            <div className="mt-20 border-t border-[#111] pt-8">
                                <Reveal>
                                    <h3 className="text-2xl md:text-4xl font-bold tracking-tighter text-[#111] mb-8">
                                        The one I didn’t see coming: Journal Mode
                                    </h3>
                                </Reveal>

                                <div className="max-w-3xl space-y-6">
                                    <Reveal>
                                        <StudyP>
                                            I’d built the reflection experience entirely around AI conversation. It was the obvious
                                            build, the AI is the thing the product is nominally about.
                                        </StudyP>
                                    </Reveal>
                                    <Reveal delay={80}>
                                        <StudyP>
                                            Then a student told me they didn’t always want to chat with an AI. Sometimes they just wanted
                                            to write. A journal.
                                        </StudyP>
                                    </Reveal>
                                    <Reveal delay={160}>
                                        <StudyP>
                                            I hadn’t planned for that at all, and it turned out to be the most useful thing anyone told
                                            me.
                                        </StudyP>
                                    </Reveal>
                                </div>

                                <div className="mt-12 max-w-4xl border-t border-[#D4D4D0] pt-10">
                                    <StudyStatement>
                                        Not every moment of reflection{' '}
                                        <span className="text-neutral-400">needs a response.</span>
                                    </StudyStatement>
                                </div>

                                <div className="max-w-3xl mt-12 space-y-6">
                                    <Reveal>
                                        <StudyP>
                                            Sometimes you just want to write. No advice. No follow-up question. No AI interpreting what
                                            you just said.
                                        </StudyP>
                                    </Reveal>
                                    <Reveal delay={80}>
                                        <StudyP>So I split it, and put the choice <strong className="text-[#111] font-semibold">before</strong> the writing:</StudyP>
                                    </Reveal>
                                    <Reveal delay={140}>
                                        <StudyBullets items={[
                                            'Journal Mode — write privately. No AI response.',
                                            'MindWell AI — a guided conversation, when you want one.'
                                        ]} />
                                    </Reveal>
                                    <Reveal delay={200}>
                                        <StudyP>
                                            The alternative was letting the AI decide when to respond. I rejected it: that makes the
                                            product unpredictable at the moment the user is most exposed, and you’d start writing without
                                            knowing whether anything would read it. The choice being explicit, and coming first, is the
                                            entire point.
                                        </StudyP>
                                    </Reveal>
                                    <Reveal delay={260}>
                                        <StudyP>
                                            <strong className="text-[#111] font-semibold">Journal Mode came from a user. It wasn’t in my
                                            research, and it wasn’t in my plan.</strong>
                                        </StudyP>
                                    </Reveal>
                                </div>

                                <div className="mt-14">
                                    <MindWellImage name="journalMode" index={7} />
                                </div>
                            </div>

                            {/* The AI voice */}
                            <div className="mt-24 border-t border-[#111] pt-8">
                                <Reveal>
                                    <h3 className="text-2xl md:text-4xl font-bold tracking-tighter text-[#111] mb-8">
                                        The AI worked. It just didn’t sound right.
                                    </h3>
                                </Reveal>

                                <div className="max-w-3xl space-y-6">
                                    <Reveal>
                                        <StudyP>
                                            The first working version of MindWell AI technically functioned. The responses were generic.
                                        </StudyP>
                                    </Reveal>
                                    <Reveal delay={80}>
                                        <StudyP>
                                            More precisely: they didn’t sound like they were written for the students using them. Broadly
                                            correct wellness language, culturally weightless, not much use to a Nigerian student
                                            describing a Nigerian university problem. Students noticed straight away.
                                        </StudyP>
                                    </Reveal>
                                    <Reveal delay={160}>
                                        <StudyP>
                                            So I stopped treating the model as a fixed part of the stack and started treating it as a
                                            design variable.
                                        </StudyP>
                                    </Reveal>
                                </div>

                                {/* The model change, as a sequence, because it was one. */}
                                <Reveal>
                                    <div className="mt-12 border-t border-[#D4D4D0] max-w-4xl">
                                        {[
                                            { step: '01', name: 'The initial integration', desc: 'Responses too generic to be useful.' },
                                            { step: '02', name: 'Groq', desc: 'Better, still not the tone the product needed.' },
                                            { step: '03', name: 'DeepSeek', desc: 'Noticeably better quality and relevance. Now the primary provider, with Groq kept as the fallback so the experience stays available when the primary can’t be reached.' }
                                        ].map((row) => (
                                            <div key={row.step} className="grid grid-cols-1 md:grid-cols-[3rem_10rem_1fr] gap-2 md:gap-8 border-b border-[#D4D4D0] py-5">
                                                <span className="font-mono text-[10px] tabular-nums text-neutral-500 md:pt-2">{row.step}</span>
                                                <span className="text-lg font-bold tracking-tight text-[#111]">{row.name}</span>
                                                <span className="text-base text-neutral-600 leading-relaxed">{row.desc}</span>
                                            </div>
                                        ))}
                                    </div>
                                </Reveal>

                                <div className="max-w-3xl mt-12 space-y-6">
                                    <Reveal>
                                        <StudyP>
                                            Alongside that I kept rewriting the prompting and response behaviour: define the intended
                                            behaviour, implement, test against real student input, find what felt wrong, refine, repeat.
                                        </StudyP>
                                    </Reveal>
                                    <Reveal delay={80}>
                                        <StudyP>
                                            MindWell AI was built to be supportive, reflective and non-clinical, explicitly not to
                                            diagnose or stand in for professional support. MindWell is a preventive wellness tool, not a
                                            therapeutic one, and that had to show up in how the AI talks rather than in a disclaimer
                                            nobody reads. Conversations persist and title themselves, so students can return to an
                                            earlier reflection instead of starting over.
                                        </StudyP>
                                    </Reveal>
                                </div>

                                <div className="mt-14 max-w-4xl border-t border-[#111] pt-10">
                                    <StudyStatement>
                                        “The AI works” and “the AI is right for these users” are different tests.{' '}
                                        <span className="text-neutral-400">Only users can run the second one.</span>
                                    </StudyStatement>
                                </div>

                                <div className="mt-14">
                                    <MindWellImage name="mindwellAi" index={8} />
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* --- 05 Trust --- */}
                    <section className="px-6 md:px-12 py-16 md:py-24 border-b border-[#D4D4D0]">
                        <div className="max-w-5xl mx-auto">
                            <ChapterMark n="05" title="Trust wasn’t a settings screen" className="mb-12" />

                            <div className="max-w-3xl">
                                <Reveal>
                                    <StudyP>One principle ran through everything:</StudyP>
                                </Reveal>
                            </div>

                            <div className="mt-10 max-w-4xl border-t border-[#111] pt-10">
                                <StudyStatement>
                                    Make students feel safe{' '}
                                    <span className="text-neutral-400">before asking them to share.</span>
                                </StudyStatement>
                            </div>

                            <div className="max-w-3xl mt-14 space-y-6">
                                <Reveal>
                                    <StudyP>
                                        Admins can’t read student data, the admin view shows anonymised aggregates only. Gentle Support
                                        doesn’t store individual reading history. Students can delete all their records. Sessions use
                                        JWT, passwords are bcrypt-hashed, and the architecture separates interface, logic and data.
                                    </StudyP>
                                </Reveal>
                                <Reveal delay={80}>
                                    <div className="border border-[#D4D4D0] bg-white p-6 md:p-8">
                                        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-500 block mb-3">
                                            The honest gap
                                        </span>
                                        <p className="text-base md:text-lg text-neutral-700 leading-relaxed">
                                            MindWell AI runs on external language-model services, so that text leaves the system. Journal
                                            Mode entries don’t. That distinction is real, but right now it lives in the backend and
                                            should be visible in the interface.
                                        </p>
                                    </div>
                                </Reveal>
                                <Reveal delay={160}>
                                    <StudyP>
                                        There’s also a <strong className="text-[#111] font-semibold">support alert</strong> in the system
                                        design: five or more consecutive mood entries at 2 or below surfaces a gentle, non-clinical
                                        prompt toward real support, and it stays until acknowledged. It’s specified, not yet built. It’s
                                        first in the queue.
                                    </StudyP>
                                </Reveal>
                            </div>
                        </div>
                    </section>

                    {/* --- 06 Testing --- */}
                    <section data-section="testing" className="study-anchor px-6 md:px-12 py-16 md:py-24 bg-white border-b border-[#D4D4D0]">
                        <div className="max-w-5xl mx-auto">
                            <ChapterMark n="06" title="Testing the finished product" className="mb-12" />

                            <div className="max-w-3xl">
                                <Reveal>
                                    <StudyP>
                                        After all that iteration, I ran formal UAT with{' '}
                                        <strong className="text-[#111] font-semibold">10 students</strong>, task-based evaluation plus
                                        the System Usability Scale.
                                    </StudyP>
                                </Reveal>
                            </div>

                            {/* Visual moment 9: typography, set large. */}
                            <Reveal>
                                <div className="mt-12 border-t border-[#111] pt-10 grid grid-cols-1 sm:grid-cols-3 gap-8">
                                    <div>
                                        <span className="block text-5xl md:text-7xl font-bold tracking-tighter text-[#111] tabular-nums leading-none">87.7</span>
                                        <span className="block font-mono text-[10px] uppercase tracking-[0.24em] text-neutral-500 mt-4">System Usability Scale</span>
                                    </div>
                                    <div>
                                        <span className="block text-5xl md:text-7xl font-bold tracking-tighter text-[#111] tabular-nums leading-none">87.7%</span>
                                        <span className="block font-mono text-[10px] uppercase tracking-[0.24em] text-neutral-500 mt-4">Overall task completion</span>
                                    </div>
                                    <div>
                                        <span className="block text-5xl md:text-7xl font-bold tracking-tighter text-[#111] tabular-nums leading-none">10</span>
                                        <span className="block font-mono text-[10px] uppercase tracking-[0.24em] text-neutral-500 mt-4">UAT participants</span>
                                    </div>
                                </div>
                            </Reveal>

                            <div className="mt-16 max-w-4xl">
                                <MindWellTaskTable />
                            </div>

                            <div className="max-w-3xl mt-14 space-y-6">
                                <Reveal>
                                    <StudyP>
                                        The score isn’t the interesting part.{' '}
                                        <strong className="text-[#111] font-semibold">The bottom two rows are.</strong>
                                    </StudyP>
                                </Reveal>
                                <Reveal delay={80}>
                                    <StudyP>
                                        Every task inside the core reflection loop cleared 90%. Both failures sit outside it: finding a
                                        resource, and changing your own settings.
                                    </StudyP>
                                </Reveal>
                                <Reveal delay={160}>
                                    <StudyP>
                                        That’s consistent with how I built it. I’d iterated the emotional journey with students over and
                                        over, and treated the structural surfaces around it as secondary. The parts I tested constantly
                                        were the parts that worked.
                                    </StudyP>
                                </Reveal>
                            </div>
                        </div>
                    </section>

                    {/* --- 07 What the feedback changed --- */}
                    <section className="px-6 md:px-12 py-16 md:py-24 border-b border-[#D4D4D0]">
                        <div className="max-w-5xl mx-auto">
                            <ChapterMark n="07" title="What the feedback changed" className="mb-12" />
                            <div className="max-w-3xl space-y-10">
                                {changes.map((item, i) => (
                                    <Reveal key={item.name} delay={i * 50}>
                                        <div className="border-t border-[#D4D4D0] pt-6">
                                            <h4 className="text-xl md:text-2xl font-bold tracking-tight text-[#111] mb-3">{item.name}</h4>
                                            <StudyP>{item.desc}</StudyP>
                                        </div>
                                    </Reveal>
                                ))}
                            </div>

                            <div className="mt-16">
                                <MindWellImage
                                    name="oneIteration"
                                    index={10}
                                    caption="Feedback into design change. One example."
                                />
                            </div>
                        </div>
                    </section>

                    {/* --- 08 What I'd fix next --- */}
                    <section className="px-6 md:px-12 py-16 md:py-24 bg-white border-b border-[#D4D4D0]">
                        <div className="max-w-5xl mx-auto">
                            <ChapterMark n="08" title="What I’d fix next" className="mb-12" />
                            <div className="max-w-3xl space-y-10">
                                {next.map((item, i) => (
                                    <Reveal key={item.title} delay={i * 50}>
                                        <div className="border-t border-[#D4D4D0] pt-6">
                                            <h4 className="text-xl md:text-2xl font-bold tracking-tight text-[#111] mb-3">{item.title}</h4>
                                            <StudyP>{item.desc}</StudyP>
                                        </div>
                                    </Reveal>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* --- Closing --- */}
                    <section className="px-6 md:px-12 py-16 md:py-24 border-b border-[#D4D4D0]">
                        <div className="max-w-5xl mx-auto">
                            <ChapterMark n="·" title="What actually changed" className="mb-12" />

                            <div className="max-w-3xl space-y-6">
                                <Reveal>
                                    <StudyP>The mood tracking stayed. The reminders stayed. The AI stayed.</StudyP>
                                </Reveal>
                                <Reveal delay={80}>
                                    <StudyP>They just stopped being the centre of the product.</StudyP>
                                </Reveal>
                            </div>

                            <div className="mt-16 max-w-4xl border-t border-[#111] pt-10">
                                <Masked>
                                    <p className="text-2xl md:text-4xl font-bold tracking-tighter leading-[1.15] text-[#111]">
                                        The first version was my idea.
                                    </p>
                                </Masked>
                                <Masked delay={200}>
                                    <p className="text-2xl md:text-4xl font-bold tracking-tighter leading-[1.15] text-neutral-400">
                                        The final version was shaped by the people I built it for.
                                    </p>
                                </Masked>
                            </div>

                            <div className="mt-16">
                                <MindWellImage name="showcase" index={11} />
                            </div>

                            <Reveal>
                                <div className="mt-14">
                                    <StudyLink href={MINDWELL.links.app} label="Try MindWell" hint="It’s live." />
                                </div>
                            </Reveal>
                        </div>
                    </section>

                    {/* Back to the short version. */}
                    <section className="px-6 md:px-12 py-16 md:py-24 bg-white border-b border-[#D4D4D0]">
                        <div className="max-w-5xl mx-auto">
                            <a
                                href={shortHref}
                                onClick={(event) => {
                                    if (event.metaKey || event.ctrlKey || event.shiftKey || event.button === 1) return;
                                    event.preventDefault();
                                    onReadShort();
                                }}
                                className="group block border-t border-[#111] pt-8 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#111]"
                            >
                                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-neutral-500 block mb-5">
                                    // Shorter
                                </span>
                                <div className="flex items-start justify-between gap-8">
                                    <div className="max-w-2xl">
                                        <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-[#111] mb-4 group-hover:text-neutral-600 transition-colors">
                                            Back to the short version
                                        </h2>
                                        <p className="text-lg text-neutral-600 leading-relaxed">
                                            The same story in about ninety seconds, carried by six visual moments.
                                        </p>
                                    </div>
                                    <div className="w-12 h-12 shrink-0 border border-[#D4D4D0] flex items-center justify-center group-hover:bg-[#111] group-hover:text-white transition-colors">
                                        <ArrowLeft size={20} />
                                    </div>
                                </div>
                            </a>
                        </div>
                    </section>
                </div>
            );
        };

        // Shared chrome, identical in behaviour to Ewave's.
        const MindWellCaseStudy = ({ variant = 'short', onBack, onNext, onSwitchVariant, variantHref }) => (
            <div className="min-h-screen bg-[#F4F4F2]">
                <div className="sticky top-0 z-40 bg-[#F4F4F2]/90 backdrop-blur border-b border-[#D4D4D0] px-4 sm:px-6 py-3 flex justify-between items-center gap-4">
                    <button
                        onClick={onBack}
                        className="group flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-neutral-500 hover:text-black transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111]"
                    >
                        <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                        <span className="hidden sm:inline">Back to Works</span>
                        <span className="sm:hidden">Back</span>
                    </button>

                    <span className="font-bold text-sm tracking-tight hidden md:block">MindWell</span>

                    <EwaveVersionSwitch
                        variant={variant}
                        variantHref={variantHref}
                        onSwitch={onSwitchVariant}
                    />
                </div>

                {variant === 'full' ? (
                    <MindWellFull
                        shortHref={variantHref('short')}
                        onReadShort={() => onSwitchVariant('short')}
                    />
                ) : (
                    <MindWellShort
                        fullHref={variantHref('full')}
                        onReadFull={() => onSwitchVariant('full')}
                    />
                )}

                <button
                    onClick={onNext}
                    className="w-full text-left p-12 md:p-20 bg-[#111] text-white group hover:bg-black transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-white"
                >
                    <span className="font-mono text-xs text-neutral-500 uppercase tracking-widest mb-4 block group-hover:text-white transition-colors">Next Project</span>
                    <div className="flex items-center justify-between">
                        <span className="block text-4xl md:text-6xl font-bold tracking-tighter">View Next Case</span>
                        <ArrowRight size={32} className="transform group-hover:translate-x-4 transition-transform" />
                    </div>
                </button>
            </div>
        );

        // ============================================================
        // ROUTING
        // Real URLs via the History API. No router dependency: the whole
        // surface is five shapes, and parse/format below is the single
        // source of truth in both directions.
        //
        // NOTE: pushState only makes URLs real inside the browser. A pasted
        // /work/ewave is a fresh request for a path with no file, so the
        // host has to rewrite unknown paths to index.html — that's what
        // vercel.json does. Locally, serve with `npx serve -s .`
        // (http-server has no SPA fallback and will 404).
        // ============================================================

        const parseRoute = (pathname) => {
            const parts = pathname.replace(/\/+$/, '').split('/').filter(Boolean);
            if (parts.length === 0) return { name: 'home' };
            if (parts[0] === 'about') return { name: 'about' };
            if (parts[0] === 'resume') return { name: 'resume' };
            if (parts[0] === 'work' && parts[1]) {
                return {
                    name: 'work',
                    slug: parts[1].toLowerCase(),
                    variant: parts[2] === 'full' ? 'full' : 'short'
                };
            }
            return { name: 'home' };
        };

        const routeToPath = (route) => {
            if (!route) return '/';
            if (route.name === 'about') return '/about';
            if (route.name === 'resume') return '/resume';
            if (route.name === 'work') {
                return `/work/${route.slug}${route.variant === 'full' ? '/full' : ''}`;
            }
            return '/';
        };

        const sameRoute = (a, b) => routeToPath(a) === routeToPath(b);

        const SITE_ORIGIN = 'https://praiseakindedesign.vercel.app';

        // Contact.
        //
        // Paste a Formspree endpoint here and the form does a real POST with a
        // real success state: create a form at formspree.io, then use the
        // "https://formspree.io/f/xxxxxxxx" URL it gives you. Any endpoint that
        // accepts JSON works the same way, including a Vercel function.
        //
        // Left empty, the form still opens the visitor's mail client, but it
        // also shows the address on screen, so it can never fail in silence.
        const CONTACT_EMAIL = 'Akindepraise5@gmail.com';

        // Per-route <title> and description. These do reach browser tabs,
        // bookmarks, history and Googlebot — unlike og:image, which can't be
        // set from JavaScript in any way a social crawler will see.
        const routeMeta = (route, projects) => {
            const fallback = {
                title: 'Praise Akinde - Product Designer & AI-Native Frontend Developer',
                description: 'Product Designer & AI-Native Frontend Developer with 4+ years of experience helping startups and businesses craft premium digital experiences through product thinking, visual design, AI workflows, and frontend execution.'
            };
            if (!route || route.name === 'home') return fallback;
            if (route.name === 'about') {
                return {
                    title: 'About - Praise Akinde',
                    description: 'Praise, Unfiltered. Designer, builder, teacher, and perpetually curious. The people, teaching, curiosity and life behind the work.'
                };
            }
            if (route.name === 'resume') {
                return {
                    title: 'Resume - Praise Akinde',
                    description: 'Product Designer with 4+ years of experience designing fintech, AI, SaaS and Web3 products from concept to launch.'
                };
            }
            if (route.name === 'work') {
                if (route.slug === 'ewave') {
                    return route.variant === 'full'
                        ? {
                            title: 'Ewave, full case study - Praise Akinde',
                            description: 'The reasoning behind every decision: why the beta asks for nothing, how verification earns the right to ask for more, and the one place I deliberately made the product harder to use.'
                        }
                        : {
                            title: 'Ewave - Praise Akinde',
                            description: 'Sole Product Designer. I rebuilt a stablecoin product from the ground up and shipped it to real users. 1,000+ transactions, 200+ users, ₦50M+ processed.'
                        };
                }
                if (route.slug === 'mindwell') {
                    return route.variant === 'full'
                        ? {
                            title: 'MindWell, full case study - Praise Akinde',
                            description: 'I built the wrong product first. The research that changed it, the rebuild, the AI model change, the privacy architecture, the build in Claude Code, and what I would fix next.'
                        }
                        : {
                            title: 'MindWell - Praise Akinde',
                            description: 'A private AI wellness companion for university students. Researched, designed, built and tested solo. SUS 87.7 out of 100, 87.7% task completion.'
                        };
                }
                const project = (projects || []).find(p => p.id === route.slug);
                if (project) {
                    return {
                        title: `${project.title} - Praise Akinde`,
                        description: project.desc || fallback.description
                    };
                }
            }
            return fallback;
        };

        const applyRouteMeta = (route, projects) => {
            const meta = routeMeta(route, projects);
            const url = SITE_ORIGIN + routeToPath(route);
            document.title = meta.title;

            const set = (id, attr, value) => {
                const el = document.getElementById(id);
                if (el) el.setAttribute(attr, value);
            };
            const desc = document.querySelector('meta[name="description"]');
            if (desc) desc.setAttribute('content', meta.description);

            set('meta-og-title', 'content', meta.title);
            set('meta-og-description', 'content', meta.description);
            set('meta-og-url', 'content', url);
            set('meta-tw-title', 'content', meta.title);
            set('meta-tw-description', 'content', meta.description);
            set('meta-canonical', 'href', url);
        };

        // Which mapped section is currently at the top of the viewport.
        // Used to land the reader in the equivalent place when they move
        // between the short and full versions.
        const sectionAtViewportTop = () => {
            const els = Array.from(document.querySelectorAll('[data-section]'));
            let current = null;
            for (const el of els) {
                if (el.getBoundingClientRect().top <= 140) current = el.dataset.section;
            }
            return current;
        };

        const scrollToSection = (key) => {
            if (!key) return false;
            const el = document.querySelector(`[data-section="${key}"]`);
            if (!el) return false;
            const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            el.scrollIntoView({ behavior: reduced ? 'auto' : 'auto', block: 'start' });
            return true;
        };

        const Portfolio = () => {
            const [activeSection, setActiveSection] = useState('home');
            const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

            // The URL is the state. Initialised from location so a pasted or
            // refreshed /work/ewave/full renders that view directly.
            const [route, setRoute] = useState(() => parseRoute(window.location.pathname));

            // Scroll work queued for after the next paint: either a restored
            // position (back/forward) or a mapped section (version switch).
            const pendingScroll = useRef(null);
            const headingRef = useRef(null);
            const isFirstRender = useRef(true);

            // Derived so the existing view conditionals keep reading naturally.
            const currentView = route.name === 'work' ? route.slug : route.name;

            // The scroll engine in <head> owns first-load position and has been
            // retrying since parse time against a document that had no height.
            // Now that React has put real content in, nudge it once; the shared
            // ResizeObserver handles the rest as Tailwind and the fonts land.
            useEffect(() => {
                window.__scroll.start();
            }, []);

            const navigate = (next, options = {}) => {
                if (sameRoute(next, route) && !options.force) return;

                // A slow first-load restore must not yank someone who has
                // already moved on.
                window.__scroll.cancel();

                // Remember where the reader was on the entry being left, so
                // Back returns them to it rather than to the top.
                window.history.replaceState(
                    {
                        ...(window.history.state || {}),
                        scrollY: window.scrollY,
                        path: window.location.pathname
                    },
                    ''
                );

                const path = routeToPath(next);
                const state = { scrollY: 0, path };
                if (options.replace) window.history.replaceState(state, '', path);
                else window.history.pushState(state, '', path);

                // `??` not `!== undefined`: sectionAtViewportTop() returns null
                // when the reader is above the first mapped section, and null
                // used to fall through both branches of the route effect, so
                // switching Short/Full from the hero scrolled nowhere at all.
                pendingScroll.current = options.scroll ?? 0;
                setRoute(next);
                if (mobileMenuOpen) setMobileMenuOpen(false);
            };

            useEffect(() => {
                const onPopState = (event) => {
                    const restored = event.state && typeof event.state.scrollY === 'number'
                        ? event.state.scrollY
                        : 0;
                    pendingScroll.current = restored;
                    setRoute(parseRoute(window.location.pathname));
                };
                window.addEventListener('popstate', onPopState);
                return () => window.removeEventListener('popstate', onPopState);
            }, []);

            // Apply queued scroll and per-route metadata after the new view
            // has painted. Two frames: one for React's commit, one for layout.
            useEffect(() => {
                applyRouteMeta(route, projects);

                const target = pendingScroll.current;
                pendingScroll.current = null;

                const first = isFirstRender.current;

                const run = () => {
                    if (first) {
                        // Reload: the head engine already has the saved offset
                        // and is mid-retry. Asserting a position here would
                        // fight it.
                        window.__scroll.start();
                    } else if (typeof target === 'string') {
                        window.__scroll.cancel();
                        if (!scrollToSection(target)) window.scrollTo(0, 0);
                    } else {
                        window.__scroll.cancel();
                        const y = typeof target === 'number' ? target : 0;
                        // Back/forward through the engine rather than a bare
                        // scrollTo: landing on a long case study mounts ~80
                        // reveals and the document is still short two frames in,
                        // so a deep offset would be clamped.
                        if (y > 0) window.__scroll.restoreTo(y, { budget: 1500 });
                        else window.scrollTo(0, 0);
                    }
                    // Tell assistive tech where we landed, without stealing
                    // focus on the very first paint.
                    if (!first && headingRef.current) {
                        headingRef.current.focus({ preventScroll: true });
                    }
                    isFirstRender.current = false;
                };

                const frame = requestAnimationFrame(() => requestAnimationFrame(run));
                return () => cancelAnimationFrame(frame);
            }, [route]);

            // Expanded Data
            const projects = [
                {
                    // Ewave renders through <EwaveCaseStudy>, not the generic
                    // <CaseStudy>, so it only needs what the work grid reads.
                    id: "ewave",
                    outcome: "₦50M+ processed · 200+ users · 85% returning",
                    title: "Ewave",
                    desc: "A stablecoin financial product, from redesign to a live beta moving real money",
                    image: "/assets/ewave/hero.jpg",
                    imageWebp: "/assets/ewave/hero.webp",
                    year: "2025",
                    role: "Sole Product Designer",
                    client: "Ewave Finance",
                    timeline: "Jul 2025 - Present"
                },
                {
                    // Also renders through its own component, not <CaseStudy>.
                    id: "mindwell",
                    outcome: "SUS 87.7 · researched, designed, built and tested solo",
                    title: "MindWell",
                    desc: "A private AI wellness companion for university students. Researched, designed, built and tested solo",
                    image: "/assets/mindwell/hero.jpg",
                    imageWebp: "/assets/mindwell/hero.webp",
                    year: "2025",
                    role: "Product Designer · UX Researcher · AI-assisted Developer",
                    client: "Self-initiated",
                    timeline: "Solo"
                },
                {
                    id: "swiftconnect",
                    outcome: "Adopted by the founders",
                    title: "SwiftConnect",
                    desc: "One fintech product serving vendors and everyday users, without splitting in two",
                    longDesc: "SwiftConnect started as a utility for vendors: a tool for buying and reselling airtime and data and paying utility bills at a margin. It worked, but it only spoke to one kind of user. Working closely with the founders, I was brought in to expand it into a product that everyday people could use too, without losing the vendors it was built for. I designed the new experience from scratch, as a full Nigerian fintech app.",
                    path: "./work/swiftconnect",
                    image: "/assets/swiftconnect_banner.png",
                    year: "2024",
                    role: "Product Designer & AI-Native Frontend Developer",
                    client: "Swift Connect",
                    timeline: "Aug - Dec 2024",
                    challenge: "The same action, buying airtime or paying a bill, now had to serve two very different people. A vendor doing it in bulk, many times a day, for profit. And a regular person doing it once, for themselves. The risk was obvious: build for both and the product splits into two. My job was to hold it together as one product across the mobile and web apps, while adding features to each, without making either user feel like the design was meant for someone else.",
                    solution: "The insight that unlocked it: vendors and consumers do the same thing, just at different speeds. Vendors need repetition to be fast. Consumers need a single action to be clear. So I built one flow, not two, and let the same screens serve both intents. Fast repeats for vendors never got in the way of a clean one-off for consumers. From there I extended those patterns across mobile, web, and the landing page so the product felt like one thing everywhere.",
                    impact: "The redesign reframed SwiftConnect from a narrow vendor tool into a fintech product that serves resellers and everyday users in one experience. One flow, one product, built to hold both without splitting apart.",
                    // New surfaces structure for tabs
                    surfaces: [
                        {
                            id: 'mobile',
                            label: 'Mobile App',
                            summary: 'Mobile was the primary surface. Most users, vendor and consumer alike, live on their phones, so this is where the core flows had to feel effortless first.',
                            images: [
                                '/assets/swiftconnect_mobile_1.png',
                                '/assets/swiftconnect_mobile_2.png',
                                '/assets/swiftconnect_mobile_3.png'
                            ]
                        },
                        {
                            id: 'web',
                            label: 'Web App',
                            summary: 'The web app carried the same patterns to a bigger screen, for users managing more at once.',
                            images: [
                                '/assets/swiftconnect_webapp_2.png',
                                '/assets/swiftconnect_webapp_3.png'
                            ]
                        },
                        {
                            id: 'landing',
                            label: 'Landing Page',
                            summary: 'The landing page introduced the product and set the tone before anyone signed in.',
                            images: [
                                '/assets/swiftconnect_landing_hero.png?v=3',
                                '/assets/swiftconnect_landing_2.png',
                                '/assets/swiftconnect_landing_3.png',
                                '/assets/swiftconnect_landing_4.png'
                            ]
                        }
                    ],
                    gallery: [] // Fallback/unused for this project now that surfaces exist
                },
                {
                    id: "washhub",
                    outcome: "In development",
                    title: "WashHub",
                    desc: "On-demand laundry, from a single scan to your doorstep.",
                    longDesc: "WashHub is a laundry service you reach by scanning a barcode, placed somewhere you already are, like a gym. The scan opens a web app in your browser, no download and no account wall to get started. From there you tell WashHub what you want washed, it gets picked up, and you track it until it comes back clean. I designed the experience from scratch as a web app built for that scan-and-go moment.",
                    path: "/work/washhub",
                    image: "/assets/washhub_banner.png",
                    prototypeLink: "https://www.figma.com/proto/65io0kqYq8c54rg7Ygi04n/Fadson?page-id=146%3A2873&node-id=146-3504&viewport=173%2C294%2C0.11&t=BlUOgwqLBCwkmlNM-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=146%3A3131",
                    year: "2025",
                    role: "Product Designer (sole)",
                    client: "WashHub",
                    timeline: "3 Months",
                    challenge: "Laundry services usually ask for too much before they give you anything: an app to download, an account to create, unclear pricing, and no real sense of where your clothes are once they leave your hands. That uncertainty is what makes people give up or keep calling to ask for updates. The job was to make the whole thing feel simple and visible, from the first scan to the moment it’s delivered.",
                    solution: "I designed WashHub around the full loop: scan, register your items, pick-up, and delivery, with tracking the whole way through. Because it opens straight from a barcode, the first screen had to make sense to someone who has never seen the product before. So the flow moves in clear steps, pricing is visible before you commit, and status is always in view so no one has to ask where their order is.",
                    solutionPoints: [
                        "Scan-to-site entry, no download and no account wall to start",
                        "Register clothes and choose what to wash in clear steps",
                        "Pricing visible before you confirm",
                        "Live status from pick-up through delivery",
                        "Designed from scratch as a web app for quick, mobile decisions"
                    ],
                    impact: "WashHub turns a chore into a few taps from a single scan. By making pricing clear and the order visible from pick-up to delivery, the design removes the uncertainty that usually makes laundry services frustrating, and keeps the whole loop in one simple place.",
                    gallery: [
                        "/assets/washhub_gallery_1.png",
                        "/assets/washhub_gallery_2.png",
                        "/assets/washhub_gallery_3.png"
                    ]
                },
                {
                    id: "greenwaste",
                    outcome: "Hackathon MVP · pitched to investors",
                    title: "Green Waste",
                    desc: "Sustainable waste management solution",
                    longDesc: "Led a hackathon project on sustainable waste management. Managed a cross-functional team of 10+, built an MVP, and pitched the project to investors.",
                    path: "/WORK/GreenWaste",
                    externalLink: "https://www.behance.net/gallery/192015371/Green-Waste-Management",
                    // Named so the card can say where the click goes, rather
                    // than letting a reader find out after they have left.
                    hostedOn: "Behance",
                    image: "/assets/greenwaste_banner.png",
                    year: "2023",
                    role: "Lead Product Designer & Design Engineer",
                    client: "Hackathon Project",
                    timeline: "Oct 2023 - Present",
                    challenge: "Waste management is often inefficient and lacks transparency. We needed a solution to incentivize recycling and provide clear data on waste disposal.",
                    solution: "Built an MVP that tracks waste disposal and rewards users for sustainable practices.",
                    solutionPoints: [
                        "MVP for sustainable waste management",
                        "Incentivized recycling program",
                        "Cross-functional team leadership"
                    ],
                    gallery: []
                }
            ];

            // Quotes are kept as arrays so each paragraph keeps its own break,
            // and the photos stay in the order the section reads.
            const testimonials = [
                ,
                {
                    name: "Oluwajuwon Yakubu",
                    role: "Co-Founder / CEO",
                    company: "Ewave",
                    photo: "/assets/testimonials/Oluwajuwon%20Yakubu.jpg",
                    quote: [
                        "Praise brought a rare combination of strong product thinking, design craft, and curiosity to Ewave. He was able to take complex fintech and stablecoin concepts and turn them into clear, intuitive user experiences.",
                        "What stood out most was his ability to think beyond the interface. He took the time to understand the product, challenge assumptions, and think through important details across onboarding, KYC, transfers, wallets, and security.",
                        "Praise has been a valuable part of the Ewave journey, and I’d confidently recommend him to any team looking for a product designer who combines creativity with strong product thinking."
                    ]
                },
                ,
                {
                    name: "Emmanuel (Olu) Adekuoroye",
                    role: "Product Manager",
                    company: "Sycamore.NG",
                    photo: "/assets/testimonials/Emmanuel%20(Olu)%20Adekuoroye.jpg",
                    quote: [
                        "I worked closely with Praise as a member of a team I managed, and he consistently stood out for his creativity, resilience, and exceptional work ethic. Praise approaches problems with depth and originality, grounding his ideas in thorough research and articulating his decisions with clarity and confidence. He takes ownership of his work, remains solution-focused even under pressure, and adds real value to every project he is part of. Any team would be fortunate to have Praise, and I recommend him without reservation."
                    ]
                },
                ,
                {
                    name: "Olaoluwa Abiola",
                    role: "Founder",
                    company: "SwiftConnect",
                    photo: "/assets/testimonials/Olaoluwa%20Abiola.jpg",
                    quote: [
                        "Mr Praise handled the UI/UX design for our telecommunication app, SwiftConnect, and he did a solid job. The interface was clean, easy to understand, and well structured, making it simple for users to navigate the app without confusion. He paid close attention to layout, flow, and usability, which helped the app feel smooth and practical.",
                        "He was responsive to feedback and made improvements as needed throughout the process. His consistency and attention to detail added real value to the app and improved its overall user experience. His contribution played an important role in shaping the final look and feel of the SwiftConnect app."
                    ]
                },
                {
                    name: "Timothy Ayodele",
                    role: "Founder",
                    company: "Reni Technologies Ltd.",
                    photo: "/assets/testimonials/Timothy%20Ayodele.jpg",
                    quote: [
                        "Praise is a creative designer. We have worked together and I can attest to his ability to solve problems, ask quality questions and provide progressive perspectives to problems from a designers angle.",
                        "I recommend him for all opportunities in this domain."
                    ]
                }
            ];

            // The two current roles. Kept in step with the resume page so the
            // same facts don't appear twice on the site with different numbers.
            const experience = [
                { company: "Ewave Finance", role: "Founding Product Designer", period: "Jul 2025 - Present", desc: "Lead end-to-end product design for a stablecoin-powered neobank, partnering directly with the founder from discovery through beta launch. Contributed to a beta platform that has processed over ₦50M in transactions." },
                { company: "TechCrush", role: "UI/UX Design Lead Tutor", period: "Oct 2024 - Present", desc: "Mentored 3,000+ aspiring product designers across multiple UI/UX bootcamp cohorts, leading curriculum delivery and reviewing thousands of student capstone projects." }
            ];

            // Projects that leave the site keep doing so; everything else is
            // now a real in-site URL.
            const projectHref = (id) => {
                const project = projects.find(p => p.id === id);
                if (project && project.externalLink) return project.externalLink;
                if (project && project.path && project.path.startsWith('http')) return project.path;
                return routeToPath({ name: 'work', slug: id, variant: 'short' });
            };

            const isExternalProject = (id) => {
                const project = projects.find(p => p.id === id);
                return Boolean(
                    (project && project.externalLink) ||
                    (project && project.path && project.path.startsWith('http'))
                );
            };

            const handleProjectClick = (id, event) => {
                if (isExternalProject(id)) return; // let the anchor open it
                // Preserve the browser's own modifier behaviour on links.
                if (event && (event.metaKey || event.ctrlKey || event.shiftKey || event.button === 1)) return;
                if (event) event.preventDefault();
                navigate({ name: 'work', slug: id, variant: 'short' });
            };

            const handleNextProject = (currentId) => {
                const currentIndex = projects.findIndex(p => p.id === currentId);
                const nextIndex = (currentIndex + 1) % projects.length;
                const next = projects[nextIndex];
                if (isExternalProject(next.id)) {
                    window.open(projectHref(next.id), '_blank', 'noopener');
                    return;
                }
                navigate({ name: 'work', slug: next.id, variant: 'short' });
            };

            const handleResumeClick = () => navigate({ name: 'resume' });
            const handleAboutClick = () => navigate({ name: 'about' });

            // Used by every in-site link: keeps real href semantics (middle
            // click, copy link address, open in new tab) while routing
            // client-side on a plain click.
            const linkProps = (targetRoute, options = {}) => ({
                href: routeToPath(targetRoute),
                onClick: (event) => {
                    if (event.metaKey || event.ctrlKey || event.shiftKey || event.button === 1) return;
                    event.preventDefault();
                    navigate(targetRoute, options);
                }
            });

            const handleNavClick = (section, event) => {
                if (event) {
                    if (event.metaKey || event.ctrlKey || event.shiftKey || event.button === 1) return;
                    event.preventDefault();
                }

                if (section === 'writing') {
                    window.open('https://medium.com/@akindepraise5', '_blank', 'noopener');
                    if (mobileMenuOpen) setMobileMenuOpen(false);
                    return;
                }

                if (section === 'about' || section === 'resume') {
                    setActiveSection(section);
                    navigate({ name: section });
                    return;
                }

                // Work and Contact are sections of the home page, so they route
                // home first and then scroll once that view exists.
                setActiveSection(section);
                if (mobileMenuOpen) setMobileMenuOpen(false);

                const scrollToTarget = () => {
                    if (section === 'home') {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                        return;
                    }
                    const element = document.getElementById(section);
                    if (element) element.scrollIntoView({ behavior: 'smooth' });
                };

                if (route.name !== 'home') {
                    navigate({ name: 'home' });
                    setTimeout(scrollToTarget, 120);
                    return;
                }
                scrollToTarget();
            };

            // Nav entries that are their own page get a real anchor; the ones
            // that scroll within the home page stay buttons, because that is
            // what they actually do.
            const navHref = (item) => {
                const key = item.toLowerCase();
                if (key === 'writing') return 'https://medium.com/@akindepraise5';
                if (key === 'about') return '/about';
                if (key === 'resume') return '/resume';
                return route.name === 'home' ? `#${key}` : `/#${key}`;
            };

            const currentProjectData = projects.find(p => p.id === currentView);

            return (
                <div className="min-h-screen flex flex-col md:flex-row">
                    <CustomCursor />

                    <a
                        href="#main"
                        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:bg-[#111] focus:text-white focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:uppercase focus:tracking-widest"
                    >
                        Skip to content
                    </a>

                    {/* MOBILE NAV */}
                    <div className="lg:hidden fixed top-0 w-full bg-[#F4F4F2]/90 backdrop-blur z-50 border-b border-[#D4D4D0] px-6 py-4 flex justify-between items-center transition-all duration-300">
                        <a
                            {...linkProps({ name: 'home' })}
                            className="font-bold tracking-tight text-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111]"
                        >
                            PRAISE A.
                        </a>
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="p-2 -mr-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111]"
                            aria-expanded={mobileMenuOpen}
                            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
                        >
                            {mobileMenuOpen ? <X size={24} /> : <List size={24} />}
                        </button>
                    </div>

                    {/* MOBILE MENU */}
                    <div className={`fixed inset-0 z-40 bg-[#F4F4F2] pt-24 px-6 lg:hidden transition-transform duration-500 ease-in-out ${mobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'}`}>
                        <nav className="flex flex-col gap-8" aria-label="Main">
                            {['Work', 'Resume', 'About', 'Writing', 'Contact'].map((item) => (
                                <a
                                    key={item}
                                    href={navHref(item)}
                                    onClick={(event) => handleNavClick(item.toLowerCase(), event)}
                                    {...(item === 'Writing' ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                                    className="text-4xl font-bold tracking-tighter border-b border-[#D4D4D0] pb-6 flex justify-between items-center w-full text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111]"
                                >
                                    {item}
                                    <ArrowUpRight size={24} className="opacity-50" />
                                </a>
                            ))}
                        </nav>
                        <div className="mt-12">
                            <p className="font-mono text-xs text-neutral-500 uppercase tracking-widest mb-2">Connect</p>
                            <div className="flex gap-4 text-lg font-medium">
                                <a href="https://x.com/akindepraise_" target="_blank" rel="noopener noreferrer">X</a>
                                <a href="https://www.linkedin.com/in/akindepraise/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                                <a href="mailto:Akindepraise5@gmail.com">Email</a>
                            </div>
                        </div>
                    </div>

                    {/* SIDEBAR (Desktop) */}
                    <aside className="hidden lg:flex w-72 h-screen fixed top-0 left-0 border-r border-[#D4D4D0] flex-col justify-start bg-[#F4F4F2] z-50 overflow-y-auto">
                        <div className="p-8">
                            <div className="mb-12">
                                <a
                                    {...linkProps({ name: 'home' })}
                                    className="text-left group block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111]"
                                >
                                    <div className="text-xl font-bold tracking-tight mb-1 group-hover:text-neutral-600 transition-colors">PRAISE AKINDE</div>
                                    <p className="font-mono text-[11px] text-neutral-500 uppercase tracking-widest">// Product Designer & AI-Native Frontend Developer</p>
                                </a>
                            </div>

                            <nav className="flex flex-col gap-1" aria-label="Main">
                                {['Work', 'Resume', 'About', 'Writing', 'Contact'].map((item) => {
                                    const key = item.toLowerCase();
                                    const isCurrentPage = (key === 'about' || key === 'resume') && route.name === key;
                                    const isActive = isCurrentPage || (activeSection === key && route.name === 'home');
                                    return (
                                        <a
                                            key={item}
                                            href={navHref(item)}
                                            onClick={(event) => handleNavClick(key, event)}
                                            aria-current={isCurrentPage ? 'page' : undefined}
                                            {...(item === 'Writing' ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                                            className={`group flex items-center justify-between py-2 px-3 -mx-3 rounded-md transition-all w-full text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111] ${isActive ? 'bg-white border border-[#D4D4D0] shadow-sm' : 'hover:bg-[#EAEAE5]'}`}
                                        >
                                            <span className="font-medium text-sm">{item}</span>
                                            {item === 'Writing' ? (
                                                <ArrowUpRight size={12} className="text-neutral-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                                            ) : (
                                                <ArrowDownRight size={12} className={`text-neutral-400 transition-opacity ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />
                                            )}
                                        </a>
                                    );
                                })}
                            </nav>
                        </div>
                    </aside>

                    {/* MAIN CONTENT AREA */}
                    <main id="main" className="flex-1 lg:ml-72 pt-16 lg:pt-0">
                        {/* Focus lands here on every route change so screen
                            reader users are told they've moved. */}
                        <span
                            ref={headingRef}
                            tabIndex={-1}
                            className="sr-only"
                            aria-live="polite"
                        >
                            {routeMeta(route, projects).title}
                        </span>


                        {/* CONDITIONAL RENDERING */}
                        {currentView === 'home' ? (
                            <>
                                {/* HERO */}
                                <section id="home" className="min-h-[90vh] flex flex-col justify-center p-8 md:p-12 lg:p-20 border-b border-[#D4D4D0] relative overflow-hidden">
                                    <Reveal>
                                        <div className="max-w-4xl relative z-10">
                                            {/* Availability first. It used to sit at the very bottom of
                                                the contact section, which is the last thing a visitor
                                                reaches and the first thing they want to know. */}
                                            <p className="flex items-center gap-2.5 mb-8 font-mono text-[11px] uppercase tracking-[0.2em] text-neutral-600">
                                                <span className="relative flex w-2 h-2 shrink-0">
                                                    <span className="absolute inline-flex w-full h-full rounded-full bg-[#111] opacity-40 motion-safe:animate-ping"></span>
                                                    <span className="relative inline-flex w-2 h-2 rounded-full bg-[#111]"></span>
                                                </span>
                                                Available for product design and frontend roles
                                            </p>

                                            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[1.15] mb-8 text-[#111]">
                                                Great products feel simple, useful, <span className="text-neutral-500">and quietly intelligent.</span>
                                            </h1>
                                            <p className="text-lg md:text-xl text-neutral-600 leading-relaxed mb-4 max-w-xl">
                                                I’m Praise Akinde, a Product Designer and AI-Native Frontend Developer. I turn complex startup ideas into clear, premium digital experiences.
                                            </p>
                                            {/* Same mono disciplines line the case study mastheads use. */}
                                            <p className="mb-10 font-mono text-[11px] uppercase tracking-[0.18em] text-neutral-500 leading-loose max-w-xl">
                                                UX strategy · Visual design · AI workflows · Frontend
                                            </p>

                                            {/* The proof, before anyone has to click. Every figure here
                                                is stated and sourced inside a case study. */}
                                            <div className="mb-10 grid grid-cols-2 sm:grid-cols-4 border-t border-l border-[#D4D4D0] max-w-3xl">
                                                {[
                                                    { val: '₦50M+', label: 'Processed through a live fintech beta', href: '/work/ewave' },
                                                    { val: '200+', label: 'Users on that beta, 85% returning', href: '/work/ewave' },
                                                    { val: '87.7', label: 'SUS on a product I designed and built', href: '/work/mindwell' },
                                                    { val: '4+ yrs', label: 'Shipping with startups', href: null }
                                                ].map((stat) => (
                                                    <div key={stat.val} className="border-r border-b border-[#D4D4D0] px-4 py-4 md:px-5 md:py-5">
                                                        <div className="text-2xl md:text-3xl font-bold tracking-tighter text-[#111] tabular-nums">{stat.val}</div>
                                                        <div className="font-mono text-[9px] md:text-[10px] uppercase tracking-[0.14em] text-neutral-500 mt-2 leading-relaxed">
                                                            {stat.label}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>

                                            <div className="mb-10 flex flex-wrap items-center gap-x-8 gap-y-4">
                                                <button
                                                    onClick={() => handleNavClick('work')}
                                                    className="font-mono text-xs uppercase tracking-widest border-b border-black pb-0.5 hover:opacity-50 inline-flex items-center gap-2"
                                                >
                                                    VIEW SELECTED WORK <ArrowRight size={12} />
                                                </button>
                                                <button
                                                    onClick={() => handleNavClick('contact')}
                                                    className="font-mono text-xs uppercase tracking-widest text-neutral-500 border-b border-transparent hover:border-neutral-400 hover:text-[#111] pb-0.5 inline-flex items-center gap-2 transition-colors"
                                                >
                                                    START A PROJECT <ArrowDownRight size={12} />
                                                </button>
                                            </div>
                                        </div>
                                    </Reveal>
                                </section>

                                {/* WORK */}
                                <section id="work" className="p-8 md:p-12 lg:p-20 border-b border-[#D4D4D0]">
                                    <Reveal>
                                        <div className="flex justify-between items-end mb-12 max-w-5xl mx-auto">
                                            <h3 className="text-2xl font-bold tracking-tight">Selected Work</h3>
                                        </div>
                                    </Reveal>

                                    <div className="flex flex-col gap-10 md:gap-16 max-w-5xl mx-auto">
                                        {projects.map((project, index) => (
                                            <Reveal key={index} delay={index * 100}>
                                                <a
                                                    href={projectHref(project.id)}
                                                    onClick={(event) => handleProjectClick(project.id, event)}
                                                    {...(isExternalProject(project.id) ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                                                    aria-label={`${project.title}: ${project.desc}${project.hostedOn ? `. Case study on ${project.hostedOn}, opens in a new tab` : ''}`}
                                                    className="group cursor-pointer block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#111]"
                                                >
                                                    <div className="flex justify-between items-center gap-4 mb-4 font-mono text-xs text-neutral-500 uppercase tracking-wider">
                                                        <span>/ WORK / {project.id.toUpperCase()}</span>
                                                        {/* What it did, not just what it is. Sits opposite the
                                                            slug so the card is scannable without opening it. */}
                                                        <span className="text-right text-[10px] tracking-[0.16em] text-neutral-400 truncate">
                                                            {project.outcome || `// 0${index + 1}`}
                                                        </span>
                                                    </div>

                                                    <div className={`w-full aspect-[4/3] md:aspect-[16/9] bg-[#EAEAE5] overflow-hidden mb-6 relative border ${project.image ? 'border-[#D4D4D0]' : 'border-dashed border-[#B4B4AC]'}`}>
                                                        {project.image ? (
                                                            <picture>
                                                                {/* Banners built by the asset pipeline ship a WebP twin. */}
                                                                {project.imageWebp && (
                                                                    <source srcSet={project.imageWebp} type="image/webp" />
                                                                )}
                                                                <img
                                                                    src={project.image}
                                                                    alt={project.title}
                                                                    loading="lazy"
                                                                    decoding="async"
                                                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter grayscale group-hover:grayscale-0"
                                                                />
                                                            </picture>
                                                        ) : (
                                                            <div className="w-full h-full flex items-center justify-center text-center px-6">
                                                                <div>
                                                                    <span className="block font-mono text-[10px] uppercase tracking-[0.3em] text-neutral-500 mb-2">Image 01: Banner</span>
                                                                    <span className="block text-lg font-bold tracking-tight text-[#111]">Add {project.title} banner</span>
                                                                </div>
                                                            </div>
                                                        )}
                                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                            <div className="bg-white/90 backdrop-blur px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg">
                                                                {project.hostedOn ? `View on ${project.hostedOn}` : 'View Case Study'}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="flex justify-between items-start">
                                                        <div>
                                                            <h4 className="text-3xl font-bold mb-1 group-hover:text-neutral-600 transition-colors">{project.title}</h4>
                                                            <p className="text-neutral-500">// {project.desc}</p>
                                                            {/* Stated, not hovered: a touch reader never sees the
                                                                overlay, and nobody should leave the site by surprise. */}
                                                            {project.hostedOn && (
                                                                <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-neutral-400">
                                                                    Case study on {project.hostedOn}. Opens in a new tab.
                                                                </p>
                                                            )}
                                                        </div>
                                                        <div className="w-12 h-12 border border-[#D4D4D0] flex items-center justify-center group-hover:bg-[#111] group-hover:text-white transition-colors">
                                                            <ArrowUpRight size={20} />
                                                        </div>
                                                    </div>
                                                </a>
                                            </Reveal>
                                        ))}
                                    </div>
                                </section>

                                {/* FRONTEND DEVELOPMENT & AI ASSISTED BUILDS */}
                                <section id="products" className="p-8 md:p-12 lg:p-20 border-b border-[#D4D4D0] bg-[#F4F4F2]">
                                    <Reveal>
                                        <div className="max-w-5xl mx-auto">
                                            <div className="flex justify-between items-end mb-12">
                                                <h3 className="text-2xl font-bold tracking-tight">Frontend Development & AI Assisted Builds</h3>
                                            </div>

                                            <a
                                                href="https://praiseakindedev.vercel.app/"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="group block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#111]"
                                            >
                                                {/* Left aligned like everything else on the site, on the
                                                    same #111 ground as the impact slab, over a hairline
                                                    layout grid rather than a generic dot field. The
                                                    destination is printed on the card, so nobody has to
                                                    guess where the click goes. */}
                                                <div className="relative w-full aspect-[4/3] sm:aspect-[16/9] md:aspect-[2.5/1] bg-[#111] overflow-hidden mb-6 border border-[#111] text-white">
                                                    <div
                                                        aria-hidden="true"
                                                        className="absolute inset-0 opacity-[0.13] group-hover:opacity-25 transition-opacity duration-700"
                                                        style={{
                                                            backgroundImage:
                                                                'linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)',
                                                            backgroundSize: '56px 56px'
                                                        }}
                                                    ></div>
                                                    {/* Ruled edge: the same hairline language as the rest
                                                        of the site, just inverted. */}
                                                    <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-white/25"></div>

                                                    <div className="relative h-full flex flex-col justify-between p-6 md:p-10 lg:p-12">
                                                        <div className="flex items-start justify-between gap-6">
                                                            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-neutral-400">
                                                                // Live site
                                                            </span>
                                                            <span className="w-10 h-10 border border-white/25 flex items-center justify-center shrink-0 group-hover:bg-white group-hover:text-[#111] transition-colors">
                                                                <ArrowUpRight size={18} />
                                                            </span>
                                                        </div>

                                                        <div>
                                                            <h4 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tighter leading-[0.95] max-w-2xl">
                                                                Frontend Development Projects
                                                            </h4>
                                                            <div className="mt-5 flex flex-wrap items-baseline gap-x-6 gap-y-2">
                                                                <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-neutral-400">
                                                                    React · Tailwind · Framer · AI workflows
                                                                </span>
                                                                <span className="font-mono text-[10px] tracking-[0.12em] text-neutral-500 group-hover:text-white transition-colors">
                                                                    praiseakindedev.vercel.app
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <h4 className="text-2xl font-bold mb-1 group-hover:text-neutral-600 transition-colors">Frontend Development Projects</h4>
                                                        <p className="text-neutral-500">// Products and interfaces built with frontend development, AI workflows, and rapid prototyping.</p>
                                                        <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-neutral-400">
                                                            Separate site. Opens in a new tab.
                                                        </p>
                                                    </div>
                                                    <div className="w-12 h-12 border border-[#D4D4D0] flex items-center justify-center group-hover:bg-[#111] group-hover:text-white transition-colors shrink-0">
                                                        <ArrowUpRight size={20} />
                                                    </div>
                                                </div>
                                            </a>
                                        </div>
                                    </Reveal>
                                </section>

                                {/* EXPERIENCE */}
                                <section className="p-8 md:p-12 lg:p-20 border-b border-[#D4D4D0] bg-white">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
                                        <Reveal>
                                            <h3 className="text-2xl font-bold tracking-tight mb-8">Experience</h3>
                                            <div className="space-y-12">
                                                {experience.map((exp, i) => (
                                                    <div key={i} className="group hover:bg-[#F9F9F7] p-4 -mx-4 rounded transition-colors">
                                                        <div className="flex justify-between items-baseline mb-2">
                                                            <h4 className="text-lg font-bold">{exp.company}</h4>
                                                            <span className="font-mono text-xs text-neutral-400">{exp.period}</span>
                                                        </div>
                                                        <p className="font-mono text-xs text-[#111] uppercase tracking-wide mb-3">// {exp.role}</p>
                                                        <p className="text-sm text-neutral-600 leading-relaxed max-w-sm">{exp.desc}</p>
                                                    </div>
                                                ))}

                                                <div className="pt-4">
                                                    <button
                                                        onClick={handleResumeClick}
                                                        className="font-mono text-xs uppercase tracking-widest border-b border-black pb-0.5 hover:opacity-50 inline-flex items-center gap-2"
                                                    >
                                                        View Full Resume <ArrowRight size={12} />
                                                    </button>
                                                </div>
                                            </div>
                                        </Reveal>
                                        <Reveal delay={200}>
                                            <div className="h-full flex flex-col justify-between">
                                                <div>
                                                    <h3 className="text-2xl font-bold tracking-tight mb-8">Approach</h3>
                                                    <p className="text-lg leading-relaxed mb-6">
                                                        I believe in design that serves a function. Stripping away the unnecessary to reveal the core value of a product.
                                                    </p>
                                                    <p className="text-lg leading-relaxed text-neutral-500">
                                                        My process is highly collaborative, often embedding directly with engineering teams to ensure the final product matches the vision.
                                                    </p>
                                                </div>
                                                <div className="mt-12 p-6 bg-[#F4F4F2] border border-[#D4D4D0]">
                                                    <span className="font-mono text-xs uppercase tracking-widest text-neutral-500 mb-4 block">Tech Stack</span>
                                                    <div className="flex flex-wrap gap-2">
                                                        {['Figma', 'html', 'css', 'js', 'Tailwind', 'Framer', 'Illustrator', 'Photoshop'].map(tech => (
                                                            <span key={tech} className="px-3 py-1 bg-white border border-[#D4D4D0] text-xs font-mono hover:border-black transition-colors cursor-default">{tech}</span>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </Reveal>
                                    </div>
                                </section>

                                {/* TESTIMONIALS */}
                                <section id="testimonials" className="p-8 md:p-12 lg:p-20 border-b border-[#D4D4D0] bg-[#F4F4F2]">
                                    <Reveal>
                                        <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4 mb-12 md:mb-16">
                                            <div>
                                                <span className="font-mono text-xs text-neutral-500 uppercase tracking-widest mb-4 block">// Testimonials</span>
                                                <h3 className="text-2xl font-bold tracking-tight">People I’ve built with</h3>
                                            </div>
                                            <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-neutral-400">
                                                Founders / Product Leads
                                            </span>
                                        </div>
                                    </Reveal>

                                    {/* Columns rather than a grid: the quotes are very different
                                        lengths, and this lets each one end where it ends instead of
                                        padding every card out to a shared height. */}
                                    <div className="lg:columns-2 lg:gap-12 xl:gap-16 [&>div]:break-inside-avoid">
                                        {testimonials.map((t, i) => (
                                            <Reveal key={t.name} delay={i * 100}>
                                                <figure className="quote-card m-0 mb-10 lg:mb-14 border-t border-[#D4D4D0] hover:border-[#111] pt-5 transition-colors duration-500">
                                                    {/* Company only. This row used to lead with an index,
                                                        but the quotes sit in a two-column masonry that fills
                                                        top-to-bottom, so the numbers never read in the order
                                                        you scan them. Testimonials are not a sequence, so the
                                                        number encoded nothing and only raised a question. */}
                                                    <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-neutral-500">
                                                        {t.company}
                                                    </div>

                                                    <blockquote className="mt-6 space-y-4">
                                                        {t.quote.map((paragraph, p) => (
                                                            <p key={p} className="text-base md:text-lg text-neutral-700 leading-relaxed">
                                                                {paragraph}
                                                            </p>
                                                        ))}
                                                    </blockquote>

                                                    <figcaption className="mt-7 flex items-center gap-4">
                                                        <div className="w-14 h-14 shrink-0 overflow-hidden bg-[#EAEAE5] border border-[#D4D4D0]">
                                                            <img
                                                                src={t.photo}
                                                                alt={t.name}
                                                                width="400"
                                                                height="400"
                                                                loading="lazy"
                                                                decoding="async"
                                                                className="quote-avatar w-full h-full object-cover"
                                                            />
                                                        </div>
                                                        <div className="min-w-0">
                                                            <div className="font-bold tracking-tight leading-tight">{t.name}</div>
                                                            <div className="font-mono text-[11px] uppercase tracking-widest text-neutral-500 mt-1">
                                                                {t.role}, {t.company}
                                                            </div>
                                                        </div>
                                                    </figcaption>
                                                </figure>
                                            </Reveal>
                                        ))}
                                    </div>
                                </section>

                                {/* CONTACT
                                    One instruction instead of a form. The form asked for three
                                    fields before it would do anything, and a mail client already
                                    knows who the sender is. The address is printed underneath so a
                                    reader with no mail client configured can copy it rather than
                                    hit a dead end. */}
                                <section id="contact" className="p-8 md:p-12 lg:p-20 bg-[#111] text-white">
                                    <div className="max-w-3xl mx-auto text-center">
                                        <Reveal>
                                            <span className="font-mono text-xs uppercase tracking-[0.3em] text-neutral-500 mb-10 block">
                                                // Get in touch
                                            </span>
                                            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter leading-[0.95]">
                                                Let’s build <span className="text-neutral-600">something great.</span>
                                            </h2>
                                        </Reveal>

                                        <Reveal delay={150}>
                                            {/* Stacked explicitly: both are inline-level, so they
                                                would otherwise share a line and collide. */}
                                            <div className="mt-14 flex flex-col items-center gap-6">
                                                <a
                                                    href={`mailto:${CONTACT_EMAIL}`}
                                                    className="inline-flex items-center gap-3 bg-white text-black px-10 py-5 font-bold text-sm tracking-widest uppercase hover:bg-neutral-200 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                                                >
                                                    Email Me <ArrowUpRight size={16} />
                                                </a>

                                                <a
                                                    href={`mailto:${CONTACT_EMAIL}`}
                                                    className="font-mono text-[11px] md:text-xs uppercase tracking-[0.2em] text-neutral-500 hover:text-white transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                                                >
                                                    {CONTACT_EMAIL}
                                                </a>
                                            </div>
                                        </Reveal>

                                        <Reveal delay={250}>
                                            <div className="mt-16 pt-12 border-t border-neutral-800 flex flex-col items-center gap-8">
                                                <p className="text-neutral-500 text-sm leading-relaxed max-w-sm">
                                                    Open to product design roles, frontend work, and selected startup projects. Send a message and I’ll reply.
                                                </p>

                                                <a
                                                    href="https://wa.me/2347089552811"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-neutral-400 hover:text-white transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                                                >
                                                    WhatsApp · +234 708 955 2811 <ArrowUpRight size={12} />
                                                </a>

                                                <div className="flex flex-wrap justify-center gap-6">
                                                    {[
                                                        { href: 'https://www.linkedin.com/in/akindepraise/', label: 'LinkedIn', Icon: LinkedinLogo },
                                                        { href: 'https://x.com/akindepraise_', label: 'X', Icon: XLogo },
                                                        { href: 'https://www.behance.net/akindepraise_', label: 'Behance', Icon: BehanceLogo },
                                                        { href: 'https://dribbble.com/akindepraise_', label: 'Dribbble', Icon: DribbbleLogo },
                                                        { href: 'https://www.tiktok.com/@akindepraise_', label: 'TikTok', Icon: TiktokLogo },
                                                        { href: 'https://t.me/madebychosen1', label: 'Telegram', Icon: TelegramLogo }
                                                    ].map(({ href, label, Icon }) => (
                                                        <a
                                                            key={label}
                                                            href={href}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            aria-label={label}
                                                            className="text-neutral-500 hover:text-white transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                                                        >
                                                            <Icon size={22} />
                                                        </a>
                                                    ))}
                                                </div>
                                            </div>
                                        </Reveal>

                                        <Reveal delay={300}>
                                            <div className="pt-12 mt-16 border-t border-neutral-800 text-[10px] text-neutral-500 font-mono uppercase tracking-widest">
                                                <p>© 2025 Praise A.</p>
                                            </div>
                                        </Reveal>
                                    </div>
                                </section>
                            </>
                        ) : currentView === 'resume' ? (
                            <Resume onBack={() => navigate({ name: 'home' })} />
                        ) : currentView === 'about' ? (
                            <AboutPage onBack={() => navigate({ name: 'home' })} />
                        ) : currentView === 'ewave' ? (
                            <EwaveCaseStudy
                                variant={route.variant}
                                onBack={() => navigate({ name: 'home' })}
                                onNext={() => handleNextProject('ewave')}
                                onSwitchVariant={(nextVariant) => {
                                    // Land the reader at the equivalent section
                                    // rather than the top of the other version.
                                    navigate(
                                        { name: 'work', slug: 'ewave', variant: nextVariant },
                                        { scroll: sectionAtViewportTop() }
                                    );
                                }}
                                variantHref={(v) => routeToPath({ name: 'work', slug: 'ewave', variant: v })}
                            />
                        ) : currentView === 'mindwell' ? (
                            <MindWellCaseStudy
                                variant={route.variant}
                                onBack={() => navigate({ name: 'home' })}
                                onNext={() => handleNextProject('mindwell')}
                                onSwitchVariant={(nextVariant) => {
                                    navigate(
                                        { name: 'work', slug: 'mindwell', variant: nextVariant },
                                        { scroll: sectionAtViewportTop() }
                                    );
                                }}
                                variantHref={(v) => routeToPath({ name: 'work', slug: 'mindwell', variant: v })}
                            />
                        ) : currentProjectData ? (
                            <CaseStudy
                                project={currentProjectData}
                                onBack={() => navigate({ name: 'home' })}
                                onNext={() => handleNextProject(currentView)}
                            />
                        ) : (
                            // Unknown /work/<slug>: say so rather than render blank.
                            <div className="min-h-screen flex items-center px-6 md:px-12">
                                <div className="max-w-xl">
                                    <span className="font-mono text-xs uppercase tracking-widest text-neutral-500 block mb-6">// 404</span>
                                    <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-[#111] mb-6">
                                        That page moved.
                                    </h1>
                                    <p className="text-lg text-neutral-600 leading-relaxed mb-10">
                                        The case study you're looking for isn't here. It may have been renamed.
                                    </p>
                                    <a
                                        {...linkProps({ name: 'home' })}
                                        className="inline-flex items-center gap-2 bg-[#111] text-white px-8 py-4 font-bold text-sm tracking-widest uppercase hover:bg-neutral-800 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111]"
                                    >
                                        Back to work <ArrowRight size={16} />
                                    </a>
                                </div>
                            </div>
                        )}

                    </main>
                </div>
            );
        };

        const root = createRoot(document.getElementById('root'));
        root.render(<Portfolio />);
