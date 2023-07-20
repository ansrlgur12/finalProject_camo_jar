import React, { useEffect, useRef } from "react";

function EllipsisText({ text, maxLine }) {
  const textRef = useRef(null);

  useEffect(() => {
    const textElement = textRef.current;
    let textContent = text;

    // Line clamp 설정
    textElement.style.webkitLineClamp = maxLine;

    // Text가 overflow인지 확인
    const isOverflowing =
      textElement.scrollHeight > textElement.offsetHeight;

    // Text가 overflow일 때
    if (isOverflowing) {
      const words = textContent.split(' ');

      // 단어를 하나씩 제거하며 Ellipsis 설정
      while (textElement.scrollHeight > textElement.offsetHeight && words.length > 0) {
        words.pop();
        textElement.textContent = words.join(' ') + '...';
      }
    }
  }, [text, maxLine]);

  return (
    <div
      ref={textRef}
      style={{
        display: "-webkit-box",
        WebkitBoxOrient: "vertical",
        overflow: "hidden"
      }}
    >
      {text}
    </div>
  );
}

export default EllipsisText;