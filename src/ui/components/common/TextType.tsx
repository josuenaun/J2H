// src/ui/components/common/TextType.tsx
import { useEffect, useRef, useState, useMemo } from 'react';
import { gsap } from 'gsap';
import './TextType.css';

interface TextTypeProps {
    className?: string;
    showCursor?: boolean;
    hideCursorWhileTyping?: boolean;
    cursorCharacter?: string | React.ReactNode;
    cursorBlinkDuration?: number;
    cursorClassName?: string;
    text: string | string[];
    typingSpeed?: number;
    initialDelay?: number;
    pauseDuration?: number;
    deletingSpeed?: number;
    loop?: boolean;
    onSentenceComplete?: (sentence: string, index: number) => void;
}

const TextType = ({
    text,
    typingSpeed = 50,
    initialDelay = 0,
    pauseDuration = 2000,
    deletingSpeed = 30,
    loop = true,
    className = '',
    showCursor = true,
    hideCursorWhileTyping = false,
    cursorCharacter = '|',
    cursorClassName = '',
    cursorBlinkDuration = 0.5,
    onSentenceComplete,
    ...props
}: TextTypeProps & React.HTMLAttributes<HTMLElement>) => {
    const [displayedText, setDisplayedText] = useState('');
    const [currentCharIndex, setCurrentCharIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [currentTextIndex, setCurrentTextIndex] = useState(0);
    const [isVisible] = useState(true);
    const cursorRef = useRef<HTMLSpanElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const textArray = useMemo(() => (Array.isArray(text) ? text : [text]), [text]);

    useEffect(() => {
        if (showCursor && cursorRef.current) {
            gsap.set(cursorRef.current, { opacity: 1 });
            gsap.to(cursorRef.current, {
                opacity: 0,
                duration: cursorBlinkDuration,
                repeat: -1,
                yoyo: true,
                ease: 'power2.inOut'
            });
        }
    }, [showCursor, cursorBlinkDuration]);

    useEffect(() => {
        if (!isVisible) return;

        let timeout: ReturnType<typeof setTimeout>;

        const currentText = textArray[currentTextIndex];

        const executeTypingAnimation = () => {
            if (isDeleting) {
                if (displayedText === '') {
                    setIsDeleting(false);
                    if (currentTextIndex === textArray.length - 1 && !loop) {
                        return;
                    }

                    if (onSentenceComplete) {
                        onSentenceComplete(textArray[currentTextIndex], currentTextIndex);
                    }

                    setCurrentTextIndex(prev => (prev + 1) % textArray.length);
                    setCurrentCharIndex(0);
                } else {
                    timeout = setTimeout(() => {
                        setDisplayedText(prev => prev.slice(0, -1));
                    }, deletingSpeed);
                }
            } else {
                if (currentCharIndex < currentText.length) {
                    timeout = setTimeout(
                        () => {
                            setDisplayedText(prev => prev + currentText[currentCharIndex]);
                            setCurrentCharIndex(prev => prev + 1);
                        },
                        typingSpeed
                    );
                } else if (textArray.length >= 1) {
                    if (!loop && currentTextIndex === textArray.length - 1) return;
                    timeout = setTimeout(() => {
                        setIsDeleting(true);
                    }, pauseDuration);
                }
            }
        };

        if (currentCharIndex === 0 && !isDeleting && displayedText === '') {
            timeout = setTimeout(executeTypingAnimation, initialDelay);
        } else {
            executeTypingAnimation();
        }

        return () => clearTimeout(timeout);
    }, [
        currentCharIndex,
        displayedText,
        isDeleting,
        typingSpeed,
        deletingSpeed,
        pauseDuration,
        textArray,
        currentTextIndex,
        loop,
        initialDelay,
        isVisible,
        onSentenceComplete
    ]);

    const shouldHideCursor =
        hideCursorWhileTyping && (currentCharIndex < textArray[currentTextIndex].length || isDeleting);

    return (
        <div ref={containerRef} className={`text-type ${className}`} {...props}>
            <span className="text-type__content text-white/80">
                {displayedText}
            </span>
            {showCursor && (
                <span
                    ref={cursorRef}
                    className={`text-type__cursor ${cursorClassName} ${shouldHideCursor ? 'text-type__cursor--hidden' : ''}`}
                >
                    {cursorCharacter}
                </span>
            )}
        </div>
    );
};

export default TextType;