"use client";
import React, {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

type EncryptedTextProps = {
  text: string;
  className?: string;
  /**
   * Time in milliseconds between revealing each subsequent real character.
   * Lower is faster. Defaults to 50ms per character.
   */
  revealDelayMs?: number;
  /** Optional custom character set to use for the gibberish effect. */
  charset?: string;
  /**
   * Time in milliseconds between gibberish flips for unrevealed characters.
   * Lower is more jittery. Defaults to 50ms.
   */
  flipDelayMs?: number;
  /** CSS class for styling the encrypted/scrambled characters */
  encryptedClassName?: string;
  /** CSS class for styling the revealed characters */
  revealedClassName?: string;
  /**
   * Keeps each character in a fixed cell based on the final text so the
   * scramble cannot reflow the surrounding layout. Off by default.
   */
  stableLayout?: boolean;
};

const DEFAULT_CHARSET =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-={}[];:,.<>/?";

type CharWidth = { char: string; widthEm: number };

function generateRandomCharacter(charset: string): string {
  const index = Math.floor(Math.random() * charset.length);
  return charset.charAt(index);
}

function pickScrambleCharacter(
  charset: string,
  charWidths: CharWidth[],
  cellWidthEm?: number,
): string {
  if (!cellWidthEm || charWidths.length === 0) {
    return generateRandomCharacter(charset);
  }

  const fitting = charWidths.filter(
    ({ widthEm }) => widthEm <= cellWidthEm + 0.005,
  );

  if (fitting.length === 0) {
    return charWidths.reduce((narrowest, entry) =>
      entry.widthEm < narrowest.widthEm ? entry : narrowest,
    ).char;
  }

  const widest = Math.max(...fitting.map(({ widthEm }) => widthEm));
  const dense = fitting.filter(({ widthEm }) => widthEm >= widest * 0.72);
  return dense[Math.floor(Math.random() * dense.length)].char;
}

function generateScramble(
  original: string,
  charset: string,
  cellWidths?: number[] | null,
  charWidths?: CharWidth[],
): string {
  if (!original) return "";
  let result = "";
  for (let i = 0; i < original.length; i += 1) {
    const ch = original[i];
    result +=
      ch === " "
        ? " "
        : pickScrambleCharacter(charset, charWidths ?? [], cellWidths?.[i]);
  }
  return result;
}

export const EncryptedText: React.FC<EncryptedTextProps> = ({
  text,
  className,
  revealDelayMs = 50,
  charset = DEFAULT_CHARSET,
  flipDelayMs = 50,
  encryptedClassName,
  revealedClassName,
  stableLayout = false,
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const measureRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const reduceMotion = useReducedMotion();

  const [revealCount, setRevealCount] = useState<number>(0);
  const [cellWidthsEm, setCellWidthsEm] = useState<number[] | null>(null);
  const cellWidthsRef = useRef<number[] | null>(null);
  const charWidthsRef = useRef<CharWidth[]>([]);
  const scrambleCharsRef = useRef<string[]>(
    text ? generateScramble(text, charset).split("") : [],
  );

  useLayoutEffect(() => {
    if (!stableLayout) {
      cellWidthsRef.current = null;
      charWidthsRef.current = [];
      setCellWidthsEm(null);
      return;
    }

    let cancelled = false;

    const measure = () => {
      const measureEl = measureRef.current;
      if (!measureEl || cancelled) return;

      const fontSize = Number.parseFloat(
        window.getComputedStyle(measureEl).fontSize,
      );
      if (!fontSize) return;

      const cells = measureEl.querySelectorAll<HTMLElement>("[data-cell]");
      const nextCellWidths = Array.from(cells).map(
        (cell) => cell.getBoundingClientRect().width / fontSize,
      );

      const charEls = measureEl.querySelectorAll<HTMLElement>("[data-char]");
      const nextCharWidths = Array.from(charEls).map((el) => ({
        char: el.textContent ?? "",
        widthEm: el.getBoundingClientRect().width / fontSize,
      }));

      cellWidthsRef.current = nextCellWidths;
      charWidthsRef.current = nextCharWidths;
      scrambleCharsRef.current = generateScramble(
        text,
        charset,
        nextCellWidths,
        nextCharWidths,
      ).split("");
      setCellWidthsEm(nextCellWidths);
    };

    measure();
    document.fonts?.ready.then(measure);

    return () => {
      cancelled = true;
    };
  }, [stableLayout, text, className, charset]);

  const animationFrameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);
  const lastFlipTimeRef = useRef<number>(0);

  useEffect(() => {
    if (reduceMotion) {
      setRevealCount(text.length);
      return;
    }

    if (!isInView) return;

    // Reset state for a fresh animation whenever dependencies change
    const initial = text
      ? generateScramble(
          text,
          charset,
          cellWidthsRef.current,
          charWidthsRef.current,
        )
      : "";
    scrambleCharsRef.current = initial.split("");
    startTimeRef.current = performance.now();
    lastFlipTimeRef.current = startTimeRef.current;
    setRevealCount(0);

    let isCancelled = false;

    const update = (now: number) => {
      if (isCancelled) return;

      const elapsedMs = now - startTimeRef.current;
      const totalLength = text.length;
      const currentRevealCount = Math.min(
        totalLength,
        Math.floor(elapsedMs / Math.max(1, revealDelayMs)),
      );

      setRevealCount(currentRevealCount);

      if (currentRevealCount >= totalLength) {
        return;
      }

      // Re-randomize unrevealed scramble characters on an interval
      const timeSinceLastFlip = now - lastFlipTimeRef.current;
      if (timeSinceLastFlip >= Math.max(0, flipDelayMs)) {
        for (let index = 0; index < totalLength; index += 1) {
          if (index >= currentRevealCount) {
            if (text[index] !== " ") {
              scrambleCharsRef.current[index] = pickScrambleCharacter(
                charset,
                charWidthsRef.current,
                cellWidthsRef.current?.[index],
              );
            } else {
              scrambleCharsRef.current[index] = " ";
            }
          }
        }
        lastFlipTimeRef.current = now;
      }

      animationFrameRef.current = requestAnimationFrame(update);
    };

    animationFrameRef.current = requestAnimationFrame(update);

    return () => {
      isCancelled = true;
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isInView, text, revealDelayMs, charset, flipDelayMs, reduceMotion]);

  if (!text) return null;

  const useStableCells =
    stableLayout && cellWidthsEm !== null && cellWidthsEm.length === text.length;

  const renderChar = (char: string, index: number) => {
    const isRevealed = index < revealCount;
    const displayChar = isRevealed
      ? char
      : char === " "
        ? " "
        : (scrambleCharsRef.current[index] ??
          generateRandomCharacter(charset));
    const widthEm =
      useStableCells && cellWidthsEm ? cellWidthsEm[index] : undefined;

    return (
      <span
        key={index}
        className={cn(isRevealed ? revealedClassName : encryptedClassName)}
        style={
          char !== " " && widthEm !== undefined
            ? {
                display: "inline-block",
                width: `${widthEm}em`,
                textAlign: "center",
              }
            : undefined
        }
      >
        {displayChar}
      </span>
    );
  };

  const content = useStableCells
    ? (() => {
        const nodes: React.ReactNode[] = [];
        let wordStart = 0;

        for (let index = 0; index <= text.length; index += 1) {
          if (index === text.length || text[index] === " ") {
            if (index > wordStart) {
              nodes.push(
                <span
                  key={`word-${wordStart}`}
                  style={{ display: "inline-block", whiteSpace: "nowrap" }}
                >
                  {Array.from({ length: index - wordStart }, (_, offset) =>
                    renderChar(text[wordStart + offset], wordStart + offset),
                  )}
                </span>,
              );
            }

            if (index < text.length) nodes.push(renderChar(" ", index));
            wordStart = index + 1;
          }
        }

        return nodes;
      })()
    : text.split("").map((char, index) => renderChar(char, index));

  return (
    <motion.span
      ref={ref}
      className={cn(className)}
      aria-label={text}
      role="text"
    >
      {content}
      {stableLayout && (
        <span
          ref={measureRef}
          aria-hidden="true"
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: 0,
            height: 0,
            overflow: "hidden",
            visibility: "hidden",
            pointerEvents: "none",
            whiteSpace: "pre",
          }}
        >
          {text.split("").map((char, index) => (
            <span
              key={`cell-${index}`}
              data-cell
              style={{ display: "inline-block", whiteSpace: "pre" }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
          {Array.from(new Set(charset)).map((char) => (
            <span
              key={`char-${char}`}
              data-char
              style={{ display: "inline-block", whiteSpace: "pre" }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </span>
      )}
    </motion.span>
  );
};
